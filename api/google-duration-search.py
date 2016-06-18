#!/usr/bin/env python
# -*- coding: utf8 -*-
# Example of interaction with Google Duration Matrix API
import googlemaps
import time

API_KEY = 'AIzaSyB0KVY2nwwKeAPJNpRPxD63CNoE-Ii9D1s'

gm = googlemaps.Client(key=API_KEY)
geocode = gm.geocode('Москва')
print geocode

"""
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Курская')
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Курская', mode='driving')
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Курская', mode='walking')
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Курская', mode='bicycling')
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Курская', mode='walking')
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Курская|метро Охотный Ряд', mode='walking')

For public transport:
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='метро Коломенская',
    mode='transit')

gm.distance_matrix(origins='55.759756,37.664875',
    destinations='Третье транспортное кольцо', mode='driving')
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='МКАД Москва', mode='driving')

duration_in_traffic:
gm.distance_matrix(origins='55.759756,37.664875', destinations='МКАД Москва',
    mode='driving', departure_time=1466235514)
gm.distance_matrix(origins='55.759756,37.664875',
    destinations='МКАД Москва|3-е кольцо|Садовое кольцо', mode='driving',
    departure_time=1466235514)
"""

print gm.distance_matrix(
    origins='55.759756,37.664875',
    destinations='МКАД Москва|3-е кольцо|Садовое кольцо Москва',
    mode='driving',
    departure_time=int(time.time()))
