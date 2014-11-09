/**
 * Created by retyk on 19/03/14.
 */

var os = require('os'),
    fs = require('fs'),
    openapp = require("open"),
    base = require('./base'),
    browserMap = require('./browsersMap.js'),

    browserRunner = function (spec) {

        var that = base(spec);

        that.internalRun = function (config) {

            var callbackarg = (config && "callback" in config ? config.callback : undefined);
            
            function _getName(name) {
                var platform,
                    browserPlatformSupport,
                    supportedBrowsers = ["chrome", "firefox", "safari"],
                    type, idx = 0, size = supportedBrowsers.length;

                if (name) {
                    platform = os.platform();
                    browserPlatformSupport = browserMap[platform];

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

            function _open(counter, url, alias, callback) {
                
                var cp = openapp(url, alias, function (err) {
                    
                    var err;
                 
                    if (err) {
                        err = "[Mobile Runner] Error occurred while trying to open the application: '" + alias + "' error:", err;
                        that.error(err);
                        console.log(err);
                    }


                    if (callback) {
                        callback.call(this, cp);
                    }                                    
                });

                console.log("[Mobile Runner] Opening application: ", alias, " ", cp.pid);
                that.addChildProcess({cp: cp, type: alias});
                
                
                counter++;
                if (counter < instances) {
                   
                    setTimeout(function() {

                        function getDateTime() {

                            var date = new Date();

                            var hour = date.getHours();
                            hour = (hour < 10 ? "0" : "") + hour;

                            var min  = date.getMinutes();
                            min = (min < 10 ? "0" : "") + min;

                            var sec  = date.getSeconds();
                            sec = (sec < 10 ? "0" : "") + sec;

                            var year = date.getFullYear();

                            var month = date.getMonth() + 1;
                            month = (month < 10 ? "0" : "") + month;

                            var day  = date.getDate();
                            day = (day < 10 ? "0" : "") + day;

                            return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

                        }
                        
                        _open(counter, url, alias, callback);
                    }, (instanceDelay));
                    
                } else {
                    callbackarg.call(that);
                }
               
            }
            
            var runnerConfig = that.getRunnerConfig(),
                serverConfig = that.getServerStarter(),
                name = runnerConfig.name,
                alias = _getName(name),
                host = serverConfig.getHost(),
                port = serverConfig.getPort(),
                address = runnerConfig.address,
                protocol = serverConfig.getProtocol(),
                options = runnerConfig.options,
                instances = ( (options && "instances" in options) ? options.instances : 1),
                instanceDelay = ( (options && "instanceDelay" in options) ? options.instanceDelay : 3000),
                counter = 0,

                url = [protocol, "://" + host, ':', port, address].join("");

            console.log("[Mobile Runner] Running Application: '" + alias + "'");
           
            _open(counter, url, alias, function(cp) {
               
            });
           
        }

        return that;
    }

module.exports = browserRunner;
