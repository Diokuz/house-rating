#!/usr/bin/env python


def calc_rating(house_stats):
    factors = [
        # 1. is driving time to center of the city less than 30min?
        (house_stats['auto']['driveToCenterTime'] is not None \
            and house_stats['auto']['driveToCenterTime'] <= 30),
        # 2. is metro station reachable by feet in 15 minutes?
        (house_stats['transport']['nearestMetroStation']['walkTime'] <= 15),
        # 3. is the place free of the noise sources (in the radius of 0.5 km)?
        (len(house_stats['ecology']['noises']) == 0),
        # 4. are there green plants around (y/n)?
        (len(house_stats['ecology']['plants']) != 0),
        # 5. are there pharmacies around?
        (len(house_stats['commodities']['chemists']) != 0),
        # 6. are there food stores/supermarkets?
        (len(house_stats['commodities']['supermarkets']) != 0),
        # 7. are there any bank offices?
        (len(house_stats['commodities']['banks']) != 0)
    ]

    return 10.0 * sum(factors) / len(factors)
