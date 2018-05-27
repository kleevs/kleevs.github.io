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
    function href(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            return function () {
                var tmp = location.pathname.split("/");
                var layout = tmp[1].indexOf("layout=") === 0 ? tmp[1].substr(7) : "";
                var hrf = valueAccessor();
                $element.attr("href", "" + (layout && "/layout=" + layout || '') + hrf);
            };
        };
    }
    exports.href = href;
});
