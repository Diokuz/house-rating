#!/usr/bin/env python
# -*- coding: utf8 -*-

import config
import utils
import googlemaps
import requests
import re


def get_googlemaps_client():
    if get_googlemaps_client.value is None:
        get_googlemaps_client.value = \
            googlemaps.Client(key=config.GOOGLE_API_KEY)
    return get_googlemaps_client.value

get_googlemaps_client.value = None


def get_transit_time_to_center(departure_point):
    gm = get_googlemaps_client()
    duration_data = gm.distance_matrix(
        origins=departure_point,
        destinations='ст. м. Библиотека им. Ленина',
        mode='transit')

    ret = {
        'timeToCenter': None,
    }

    if duration_data['status'] == 'OK':
        ret['timeToCenter'] = \
            duration_data['rows'][0]['elements'][0]['duration']['value'] / 60

    return ret


def get_drive_time_to_center(departure_point):
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

    if duration_data['status'] == 'OK':
        ret['driveToCenterTime'] = \
            duration_data['rows'][0]['elements'][0]['duration']['value'] / 60
        ret['driveToCenterInTraffic'] = \
            duration_data['rows'][0]['elements'][0]['duration_in_traffic']['value'] / 60

    return ret


def get_house_info_by_id(id):
    def get_coords(centroid_str):
        values = re.split('POINT\((\d+\.\d+)\ +(\d+\.\d+)\)', centroid_str)
        return [float(values[2]), float(values[1])]

    ret = {}
    assert(type(id) == int)
    data = requests.get('http://catalog.api.2gis.ru/geo/get',
                        {'key': config.DOUBLEGIS_API_KEY,
                         'id': id,
                         'version': '1.3'}).json()

    if data['response_code'] != '200':
        raise Exception('Could not fetch house info by id: ' +
                        data['error']['message'])

    ret['address'] = data['result'][0]['name']
    ret['coords'] = get_coords(data['result'][0]['centroid'])

    strcoords = str(ret['coords'][0]) + ',' + str(ret['coords'][1])

    ret['auto'] = {
        'details': get_drive_time_to_center(strcoords)
    }

    ret['transport'] = {
        'details': get_transit_time_to_center(strcoords)
    }

    return ret


if __name__ == '__main__':
    print get_house_info_by_id(4504235282688248)
