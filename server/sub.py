# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print('Connected with result code '+str(rc))
    client.subscribe("my/topic/pepper5")

def on_message(client, userdata, msg):
    print(msg.topic + ' ' + str(msg.payload))

if __name__ == '__main__':
    # username = 'yourname@github'
    # password = 'yourpass'
    host = 'test.mosquitto.org'
    port = 1883
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    # client.username_pw_set(username, password=password)
    client.connect(host, port=port, keepalive=60)
    client.loop_forever()
