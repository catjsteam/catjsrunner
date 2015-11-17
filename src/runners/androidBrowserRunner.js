/**
 * Created by lior reuven on 19/09/15.
 */


    var base = require('./base'),
    browserMap = require('./browsersMap.js'),
    os = require('os'),

    androidBrowserRunner = function (spec) {
        var that = base(spec);

        that.internalRun = function (config) {
            var adb = require('adbkit'),
                deviceClient = adb.createClient(),
                callbackarg = (config && "callback" in config ? config.callback : undefined),
                size = 0, counter = 0;

            if (typeof that.getId() === 'undefined' || that.getId() === 'all' || that.getId() === '') {
                console.log("run on all devices");

                deviceClient.listDevices(function (err, devices) {

                    if (err) {
                        console.error("error listing devices " + err);
                        that.error(err);
                        that.addChildProcess({device: that, type: "android"});
                        callbackarg.call(that);

                    } else {
                        console.log("List of devices attached " + devices.length);
                        size = (devices ? devices.length : 0);

                        if (size) {
                            devices.forEach(function (device) {
                                that.addChildProcess({device: device, type: "android"});
                                runOnAndroid(that.getRunnerConfig(), device.id, that.getServerStarter(), deviceClient);
                                counter++;
                                if (counter < size) {
                                    callbackarg.call(that);
                                }
                            });
                        } else {
                            that.error("List of devices attached " + devices.length);
                            that.addChildProcess({device: that, type: "android"});
                            callbackarg.call(that);
                        }
                    }
                });

            } else {

                that.addChildProcess({device: that, type: "android"});
                runOnAndroid(that.getRunnerConfig(), that.getId(), that.getServerStarter(), deviceClient);
                callbackarg.call(that);
            }
        }

        return that;

        function runOnAndroid(runner, id, serverStarter, deviceClient) {
                    console.log("running on mobile " + id + " " + runner.name);

                    var servermetadata ={
                        host :  that.getServerStarter().getHost(),
                        port: that.getServerStarter().getPort(),
                        id: id
                    }
                    var runnerConfig = that.getRunnerConfig(),

                    address = runnerConfig.address,
                    browsername =   runner.name,
                    component = _getActivityName(browsername),
                    extraKey = "catserveraddress",
                    extraValue = "http://" + servermetadata.host + ":" + servermetadata.port,
                    data =["http://" + servermetadata.host  , ':', servermetadata.port, address].join("");
                    data = "http://www.google.com";
                    console.log ( " Opening url : " + data);
                    var options = {
                        component: component,
                        data: extraValue,
                        extras: [
                            {"key": extraKey, "value":  extraValue }
                        ]
                    }

                    deviceClient.startActivity(id, options, function (err) {

                        if (err) {
                            console.error("Could not run activity on " + id);
                        }
                        else {
                            console.log("Activity : " + component + "\n" + "extra : " + extraKey + "\t value: " + extraValue);
                        }

                    })

        }

        function _getActivityName(name) {
                     var platform,
                         browserPlatformSupport,
                         supportedBrowsers = ["chrome", "firefox", "firefox_beta" ],
                         type, idx = 0, size = supportedBrowsers.length;

                     if (name) {

                         browserPlatformSupport = browserMap['android'];

                         if (browserPlatformSupport) {
                             browserPlatformSupport = browserPlatformSupport.browser;
                             if (name in browserPlatformSupport) {
                                 return browserPlatformSupport[name][0];

                             } else {
                                 for (idx = 0; idx < size; idx++) {
                                     type = supportedBrowsers[idx];
                                     if (name.toLowerCase().indexOf(type) !== -1) {
                                         console.warn("Your browser configuration name is deprecated, for cross OS support use type: '" + type + "' ");
                                         break;
                                     }
                                 }

                             }
                         }

                     }

                     return name;
                 }

    }
module.exports = androidBrowserRunner;