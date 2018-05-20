(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("tools/extends/jquery");
    function create(menu) {
        if (typeof (menu) === "string") {
            return menu;
        }
        else if (menu instanceof Array) {
            var $ul = jquery_1.jQuery("<ul>");
            menu.forEach(function (value) {
                var $li = jquery_1.jQuery("<li>");
                $li.append(create(value));
                $ul.append($li);
                return $li;
            });
            return $ul;
        }
        else if (typeof (menu) === "object") {
            var $ul = jquery_1.jQuery("<ul>");
            Object.keys(menu).forEach(function (key) {
                var value = menu[key];
                var $li = jquery_1.jQuery("<li>");
                $li.append(key);
                $li.append(create(value));
                $ul.append($li);
            });
            return $ul;
        }
    }
    function menu(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            $element.html("");
            return function () {
                var menu = valueAccessor();
                $element.html("");
                $element.append(create(menu));
            };
        };
    }
    exports.menu = menu;
});
