#! usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Description: Manages all the routes for the website

Author: ndesai (Nishkrit)
"""

import os

def slack_invite():
    with open("slack_link.lnk") as f:
        link = f.read();
        f.close()
    return link
