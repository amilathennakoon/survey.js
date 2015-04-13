import sys
import json
import sqlite3
import argparse
import cherrypy


class API(object):

    exposed = True
    DATABASE = 'answers.db'

    def __init__(self):
        self.table = 'answers'
        self.fields = ['q_%d' % i for i in range(33)]
        self.setup_database()

    def setup_database(self):
        with sqlite3.connect(API.DATABASE) as con:
            sql = 'CREATE TABLE IF NOT EXISTS %s (%s)' % (self.table, ', '.join(self.fields))
            con.execute(sql)

    @cherrypy.tools.json_in()
    def POST(self):
        data = cherrypy.request.json
        print 'POST', data

        with sqlite3.connect(API.DATABASE) as con:
            keys, values = zip(*data.iteritems())
            sql = 'INSERT INTO ' + self.table + '(' + ','.join(keys) + ') VALUES(' + ','.join(['?'] * len(keys)) + ')'
            cur = con.execute(sql, values)
            con.commit()
            return 'DUMMY_TOKEN'

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
    cherrypy.quickstart(API(), '/', config)


if __name__ == "__main__":
    main(sys.argv[1:])
