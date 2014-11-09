/**
 * Created by retyk on 19/03/14.
 */


var base = require('./base'),
    androidRunner = function (spec) {
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
                        console.log("number of found devices " + devices.length);
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
                            that.error("number of found devices " + devices.length);
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
            console.log("running on mobile " + id);
            if (runner.name === 'apk') {

                var apk,
                    fs = require('fs'),
                    path = require('path');
                if (runner.options && runner.options.path && fs.existsSync(runner.options.path)) {
                    apk = runner.options.path;
                } else {
                    apk = path.normalize(__dirname + "/../../lib/resources/catrunner.apk");
                    if (!fs.existsSync(apk)) {
                        apk = path.normalize(__dirname + "/../resources/catrunner.apk")
                    }

                }
                if (!fs.existsSync(apk)) {
                    console.error("Cannot find " + apk);
                }
                else {
                    console.log(apk + " found");
                }

                console.log("installing " + apk + " on " + id);
                deviceClient.install(id, apk, function (err) {
                    if (err) {
                        console.error("installed failed on " + id);
                        return;
                    }

                    console.log('succesfully installed on ' + id);

                    var servermetadata ={
                        host :  that.getServerStarter().getHost(),
                        port: that.getServerStarter().getPort(),
                        id: id
                    }
                    var options = {
                        component: 'com.hp.aamobile.cat/.Main',
                        extras: [
                            {"key": "SERVERMETADATA", "value":  JSON.stringify(servermetadata) }
                        ]
                    }

                    deviceClient.startActivity(id, options, function (err) {
                        if (err) {
                            console.error("Could not run activity on " + id)
                        }
                        else {
                            console.log("Activity ran on " + id)
                        }

                    })
                });
            }
        }
    }
module.exports = androidRunner;