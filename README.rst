Browsing Activity Tracker
=========================

This extension provides a flexible way to log your browsing activity. In
particular, it allows you to track how much time you spend on websites. The
approach is minimalistic and give you direct access to the raw browsing data
that you can then analyze and aggregate to your taste.

In contrast, other extensions with the same purpose often require that you
create an account on their website and store your browsing data. Furthermore,
they only give you access to an automatically generated report with very little
control over how it is produced.

Installation
++++++++++++

The extension is available both as a Firefox add-on and as a Chrome extension:

* Install__ from the Firefox Add-Ons Website
* Install__ from the Chrome Web Store

To install directly from the source, refer to the README files in the
respective subfolders.

__ https://addons.mozilla.org/en-US/firefox/addon/browsing-activity-tracker/
__ https://chrome.google.com/webstore/detail/browsing-activity-tracker/maialhkckkpdbhimboiimgdgmhlianje

How does it work?
+++++++++++++++++

The extension notifies a callback URL by sending an HTTP POST request whenever
one the following events occur:

* a browser window is activated (gains focus)
* a tab is activated
* a webpage is loaded (when you follow a link, or navigate through your
  history)
* a browser window is deactivated (loses focus)

The body of the POST request is a JSON object containing the following keys:

===========  ===========
Key Name     Description
===========  ===========
``title``    Title of the webpage (typically the content of the ``<title>`` tag)
``url``      URL of the webpage
``time``     Time at which the event occurred. Number of milliseconds elapsed
             since 1 January 1970 00:00:00 UTC
``key``      A key identifying the browser sending the request
``favicon``  The URL of the webpage's favicon (or ``null`` when there is no
             favicon)
===========  ===========

For window deactivation events, all the keys except for the ``time`` key are
set to ``null``.

Example of request content:

.. code:: json

    {"url":"https://github.com/Thibauth/browsing-activity-tracker",
     "time":1405458411242,
     "title":"Thibauth/browsing-activity-tracker",
     "key":"firefox",
     "favicon":"https://assets-cdn.github.com/favicon.ico"}

Also note that the window activation and deactivation events are triggered by
your window manager and vary depending on your configuration. For example, in
window managers based on X11, a deactivation event is always triggered before
an activation event.

Configuration
+++++++++++++

The browser key and the callback URL can be customized in the extension
preferences. The key is useful in settings where you are logging events from
several browsers at the same time as well as to provide some (very limited)
authentication. The default settings are:

============ ===========
Option       Default Value
============ ===========
callback URL ``http://localhost:8080``
Browser Key  ``firefox`` for Firefox, ``chrome`` for Chrome
============ ===========
