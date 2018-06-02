(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "artiste", "tools/date"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var date_1 = require("tools/date");
    function value(options) {
        return function (element, serviceProvider) {
            var str;
            return artiste_1.value({
                get: function () {
                    try {
                        return date_1.toStringDate(options.get());
                    }
                    catch (e) { }
                    return str || '';
                },
                set: function (value) {
                    str = value;
                    var v;
                    try {
                        v = date_1.parseDate(value);
                    }
                    catch (e) { }
                    options.set(v);
                },
                on: options.on
            })(element, serviceProvider);
        };
    }
    exports.value = value;
    function text(valueAccessor) {
        return function (element, serviceProvider) {
            return artiste_1.text(function () {
                try {
                    return date_1.toStringDate(valueAccessor());
                }
                catch (e) { }
                return '';
            })(element, serviceProvider);
        };
    }
    exports.text = text;
});
