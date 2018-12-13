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

#Open the file to determine which files are already rendered
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
#    content/posts/HelloExMachina.md 23409
#'content/posts/HelloExMachina.md' is the file name, including the path from the root of the app.
#'23409' is the time, in seconds, since the Unix epoch (without leap seconds)
#The list will be ['HelloExMachina.md', '23409', ... ]
log = []
for line in file:
    break_point = line.index(FLATPAGES_EXTENSION)+EXTENSION_LENGTH+1
    name = line[:break_point]
    timestamp = line[break_point:]
    log.extend((name, timestamp))

#Read the posts from the posts directory
for postname in glob.iglob(path):
    print(postname)
    #Only process posts that are not logged, or have been modified (checking whole seconds)
    file_mtime = int(os.path.getmtime(postname))
    if not(postname in log) or (log[log.index(postname)+1] != file_mtime):
        #Grab the post file
        post = open(postname, 'r')
        #Create a write buffer, for writing to the file all at once
        write_buffer = []
        #Read the file line by line
        #Cannot use jinja2.FileSystemLoader, because the markdown files may have jinja tags
        # that aren't meant to be tags. Could be a Flask tutorial with example code.
        # Therefore, the line should be rendered only if a valid tag is found
        #Escape html example code
        for string in post:
            line = string.strip()
            print(line)
            #if line[0] == "\t" or line[0:3] == "    ":
            #    pass
            #Check if it is in line rather than beginning,
            # cause then it would mean that the authour wants it inline
            if "{% include" in line:
                #This will not be a native Jinja function. Must deconstruct it to one, using "include"
                #Example: {% include <loadtype>.html %}
                parameter_index = line.index('(')
                function_call = line[:10] + " " + loadtype + " %}"
                #parameter is the filename, the second word in function_call is the loadtype for get_content()
                parameter = line[parameter_index+1:line.index(')')]
                #Render jinja
                template = env.from_string(line, parameter=parameter)
                #template = env.from_string(post.read())
                line_rendered = template.render()
                #Use templates called <loadtype>.html, calling get_content('content/<loadtype>/<filename>')
                print(line_rendered)
                write_buffer.append(line_rendered+"\n")
            else:
                write_buffer.append(line+"\n")
        #Write the processed file to a new file
        processed_post = open(os.path.join(postname[:-EXTENSION_LENGTH]+FLATPAGES_EXTENSION), 'w')
        processed_post.writelines(write_buffer)
        #Close the new, processed file
        processed_post.close()
        #Log the file to keep track of which files have been processed
        file.write(postname+" "+str(file_mtime))

#Close the log file
file.close()
