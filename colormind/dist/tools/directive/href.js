define(["require", "exports", "service/router", "jquery", "bootstrap"], function (require, exports, router_1, $) {
    "use strict";
    exports.__esModule = true;
    function href(valueAccessor) {
        return function (element, serviceProvider) {
            var $element = $(element);
            return function () {
                var hrf = serviceProvider.getService(router_1.IRouter).getUrl(valueAccessor() || '');
                $element.attr("href", hrf);
            };
        };
    }
    exports.href = href;
});
