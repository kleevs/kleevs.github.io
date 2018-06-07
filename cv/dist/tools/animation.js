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
    function animation(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            $element.on("custom:view:remove", (e) => {
                console.log("remove " + element);
            });
            $element.on("custom:view:add", (e) => {
                console.log("add " + element);
            });
            return () => { };
        };
    }
    exports.animation = animation;
});
