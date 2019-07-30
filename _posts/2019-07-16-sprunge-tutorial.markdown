---
layout: post
title:  "Sprunge: good utility to copy&paste from remote machines"
description:  "Sprunge: good utility to copy&paste from remote machines"
date:   2019-07-16 13:01:12 +0200
categories: sprunge
---
This week I had a problem with Azure Devops, specifically with the Microsoft hosted-agents. They offer a lot of OS, but poor resources to debug them. I was trying to take a screenshot, but they only offer this with [MSTest framework][mstest].

So, my next try was to use [pastebin.com][pb], but they need token and some authentication stuff. Then I found [sprunge][sp], which only accept text, but you can convert images while posting. Here some examples:

{% highlight bash%}
cat file | curl -F 'sprunge=<-' http://sprunge.us
=> http://sprunge.us/aXZI
{% endhighlight %}

Storing image

{% highlight bash%}
# server side
screencapture test.jpg
uuencode foo.jpg < test.jpg | curl -F 'sprunge=<-' http://sprunge.us
=> http://sprunge.us/example

# client side
curl http://sprunge.us/example | uuencode
=> foo.jpg
{% endhighlight %}

No authentication, just curl. And you can use other tools than uuencode.

[pb]: https://pastebin.com/
[sp]: http://sprunge.us/
[mstest]: https://docs.microsoft.com/en-us/azure/devops/test/collect-screenshots-and-video?view=azure-devops

