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
    exports.default = {
        path: [
            { test: /^\/?jquery/, result: baseUrl + "/node_modules/jquery/dist/jquery" },
            { test: /^\/?bootstrap/, result: baseUrl + "/node_modules/bootstrap/dist/js/bootstrap.bundle" },
            { test: /^\/?(node_modules\/.*)/, result: baseUrl + "/$1" },
            { test: /^\/?(tools\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(service\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(view\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(model\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(ajax\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(database\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(tmpl\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(sql\/.*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?artiste/, result: baseUrl + "/node_modules/artistejs/dist/artiste" },
            { test: /^\/?(dist\/.*)/, result: baseUrl + "/$1" },
            { test: /^\/?(#\/.*)/, result: baseUrl + "/$1" }
        ]
    };
});
