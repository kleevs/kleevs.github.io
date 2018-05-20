(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jquery_1 = require("tools/extends/jquery");
    function datatable(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            var $thead = jquery_1.jQuery("<thead>");
            var $tbody = jquery_1.jQuery("<tbody>");
            var $tr = jquery_1.jQuery("<tr>");
            var conf = valueAccessor();
            Object.keys(conf.columns).forEach(function (key) {
                var item = conf.columns[key];
                var $th = jquery_1.jQuery("<th>");
                $th.html(item.header);
                $tr.append($th);
            });
            $thead.append($tr);
            $element.html("");
            $element.append($thead);
            $element.append($tbody);
            return function () {
                var conf = valueAccessor();
                var data = conf && conf.data;
                $tbody.html("");
                data.forEach(function (row) {
                    var $tr = jquery_1.jQuery("<tr>");
                    row && Object.keys(conf.columns).forEach(function (key) {
                        var item = conf.columns[key];
                        var $td = jquery_1.jQuery("<td>");
                        $td.html(item.content || row[key] && row[key].toString && row[key].toString() || "");
                        $tr.append($td);
                    });
                    $tbody.append($tr);
                });
            };
        };
    }
    exports.datatable = datatable;
});
