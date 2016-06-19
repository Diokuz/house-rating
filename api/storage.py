#!/usr/bin/env python
# -*- coding: utf8 -*-
#
# Functions that retrieve certain data from our awesome internal DB
#

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


def get_nearest_metro_stations(coordinates):
    objects = get_mongo()[config.DB_NAME].\
        command('geoNear', 'MetroStations', near=coordinates,
                spherical=True, distanceMultiplier=6371, limit=2)['results']
    stations = []
    for obj in objects:
        coords = obj['obj']['location']['coordinates']
        coords.reverse()
        stations.append({
            'name': obj['obj']['name'],
            'location': coords,
            'distance': round(float(obj['dis']), 1),
            'walkTime': int(float(obj['dis']) * 15),
            'prices': {
                'rent': obj['obj']['price']['rent'],
                'purchase': obj['obj']['price']['cost']
            }
        })
    print stations
    return stations


def get_nearest_bus_stop(coordinates):
    obj = get_mongo()[config.DB_NAME].\
        command('geoNear', 'TransportStations', near=coordinates,
                spherical=True, distanceMultiplier=6371, limit=1)['results'][0]
    coords = obj['obj']['location']['coordinates']
    coords.reverse()
    return {
        'location': coords,
        'walkTime': int(float(obj['dis']) * 15),
        'name': obj['obj']['name']
    }


def get_schools_nearby(coordinates):
    objs = get_mongo()[config.DB_NAME]['Schools'].\
            find({
                'location': {
                    '$nearSphere': {
                        '$geometry': {
                            'type': 'Point',
                            'coordinates': coordinates},
                        '$maxDistance': 1000}}})
    ret = []
    for obj in objs:
        coords = obj['location']['coordinates']
        coords.reverse()
        ret.append({
            'location': coords,
            'statistics': obj['statistics'],
            'name': obj['name']
        })
    return ret


def get_ecology(coordinates):
    ret = {}

    objs = get_mongo()[config.DB_NAME].\
        command('geoNear', 'GreenPlants', near=coordinates,
                spherical=True, distanceMultiplier=6371, limit=1)['results'][0]

    print objs
    plants = []
    obj = objs['obj']
    coords = obj['location']['coordinates']
    coords.reverse()
    plants.append({
        'location': coords,
        'district': obj['district'],
        'plantQuality': round(obj['plantQuality'] / max(1, objs['dis']), 1)
    })
    ret['plants'] = plants

    objs = get_mongo()[config.DB_NAME]['Noises'].\
        find({'location': {
                '$nearSphere': {
                    '$geometry': {
                        'type': 'Point',
                        'coordinates': coordinates},
                    '$maxDistance': 1000}}})
    noises = []
    for obj in objs:
        coords = obj['location']['coordinates']
        coords.reverse()
        noises.append({
            'location': coords,
            'reason': obj['noise']
        })
    ret['noises'] = noises

    return ret
