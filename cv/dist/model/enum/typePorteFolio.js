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
    var TypePorteFolio;
    (function (TypePorteFolio) {
        TypePorteFolio[TypePorteFolio["screen"] = 0] = "screen";
        TypePorteFolio[TypePorteFolio["layout"] = 1] = "layout";
    })(TypePorteFolio = exports.TypePorteFolio || (exports.TypePorteFolio = {}));
});
