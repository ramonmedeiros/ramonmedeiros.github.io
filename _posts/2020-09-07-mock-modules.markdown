---
layout: post
title: "How to mock global modules"
description:  "Mock global modules on python, instead of local path"
date:   2020-09-07 17:40:15 +0200
keywords:
  - mock
  - python
  - unittest

---

So, imagine if you want to mock an external dependency in a script, like this one that is connection to AWS

{% highlight python%}
# script.py
import boto3

client = boto3.client("ssm")
{% endhighlight %}


If you follow [python documentation][docs] and apply for this case, will not work. For this case, you need to mock the module itself.

Unfortunately, I wasn't able to mock `boto3` entirely, but I can mock the `client()`, this way:


{% highlight python%}
# test.py
from unittest.mock import patch

@patch("boto3.client")
def test_boto(boto3):
    import script
    assert isinstance(script.client, MagicMock)
    
{% endhighlight %}

And done :)


[docs]: https://docs.python.org/3/library/unittest.mock.html#where-to-patch
