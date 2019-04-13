#!/usr/bin/env python
# -*- coding: utf-8 -*-


"""
Authour: Henry Zhuo

Date: Monday December 10 2018 9:46:21 pm -

Description: Processes the posts written in markdown, to escape html code examples,
    and render jinja functions into html
"""

from jinja2 import Environment, FileSystemLoader
from constants import FLATPAGES_ROOT, FLATPAGES_EXTENSION, POST_DIR

import os

import glob

PROCESSED_POSTS_FILE = "processedpostslist.txt"
POST_EXTENSION = ".md"
SEARCH_STRING = "{% include_"

#Open the log file to determine which files are already rendered
try:
    file = open(PROCESSED_POSTS_FILE, 'r+')
except:
    file = open(PROCESSED_POSTS_FILE, 'w')
    file.close()
    file = open(PROCESSED_POSTS_FILE, 'r+')


#Set up jinja Environment for rendering templates
env = Environment(loader=FileSystemLoader(''))

#Determine the path of the markdown templates
filename = "*"+POST_EXTENSION
path = os.path.join(FLATPAGES_ROOT, POST_DIR, filename)
EXTENSION_LENGTH = len(POST_EXTENSION)
#PATH_LENGTH = len(path) - len(filename)

#Determine which posts need to be converted based on processedpostslist.txt
#Generate a list for the post name and post modification timestamp
#Example entry:
#    content/posts/HelloExMachina.md
#    23409
#'content/posts/HelloExMachina.md' is the file name, including the path from the root of the app.
#'23409' is the time, in seconds, since the Unix epoch (without leap seconds)
#The list will be ['HelloExMachina.md', '23409', ... ]
log = []
for line in file:
    log.append(line.strip())

#Read the posts from the posts directory
for postpath in glob.iglob(path):
    postname = postpath.strip()
    #Only process posts that are not logged, or have been modified (checking whole seconds)
    file_mtime = int(os.path.getmtime(postname))
    if (postname not in log) or (log[log.index(postname)+1] != file_mtime):
        #Grab the post file
        post = open(postname, 'r')
        #Create a write buffer, for writing to the file all at once
        write_buffer = []
        #Cannot use jinja2.FileSystemLoader, because the markdown files may have jinja tags
        # that aren't meant to be tags. Could be a Flask tutorial with example code.
        # Therefore, the line should be rendered only if a valid tag is found
        #Read the file line by line
        for string in post:
            line = string.strip()
            #Determine if SEARCH_STRING is in line, and if so, replace it so Jinja can render it
            if SEARCH_STRING in line:
                #This will not be a native Jinja function. Must deconstruct it to one, using {% include '<loadtype>.html' %}
                #Example: {% include <loadtype>.html %}
                #Take only where SEARCH_STRING starts from, and findout where the parameter starts
                start_index = line.index(SEARCH_STRING)
                temp_line = line[start_index:]
                parameter_start_index = temp_line.index('(')
                #Create the Jinja include call
                function_call = temp_line[:10] + " \'" + os.path.join("templates", temp_line[11:parameter_start_index]) + ".html\' %}"
                #parameter is the filename, the second word in function_call is the loadtype for get_content()
                parameter = temp_line[parameter_start_index+1:temp_line.index(')')].strip()
                #Render jinja to turn {% include <loadtype>.html %} into the corresponding html
                #Use templates called <loadtype>.html, calling get_content('content/<loadtype>/<filename>')
                template = env.from_string(function_call)
                line_rendered = template.render(parameter=parameter)
                #Put the line into the write buffer
                write_buffer.append(line_rendered+"\n")
            else:
                #Put the line into the write buffer if there is nothing to be done
                write_buffer.append(line+"\n")
        #Write the processed file to a new file
        processed_post = open(os.path.join(postname[:-EXTENSION_LENGTH]+FLATPAGES_EXTENSION), 'w')
        processed_post.writelines(write_buffer)
        #Close the new, processed file
        processed_post.close()
        #Log the file to keep track of which files have been processed
        file.write(postname)
        file.write(str(file_mtime))

#Close the log file
file.close()
