var _util = require('util');

function RunInfo(config) {

    var key,
        me = this;

    if (!config) {
        return undefined;
    }

    for (key in config) {
        if (config.hasOwnProperty(key)) {
            this[key] = config[key];
        }
    }
    
    this.items = [];
    this.itemsFailed = [];
        
    if (this.data && _util.isArray(this.data)) {
        
        this.data.forEach(function(item) {
            if (item) {
                if ("me" in item && item.me && item.me.getError()) {
                    me.itemsFailed.push(item);
                } else {
                    me.items.push(item);
                }
            }
        })
    }
}

RunInfo.prototype.size = function() {
    return this.items.length;
};

RunInfo.prototype.failedSize = function() {
    return this.itemsFailed.length;
};

RunInfo.prototype.TotalSize = function() {
    return this.size() + this.failedSize();
};

module.exports = RunInfo;