import sys
import json
import random
import sqlite3
import hashlib
import argparse
import cherrypy


class API(object):

    DATABASE = 'answers.db'
    SECRET = 'microworkers_secret_key'

    def __init__(self):
        self.table = 'answers'
        # {name: required}
        self.fields = {'q_%d' % i: i not in [1, 8, 19, 20, 21, 22, 23, 24, 31] for i in range(1, 32)}
        self.fields.update({'useragent': False, 'timestamps': True, 'worker': True, 'campaign': True, 'res': True, 'video': True})
        self.videos = {'movie01.mp4': 2, 'movie02.mp4': 2, 'DoeEvenNormaal26-aug-2014.mp4': 2, 'big_buck_bunny_480p_h264.mp4': 2, 'BigBuckBunny_320x180.mp4': 2}
        self.setup_database()

    def setup_database(self):
        with sqlite3.connect(API.DATABASE) as con:
            sql = 'CREATE TABLE IF NOT EXISTS %s (%s)' % (self.table, ', '.join(self.fields))
            con.execute(sql)

            sql = 'SELECT video, count(video) FROM %s GROUP BY video' % self.table
            cur = con.execute(sql)
            for video, count in cur.fetchall():
                if video in self.videos:
                    self.videos[video] -= count
            print self.videos

    @cherrypy.expose
    def video(self):
        choices = [k for k, v in self.videos.iteritems() if v > 0]
        if choices:
            video_url = random.choice(choices)
            return video_url

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def answers(self):
        if cherrypy.request.method == 'OPTIONS':
            cherrypy.response.headers['Connection'] = 'keep-alive'
            cherrypy.response.headers['Access-Control-Max-Age'] = '1440'
            cherrypy.response.headers['Access-Control-Allow-Headers'] = 'X-Auth-Token,Content-Type,Accept'
            return {}

        data = cherrypy.request.json
        print 'Received POST with data:', data

        # Check for required keys + check if the video exists
        error = None
        missing_keys = sorted([name for name, required in self.fields.iteritems() if required and name not in data])
        if missing_keys:
            error = 'missing required keys (%s)' % ', '.join(missing_keys)
        if data['video'] not in self.videos:
            error = 'unknown video (%s)' % data['video']
        if error:
            return {'error': error}

        # Add info to database
        with sqlite3.connect(API.DATABASE) as con:
            data['timestamps'] = ','.join([str(ts) for ts in data['timestamps']])
            keys, values = zip(*data.iteritems())
            keys += ('useragent',)
            values += (cherrypy.request.headers.get('User-Agent', None),)
            sql = 'INSERT INTO ' + self.table + '(' + ','.join(keys) + ') VALUES(' + ','.join(['?'] * len(keys)) + ')'
            cur = con.execute(sql, values)
            con.commit()

        # Mark video
        self.videos[data['video']] -= 1

        # Generate and return Micoworkers VCODE
        sha = hashlib.sha256()
        sha.update(data['worker'] + data['campaign'] + API.SECRET)
        return {'vcode': 'mw-' + sha.digest().encode('hex')}


def main(argv):
    parser = argparse.ArgumentParser(description='Simple database server')

    try:
        parser.add_argument('-p', '--port', help='Listen port', required=True)
        parser.add_help = True
        args = parser.parse_args(sys.argv[1:])

    except argparse.ArgumentError:
        parser.print_help()
        sys.exit(2)

    def CORS():
        cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.tools.CORS = cherrypy.Tool('before_handler', CORS)

    config = {'/': {'server.thread_pool': 1,
                    'tools.CORS.on': True,
                    'tools.sessions.on': True,
                    'tools.response_headers.on': True,
                    'tools.response_headers.headers': [('Content-Type', 'text/plain')]}}
    cherrypy.config.update({'server.socket_host': '0.0.0.0',
                            'server.socket_port': int(args.port)})
    cherrypy.quickstart(API(), '/', config)


if __name__ == "__main__":
    main(sys.argv[1:])
