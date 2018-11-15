title: Making your first website with Flask
subtitle: How hard could it be to make a website with Python?
date: 2018-11-05
author: Eric Zhang
image: post-bg.jpg

### Setting up your environment
----
Does not mean close all windows and wear a black hoodie. We are talking about
your computer environment.
Check out this [link](http://timmyreilly.azurewebsites.net/python-flask-windows-development-environment-setup/) to set up all the tools you will need for this tutorial (If you are using Windows)

Now that your environment is set up. We can begin to write code.

### Getting Started
----

First, you must create a directory that will contain all of your files for the website. This ensures that your other files will not interfere.
Inside your directory, you will need to create another one named `templates`, which contains all of your html

An example of an index html can look like this:

    <html>
        <body>
          <header>
            <div class="containter">
                <h1 class="logo">Your First Website</h1>
                <strong><nav>
                  <ul class="menu">
                    <li><a href="{{ url_for('home') }}">Home</a></li>
                  </ul>
                </nav></strong>
            </div>
          </header>
          <div class="container">
              {% block content %}
              {% endblock %}
          </div>
        </body>
    </html>

### Writing the Driver Code
----

The `{%  %}` indicates that there are parameters passed in there. This is a simple template for our navigating system where the middle section will be replaced with different html blocks depending on the URL that the user chose.
An example of how to tell the html that you are continuing from the index html is the following:

    {% extends "index.html" %}
    {% block content %}
      <div class="home">
       <h1>My home page</h1>
       <p>These middle sections can always change</p>
      </div>
    {% endblock %}

the `{% extends %}` basically tells it to pass into the index html, and the ``{% block content %}`` and the `{% endblock %}` indicates the part that will be passed on.
After creating all the html for you website, you must be wondering "How do I get it working?". This is where flask comes in. Outside of the template directory, create a python file that will create the website for you. In this case, I will call it `app.py`.
A simple website can have it look something like this:

    from flask import Flask, render_template
    app = Flask(__name__)
    @app.route('/')
    def index()
        return render_template('index.html')
    if __name__ = '__main__':
        app.run(debug=True)

It is very important that you _do not_ import **EVERYTHING** from flask, as it is a very big library. The third line tells Flask where to look for templates, static files, and so on. The `@app.route` is a decorator, which allows you to actually implement the html.
You can do a lot of neat things with html, flask and css. This is only the tip of the iceberg.
