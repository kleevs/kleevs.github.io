(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("tools/extends/jquery");
    function input(valueAccessor) {
        return function (element) {
            jquery_1.jQuery(element).on("input", function (e) {
                valueAccessor().call(element, e);
                return true;
            });
            return function () { };
        };
    }
    exports.input = input;
});
