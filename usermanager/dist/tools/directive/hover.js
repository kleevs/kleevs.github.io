(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/animation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var animation_1 = require("tools/animation");
    function hover() {
        return function (element, serviceProvider) {
            element.addEventListener("mouseover", function (event) {
                setTimeout(function () {
                    var e = event.target;
                    if (e.parentElement.querySelector(':hover') === e && e.className.split(" ").indexOf("attention-hover") > -1) {
                        animation_1.run(e, "shake");
                        $(e).popover({ animation: true, placement: "bottom" });
                        $(e).popover("show");
                        setTimeout(function () {
                            $(e).popover("hide");
                        }, 5000);
                        $(e).click(function () {
                            $(e).popover("hide");
                        });
                    }
                }, 1500);
            });
            return function () {
            };
        };
    }
    exports.hover = hover;
});
