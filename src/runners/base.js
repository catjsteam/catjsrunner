/**
 * Created by retyk on 18/03/14.
 */

var base = function (spec) {
    var that = {};

    that.getRunnerConfig = function () {
        return spec.runnerConfig;
    }

    that.getId = function () {
        return spec.id;
    }

    that.getServerStarter = function () {
        return spec.serverStarter;
    }

    that.run = function () {
        that.getServerStarter().startServer();
        that.internalRun();
    }

    return that;
}







module.exports = base;
