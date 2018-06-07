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
        define(["require", "exports", "artiste", "tools/service/trycatch", "tools/error/businessError"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var trycatch_1 = require("tools/service/trycatch");
    var businessError_1 = require("tools/error/businessError");
    var ILoginValidation = /** @class */ (function () {
        function ILoginValidation() {
        }
        ILoginValidation.ErrorCode = {
            NoValidEmail: "LoginValidation.NoValidEmail"
        };
        return ILoginValidation;
    }());
    exports.ILoginValidation = ILoginValidation;
    var LoginValidation = /** @class */ (function (_super) {
        __extends(LoginValidation, _super);
        function LoginValidation(tryCatch) {
            var _this = _super.call(this) || this;
            _this.tryCatch = tryCatch;
            return _this;
        }
        LoginValidation.prototype.assertIsValid = function (login) {
            this.tryCatch.try(function () {
                if (!login.match(/^[a-zA-Z][a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*@[a-zA-Z][a-zA-Z0-9-]*(?:\.[a-zA-Z0-9-]+)+$/)) {
                    throw new businessError_1.BusinessError(ILoginValidation.ErrorCode.NoValidEmail, login);
                }
            }).catch(function (errors) {
                throw new businessError_1.BusinessError(errors.filter(function (_) { return _; }));
            });
        };
        LoginValidation = __decorate([
            artiste_1.Service({
                key: ILoginValidation
            }),
            __metadata("design:paramtypes", [trycatch_1.ITryCatch])
        ], LoginValidation);
        return LoginValidation;
    }(ILoginValidation));
});
