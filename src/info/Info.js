var Device = require("./Device.js"),
    RunInfo = require("./RunInfo.js"),
    Errors = require("./error/Errors.js");

function Info(config) {

    this.devices = [];
    this.total = {
        run: {
            all: 0
        }
    };
}

Info.prototype.addRunnableInfo = function(data) {
    
    this.runinfo = new RunInfo({
        data: data 
    });
    
};

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

Info.prototype.test = function() {
    
    var runinfo = this.getRunnableInfo(),
        sizeTest = false,
        test = false;
    
    if (runinfo) {
        sizeTest = (runinfo.size() === this.size());
        
        // all tests should be added in here
        test = sizeTest; 
    }
    
    return test; 
};

Info.prototype.errors = function() {

    var runinfo = this.getRunnableInfo(),
        itemsFailed = runinfo.getItemsFailed(),
        errors = new Errors();
    
    if (itemsFailed) {
        itemsFailed.forEach(function(item){
           
            if (item) {
                errors.add({ 
                    type: item.type,
                    error: item.me.getError()
                });    
            }
            
        });
    }
    
    return errors;
};

Info.prototype.getRunnableInfo = function() {
    return this.runinfo;  
};

Info.prototype.size = function() {
    return this.total.run.all;  
};

Info.prototype.getSizeByType = function(key) {
    return this.total.run[key];  
};

Info.prototype.getLocalPCSize = function() {
    return this.total.run['localpc'];  
};

Info.prototype.getAndroidSize = function() {
    return this.total.run['android'];  
};

Info.prototype.getIPhoneSize = function() {
    return this.total.run['iphone'];  
};


module.exports = Info;