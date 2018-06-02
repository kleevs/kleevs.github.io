(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "artiste", "tools/directive/vibrate"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var vibrate_1 = require("tools/directive/vibrate");
    function error(valueAccessor) {
        return function (element, serviceProvider) {
            var fns = [
                vibrate_1.vibrate(function () { return valueAccessor(); })(element, serviceProvider),
                artiste_1.classes(function () { return { "has-error": valueAccessor() }; })(element, serviceProvider)
            ];
            return function () { return fns.forEach(function (f) { return f(); }); };
        };
    }
    exports.error = error;
});
