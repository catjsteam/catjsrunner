/**
 * Created by retyk on 19/03/14.
 */

var base = require('./base'),
    iPhoneRunner = function (spec) {
        var that = base(spec);
        that.internalRun = function () {
            var runner = that.getRunnerConfig();
            if (runner.name === 'agent') {
                var data = {"ip": "http://" + that.getServerStarter().getHost(), "port": that.getServerStarter().getPort(), "delay": "10"};
                setTimeout(function () {
                    postRequest(runner.options, data, function () {
                            console.log('iphone call completed- ', data);
                        }, function (err) {
                            console.error("Error trying to run on iPhone:" + err.message);
                        }

                    );
                }, 2000);
            }
        }

        return that;
        function postRequest(uri, data, callback, errCallback) {
            var data = JSON.stringify(data);
            var http = require('http');
            var options = {
                host: uri.ip,
                //host: '127.0.0.1', //fiddler
                port: uri.port,
                //port: 8888, //fiddler
                //path: '/cat',
                path: uri.path,
                method: 'POST',
                headers: {
                    //host: _host + ':' + _port, //fiddler
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                }
            };


            var req = http.request(options, function (res) {

                res.on('data', function (chunk) {
                    console.log('agent response: ' + chunk);
                });

                res.on('end', function () {
                    console.log("end");
                    callback.call(this);
                })
            });

            req.on('error', function (e) {
                if (errCallback) {
                    errCallback.call(this, e)
                } else {
                    console.log('problem with request: ' + e.message);
                }
            });


            req.write(data);

            req.end();
        }
    }

module.exports = iPhoneRunner;
