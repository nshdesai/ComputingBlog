#! usr/bin/env python
# -*- coding: utf-8 -*-

"""
Description: Helps retrieve and format all posts

Author: ndesai (Nishkrit)
"""


from constants import *


def process_articles(flatpages):
    """
    Process all the regular post articles and returns a list of flatpages
    objects. Takes in the flatpages app as a parameter
    """
    posts = [p for p in flatpages if p.path.startswith(POST_DIR) and not p.path.endswith(ABOUT_POST_PATH)]
    posts.sort(key=lambda item: item['date'], reverse=True)

    return posts


def get_about_post(flatpages):
    """
    Returns a flatpages object of the about post. Takes in the flatpages app
    as a parameter
    """
    about_post = [p for p in flatpages if p.path.endswith(ABOUT_POST_PATH)]
    return about_post[0]
