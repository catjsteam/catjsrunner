
function Error(config) {

    if (!config) {
        return undefined;
    }
    this.config = config;
}

Error.prototype.toString = function(separator) {

    var key, output = [" { ", separator];

    separator = (separator || "\n");
    for (key in this.config) {
        if (this.config.hasOwnProperty(key)) {
            output.push("   " + key + " : " + this.config[key] );
        }
    }

    output.push("}");
    return output.join(separator);
};

module.exports = Error;