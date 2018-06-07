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
    function text(valueAccessor) {
        return function (element, serviceProvider) {
            var $element = $(element);
            return (function () {
                var val = valueAccessor() || '';
                val = $('<div>').text(val).html();
                $element.html(val.replace(/\n/gi, '<br/>'));
            });
        };
    }
    exports.text = text;
});
