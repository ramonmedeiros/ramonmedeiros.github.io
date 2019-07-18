---
layout: post
title:  "How to easily send files inside your network with python"
date:   2019-07-18 12:01:12 +0200
categories: jekyll update
---
Today I was trying to send a file inside my network, but was too lazy to download and updated it to any storage service (GDrive, Dropbox). Then I realized that python offers you a [HTTP server][http] in one line command. So here is my tip:

{% highlight bash%}
$ cd directory # where is your file
$ python -m SimpleHTTPServer 8000
=> Serving HTTP on 0.0.0.0 port 8000 ...
{% endhighlight %}

So now your computer is serving all files in the directory at http://0.0.0.0:8000 . Just make sure the computer that want to access it has firewall allowed.

[http]: https://docs.python.org/2/library/simplehttpserver.html

