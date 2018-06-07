(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function submit(valueAccessor) {
        return function (element) {
            var $element = $(element);
            $element.submit(function (e) {
                return valueAccessor().call(element, e) || false;
            });
            return function () { };
        };
    }
    exports.submit = submit;
});
