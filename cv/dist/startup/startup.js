(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "node_modules/artist/dist/artist", "tools/router"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("node_modules/artist/dist/artist");
    const router_1 = require("tools/router");
    //import 'tools/extends/promise';
    artist_1.startup("[layout]", router_1.IRouter);
});
