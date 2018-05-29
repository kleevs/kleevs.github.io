(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/extends/jquery", "artiste"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("tools/extends/jquery");
    var artiste_1 = require("artiste");
    function view(valueAccessor) {
        return function (element, serviceProvider) {
            var $element = jquery_1.jQuery(element);
            var viewProvider = serviceProvider.getService(artiste_1.IViewProvider);
            return artiste_1.view(function () {
                var view = valueAccessor();
                $element.removeClass("animated");
                $element.addClass("invisible");
                view && viewProvider.getNode(view).then(function () { return setTimeout(function () {
                    $element.addClass("animated");
                    $element.removeClass("invisible");
                }); });
                return view;
            })(element, serviceProvider);
        };
    }
    exports.view = view;
});
