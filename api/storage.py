#!/usr/bin/env python
import utils
import config
import pymongo
import logging
from twisted.internet.task import defer


def get_mongo():
    if get_mongo.value is None:
        get_mongo.value = pymongo.MongoClient(
            host=config.DB_HOST,
            port=config.DB_PORT)
    return get_mongo.value

get_mongo.value = None


def get_nearest_metro_station(coordinates):
    obj = get_mongo()[config.DB_NAME].\
        command('geoNear', 'MetroStations', near=coordinates,
                spherical=True, distanceMultiplier=6371, limit=1)['results'][0]
    coords = obj['obj']['location']['coordinates']
    coords.reverse()
    return {
        'name': obj['obj']['name'],
        'location': coords,
        'walkTime': float(obj['dis']) * 15
    }
