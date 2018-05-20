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
            var $res = jquery_1.jQuery("<span class='tree-leaf'>");
            $res.append(menu);
            return $res;
        }
        else if (menu instanceof Array) {
            var $ul = jquery_1.jQuery("<ul>");
            menu.forEach(function (value) {
                var $ulchild = create(value), hasChild = $ulchild.find("li").length > 0, $li = jquery_1.jQuery("<li>");
                $li.append($ulchild);
                $ul.append($li);
                return $li;
            });
            $ul.hide();
            return $ul;
        }
        else if (typeof (menu) === "object") {
            var $ul = jquery_1.jQuery("<ul>");
            Object.keys(menu).forEach(function (key) {
                var value = menu[key];
                var $ulchild = create(value), hasChild = $ulchild.find("li").length > 0, $span = jquery_1.jQuery("<span class='tree-node tree-close " + (hasChild && 'clickable' || '') + "'>"), $li = jquery_1.jQuery("<li>");
                $span.append(key);
                $li.append($span);
                $li.append($ulchild);
                $ul.append($li);
                hasChild && $span.click(function () {
                    if ($ulchild.css('display') !== 'none') {
                        $ulchild.hide();
                        $span.removeClass('tree-open');
                        $span.addClass('tree-close');
                    }
                    else {
                        $ulchild.show();
                        $span.removeClass('tree-close');
                        $span.addClass('tree-open');
                    }
                });
            });
            $ul.hide();
            return $ul;
        }
    }
    function tree(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            $element.html("");
            return function () {
                var menu = valueAccessor(), $tree = create(menu);
                $tree.show();
                $element.html("");
                $element.append($tree);
            };
        };
    }
    exports.tree = tree;
});
