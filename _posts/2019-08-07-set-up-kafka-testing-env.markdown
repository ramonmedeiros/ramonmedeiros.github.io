---
layout: post
title:  "Set up a Kafka test environment"
description:  "Set up a Kafka test environment"
date:   2019-08-07 12:11:15 +0200
keywords:
  - kafka
  - docker
  - zookeper
  - consumer
  - publisher
---

This week I started to write some code to be processed by Kafka, but as I have heard before, set up this environment is usually trouble. So I just figure it out that [Spotify][kafka-github] has made a single docker image with Kafka and Zookeper. You just need to download and run. Usually, most of the images are only Kafka, so you need to bring both Kafka and AZookeper with docker-compose. Just a little bit more config, but this one was so confortable for my case.

So you just need this:

{% highlight bash %}
$ docker run -d -p 2181:2181 -p 9092:9092 --env ADVERTISED_HOST=localhost --env ADVERTISED_PORT=9092 --env NUM_PARTITIONS=10 spotify/kafka
{% endhighlight %}

This will setup a Kafka on port 9092, adding only one parameter that NUM_PARTITIONS=10, meaning that all topic created will have 10 partitions, so I can register 10 consumers. To try this, I was using the following python library [kafka-python][lib-link], which is very convenient for small apps:

This is a producer, which its automatically serialize the data to work with json.

{% highlight python %}
from kafka import KafkaProducer
import json

HOST = "localhost"
PORT = "9092"

class Producer:
    def __init__(self, host=HOST, port=PORT):
        self.server = KafkaProducer(bootstrap_servers=[f"{host}:{port}"],
                                     value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    def sendMessage(self, topic, message: dict):
        msg = self.server.send(topic, message)
        res = msg.get(timeout=20)
{% endhighlight %}


This is consumer example
{% highlight python %}
from kafka import KafkaConsumer, TopicPartition
from kafka.structs import OffsetAndMetadata

import json

HOST = "localhost"
PORT = "9092"

class Consumer:
    def __init__(self, topic, host=HOST, port=PORT):
        self.consumer = KafkaConsumer(topic,
                                      group_id="consumer",
                                      bootstrap_servers=[f"{host}:{port}"],
                                      value_deserializer=lambda x: json.loads(x.decode('utf-8')),
                                      auto_offset_reset='earliest')
        self.topic = topic

    def readMessage(self):
        for message in self.consumer:
            print(f"Message content {message.value}")
            self.consumer.commit({TopicPartition(self.topic, message.partition): OffsetAndMetadata(message.offset, None)})
{% endhighlight %}



[kafka-github]: https://github.com/spotify/docker-kafka/
[lib-link]: https://pypi.org/project/kafka-python/
