#!/usr/bin/env python

import config
import ext

from twisted.web.server import Site
from twisted.web.resource import Resource
from twisted.internet import reactor

import json


def make_error_message(reason):
    return json.dumps({'status': 'error', 'error_msg': reason})


class GetRating(Resource):
    def render_GET(self, request):

        try:
            house_id = int(request.args['id'][0])
            print 'get rating for house #' + str(house_id)

            request.setHeader('Access-Control-Allow-Origin', '*')
            request.setHeader('Content-Type', 'application/json; charset=UTF-8')

            return json.dumps(ext.get_house_info_by_id(house_id))
            # unused:
            # latitude = float(request.args['latitude'][0])
            # longitude = float(request.args['longitude'][0])

        except ValueError as e:
            print e
            request.setResponseCode(400)
            return make_error_message('GET argument "id" must be integer')
        except KeyError:
            request.setResponseCode(400)
            return make_error_message('GET argument "id" is required')

        return open('mockdata.json').read()


def run():
    root = Resource()
    root.putChild("rating", GetRating())

    factory = Site(root)
    reactor.listenTCP(config.SERVER_PORT, factory)
    reactor.run()
