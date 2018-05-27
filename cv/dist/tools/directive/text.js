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
    function text(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            var key = $element.data("text");
            return function () {
                var resource = valueAccessor();
                var text = resource && (new Function("rsc", "with(rsc) { return " + key + "; }"))(resource);
                if (text instanceof Array) {
                    var $ul = jquery_1.jQuery("<ul>");
                    $ul.append(text.map(function (t) {
                        var $li = jquery_1.jQuery("<li>");
                        $li.text(t);
                        return $li;
                    }));
                    $element.html("");
                    $element.append($ul);
                }
                else {
                    $element.text(text);
                }
            };
        };
    }
    exports.text = text;
});
