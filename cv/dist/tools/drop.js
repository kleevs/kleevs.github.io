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
    function drop(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            var view = artist_1.serviceProvider.getService(artist_1.IViewProvider).getView(element);
            $element.drop((to, e) => {
                var viewTo;
                while (!viewTo && to) {
                    viewTo = artist_1.serviceProvider.getService(artist_1.IViewProvider).getView(to);
                    to = jquery_1.jQuery(to).parent()[0];
                }
                return valueAccessor().call(element, viewTo, e);
            });
            return () => { };
        };
    }
    exports.drop = drop;
});
