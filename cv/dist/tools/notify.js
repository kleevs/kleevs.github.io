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
    function success(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            return () => {
                var text = valueAccessor();
                if (text) {
                    $element.notify(text, "success", { position: "right" });
                    jquery_1.jQuery.notify(text, "success", { position: "right" });
                }
            };
        };
    }
    exports.success = success;
    function error(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            return () => {
                var text = valueAccessor();
                if (text) {
                    $element.addClass("has-error");
                    $element.notify(text, "error", { position: "right" });
                    jquery_1.jQuery.notify(text, "error", { position: "right" });
                }
                else {
                    $element.removeClass("has-error");
                }
            };
        };
    }
    exports.error = error;
    function warning(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            return () => {
                var text = valueAccessor();
                if (text) {
                    $element.notify(text, "warn", { position: "right" });
                    jquery_1.jQuery.notify(text, "warn", { position: "right" });
                }
            };
        };
    }
    exports.warning = warning;
    function info(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            return () => {
                var text = valueAccessor();
                if (text) {
                    $element.notify(text, "info", { position: "right" });
                    jquery_1.jQuery.notify(text, "info", { position: "right" });
                }
            };
        };
    }
    exports.info = info;
});
