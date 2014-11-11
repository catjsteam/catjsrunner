# CATJS Runner

CATJS runner is a command line tool that helps you run your web application on multiple devices including, Android, iOS, and PC browsers.
This tool is very useful when combined with mobile web automation frameworks like [catjs](https://www.npmjs.org/package/catjs).

## Release Notes

* Runner information API (Actual and Configuration) with errors in case the devices or browsers failed to be opened
* Console notification in case the connection of an iphone device request fails


##Installation
We recommend to install mobilerunner as a cli
 `npm install -g mobilerunner`

 Command line syntax:

 `mobilerunner <configfile>`

 If omitted the *mobilerunner* will search for a config file named *TestRunConfig.json* in the working directory.  

## Support
* *browsers* Currently supported browsers names for cross platform (Linux, Darwin and win32):  
  
    * *firefox*
    * *safari*
    * *chrome*  
    * *others* In case you wish to open other browser just set the name with the application's name    
        We are using "open" module for staring the applications  
 
* *iPhone* agent application will be supported later on
* *android* agent application is supported and is part of the module installation

##Config file

 The config file is a json file with the following properties:

 * *devices* An array that defines the devices
    * *disable* [true | false] Whether to disable the device
    * *type* The type of device [localpc | android | iphone]
    * *runner* The configuration of the device's runner
        * *name*  In case of 'localpc' it is the name of the application e.g browser types [chrome | firefox | safari]
        * *address*  (optional) The application's path after the base url domain
        * *options*  (optional) 
            * *localpc* 
                * *path* of the browser, if omitted the default installation will be used
                * *instances* to be opened per browser
            * *android*
                * *path* of the apk runner (provided with this package), the default path is `./lib/resources`
            * *iphone* 
                * *ip* address of the device 
                * *port* the agent's port 
                * *ip* address of the device 

 * *server* The server configuration that will be used for the base URL

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
                     "options": {"ip": "192.168.1.107", "port": "54321", "path": "/cat", "timeout": 20000}
                 }
             }
         ]
     }
     "server": {
         "host" : "auto",
         "port" : "8089"         
     }
 }
 ```

