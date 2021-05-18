---
layout: post
title: "My experience using webtorrent in a side project"
description:  "Webtorrent is an incredible idea, but needs improvements"
date:   2021-05-18 08:30:15 +0200
keywords:
  - javascript
  - js
  - webtorrent
  - feross
---

# My experience using webtorrent in a side project

As a fan of [Stremio](stremio), I always wait for the web version of it that never came. Then suddenly I saw [Webtorrent](webtorrent), which could be a way to do it. 

Webtorrent is an implementation very easy to use, you just add the magnet URI, and choose the file to play. After seeing that, I had one goal in mind: why not use Stremio plugins as source of torrents and display it. Then I created [Juan Carlos Web](juan_carlos), a poor react UI listing the movies and try to watch.

In some of the torrents, even though they have lots of peers, the torrent takes a lot of time to load. Webtorrent has a huge problem to connect to trackers, been able to only connect to some trackers like [tracker.openwebtorrent.com](tracker).

There is quite a poor callback in the period that you are connecting to trackers, you got blind. After the metadata is downloaded, then it's very easy to access data.

In the end, was a cool experience. The project needs this small improvement to get mainstream



[stremio]: https://www.stremio.com/
[webtorrent]: https://webtorrent.io/
[juan_carlos]: https://stream.ramonmedeiros.dev/
[tracker]: https://tracker.openwebtorrent.com
