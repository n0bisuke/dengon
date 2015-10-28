# coding=utf8

import paho.mqtt.client as paho

mqttc = paho.Client()

mqttc.connect("test.mosquitto.org", 1883, 60)
mqttc.publish("my/topic/pepper5", "hello world", 1)
