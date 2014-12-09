#!/usr/bin/env node
/**
 * Created by retyk on 14/01/14.
 */

var Q = require("q"),
    refs = require('fs'),
    ServerStarter = require('./serverStarter'),
    runnerRouter = require('./runnerRouter'),
    data,
    config,
    serverStarter,
    runList,
    mrunner,
    main = function (module) {

        var runconfig = config.run,
            devicesesconfig,
            size, counter = 0,
            deviceList = [],
            deferred = Q.defer();

        runList = [];
        if (config.run && config.run.devices) {

            if (module) {
                mrunner = module.info();
            }
            
            devicesesconfig = runconfig.devices;
           
            devicesesconfig.forEach(function (deviceConfig) {

                if (deviceConfig.disable === "false" || !deviceConfig.disable) {
                    deviceList.push(deviceConfig);
                }
            });

            size = deviceList.length;
            deviceList.forEach(function (deviceConfig) {

                runnerRouter.run(deviceConfig, serverStarter, {
                    callback: function () {
                        
                        counter++;
                        var runListLcl = this.getRunList();
                        if (runListLcl) {
                            runList = runList.concat(runListLcl);

                            if (counter === size) {
                                mrunner.addRunnableInfo(runList);
                                deferred.resolve(mrunner);
                            }
                        }
                    }
                });


            });
        } else {
            console.error("[runner] no valid devices configuration was found");
        }

        deferred.promise.then(function(data) {
            config.callback.call({}, data);
        });
    };

if (require.main === module) {
    // command line call

    data = refs.readFileSync(process.argv[2] || "./TestRunConfig.json");
    try {
        config = JSON.parse(data);
        serverStarter = new ServerStarter(config.server);

    } catch (e) {
        console.error("[runner] failed to parse configuration, see error:", e);
    }
    main();
}
else {
    // require as module
    module.exports = function () {

        var _Info = require("./info/Info.js"),
            _infoData,
            _module = {

                init: function (arg) {
                    config = arg;
                    if (!config) {
                        console.error("[runner] missing configuration argument");
                        return undefined;
                    }
                },

                run: function (arg) {
                    if (arg) {
                        _module.init(arg);
                    } else {
                        if (!config) {
                            console.warn("[mobilerunner] no valid configuration was found, make sure to pass the configuration object");
                        }
                    }

                    serverStarter = new ServerStarter(config.server);
                    main(_module);
                },

                /**
                 * Get runnable information
                 *
                 */
                info: function () {

                    var devices;

                    if (!_infoData) {

                        devices = config.run.devices;
                        _infoData = new _Info();

                        if (devices) {
                            devices.forEach(function (device) {
                                if (device && !device.disable) {
                                    _infoData.addDevice(device);
                                }
                            });
                        }

                    }

                    return _infoData;
                }

            };

        return _module;

    }();
}
