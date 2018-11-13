#! usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Description: Helper functions to load external redirect links

Author: ndesai (Nishkrit)
"""

import os

def slack_invite():
    """
    Returns a string containing the slack invite link. Takes
    no parameters.
    """
    with open("slack_link.lnk") as f:
        link = f.read();
        f.close()
    return link
