---
layout: post
title:  "Temp-mail.org: Use temporary email in your tests"
date:   2019-07-18 12:01:12 +0200
categories: jekyll update
---

Sometimes, the software you are using needs to add the email verification. My teammates just recommended me [https://temp-mail.org][temp], which creates a temporary address and an inbox, perfect to make this quick tests. 

They offered an API to create it, but it has some limitations. I just wrote some code around it, with Robot Framework, and found that it's very straighforward to use. Here and example:

{% highlight robotframework%}
*** Settings ***
Library    Selenium2Library
*** Variables ***

# urls
${TEMP_MAIL_URL}            https://temp-mail.org

${TEMP_MAIL_ID}             id=mail
${CONFIRM_EMAIL_THREAD}     xpath=//a[contains(@title, "Please confirm your email")]

*** Testcases ***
Open Browser At Email
    Open Browser    ${TEMP_MAIL_URL}
    Wait Until Element Is Visible    ${TEMP_MAIL_ID}
    ${mail_address}=    Get Value    ${TEMP_MAIL_ID}

Check Inbox
    Open Browser    ${TEMP_MAIL_URL}
    Wait Until Element Is Visible    ${CONFIRM_EMAIL_THREAD}    40s
    Click Element    ${CONFIRM_EMAIL_THREAD}
{% endhighlight %}

It is quite easy to browse in the inbox, just use xpath and search for the title, like to CONFIRM_EMAIL_THREAD. I have being use this for a while and since now, didn't get any problem with the usage with automation

PS: Wrote this code basically copy&paste. Not sure if it's running

[temp]: https://temp-mail.org

