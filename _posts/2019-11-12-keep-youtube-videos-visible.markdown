---
layout: post
title:  "Keep your video visible while you browse"
description:  "Keep your video visible while you browse"
date:   2019-11-12 12:02:15 +0200
keywords:
  - youtube
  - video
  - html5
  - google-chrome

---

Watching a video and want to keep it in your screen, so you can even change pages or minimize the browser and the video will keep on?

1.  Go to the site, ex: youtube
3.  Play video
2.  Open console and type:

{% highlight javascript %}
document.querySelector('video').requestPictureInPicture()
{% endhighlight %}

OR

install the [Chrome Extension for PictureInPicture][ext]

![Screenshot](http://i.imgur.com/0Jla53t.jpg)



[ext]: https://chrome.google.com/webstore/detail/picture-in-picture-extens/hkgfoiooedgoejojocmhlaklaeopbecg?hl=en



