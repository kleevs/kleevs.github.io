var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "artiste"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
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
    var ITryCatch = /** @class */ (function () {
        function ITryCatch() {
        }
        return ITryCatch;
    }());
    exports.ITryCatch = ITryCatch;
    var TryCatch = /** @class */ (function (_super) {
        __extends(TryCatch, _super);
        function TryCatch() {
            return _super.call(this) || this;
        }
        TryCatch.prototype.try = function (fn) {
            return new TryCatchable(function () { return fn(); }, [], []);
        };
        TryCatch = __decorate([
            artiste_1.Service({
                key: ITryCatch
            }),
            __metadata("design:paramtypes", [])
        ], TryCatch);
        return TryCatch;
    }(ITryCatch));
});
