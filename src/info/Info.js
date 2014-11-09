var Device = require("./Device.js");

function Info(config) {

    this.devices = [];
    this.total = {
        run: {
            all: 0
        }
    };
}

Info.prototype.addDevice = function (device) {

    var runner,
        instances = 1,
        totalruninfo;

    if (!device) {
        return undefined;
    }

    runner = device.runner;
    if (runner) {
        if ("options" in runner && "instances" in runner.options) {
            instances = runner.options.instances;
        }

        device = new Device({
            name: device.runner.name,
            type: device.type
        });

        this.devices.push(device);

        totalruninfo = this.total.run;
        totalruninfo.all += instances;
        if (totalruninfo[device.type] === undefined) {
            totalruninfo[device.type] = 0;
        }
        totalruninfo[device.type] += instances;
        totalruninfo[device.name] = instances;
    }

};

Info.prototype.getTotal = function() {
    return this.total.run.all;  
};

Info.prototype.getTotalByType = function(key) {
    return this.total.run[key];  
};

Info.prototype.getTotalLocalPC = function() {
    return this.total.run['localpc'];  
};

Info.prototype.getTotalAndroid = function() {
    return this.total.run['android'];  
};

Info.prototype.getTotalIPhone = function() {
    return this.total.run['iphone'];  
};


module.exports = Info;