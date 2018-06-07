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
    const jquery_1 = require("./extends/jquery");
    function error(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            return () => {
                var error = valueAccessor();
                if (error) {
                    $element.addClass("has-error");
                    $element.attr("data-toggle", "tooltip");
                    $element.attr("title", error);
                }
                else {
                    $element.removeClass("has-error");
                    $element.removeAttr("data-toggle");
                    $element.removeAttr("title");
                }
            };
        };
    }
    exports.error = error;
});
