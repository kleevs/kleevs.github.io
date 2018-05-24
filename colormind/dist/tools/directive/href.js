define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function href(valueAccessor) {
        return function (element, serviceProvider) {
            return function () {
                element.setAttribute("href", valueAccessor() || '');
            };
        };
    }
    exports.href = href;
});
