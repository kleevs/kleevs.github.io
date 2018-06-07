(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "artiste", "tools/animation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var animation_1 = require("tools/animation");
    function view(valueAccessor) {
        return function (element, serviceProvider) {
            return artiste_1.view(valueAccessor, {
                beforeIn: function (element) {
                    animation_1.run(element, "fadeIn");
                }
            })(element, serviceProvider);
        };
    }
    exports.view = view;
});
