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
    exports.jQuery = $;
    $.fn.extend({
        drag: function (event) {
            var _this = this;
            var $element = this;
            var callback = event instanceof Function && event;
            if (callback) {
                $element.on("custom:drag", function (e) {
                    _this.each(function () {
                        callback.call(this, $(this).parents(".drag-drop-container")[0], e);
                    });
                });
            }
            else {
                $element.trigger("custom:drag", event);
            }
        },
        drop: function (to, event, defaultTo) {
            var _this = this;
            var $element = this;
            var callback = to instanceof Function && to;
            if (callback) {
                $element.on("custom:drop", function (e, to, defaultTo) {
                    _this.each(function () {
                        var t = $(to).hasClass("drag-drop-container") ? to : $(to).parents(".drag-drop-container")[0];
                        t = t || ($(defaultTo).hasClass("drag-drop-container") ? defaultTo : $(defaultTo).parents(".drag-drop-container")[0]);
                        callback.call(this, t, e);
                    });
                });
            }
            else {
                $element.trigger("custom:drop", [to, defaultTo], event);
            }
        },
        move: function (event) {
            var $element = this;
            var callback = event instanceof Function && event;
            if (callback) {
                this.each(function () {
                    var _this = this;
                    var $el = $(this);
                    $el.on("custom:move", function (evnt, e) {
                        var $copy = $el.clone(true, true), $destination = e && e.into && $(e.into).parents("body")[0] && $(e.into), x = $el.offset().left, y = $el.offset().top;
                        if ($destination) {
                            $("body").append($copy[0]);
                            $copy.addClass("transition-position");
                            $copy.css("position", "absolute");
                            $copy.css('top', y);
                            $copy.css('left', x);
                            var destination = {
                                x: $destination.offset().left + ($destination.width() - $copy.width()) / 2,
                                y: $destination.offset().top + ($destination.height() - $copy.height()) / 2
                            };
                            setTimeout(function () {
                                $copy.css('top', destination.y);
                                $copy.css('left', destination.x);
                            });
                            setTimeout(function () {
                                $copy.appendTo($("<div>"));
                                callback && callback.call(_this, e);
                            }, 600);
                        }
                    });
                });
            }
            else {
                $element.trigger("custom:move", event);
            }
        }
    });
});
