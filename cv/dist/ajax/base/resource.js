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
    const jquery_1 = require("tools/extends/jquery");
    function read(filename) {
        return new Promise((resolve, reject) => {
            jquery_1.jQuery("<div>").load(filename.indexOf("/") === 0 ? filename : `/${filename}`, (content, status, xhr) => {
                if (status === "success") {
                    resolve(content);
                }
                else {
                    reject(xhr.statusText);
                }
            });
        });
    }
    exports.read = read;
});
