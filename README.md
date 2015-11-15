# heroku firefox os simple push server
Firefox OS SimplePush API Server Heroku button for easy deploying

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


The Simple Push API provides Firefox OS apps the ability to be woken up to receive notifications. You could use Simple Push as a sync mechanism, or even to fetch the latest data from third party servers.~

API Endpoint
####Register
Post your channel id as post parameter 'client' to :
```
/api/v1/register
```
####Unregister
Post your channel id as post parameter 'client' to :
```
/api/v1/unregister
```
####Send a message
Post your channel id as 'client' and your message as 'message' to :
```
/api/v1/
```
####Receive a message
Get your channel id as get parameter 'client' to :
```
/api/v1/[message number]?client=[client]
````
