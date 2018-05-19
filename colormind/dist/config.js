define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = {
        path: [
            { test: /^\/?jquery/, result: baseUrl + "/node_modules/jquery/dist/jquery" },
            { test: /^\/?bootstrap/, result: baseUrl + "/node_modules/bootstrap/dist/js/bootstrap.bundle" },
            { test: /^\/?(node_modules\/*)/, result: baseUrl + "/$1" },
            { test: /^\/?(tools\/*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?(service\/*)/, result: baseUrl + "/dist/$1" },
            { test: /^\/?artiste/, result: baseUrl + "/node_modules/artistejs/dist/artiste" },
            { test: /^\/?(dist\/.*)/, result: baseUrl + "/$1" },
            { test: /^\/?(#\/.*)/, result: baseUrl + "/$1" }
        ]
    };
});
