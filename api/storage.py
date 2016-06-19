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
        'station': {
            'name': obj['obj']['name'],
            'location': coords,
            'walkTime': int(float(obj['dis']) * 15)
        },
        'prices': {
            'rent': obj['obj']['price']['rent'],
            'purchase': obj['obj']['price']['cost']
        }
    }


def get_nearest_bus_stop(coordinates):
    obj = get_mongo()[config.DB_NAME].\
        command('geoNear', 'TransportStations', near=coordinates,
                spherical=True, distanceMultiplier=6371, limit=1)['results'][0]
    coords = obj['obj']['location']['coordinates']
    coords.reverse()
    return {
        'location': coords,
        'walkTime': int(float(obj['dis']) * 15)
    }


def get_schools_nearby(coordinates):
    objs = get_mongo()[config.DB_NAME]['Schools'].\
            find({
                'location': {
                    '$nearSphere': {
                        '$geometry': {
                            'type': 'Point',
                            'coordinates': coordinates
                        },
                        '$maxDistance': 2000
                    }
                }
            })

    ret = []
    for obj in objs:
        print obj
        coords = obj['location']['coordinates']
        coords.reverse()
        ret.append({
            'location': coords,
            'statistics': obj['statistics'],
            'name': obj['name']
        })
    return ret


if __name__ == '__main__':
    # test
    print json.dumps(get_nearest_metro_station([10, 20]), encoding='utf-8')
