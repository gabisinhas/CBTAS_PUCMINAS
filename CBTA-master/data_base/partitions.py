from flask import session
import os
# test
ASSESSMENT = ' assessment'
SETTINGS = 'settings'


def get_partitions():
    """ This function defines the database partitions name """

    return {
        "settings": "settings",
        "assessment": "assessment",
    }
