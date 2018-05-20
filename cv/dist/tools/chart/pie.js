(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/chart/googlechart", "tools/extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var googlechart_1 = require("tools/chart/googlechart");
    var jquery_1 = require("tools/extends/jquery");
    function pie(valueAccessor) {
        return function (element) {
            var $element = jquery_1.jQuery(element);
            var pie = googlechart_1.GoogleCharts.then(function (google) { return new google.PieChart(element); });
            return function () {
                var res = valueAccessor() || [];
                pie.then(function (pie) {
                    googlechart_1.GoogleCharts.then(function (google) {
                        try {
                            var data = google.arrayToDataTable(res);
                            pie.draw(data, { is3D: true });
                        }
                        catch (e) { }
                    });
                });
            };
        };
    }
    exports.pie = pie;
});
