/**
 * Created by retyk on 19/03/14.
 */

var base = require('./base'),

    iPhoneRunner = function (spec) {

        function _postRequest(opt, data, callback, errCallback) {

            var req,
                timeout = ("timeout" in opt && opt.timeout ? opt.timeout : 10000),
                halfTimeout = (timeout/2),
                sig = opt.ip + ":" + opt.port + opt.path,
                timeoutcounter = 0,
                data = JSON.stringify(data),
                http = require('http'),
                options = {
                    host: opt.ip,
                    //host: '127.0.0.1', //fiddler
                    port: opt.port,
                    //port: 8888, //fiddler
                    //path: '/cat',
                    path: opt.path,
                    method: 'POST',
                    headers: {
                        //host: _host + ':' + _port, //fiddler
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(data)
                    }
                };


            req = http.request(options, function (res) {

                res.on('data', function (chunk) {
                    console.log('agent response: ' + chunk);
                });

                res.on('end', function () {
                    console.log("end");
                    callback.call(this);
                })
            });

            req.on('socket', function (socket) {

                if (timeoutcounter === 0) {
                    socket.setTimeout(halfTimeout);
                    timeoutcounter++;
                }
                
                socket.on('timeout', function () {

                    // handle timeout connection - it might be lost
                    console.warn("[Mobile Runner] connection failed for iPhone device: ", sig, " ,  retry... ");
                    
                    if (timeoutcounter === 1) {
                        timeoutcounter++;
                        socket.setTimeout(halfTimeout);

                    } else if (timeoutcounter > 1) {

                        req.abort();
                        console.error("[Mobile Runner] connection failed for iPhone device: ", sig ,", connection aborted.");
                    }
                });
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

        var that = base(spec);

        that.internalRun = function (config) {

            var data,
                runner = that.getRunnerConfig(),
                callbackarg = (config && "callback" in config ? config.callback : undefined);

            if (runner.name === 'agent') {
                data = {"ip": "http://" + that.getServerStarter().getHost(), "port": that.getServerStarter().getPort(), "delay": "10"};

                setTimeout(function () {

                    that.addChildProcess({device: that, type: "iphone"});
                    _postRequest(runner.options, data, function () {
                            console.log('iphone call completed- ', data);
                            callbackarg.call(that);

                        }, function (err) {
                            that.error(err);
                            callbackarg.call(that);
                            console.error("Error trying to run on iPhone:" + err.message);
                        }

                    );
                }, 2000);
            }
        }

        return that;

    }

module.exports = iPhoneRunner;
