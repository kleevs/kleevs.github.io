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
var userError_1 = require("../model/error/userError");
var trycatch_1 = require("../../tools/service/trycatch");
var UserValidation = /** @class */ (function () {
    function UserValidation(tryCatch) {
        this.tryCatch = tryCatch;
    }
    UserValidation_1 = UserValidation;
    UserValidation.prototype.assertIsValid = function (user) {
        this.tryCatch.try(function () {
            if (!user.firstName) {
                throw new userError_1.UserError(UserValidation_1.ErrorCode.firstName);
            }
        }).then(function () {
            if (!user.lastName) {
                throw new userError_1.UserError(UserValidation_1.ErrorCode.lastName);
            }
        }).then(function () {
            if (!user.birthDate) {
                throw new userError_1.UserError(UserValidation_1.ErrorCode.birthDate);
            }
        }).then(function () {
            if (!user.login) {
                throw new userError_1.UserError(UserValidation_1.ErrorCode.login);
            }
        }).then(function () {
            if (!user.password) {
                throw new userError_1.UserError(UserValidation_1.ErrorCode.password);
            }
        }).catch(function (errors) {
            throw new userError_1.UserError(errors.filter(function (_) { return _; }));
        });
    };
    UserValidation.ErrorCode = {
        firstName: "UserValidation.FN",
        lastName: "UserValidation.LN",
        birthDate: "UserValidation.BD",
        login: "UserValidation.LG",
        password: "UserValidation.PW"
    };
    UserValidation = UserValidation_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [trycatch_1.TryCatch])
    ], UserValidation);
    return UserValidation;
    var UserValidation_1;
}());
exports.UserValidation = UserValidation;
//# sourceMappingURL=user.js.map