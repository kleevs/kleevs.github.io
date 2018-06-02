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
        define(["require", "exports", "artiste", "database/user", "validation/user", "tools/service/ajax"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var user_1 = require("database/user");
    var user_2 = require("validation/user");
    var ajax_1 = require("tools/service/ajax");
    var IUserService = /** @class */ (function () {
        function IUserService() {
        }
        return IUserService;
    }());
    exports.IUserService = IUserService;
    var UserService = /** @class */ (function (_super) {
        __extends(UserService, _super);
        function UserService(userDatabase, userValidation, ajax) {
            var _this = _super.call(this) || this;
            _this.userDatabase = userDatabase;
            _this.userValidation = userValidation;
            _this.ajax = ajax;
            return _this;
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
            artiste_1.Service({
                key: IUserService
            }),
            __metadata("design:paramtypes", [user_1.IUserDatabase,
                user_2.IUserValidation,
                ajax_1.IAjax])
        ], UserService);
        return UserService;
    }(IUserService));
});
