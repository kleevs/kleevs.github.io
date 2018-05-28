(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./extends/jquery", "node_modules/artist/dist/artist"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const jquery_1 = require("./extends/jquery");
    const artist_1 = require("node_modules/artist/dist/artist");
    function move(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            $element.move((e) => {
                e.resolve();
            });
            $element.click(() => {
                valueAccessor((view) => {
                    return new Promise((resolve) => {
                        artist_1.serviceProvider.getService(artist_1.IViewProvider).getNode(view).then((destination) => {
                            $element.move({ into: destination, resolve: resolve });
                        });
                    });
                });
            });
            return () => { };
        };
    }
    exports.move = move;
});
