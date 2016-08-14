Foscam Ionic
=====================

A Foscam implementation using Ionic and Angular 1

## Using this project

- create a JSON file named 'camera-one-config.json' in /js/configs
- in that JSON file make an object like the following:
```
{ "label": "camera1", "username": "dude", "password": "jkfljkljdfal", "port": "3000", "ip" : "192.168.1.123", "model" : "name_of_json_file.json" }
```
- if you are using this project as is with a Foscam camera you can specify the model in the object above with 'foscam-model.json'

- or if you are using a different type of camera you will have to make your own model file.  The model
file describes the commands/url that are called to control the camera