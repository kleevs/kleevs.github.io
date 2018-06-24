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
var user_1 = require("../database/user");
var user_2 = require("../validation/user");
var ajax_1 = require("../../tools/service/ajax");
var UserService = /** @class */ (function () {
    function UserService(userDatabase, userValidation, ajax) {
        this.userDatabase = userDatabase;
        this.userValidation = userValidation;
        this.ajax = ajax;
    }
    UserService.prototype.create = function (user) {
        var _this = this;
        return this.ajax.do(function () {
            _this.userValidation.assertIsValid(user);
            _this.userDatabase.create(user);
        });
    };
    UserService.prototype.update = function (user) {
        var _this = this;
        return this.ajax.do(function () {
            _this.userValidation.assertIsValid(user);
            _this.userDatabase.update(user);
        });
    };
    UserService.prototype.list = function (criteria) {
        var _this = this;
        return this.ajax.do(function () {
            return _this.userDatabase.list(criteria);
        });
    };
    UserService.prototype.remove = function (user) {
        var _this = this;
        return this.ajax.do(function () {
            _this.userDatabase.remove(user);
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [user_1.UserDatabase,
            user_2.UserValidation,
            ajax_1.Ajax])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.js.map