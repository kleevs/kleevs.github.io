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
    var Cache = /** @class */ (function () {
        function Cache() {
            this.cache = {};
        }
        Cache.prototype.promise = function (key, func) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var me = _this, reslv = function () {
                    me.cache[key] = arguments[0];
                    resolve.apply(this, arguments);
                };
                _this.cache[key] ? resolve(_this.cache[key]) : func(reslv, reject);
            });
        };
        return Cache;
    }());
    exports.Cache = Cache;
});
