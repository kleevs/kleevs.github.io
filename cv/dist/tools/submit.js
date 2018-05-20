(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("./extends/jquery");
    function submit(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            $element.submit(function (e) {
                return valueAccessor().call(element, e) || false;
            });
            return function () { };
        };
    }
    exports.submit = submit;
});
