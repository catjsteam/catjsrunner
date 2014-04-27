/**
 * Created by retyk on 20/01/14.
 */

module.exports = function (processConfig, arguments) {
    var _spawn = require('child_process').spawn,
        isServerUp = false;

    function myIp() {
        var os = require('os');
        var address = 'localhost';
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function (details) {
                if (details.family == 'IPv4') {
                    if (dev.toLowerCase().indexOf('wireless') != -1 ||
                        dev.toLowerCase().indexOf('wlan') != -1) {
                        console.log("address found " + dev , details.address);
                        address =  details.address;
                    }
                }
            })
        }
        return address;
    }

    function run(autostart) {
        var ls = _spawn(autostart.nodeStartFile, autostart.args, {cwd: autostart.cwd});

        ls.stdout.on('data', function (data) {
            console.info('server output: ' + data);
        });

        ls.stderr.on('data', function (data) {
            console.error('server error: ' + data);
        });

        process.on('exit', function (code) {
            ls.kill();
            console.log('About to exit with code:', code);
        });

        ls.on('close', function (code) {
            console.log('About to close with code:', code);
        });

        ls.on('message', function (code) {
            console.log('About to close with code:', code);
        });

        ls.on('error', function (code) {
            console.error('Error:', code);
        });

    }

    return {

        startServer: function () {
            if (isServerUp !== true && processConfig.autostart) {
                run(processConfig.autostart);
                isServerUp = true;
            }
            else {
                console.info("Server already up");
            }


        },

        getPort: function () {
            return processConfig.port;
        },

        getHost: function () {

            return !processConfig.host || processConfig.host === 'auto' ? myIp() : processConfig.host;
        }
    }
}


