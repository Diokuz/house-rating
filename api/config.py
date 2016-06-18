#!/usr/bin/env python

###
# This config contains several variables
# that are essential for operation of whole service.
# Please feel free to modify them so they fit your configuration.
###

DB_HOST = 'localhost'
DB_PORT = 27017
DB_NAME = 'taxi'
DB_COLLECTION = 'cars'
DB_TIMEOUT = 5
DB_RETRY_COUNT = 3

SERVER_PORT = 8080

DEBUG = True