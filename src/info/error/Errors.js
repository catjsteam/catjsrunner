var _Error = require("./Error.js");

function Errors(config) {

    this.errors = [];
}

Errors.prototype.add = function(config) {
    this.errors.push(new _Error(config));
}

Errors.prototype.print = function(separator) {

    var output = [];
    this.errors.forEach(function(err){
        if (err) {
            output.push(err.toString(separator));
        }
    });

    return output.join(separator);
}

module.exports = Errors;