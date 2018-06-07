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
    var OFFSET = { top: 0, left: 0 };
    function drag(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            var view = artist_1.serviceProvider.getService(artist_1.IViewProvider).getView(element);
            var lastFrom;
            $element.drag((from, e) => {
                var viewFrom;
                lastFrom = from;
                while (!viewFrom && from) {
                    viewFrom = artist_1.serviceProvider.getService(artist_1.IViewProvider).getView(from);
                    from = jquery_1.jQuery(from).parent()[0];
                }
                return valueAccessor().call(element, viewFrom, e);
            });
            $element.click((e) => {
                var $copy = $element.clone(true, true), offset = { top: OFFSET.top, left: OFFSET.left };
                e.stopPropagation();
                jquery_1.jQuery("body").one("click", (e) => {
                    jquery_1.jQuery("body").off("mousemove");
                    $copy.css("position", "initial");
                    $copy.appendTo(jquery_1.jQuery("<div>"));
                    $element.drop(e.target, e, lastFrom);
                    OFFSET = { top: 0, left: 0 };
                });
                $element.drag(e);
                OFFSET.top += 20;
                OFFSET.left += 20;
                jquery_1.jQuery("body").on('mousemove', (e) => {
                    $copy.css('top', e.pageY + offset.top);
                    $copy.css('left', e.pageX + offset.left);
                });
                jquery_1.jQuery("body").append($copy[0]);
                $copy.css("position", "absolute");
                $copy.css('top', e.pageY + offset.top);
                $copy.css('left', e.pageX + offset.left);
            });
            return () => { };
        };
    }
    exports.drag = drag;
});
