"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessError = /** @class */ (function () {
    function BusinessError(param1, param2) {
        var code, innerExceptions, message;
        if (param1 instanceof Array) {
            innerExceptions = param1;
        }
        else {
            code = param1;
        }
        if (param2 instanceof Array) {
            innerExceptions = param2;
        }
        else {
            message = param2;
        }
        this.code = code;
        this.message = message || "error " + code;
        this.innerExceptions = innerExceptions;
    }
    BusinessError.prototype.toString = function () {
        return this.message;
    };
    BusinessError.prototype.getCode = function () {
        return this.code;
    };
    BusinessError.prototype.forEach = function (callback) {
        if (!callback(this)) {
            this.innerExceptions && this.innerExceptions.forEach(function (exc) {
                exc && exc.forEach(callback);
            });
        }
    };
    return BusinessError;
}());
exports.BusinessError = BusinessError;
//# sourceMappingURL=businessError.js.map