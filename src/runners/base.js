/**
 * Created by retyk on 18/03/14.
 */

var base = function (spec) {
    var that = {cpList: []},
        Run = function(config) {
            
            if (!config) {
                return undefined;
            }
            
            var key;
            
            for (key in config) {
                this[key] = config[key];
            }
            
        },
        setProperty = function(prop, obj) {
            return (prop in obj ? obj[prop] : undefined);
        };

    that.addChildProcess = function(data) {
        if (!data) {
            return undefined;
        }        
        that.cpList.push( new Run({
            cp: setProperty("cp", data) , 
            device: setProperty("device", data), 
            type: setProperty("type", data), 
            me: that
        }) );
    };
    
    that.error = function(err) {
        that.err = err;
    },   
        
    that.getError = function(err) {
        return that.err;
    },   
    
    that.getRunnerConfig = function () {
        return spec.runnerConfig;
    };

    that.getId = function () {
        return spec.id;
    };

    that.getServerStarter = function () {
        return spec.serverStarter;
    };

    that.run = function (config) {
        // @obsolete Use catjs module to start the server
        // that.getServerStarter().startServer();
        that.internalRun(config);
        
    };
    
    that.getRunList = function() {
        return that.cpList;
    };
        
//    that.killall = function() {
//        var me = that;
//        
//        var processesSize = me.cpkill().length;
//        if (processesSize) {
//            me.cpkill().forEach(function (item) {
//                if (item) {
//                    console.log("[Mobile Runner] killing", item.pid);
//                    try {
//                        item.kill();
//
//                    } catch(e) {
//                        console.log("[Mobile Runner] Failed to kill process: ", item.pid);
//                    }
//                }
//            });
//        }
//    };

    return that;
}

module.exports = base;
