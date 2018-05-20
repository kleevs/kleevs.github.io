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
    var OFFSET = { top: 0, left: 0 };
    function drag(valueAccessor) {
        return function (element, serviceProvider) {
            var $element = jquery_1.jQuery(element);
            var view = serviceProvider.getService(artiste_1.IViewProvider).getView(element);
            var lastFrom;
            $element.drag(function (from, e) {
                var viewFrom;
                lastFrom = from;
                while (!viewFrom && from) {
                    viewFrom = serviceProvider.getService(artiste_1.IViewProvider).getView(from);
                    from = jquery_1.jQuery(from).parent()[0];
                }
                return valueAccessor().call(element, viewFrom, e);
            });
            $element.click(function (e) {
                var $copy = $element.clone(true, true), offset = { top: OFFSET.top, left: OFFSET.left };
                e.stopPropagation();
                jquery_1.jQuery("body").one("click", function (e) {
                    jquery_1.jQuery("body").off("mousemove");
                    $copy.css("position", "initial");
                    $copy.appendTo(jquery_1.jQuery("<div>"));
                    $element.drop(e.target, e, lastFrom);
                    OFFSET = { top: 0, left: 0 };
                });
                $element.drag(e);
                OFFSET.top += 20;
                OFFSET.left += 20;
                jquery_1.jQuery("body").on('mousemove', function (e) {
                    $copy.css('top', e.pageY + offset.top);
                    $copy.css('left', e.pageX + offset.left);
                });
                jquery_1.jQuery("body").append($copy[0]);
                $copy.css("position", "absolute");
                $copy.css('top', e.pageY + offset.top);
                $copy.css('left', e.pageX + offset.left);
            });
            return function () { };
        };
    }
    exports.drag = drag;
});
