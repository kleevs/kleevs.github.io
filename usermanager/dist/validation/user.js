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
        define(["require", "exports", "artiste", "tools/error/userError", "tools/service/trycatch"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var userError_1 = require("tools/error/userError");
    var trycatch_1 = require("tools/service/trycatch");
    var IUserValidation = /** @class */ (function () {
        function IUserValidation() {
        }
        IUserValidation.ErrorCode = {
            firstName: "UserValidation.FN",
            lastName: "UserValidation.LN",
            birthDate: "UserValidation.BD",
            login: "UserValidation.LG",
            password: "UserValidation.PW"
        };
        return IUserValidation;
    }());
    exports.IUserValidation = IUserValidation;
    var UserValidation = /** @class */ (function (_super) {
        __extends(UserValidation, _super);
        function UserValidation(tryCatch) {
            var _this = _super.call(this) || this;
            _this.tryCatch = tryCatch;
            return _this;
        }
        UserValidation.prototype.assertIsValid = function (user) {
            this.tryCatch.try(function () {
                if (!user.firstName) {
                    throw new userError_1.UserError(IUserValidation.ErrorCode.firstName);
                }
            }).then(function () {
                if (!user.lastName) {
                    throw new userError_1.UserError(IUserValidation.ErrorCode.lastName);
                }
            }).then(function () {
                if (!user.birthDate) {
                    throw new userError_1.UserError(IUserValidation.ErrorCode.birthDate);
                }
            }).then(function () {
                if (!user.login) {
                    throw new userError_1.UserError(IUserValidation.ErrorCode.login);
                }
            }).then(function () {
                if (!user.password) {
                    throw new userError_1.UserError(IUserValidation.ErrorCode.password);
                }
            }).catch(function (errors) {
                throw new userError_1.UserError(errors.filter(function (_) { return _; }));
            });
        };
        UserValidation = __decorate([
            artiste_1.Service({
                key: IUserValidation
            }),
            __metadata("design:paramtypes", [trycatch_1.ITryCatch])
        ], UserValidation);
        return UserValidation;
    }(IUserValidation));
});
