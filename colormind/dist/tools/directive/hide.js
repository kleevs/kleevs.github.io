define(["require", "exports", "jquery", "bootstrap"], function (require, exports, $) {
    "use strict";
    exports.__esModule = true;
    function hide(valueAccessor) {
        return function (element) {
            var $element = $(element);
            return function () {
                if (valueAccessor()) {
                    $element.hide();
                }
                else {
                    $element.show();
                }
            };
        };
    }
    exports.hide = hide;
});
