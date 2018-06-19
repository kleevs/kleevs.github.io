define(["require", "exports", "tools/animation"], function (require, exports, animation_1) {
    "use strict";
    exports.__esModule = true;
    function rotateOut(valueAccessor) {
        return function (element, serviceProvider) {
            var last;
            return function () {
                var fn = valueAccessor();
                if (!last && fn) {
                    last = fn;
                    animation_1.run(element, 'rotateOut').then(function () {
                        fn();
                    });
                }
                else if (!fn) {
                    last = undefined;
                }
            };
        };
    }
    exports.rotateOut = rotateOut;
});
