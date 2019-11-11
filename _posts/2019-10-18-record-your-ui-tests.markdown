---
layout: post
title:  "How to record your screen while doing E2E tests"
description:  "How to record your screen while doing E2E tests"
date:   2019-10-17 14:02:15 +0200
keywords: ui-tests
---

So, as you write your tests and set it to run in your CI tool, sometimes only reading the log is quite difficult to understand what is going on, especially if you are not the one that wrote those tests.

Why not record this?

Luckly, ffmpeg provide a very simple way to do it 

{% highlight bash %}
$ # list your devices
$ ffmpeg -f avfoundation -list_devices true -i ""
[AVFoundation input device @ 0x7ff9d6c01340] AVFoundation video devices:
[AVFoundation input device @ 0x7ff9d6c01340] [0] FaceTime HD Camera (Built-in)
[AVFoundation input device @ 0x7ff9d6c01340] [1] Capture screen 0
[AVFoundation input device @ 0x7ff9d6c01340] AVFoundation audio devices:
[AVFoundation input device @ 0x7ff9d6c01340] [0] Built-in Microphone

$ # run ffmpeg on background. -i "1" means i'm recordingn the Capture Screen 0
$ nohup ffmpeg -f avfoundation -loglevel error -i "1" output.mkv &

<RUN YOUR TESTS>

$ # stop recording
$ killall ffmpeg
{% endhighlight %}

As I am doing this on Azure Devops, which has a very POOR support for uploading artifacts, I'm uploading the file to somewhere

{% highlight bash %}
$ curl --upload-file ./output.mkv https://transfer.sh/output.mkv
https://transfer.sh/eibhM/output.mkvt
{% endhighlight %}

Totally suggest [transfer.sh][transfer.sh] as a command line upload service



[transfer.sh]: https://transfer.sh
