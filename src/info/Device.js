function Device(config) {

    var key;

    if (!config) {
        return undefined;
    }

    for (key in config) {
        if (config.hasOwnProperty(key)) {
            this[key] = config[key];
        }
    }

};

module.exports = Device;