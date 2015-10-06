#!/usr/bin/env python
import re
import sys
import json
import random
import sqlite3
import hashlib
import argparse
import cherrypy
import requests
import lxml.html

from lxml.cssselect import CSSSelector

from cherrypy.lib import httpauth
from collections import defaultdict
from openpyxl import Workbook
from StringIO import StringIO

DEBUG = True


def atoi(text):
    return int(text) if text.isdigit() else text

def natural_keys(text):
    '''
    alist.sort(key=natural_keys) sorts in human order
    http://nedbatchelder.com/blog/200712/human_sorting.html
    (See Toothy's implementation in the comments)
    '''
    return [ atoi(c) for c in re.split('(\d+)', text) ]

def get_videos(url):
    html = requests.get(url).text
    tree = lxml.html.fromstring(html)
    sel = CSSSelector('td > a')
    links = [i.get('href') for i in sel(tree)]
    return filter(lambda x: x[-1] != '/' and x not in ['samplehigh.mp4', 'samplelow.mp4'], links)

def generate_key(campaign, worker, rand_key, secret):
    sha = hashlib.sha256()
    sha.update('%s%s%s%s' % (campaign, worker, rand_key, secret))
    return 'mw-' + sha.digest().encode('hex')


class API(object):

    DATABASE = 'answers.db'

    def __init__(self, questions, users, watch_count, secret):
        # {username: password}
        self.users = users
        self.table = 'answers'
        # {name: required}
        self.fields = {q['id']: q.get('required', False) and q['type'] != 'video' for q in questions}
        self.fields.update({'useragent': False,
                            'timestamps': True,
                            'worker': True,
                            'campaign': True,
                            'rand_key': True,
                            'res': True,
                            'video': True,
                            'speeds': True})

        # Number of times a video should be watched (per campaign)
        self.videos = defaultdict(lambda: watch_count)

        # Campaigns which a worker participated in
        self.workers = defaultdict(list)

        self.secret = secret

        self.setup_database()

    def setup_database(self):
        with sqlite3.connect(API.DATABASE) as con:
            sql = 'CREATE TABLE IF NOT EXISTS %s (%s)' % (self.table, ', '.join(self.fields))
            con.execute(sql)

            sql = 'SELECT * FROM %s LIMIT 1' % self.table
            cur = con.execute(sql)
            columns_have = [d[0] for d in cur.description]
            columns_need = self.fields.keys()
            if columns_have != columns_need:
                raise Exception('Database does not have the right layout')

            # Calculate how many times each of the videos still needs to be watched (per campaign)
            sql = 'SELECT video, campaign, count(*) FROM %s GROUP BY video, campaign' % self.table
            cur = con.execute(sql)
            for video, campaign, count in cur.fetchall():
                self.videos[campaign][video] -= count
            if DEBUG:
                print self.videos

            # Count worker/campaign pairs
            sql = 'SELECT worker, campaign, COUNT(*) AS count FROM %s GROUP BY worker, campaign' % self.table
            cur = con.execute(sql)
            for worker, campaign, count in cur.fetchall():
                if count > 1:
                    raise RuntimeError('Worker has participated multiple times in a single campaign!')
                self.workers[worker].append(campaign)
            if DEBUG:
                print self.workers

    @cherrypy.expose
    def video(self, campaign):
        choices = [k for k, v in self.videos[campaign].iteritems() if v > 0]
        if choices:
            video = random.choice(choices)
            self.videos[campaign][video] -= 1
            return video

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def answers(self):
        if cherrypy.request.method == 'OPTIONS':
            cherrypy.response.headers['Connection'] = 'keep-alive'
            cherrypy.response.headers['Access-Control-Max-Age'] = '1440'
            cherrypy.response.headers['Access-Control-Allow-Headers'] = 'Authorization,X-Auth-Token,Content-Type,Accept'
            return {}
        elif cherrypy.request.method == 'GET':
            # Make sure the user is authorized (HTTP digest authentication)
            try:
                cherrypy.lib.auth.digest_auth('dbserver.py', self.users)
            except cherrypy.HTTPError, e:
                cherrypy.serving.response.headers['Access-Control-Expose-Headers'] = 'Www-Authenticate'
                raise e

            return self.get_answers()
        elif cherrypy.request.method == 'POST':
            data = cherrypy.request.json
            print 'Received POST with data:', data

            # Check for required keys + check if the video exists
            error = None
            missing_keys = sorted([name for name, required in self.fields.iteritems() if required and name not in data])
            if missing_keys:
                error = 'missing required keys (%s)' % ', '.join(missing_keys)
            if 'video' in data and data['video'] not in self.videos[data['campaign']]:
                error = 'unknown video (%s)' % data['video']
            # Check if worker has already participated in this campaign
            if data['campaign'] in self.workers[data['worker']]:
                error = 'already participated in this campaign'
            if error:
                return {'error': error}

            # Add answer to database
            with sqlite3.connect(API.DATABASE) as con:
                data['timestamps'] = ','.join([str(ts) for ts in data['timestamps']])
                data['speeds'] = ','.join([str(ts) for ts in data['speeds']])
                keys, values = zip(*data.iteritems())
                keys += ('useragent',)
                values += (cherrypy.request.headers.get('User-Agent', None),)
                sql = 'INSERT INTO ' + self.table + '(' + ','.join(keys) + ') VALUES(' + ','.join(['?'] * len(keys)) + ')'
                cur = con.execute(sql, values)
                con.commit()

            # Mark worker
            self.workers[data['worker']].append(data['campaign'])

            # Generate and return Micoworkers VCODE
            return {'vcode': generate_key(data['campaign'], data['worker'], data['rand_key'], self.secret)}

    @cherrypy.expose
    def export(self):
        if cherrypy.request.method == 'OPTIONS':
            cherrypy.response.headers['Connection'] = 'keep-alive'
            cherrypy.response.headers['Access-Control-Max-Age'] = '1440'
            cherrypy.response.headers['Access-Control-Allow-Headers'] = 'Authorization,X-Auth-Token,Content-Type,Accept'
            return {}
        elif cherrypy.request.method == 'GET':
            # Make sure the user is authorized (HTTP digest authentication)
            try:
                cherrypy.lib.auth.digest_auth('dbserver.py', self.users)
            except cherrypy.HTTPError, e:
                cherrypy.serving.response.headers['Access-Control-Expose-Headers'] = 'Www-Authenticate'
                raise e

            # Export to Excel file
            wb = Workbook()
            ws = wb.active
            keys = sorted(self.fields.keys(), key=natural_keys)
            ws.append(keys)
            for a in self.get_answers():
                ws.append([a.get(k, '') for k in keys])
            cherrypy.response.headers['Content-Disposition'] = 'attachment; filename="export.xlsx"'
            file = StringIO()
            wb.save(file)
            return file.getvalue()

    def get_answers(self):
        # Get answers from database
        results = []
        with sqlite3.connect(API.DATABASE) as con:
            sql = 'SELECT * FROM ' + self.table
            cur = con.execute(sql)
            keys = [d[0] for d in cur.description]
            for row in cur.fetchall():
                results.append(dict(zip(keys, row)))
        return results

def main(argv):
    parser = argparse.ArgumentParser(description='Simple database server')

    try:
        parser.add_argument('-p', '--port', help='Listen port', required=True)
        parser.add_argument('-q', '--questions', help='URL of JSON-formatted questions', required=True)
        parser.add_argument('-v', '--videos', help='URL of video dir', required=True)
        parser.add_argument('-m', '--mw', help='Microworkers secret key', required=True)
        parser.add_argument('-u', '--users', help='Users that are allowed to get the answers (e.g. user1:pass1,user2:pass2)', required=True)
        parser.add_help = True
        args = parser.parse_args(sys.argv[1:])

    except argparse.ArgumentError:
        parser.print_help()
        sys.exit(2)

    def CORS():
        cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.tools.CORS = cherrypy.Tool('before_handler', CORS)

    questions = json.loads(requests.get(args.questions).text)
    users = dict([user.split(':') for user in args.users.split(',')])
    watch_count = {v: 25 for v in get_videos(args.videos)}

    api = API(questions, users, watch_count, args.mw)

    config = {'/': {'server.thread_pool': 1,
                    'tools.CORS.on': True,
                    'tools.sessions.on': True,
                    'tools.response_headers.on': True,
                    'tools.response_headers.headers': [('Content-Type', 'text/plain')]}}
    cherrypy.config.update({'server.socket_host': '0.0.0.0',
                            'server.socket_port': int(args.port)})
    cherrypy.quickstart(api, '/', config)


if __name__ == "__main__":
    main(sys.argv[1:])
