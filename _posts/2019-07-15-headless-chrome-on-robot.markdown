---
layout: post
title:  "Use webdriver headless support instead xvfb hack"
description: "Use webdriver headless support instead xvfb hack"
date:   2019-07-15 10:30:15 +0200
categories: webdriver xvfb headless chrome
---
When I started using selenium and UI testing tools, my first experience with headless browsers was with docker, by using [selenium/standalone-chrome][chrome-docker] image, which is very easy to use, since gives a running selenium with all deps.
After some time, I was working with Azure Devops and running my tests without docker, directly with webdriver (chromedriver and safaridriver, in my case). To avoid issues with the agent, I was using XVFB to generate a new window and run the tests there. It's a pretty simple code:

{% highlight robotframework %}
*** Settings ***
Documentation     This example demonstrates how to use current library
Library           Selenium2Library
Library           XvfbRobot

*** Test Cases ***
Create Headless Browser
    Start Virtual Display    1920    1080
    Open Browser   http://google.com
{% endhighlight %}


But, when I was trying to do the same on macos, I got some trouble to install xvfb by brew. So reading more careful the documentation, I saw that some drivers(Chrome and Firefox) provide this feature native, just select then when opening a browser:

{% highlight robotframework %}
*** Test Cases ***
Open Headless Chrome Browser
    Open Browser   http://google.com    browser=headlesschrome

Open Headless Firefox Browser
    Open Browser   http://firefox.com    browser=headlessfirefox
{% endhighlight %}

You can access more info on SeleniumLibrary [docs][rf-docs].



[rf-docs]: http://robotframework.org/SeleniumLibrary/SeleniumLibrary.html#Open%20Browser
[chrome-docker]: https://github.com/SeleniumHQ/docker-selenium
