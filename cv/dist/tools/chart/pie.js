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
    const googlechart_1 = require("tools/chart/googlechart");
    const jquery_1 = require("tools/extends/jquery");
    function pie(valueAccessor) {
        return (element) => {
            var $element = jquery_1.jQuery(element);
            const pie = googlechart_1.GoogleCharts.then(google => new google.PieChart(element));
            return () => {
                pie.then(pie => {
                    googlechart_1.GoogleCharts.then(google => {
                        var data = google.arrayToDataTable(valueAccessor() || []);
                        pie.draw(data, { is3D: true });
                    });
                });
            };
        };
    }
    exports.pie = pie;
});
