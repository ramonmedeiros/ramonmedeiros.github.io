---
layout: post
title:  "How to mock google cloud api on python"
description:  "Using mocks to test locally code that uses google cloud api"
date:   2019-11-11 15:02:15 +0200
keywords:
  - google-cloud-api
  - python
  - mock
  - unittest

---

[Mock][mock] from python is really useful, when comes to testing. I have being in projects that the CI actually used the Google Cloud to run tests, a waste of money. Let's make some examples on how mock the google cloud api and how to learn the most important topic related to mock: THE FUCKING PATH (spent so many time with this):

Let's imagine this situation: you create a separated file to handle google-cloud functions, and your app import it.

{% highlight python %}
# storage.py
from google.cloud.storage import Client

def upload_file(filename, content, bucket):

    # get client and bucket
    bucket = Client().get_bucket(bucket)

    # upload file
    blob = bucket.blob(filename)
    blob.upload_from_string(content)

---------
#app.py
from storage import upload_file

def upload_report(reportContent):
    upload_file("report", reportContent, "bucket")
{% endhighlight %}


Let's mock it from test_app.py:
{% highlight python %}
import mock

from app import upload_report

@mock.patch("storage.Client")
def test_upload(client):

    # run function just recording interaction trought mock
    upload_report("")

    # assert bucket was called with the passed string
    bucket = client().get_bucket
    bucket.assert_called_with("bucket")

    # assert blob and upload were called with expected params
    blob = bucket().blob
    blob.assert_called_with("report")
    blob().upload_from_string.assert_called_with("")

{% endhighlight %}


Keep in mind that when mocking, you need to target the environment that things are running. I usually try to follow the file that I'm using and then I choose the import.

Let's inspect the Mock in real time with [PDB][pdb]:

{% highlight bash %}
> /private/tmp/storage.py(3)upload_file()
-> def upload_file(filename, content, bucket):
(Pdb) n
> /private/tmp/storage.py(6)upload_file()
-> bucket = Client().get_bucket(bucket)
(Pdb) Client
<MagicMock id='4362852112'>
(Pdb) n
> /private/tmp/storage.py(9)upload_file()
-> blob = bucket.blob(filename)
(Pdb) bucket
<MagicMock name='mock().get_bucket()' id='4395823248'>
(Pdb) n
> /private/tmp/storage.py(10)upload_file()
-> blob.upload_from_string(content)
(Pdb) blob
<MagicMock name='mock().get_bucket().blob()' id='4395913296'>
{% endhighlight %}

If we added [side-effect][side-effect] or [return_value][return_value] properties, we could see here at the debugging.



[mock]: https://docs.python.org/3/library/unittest.mock.html
[pdb]: https://docs.python.org/3/library/functions.html#breakpoint
[side-effect]: https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.side_effect
[return_value]: https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.return_value
