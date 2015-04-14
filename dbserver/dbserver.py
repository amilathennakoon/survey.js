import sys
import json
import random
import sqlite3
import hashlib
import argparse
import cherrypy


class API(object):

    exposed = True
    DATABASE = 'answers.db'
    SECRET = 'microworkers_secret_key'

    def __init__(self):
        self.table = 'answers'
        # {name: required}
        self.fields = {'q_%d' % i: i not in [1, 8, 19, 20, 21, 22, 23, 25, 32] for i in range(33)}
        self.videos = {'url1': 5, 'url2': 5}
        self.setup_database()

    def setup_database(self):
        with sqlite3.connect(API.DATABASE) as con:
            sql = 'CREATE TABLE IF NOT EXISTS %s (%s)' % (self.table, ', '.join(self.fields))
            con.execute(sql)

    def GET(self, worker=None, campaign=None):
        if worker and campaign:
            choices = [k for k, v in self.videos.iteritems() if v > 0]
            if choices:
                video_url = random.choice(choices)
                self.videos[video_url] -= 1

                cherrypy.session['worker'] = worker
                cherrypy.session['campaign'] = campaign
                cherrypy.session['video'] = video_url

                return video_url

    @cherrypy.tools.json_in()
    def POST(self):
        data = cherrypy.request.json
        print 'POST', data

        if 'worker' in cherrypy.session and 'campaign' in cherrypy.session:
            with sqlite3.connect(API.DATABASE) as con:
                keys, values = zip(*data.iteritems())
                sql = 'INSERT INTO ' + self.table + '(' + ','.join(keys) + ') VALUES(' + ','.join(['?'] * len(keys)) + ')'
                cur = con.execute(sql, values)
                con.commit()

                # Generate and return Micoworkers VCODE
                sha = hashlib.sha256()
                sha.update(cherrypy.session['worker'] + cherrypy.session['campaign'] + API.SECRET)
                return 'mw-' + m.digest().encode('hex')

    def OPTIONS(self):
        cherrypy.response.headers['Connection'] = 'keep-alive'
        cherrypy.response.headers['Access-Control-Max-Age'] = '1440'
        cherrypy.response.headers['Access-Control-Allow-Headers'] = 'X-Auth-Token,Content-Type,Accept'
        return {}


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
                    'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
                    'tools.sessions.on': True,
                    'tools.response_headers.on': True,
                    'tools.response_headers.headers': [('Content-Type', 'text/plain')]}}
    cherrypy.config.update({'server.socket_host': '0.0.0.0',
                            'server.socket_port': int(args.port)})
    cherrypy.quickstart(API(), '/session', config)


if __name__ == "__main__":
    main(sys.argv[1:])
