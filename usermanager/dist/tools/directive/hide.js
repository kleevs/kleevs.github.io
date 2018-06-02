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
    function addClass(element, name) {
        var arr;
        arr = element.className.split(" ").filter(function (_) { return _; });
        if (arr.indexOf(name) == -1) {
            arr.push(name);
        }
        element.className = arr.join(" ");
    }
    function removeClass(element, name) {
        var regex = new RegExp("\\b" + name + "\\b", "g");
        element.className = element.className.replace(regex, "");
    }
    function hide(valueAccessor) {
        return function (element, serviceProvider) {
            return function () {
                var visible = !valueAccessor();
                if (visible) {
                    removeClass(element, "hide");
                }
                else {
                    addClass(element, "hide");
                }
            };
        };
    }
    exports.hide = hide;
});
