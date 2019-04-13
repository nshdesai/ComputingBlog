title: Making your first website with Flask
subtitle: How hard could it be to make a website with Python?
date: 2018-11-05
author: Nishkrit Desai, Eric Zhang
image: post-bg.jpg

### Setting up your environment
----
Does not mean close all windows and wear a black hoodie. We are talking about
your computer environment.
Check out this [link](http://timmyreilly.azurewebsites.net/python-flask-windows-development-environment-setup/) to set up all the tools you will need for this tutorial (If you are using Windows)

Now that your environment is set up. We can begin to write code.

Here are some things you'll need:

* A Text Editor
* A Working version of Python (Preferrably 3.x)

Once you have these things set up you can go ahead install flask using `pip` (or your preferred python package manager).
We will not go into how to install flask here, but [Google](www.google.com) should be able help you out. 

### Getting Started
----

You can think of Flask as a template-spitting-out machine (for simplicity). All Flask does is, it takes HTML templates
that could be used as, well templates, for a family of web pages, and it parses in the content into these templates and spits it out
as a web page. To give flask these magical powers we must organise our files in a particular way...

First, you must create a directory that will contain all of your files for the website. This ensures that your other files will not interfere.
Inside your directory, you will need to create another one named `templates`, which contains all of your html

An example of an index html can look like this:

<pre>
    &lt;html&gt;
    &lt;body&gt;
      &lt;header&gt;
        &lt;div class="containter"&gt;
            &lt;h1 class="logo"&gt;Your First Website&lt;/h1&gt;
            &lt;strong&gt;&lt;nav&gt;
              &lt;ul class="menu"&gt;
                &lt;li&gt;&lt;a href="{{ url_for('home') }}"&gt;Home&lt;/a&gt;&lt;/li&gt;
              &lt;/ul&gt;
            &lt;/nav&gt;&lt;/strong&gt;
        &lt;/div&gt;
      &lt;/header&gt;
      &lt;div class="container"&gt;
          {% block content %}
          {% endblock %}
      &lt;/div&gt;
    &lt;/body&gt;
    &lt;/html&gt;
</pre>

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

the `{% extends %}` basically tells it to pass into the index html, and the `{% block content %}` and the `{% endblock %}` indicates the part that will be passed on.

After creating all the html for you website, you must be wondering "How do I get it working?". This is where flask comes in.
Outside of the template directory, create a python file that will create the website for you. In this case, I will call it `app.py`.

A simple website can have it look something like this:

    from flask import Flask, render_template

    app = Flask(__name__)

    @app.route('/')
    def index()
        return render_template('index.html')

    if __name__ = '__main__':
        app.run(debug=True)

The third line tells Flask where to look for templates, static files, and so on. The `@app.route` is a decorator, which allows you to actually implement the html.
You can do a lot of neat things with html, flask and css. This is only the tip of the iceberg.

### A note about wildcard imports

Eric:
> It is very important that you _do not_ import **everything** from flask, as it is a very big library.

Nish:
> Well...Python is actually smart enough to *not* import everything from flask with a wildcard import, however it is always better to avoid it


**Fun Fact** : This website is _also_ built with bare bones `Flask`