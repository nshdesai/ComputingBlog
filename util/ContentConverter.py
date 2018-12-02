#! usr/bin/env python
# -*- coding: utf-8 -*-

"""
Manages type checking for embeddings withing posts

Author: ndesai (Nishkrit)
"""

import os

from werkzeug.routing import BaseConverter


class ContentConverter(BaseConverter):
    """Handles type checking for files within the content directory"""

    def to_python(self, value):
        if value in self.get_contents():
            return value

    def to_url(self, value):
        return BaseConverter.to_url(value)

    def get_contents(self):
        return next(os.walk('content'))[1]