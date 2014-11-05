# CATJS Runner

CATJS runner is a command line tool that helps you run your web application on multiple devices including, Android, iOS, and PC browsers.
This tool is very useful when combined with mobile web automation frameworks like [catjs](https://www.npmjs.org/package/catjs).

## Release Notes

* Code Cleanup
* Runner information API (Actual and Configuration)


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

 The config file is a json file with the following properties:

 * *devices* An array that defines the devices
    * *disable* [true | false] Whether to disable the device
    * *type* The type of device [localpc | android | iphone]
    * *runner* The configuration of the device's runner
        * *name*  In case of 'localpc' it is the name of the application e.g browser types [chrome | firefox | safari]
        * *address*  (optional) The application's path after the base url domain
        * *options*  (optional) In case of 'localpc' it can contain the path of the browser, if omitted the default installation will be used,
for android it will contain the path of the apk runner (provided with this package), the default path is `./lib/resources`
for iOS it contains the ip address of the device (currently not provided will be provided soon)

 * *server* The server configuration that will be used for the base URL


