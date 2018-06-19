define(["require", "exports", "artiste", "jquery", "bootstrap"], function (require, exports, artiste_1, $) {
    "use strict";
    exports.__esModule = true;
    function modal() {
        return function (element, serviceProvider) {
            var $element = $(element);
            var isShown = false;
            return artiste_1.dom({
                "in": function () { return setTimeout(function () {
                    if (!isShown) {
                        $element.modal();
                        isShown = true;
                    }
                }); },
                out: function () { }
            })(element, serviceProvider);
        };
    }
    exports.modal = modal;
    function dismiss(valueAccessor) {
        return function (element) {
            $(element).on('hidden.bs.modal', function () {
                var v = valueAccessor();
                v && v();
            });
            return function () { };
        };
    }
    exports.dismiss = dismiss;
});
