"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TryCatchable = /** @class */ (function () {
    function TryCatchable(fn, array, errors) {
        this.array = array;
        this.errors = errors;
        try {
            var res = fn();
            this.array.push(res);
            this.errors.push(undefined);
        }
        catch (e) {
            this.array.push(undefined);
            this.errors.push(e);
        }
        this.result = this.array;
    }
    TryCatchable.prototype.then = function (fn) {
        return new TryCatchable(function () { return fn(); }, this.array.map(function (_) { return _; }), this.errors.map(function (_) { return _; }));
    };
    TryCatchable.prototype.catch = function (callback) {
        if (this.errors && this.errors.filter(function (_) { return _; }).length > 0) {
            callback(this.errors);
        }
    };
    return TryCatchable;
}());
var TryCatch = /** @class */ (function () {
    function TryCatch() {
    }
    TryCatch.prototype.try = function (fn) {
        return new TryCatchable(function () { return fn(); }, [], []);
    };
    TryCatch = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TryCatch);
    return TryCatch;
}());
exports.TryCatch = TryCatch;
//# sourceMappingURL=trycatch.js.map