#! usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Description: Helper functions to load external redirect links

Author: ndesai (Nishkrit)
"""

from constants import PRODUCTION

import os

def slack_invite():
    """
    Returns a string containing the slack invite link. Takes
    no parameters.
    """
    if PRODUCTION:
        return os.environ['SLACK_INVITE_LINK']
    else:
        with open("slack_link.lnk") as f:
            link = f.read();
            f.close()
        return link
