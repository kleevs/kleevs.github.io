(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/animation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var animation_1 = require("tools/animation");
    function rotateOut(valueAccessor) {
        return function (element, serviceProvider) {
            var last;
            return function () {
                var fn = valueAccessor();
                if (!last && fn) {
                    last = fn;
                    animation_1.run(element, 'rotateOut').then(function () {
                        fn();
                    });
                }
                else if (!fn) {
                    last = undefined;
                }
            };
        };
    }
    exports.rotateOut = rotateOut;
});
