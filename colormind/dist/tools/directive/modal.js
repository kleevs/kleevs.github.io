define(["require", "exports", "artiste", "jquery", "bootstrap"], function (require, exports, artiste_1, $) {
    "use strict";
    exports.__esModule = true;
    function modal() {
        var $element;
        return [
            function (element) { $element = $(element); return function () { }; },
            artiste_1.dom({ "in": function () { return setTimeout(function () { return $element.modal(); }); }, out: function () { } })
        ];
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
