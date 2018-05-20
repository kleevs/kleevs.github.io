(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var script = document.createElement('script');
    script.async = true;
    script.src = "https://www.gstatic.com/charts/loader.js";
    document.head.appendChild(script);
    exports.GoogleCharts = new Promise(function (resolve) {
        script.onload = script.onreadystatechange = function () {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(function () {
                resolve(google.visualization);
            });
        };
    });
});
