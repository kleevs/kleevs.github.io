(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./extends/jquery", "artiste"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("./extends/jquery");
    var artiste_1 = require("artiste");
    function move(valueAccessor) {
        return function (element, serviceProvider) {
            var $element = jquery_1.jQuery(element);
            $element.move(function (e) {
                e.resolve();
            });
            $element.click(function () {
                valueAccessor(function (view) {
                    return new Promise(function (resolve) {
                        serviceProvider.getService(artiste_1.IViewProvider).getNode(view).then(function (destination) {
                            $element.move({ into: destination, resolve: resolve });
                        });
                    });
                });
            });
            return function () { };
        };
    }
    exports.move = move;
});
