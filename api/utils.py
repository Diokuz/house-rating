#!/usr/bin/env python
import config
import datetime
import time


class ConfigException(Exception):
    pass


class DatabaseException(Exception):
    pass


def check_config():
    """
    Checks all variables in config.py.
    Existence and correct type are being checked.
    You should run this method once at the starting point
    """
    config_vars = {
        'DB_HOST': str,
        'DB_PORT': int,
        'DB_NAME': str,
        'DB_COLLECTION': str,
        'DB_RETRY_COUNT': int,
        'DB_TIMEOUT': int,
        'DEBUG': bool,
        'GOOGLE_API_KEY': str
    }

    def check_config_var(var_name, var_type):
        """
        Checks if 'var_name' exists inside config module
        and is an instance of var_type
        """
        try:
            if not (('DB_HOST' in dir(config)) and
                    (type(getattr(config, var_name)) is var_type)):
                raise ConfigException(
                    var_name + ' must be ' + var_type.__name__)
        except AttributeError:
            raise ConfigException(var_name + ' is not present')

    for var, var_type in config_vars.iteritems():
        check_config_var(var, var_type)


def check_coords(latitude, longitude):
    if latitude < -90.0 or latitude > 90.0:
        raise ValueError('Latitude value is expected to be from -90 to 90')
    if longitude < -180.0 or longitude > 180.0:
        raise ValueError('Longitude value is expected to be from -90 to 90')


def get_next_rush_hour_timestamp():
    """ Returns timestamp of next monday's 9:00AM
    """
    dt = time.gmtime()
    days_ahead = 7 - dt.tm_wday
    hours_ahead = 9 - dt.tm_hour
    mins_ahead = -dt.tm_min
    return int(time.mktime(dt) + (days_ahead * 86400) +
               hours_ahead * 3600 + mins_ahead * 60)
