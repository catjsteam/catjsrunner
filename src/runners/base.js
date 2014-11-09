/**
 * Created by retyk on 18/03/14.
 */

var base = function (spec) {
    var that = { cpList: []};

    that.addChildProcess = function(cp) {
        that.cpList.push(cp);
    };
    
    that.cpkill = function() {
        return that.cpList;  
    };
    
    that.getRunnerConfig = function () {
        return spec.runnerConfig;
    }

    that.getId = function () {
        return spec.id;
    }

    that.getServerStarter = function () {
        return spec.serverStarter;
    }

    that.run = function (config) {
        // @obsolete Use catjs module to start the server
        // that.getServerStarter().startServer();
        that.internalRun(config);
        
    }

    return that;
}

module.exports = base;
