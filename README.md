# CATJS Runner

CATJS runner is a command line tool that helps you run your web application on multiple devices including, Android, iOS, and PC browsers.
This tool is very useful when combined with mobile web automation frameworks like [catjs](https://www.npmjs.org/package/catjs).

## Release Notes

* Runner installation error fix
* Android support fix


##Installation
We recommend to install mobilerunner as a cli
 `npm install -g mobilerunner`

 Command line syntax:

 `mobilerunner <configfile>`

 If omitted the *mobilerunner* will search for a config file named *TestRunConfig.json* in the working directory.  

## Support
 Currently supported browsers names for cross platform (Linux, Darwin and win32):  
 
 * firefox
 * safari
 * chrome
 
 In case you wish to open other browser just set the name with the application's name.  
 We are using "open" module for staring the applications.

##Config file

 The config file is a json file with the following elements:

###devices
 An array defining the devices, each device is in the following format:

####disable
true/false according if we you startup this device

####type
the type of device it can be localpc/android/iphone

####runner
Configuration of the runner:
* name - in localpc it is the name of the browser (chrome, firefox, safari)
* address - (optional) the start path after the url domain
* options - (optional) for localpc it can contain the path of the browser, if omitted the default installation will be used,
for android it will contain the path of the apk runner (provided with this package), the default path is `./lib/resources`
for iOS it contains the ip address of the device (currently not provided will be provided soon)

###runningEnvironment (WIP)
Currently not in use

###server
This is the configuration of the server

####host

####port

####protocol

####autostart (optional)

Tells if mobilerunner will start the server according to the following configuration

####nodeStartFile
The start file

####args
Arguments to add to start command

####cwd
Working directory


###Config file example

 ```json
 {
     "run": {
         "devices": [
             {
                 "disable": true,
                 "type": "localpc",
                 "runner": {
                     "name": "chrome",
                     "address": "/index.html",
                     "options": {"instances":1}
                 }
             },
             {
                 "disable": false,
                 "type": "localpc",
                 "runner": {
                     "name": "firefox",
                     "address": "/index.html",
                     "options": {"instances":1}
                 }
             },
             {
                 "disable": false,
                 "type": "android",
                 "id": "all",
                 "runner": {
                     "name": "apk",
                     "options": {"path" :"./lib/resources"}
                 }
             },
             {
                 "disable": true,
                 "type": "iphone",
                 "id": "all",
                 "runner": {
                     "name": "agent",
                     "options": {"ip": "192.168.1.107", "port": "54321", "path": "/cat"}
                 }
             }
         ]
     },
     "runningEnvironment": {
         "type": "local|lab",
         "host": "",
         "authtoken": ""
     },
     "server": {
         "host" : "auto",
         "port" : "8089",
         "autostart" : {
             "args": ["-s"],
             "nodeStartFile": "catcli.cmd",
             "cwd": "c:/catgithub/CATCore/test/sencha/cat-project"
         }
     }
 }
 ```
