---
layout: post
title: "Use Google Identity Aware Proxy to protect your site"
description:  "Google Identity Aware Proxy is a powerfull tool to expose your applications using Google's Authentication"
date:   2020-04-01 15:02:15 +0200
keywords:
  - google-iap
  - vpn

---

Some tools of my office were protected by firewall, allowing only the office's network to access some services. Then, COVID-19 and the quarantine came, forcing the IT team to starting changing the firewall rules daily, which is really time consuming and not secure.

My company uses [Google IAP][iap] for a lot of apps that runs on Google Cloud Plataform. It's very easy to configure, you just need a configured [Load Balancer][lb] or an [App Engine][app] application. But how does it work for applications running outside of Google Cloud Platform?

Google has a [solution][solution] for this, which installs an [ambassador proxy][ambassador] on Kubernetes. For me was quite overengineered, so I propose a new approach.

Just a nginx docker!

So, let's run a nginx docker with the following configuration
{% highlight bash%}
$ cat nginx.conf
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    server {
        listen   0.0.0.0:80;
        location / {
            proxy_pass https://YOUR.PROTECTED.APP.COM/;
        }
    }
}
{% endhighlight %}

The snippet above will listen on port 80, and redirect all traffic to https://YOUR.PROTECTED.APP.COM/.

So, I deployed a [Container Optimized OS][cos] and run this docker image. If you Allow HTTP traffic to this VM and access it's IP, the proxy will be working.

To activate the IAP proxy, you need to [create a load balancer][create-lb], which has a Next->Next->Finish workflow. In this flow, you will create a Frontend for this, which can be HTTPS with a managed certificate. The IP address on this frontend will be the IP that you will access the IAP.

To make it more secure, remove the "Allow HTTP" from the VM and create a firewall rule only allowing http traffic from Google servers: "130.211.0.0/22" "35.191.0.0/16".

Now my apps only allow the IP from the VM, so we can keep working from home in a safe way.

[iap]: https://cloud.google.com/iap
[lb]: https://cloud.google.com/load-balancing
[app]: https://cloud.google.com/appengine
[solution]: https://cloud.google.com/iap/docs/enabling-on-prem-howto
[ambassador]: https://github.com/datawire/ambassador
[cos]: https://cloud.google.com/container-optimized-os/
[create-lb]: https://cloud.google.com/load-balancing/docs/https/https-load-balancer-example

