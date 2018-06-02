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
        define(["require", "exports", "artiste", "service/user", "tools/directive/date", "tools/directive/error", "tools/error/userError", "validation/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var user_1 = require("service/user");
    var date_1 = require("tools/directive/date");
    var error_1 = require("tools/directive/error");
    var userError_1 = require("tools/error/userError");
    var user_2 = require("validation/user");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var Detail = /** @class */ (function (_super) {
        __extends(Detail, _super);
        function Detail(observablizer, userService, router, notifier) {
            var _this = _super.call(this) || this;
            _this.userService = userService;
            _this.router = router;
            _this.notifier = notifier;
            _this.user = observablizer.convert({
                id: undefined,
                firstName: '',
                lastName: '',
                birthDate: undefined,
                login: '',
                password: '',
                isActif: false
            });
            _this.observable = {
                errors: observablizer.convert({
                    lastName: false,
                    firstName: false,
                    birthDate: false,
                    login: false,
                    password: false,
                })
            };
            return _this;
        }
        Detail.prototype.setUser = function (id) {
            var _this = this;
            this.userService.list({ id: id }).then(function (list) {
                var user = list[0];
                _this.user.id = user.id;
                _this.user.firstName = user.firstName;
                _this.user.lastName = user.lastName;
                _this.user.birthDate = user.birthDate;
                _this.user.login = user.login;
                _this.user.password = user.password;
                _this.user.isActif = user.isActif;
            });
        };
        Detail.prototype.save = function () {
            var _this = this;
            this.observable.errors.firstName = false;
            this.observable.errors.lastName = false;
            this.observable.errors.birthDate = false;
            this.observable.errors.login = false;
            this.observable.errors.password = false;
            (!this.user.id &&
                this.userService.create(this.user) ||
                this.userService.update(this.user))
                .then(function () {
                _this.router.trigger("/#/");
            }).catch(function (exception) {
                if (exception instanceof userError_1.UserError) {
                    exception.forEach(function (error) {
                        if (error.getCode() === user_2.IUserValidation.ErrorCode.lastName) {
                            _this.observable.errors.lastName = true;
                        }
                        if (error.getCode() === user_2.IUserValidation.ErrorCode.firstName) {
                            _this.observable.errors.firstName = true;
                        }
                        if (error.getCode() === user_2.IUserValidation.ErrorCode.birthDate) {
                            _this.observable.errors.birthDate = true;
                        }
                        if (error.getCode() === user_2.IUserValidation.ErrorCode.firstName) {
                            _this.observable.errors.firstName = true;
                        }
                        if (error.getCode() === user_2.IUserValidation.ErrorCode.login) {
                            _this.observable.errors.login = true;
                        }
                        if (error.getCode() === user_2.IUserValidation.ErrorCode.password) {
                            _this.observable.errors.password = true;
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
            artiste_1.View({
                template: "tmpl/detail/index.html",
                binding: {
                    "[data-id=firstname]": function (detailView) { return [
                        artiste_1.value({ get: function () { return detailView.user.firstName; }, set: function (v) { return detailView.user.firstName = v; } }),
                        error_1.error(function () { return detailView.observable.errors.firstName; })
                    ]; },
                    "[data-id=lastname]": function (detailView) { return [
                        artiste_1.value({ get: function () { return detailView.user.lastName; }, set: function (v) { return detailView.user.lastName = v; } }),
                        error_1.error(function () { return detailView.observable.errors.lastName; })
                    ]; },
                    "[data-id=birthdate]": function (detailView) { return [
                        date_1.value({ get: function () { return detailView.user.birthDate; }, set: function (v) { return detailView.user.birthDate = v; } }),
                        error_1.error(function () { return detailView.observable.errors.birthDate; })
                    ]; },
                    "[data-id=login]": function (detailView) { return [
                        artiste_1.value({ get: function () { return detailView.user.login; }, set: function (v) { return detailView.user.login = v; } }),
                        error_1.error(function () { return detailView.observable.errors.login; })
                    ]; },
                    "[data-id=password]": function (detailView) { return [
                        artiste_1.value({ get: function () { return detailView.user.password; }, set: function (v) { return detailView.user.password = v; } }),
                        error_1.error(function () { return detailView.observable.errors.password; })
                    ]; },
                    "[data-id=actif]": function (detailView) { return artiste_1.value({ get: function () { return detailView.user.isActif; }, set: function (v) { return detailView.user.isActif = v; } }); },
                    "[data-id=save]": function (detailView) { return artiste_1.click(function () { return function () { return detailView.save(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                user_1.IUserService,
                artiste_1.IRouter,
                artiste_1.INotifier])
        ], Detail);
        return Detail;
    }(IIndex));
});
