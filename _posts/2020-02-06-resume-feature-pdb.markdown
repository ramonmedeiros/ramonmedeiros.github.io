---
layout: post
title: "Running scripts in python interactly with pdb"
description:  "When running long scripts that can require pause, you can use python debugger"
date:   2020-02-06 15:02:15 +0200
keywords:
  - python
  - python3
  - pdb

---
This week I need to run a script with lot of calls to an API. Would be nice to do some requests in the begining to validate the feature, and then keep it running.

With Python Debugger, [pdb][pdb], is really easy for this case. Let's see and example:

{% highlight python%}

for item in items:
    requests.get(url=API/item,....)
{% endhighlight %}

Suppose items has a size of 10k. If you run this script with pdb, it will drop a shell, so just press c, to continue:

{% highlight bash%}
$ python -m pdb script.py
> /private/tmp/script.py(1)<module>()
-> for item in items:
(Pdb) c
{% endhighlight %}

But, if you want to stop it, without quiting, you can press CTRL+C, which will drop you in the pdb shell, where you can continue to the next iteration, print variables, or resume typping:

{% highlight bash%}
KeyboardInterrupt
Uncaught exception. Entering post mortem debugging
Running 'cont' or 'step' will restart the program
> /private/tmp/script.py(1)<module>()
-> for item in items:
(Pdb)
{% endhighlight %}

This functionality was very useful, since I can stop now the script and resume. Was even able to stop the execution, close the laptop, open in another network and resume the script.

[pdb]: https://docs.python.org/3/library/pdb.html



