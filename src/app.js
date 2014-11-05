#!/usr/bin/env node
/**
 * Created by retyk on 14/01/14.
 */

var fs = require('fs'),
    ServerStarter = require('./serverStarter'),
    runnerRouter = require('./runnerRouter'),
    data,
    config,
    serverStarter,
    main = function () {
        if (config.run && config.run.devices) {
            config.run.devices.forEach(function (deviceConfig) {
                if(deviceConfig.disable === "false" || !deviceConfig.disable){
                    runnerRouter.run(deviceConfig, serverStarter);
                }
            });
        } else {
            console.error("[runner] no valid devices configuration was found");
        }
    };

if (require.main === module) {
    // command line call

    data = fs.readFileSync(process.argv[2] || "./TestRunConfig.json");
    try {
        config = JSON.parse(data);
        serverStarter = new ServerStarter(config.server);
    } catch(e) {
        console.error("[runner] failed to parse configuration, see error:", e);
    }
    main();
}
else {
    // require as module
    module.exports = function() {

        var _module = {

            run: function(arg) {
                config = arg;
                if (!config) {
                    console.error("[runner] missing configuration argument");
                    return undefined;
                }
                serverStarter = new ServerStarter(config.server);
                main();
            }

        };

        return _module;

    }();
}
