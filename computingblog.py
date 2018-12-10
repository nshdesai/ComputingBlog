#! usr/bin/env python
# -*- coding: utf-8 -*-

"""
Description: Manages all the routes for the website

Author: ndesai (Nishkrit)
"""

from constants import *
from external_redirects import slack_invite
from process_posts import *

import sys
import os

from flask import Flask, render_template, send_from_directory, redirect, Markup
from flask_flatpages import FlatPages, pygments_style_defs
from flask_frozen import Freezer

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)


@app.route('/')
@app.route("/posts/")
def index():
    posts = process_articles(flatpages)
    return render_template('index.html', posts=posts)


@app.route('/posts/<name>/')
def post(name):
    path = '{}/{}'.format(POST_DIR, name)
    post = flatpages.get_or_404(path)
    return render_template('post.html', post=post)


@app.route('/about')
def about():
    post = get_about_post(flatpages)
    return render_template('about.html', post=post)


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                            'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/content/notebooks/<path:filename>')
def get_notebook(filename):
    return send_from_directory(os.path.join(app.root_path, 'content/notebooks'), filename)


@app.route('/pygments.css')
def pygments_css():
    return pygments_style_defs('tango'), 200, {'Content-Type': 'text/css'}


@app.route('/slack')
def slack_link():
    link = slack_invite()
    return redirect(link)


@app.route('/content/images/<path:filename>')
def get_banner_image(filename):
    return send_from_directory(MEDIA_DIRECTORY, filename)


if __name__ == "__main__":
    if PRODUCTION:
        app.run(ssl_context='adhoc')
    else:
        app.run(debug=DEBUG)
        