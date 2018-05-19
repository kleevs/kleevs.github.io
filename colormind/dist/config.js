define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = {
        path: [
            { test: /^\/?jquery/, result: "node_modules/jquery/dist/jquery" },
            { test: /^\/?bootstrap/, result: "node_modules/bootstrap/dist/js/bootstrap.bundle" },
            { test: /^\/?(node_modules\/*)/, result: "$1" },
            { test: /^\/?(tools\/*)/, result: "colormind/dist/$1" },
            { test: /^\/?artiste/, result: "node_modules/artistejs/dist/artiste" },
            { test: /^\/?(dist\/*)/, result: "colormind/dist/$1" }
        ]
    };
});
