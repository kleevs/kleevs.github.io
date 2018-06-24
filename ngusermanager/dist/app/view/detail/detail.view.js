"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var angular_extend_1 = require("angular.extend");
var user_1 = require("../../service/user");
var router_1 = require("../../../tools/service/router");
var user_2 = require("../../validation/user");
var user_3 = require("../../model/user");
var userError_1 = require("../../model/error/userError");
var DetailView = /** @class */ (function () {
    function DetailView() {
    }
    return DetailView;
}());
exports.DetailView = DetailView;
var Detail = /** @class */ (function (_super) {
    __extends(Detail, _super);
    function Detail(userService, router) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.router = router;
        _this.user = new user_3.User();
        return _this;
    }
    Detail.prototype.setUser = function (id) {
        var _this = this;
        this.userService.list({ id: id }).then(function (list) {
            var user = list[0];
            if (user) {
                _this.user.id = user.id;
                _this.user.firstName = user.firstName;
                _this.user.lastName = user.lastName;
                _this.user.birthDate = user.birthDate;
                _this.user.login = user.login;
                _this.user.password = user.password;
                _this.user.isActif = user.isActif;
            }
        });
    };
    Detail.prototype.save = function () {
        // this.observable.errors.firstName = false;
        // this.observable.errors.lastName = false;
        // this.observable.errors.birthDate = false;
        // this.observable.errors.login = false;
        // this.observable.errors.password = false;
        var _this = this;
        (!this.user.id &&
            this.userService.create(this.user) ||
            this.userService.update(this.user))
            .then(function () {
            _this.router.trigger("./#/");
        }).catch(function (exception) {
            if (exception instanceof userError_1.UserError) {
                exception.forEach(function (error) {
                    if (error.getCode() === user_2.UserValidation.ErrorCode.lastName) {
                        // this.observable.errors.lastName = true;
                    }
                    if (error.getCode() === user_2.UserValidation.ErrorCode.firstName) {
                        // this.observable.errors.firstName = true;
                    }
                    if (error.getCode() === user_2.UserValidation.ErrorCode.birthDate) {
                        // this.observable.errors.birthDate = true;
                    }
                    if (error.getCode() === user_2.UserValidation.ErrorCode.firstName) {
                        // this.observable.errors.firstName = true;
                    }
                    if (error.getCode() === user_2.UserValidation.ErrorCode.login) {
                        // this.observable.errors.login = true;
                    }
                    if (error.getCode() === user_2.UserValidation.ErrorCode.password) {
                        // this.observable.errors.password = true;
                    }
                    return false;
                });
            }
            else {
                throw exception;
            }
        });
        return true;
    };
    Detail = __decorate([
        angular_extend_1.View({
            html: './dist/app/view/detail/detail.html'
        }),
        __metadata("design:paramtypes", [user_1.UserService, router_1.Router])
    ], Detail);
    return Detail;
}(DetailView));
//# sourceMappingURL=detail.view.js.map