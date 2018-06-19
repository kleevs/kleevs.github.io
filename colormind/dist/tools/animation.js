//https://daneden.github.io/animate.css/
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
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
                    WebkitAnimation: 'webkitAnimationEnd'
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
