//https://daneden.github.io/animate.css/
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
    function run(element, animationName) {
        return new Promise(function (resolve) {
            var listener, animationEnd = (function (el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };
                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));
            addClass(element, 'animated');
            addClass(element, animationName);
            element.addEventListener(animationEnd, listener = function () {
                removeClass(element, 'animated');
                removeClass(element, animationName);
                element.removeEventListener(animationEnd, listener);
                resolve();
            });
        });
    }
    exports.run = run;
});
