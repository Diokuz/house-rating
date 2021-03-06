#!/usr/bin/env python
# -*- coding: utf8 -*-

import config
import ext

from twisted.web import static
from twisted.web.server import Site
from twisted.web.resource import Resource
from twisted.internet import reactor

import json
import sys
import math


def make_error_message(reason):
    return json.dumps({'status': 'error', 'error_msg': reason})


class GetRating(Resource):
    def render_GET(self, request):

        try:
            latitude = float(request.args['lat'][0])
            longitude = float(request.args['lng'][0])

            if math.isnan(latitude) or math.isnan(longitude):
                raise ValueError('Thou shall not pass!')

            print 'get rating for {},{}'.format(latitude, longitude)

            request.setHeader('Access-Control-Allow-Origin', '*')
            request.setHeader('Content-Type', 'application/json; charset=UTF-8')

            return bytes(json.dumps(ext.get_house_info_by_id(latitude, longitude),
                                    ensure_ascii=False, encoding='utf8'))
            # unused:

        except ValueError as e:
            print e
            request.setResponseCode(400)
            return make_error_message('GET arguments "lat" and "lng" must be floats (not NaNs!)')
        except KeyError as e:
            request.setResponseCode(400)
            return make_error_message(str(e))
        except:
            request.setResponseCode(500)
            return make_error_message('Internal server error')


class Homepage(Resource):
    isLeaf = False

    def getChild(self, name, request):
        if name == '':
            return self
        return Resource.getChild(self, name, request)

    def render_GET(self, request):
        return open('../views/index.htm', 'r').read()


def run():
    reload(sys)
    sys.setdefaultencoding('utf-8')

    root = Homepage()
    root.putChild("static", static.File('../static'))
    root.putChild("rating", GetRating())

    factory = Site(root)
    reactor.listenTCP(config.SERVER_PORT, factory)
    reactor.run()
