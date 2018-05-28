(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const jquery_1 = require("../extends/jquery");
    function focus(valueAccessor) {
        return (element) => {
            jquery_1.jQuery(element).focus((e) => {
                valueAccessor().call(element, e);
                return true;
            });
            return () => { };
        };
    }
    exports.focus = focus;
});
