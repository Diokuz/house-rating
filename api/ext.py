#!/usr/bin/env python
# -*- coding: utf8 -*-
#
# This module contains functions used to query external services
#

import rating
import storage
import config
import utils

import googlemaps
import requests
import logging
import re


def get_googlemaps_client():
    if get_googlemaps_client.value is None:
        get_googlemaps_client.value = \
            googlemaps.Client(key=config.GOOGLE_API_KEY)
    return get_googlemaps_client.value

get_googlemaps_client.value = None


def get_transit_time_to_center(departure_point):
    """
        Query the time needed to get to departure_point by public transport
        Source: Google Maps
    """
    gm = get_googlemaps_client()
    duration_data = gm.distance_matrix(
        origins=departure_point,
        destinations='ст. м. Библиотека им. Ленина',
        mode='transit')

    ret = {
        'timeToCenter': None,
    }

    try:
        if duration_data['status'] == 'OK':
            ret['timeToCenter'] = \
                duration_data['rows'][0]['elements'][0]['duration']['value'] / 60
    except:
        pass

    return ret


def get_drive_time_to_center(departure_point):
    """
        Query the time needed to get to departure_point by car
        Source: Google Maps
    """
    gm = get_googlemaps_client()
    duration_data = gm.distance_matrix(
        origins=departure_point,
        destinations='3-е кольцо Москва',
        mode='driving',
        departure_time=utils.get_next_rush_hour_timestamp())

    ret = {
        'driveToCenterTime': None,
        'driveToCenterInTraffic': None
    }

    try:
        if duration_data['status'] == 'OK':
            ret['driveToCenterTime'] = \
                duration_data['rows'][0]['elements'][0]['duration']['value'] / 60
            ret['driveToCenterInTraffic'] = \
                duration_data['rows'][0]['elements'][0]['duration_in_traffic']['value'] / 60
    except:
        pass

    return ret


def load_commodities(coordinates):
    ret = {
        "chemists": [],
        "restaurants": [],
        "supermarkets": [],
        "banks": [],
    }

    try:
        data = requests.get(
            'http://catalog.api.2gis.ru/2.0/catalog/branch/list',
            dict(key=config.DOUBLEGIS_API_KEY,
                 rubric_id='4503719886455157,4503719886455134,4503719886454945,' +
                           '4503719886454948,4503719886454991,4503719886455276',
                 region_id=32, sort='distance',
                 point=(str(coordinates[0]) + ',' + str(coordinates[1])),
                 radius=500, fields='items.rubrics')).json()

        aliases = dict(
            prodovolstvennye_magaziny='supermarkets',
            supermarkety='supermarkets',
            kafe='restaurants',
            restorany='restaurants',
            apteki='chemists',
            banki='banks')

        if data['meta']['code'] == 200:
            for obj in data['result']['items']:
                for r in obj['rubrics']:
                    if r['alias'] in aliases:
                        ret[aliases[r['alias']]].append({
                                'name': obj['name'],
                                'address': obj['address_name']})
    except Exception as e:
        logging.warn('Caugh exception: ' + str(e))
        raise
    finally:
        return ret


def get_house_info_by_id(lat, lng):
    """
        Gets all the info needed in our service.
        Input: latitude, longitude of the building.
        Sources: 2GIS, Google Maps, and our own awesome dataset.
    """
    def get_coords(centroid_str):
        values = re.split('POINT\((\d+\.\d+)\ +(\d+\.\d+)\)', centroid_str)
        return [float(values[2]), float(values[1])]

    ret = {}
    assert(type(lat) is float)
    assert(type(lng) is float)
    # data = requests.get('http://catalog.api.2gis.ru/geo/get',
    #                    {'key': config.DOUBLEGIS_API_KEY,
    #                     'id': id,
    #                     'version': '1.3'}).json()

    # if data['response_code'] != '200':
    #    raise Exception('Could not fetch house info by id: ' +
    #                    str(data))

    # ret['address'] = data['result'][0]['name']
    # ret['coords'] = get_coords(data['result'][0]['centroid'])

    strcoords = str(lat) + ',' + str(lng)

    ret['auto'] = get_drive_time_to_center(strcoords)
    ret['transport'] = get_transit_time_to_center(strcoords)

    coords_reversed = [lng, lat]

    stations_info = storage.get_nearest_metro_stations(coords_reversed)
    ret['transport']['nearestMetroStations'] = map(
        lambda st: {'name': st['name'],
                    'location': st['location'],
                    'distance': st['distance'],
                    'walkTime': st['walkTime']},
        stations_info)
    ret['apartments'] = stations_info[0]['prices']

    ret['transport']['nearestBusStop'] = \
        storage.get_nearest_bus_stop(coords_reversed)

    ret['education'] = {
        'schoolsNearby': storage.get_schools_nearby(coords_reversed)
    }

    ret['commodities'] = load_commodities(coords_reversed)
    ret['ecology'] = storage.get_ecology(coords_reversed)

    # finally.
    ret['rating'] = rating.calc_rating(ret)
    return ret


if __name__ == '__main__':
    print get_house_info_by_id(55.6857003161, -37.5824186087)
