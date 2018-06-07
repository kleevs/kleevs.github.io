(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "artiste"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    function text(valueAccessor) {
        return function (element, serviceProvider) {
            return artiste_1.text(function () {
                return valueAccessor() ? 'Actif' : 'Inactif';
            })(element, serviceProvider);
        };
    }
    exports.text = text;
});
