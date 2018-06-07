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
        define(["require", "exports", "artiste", "validation/login", "tools/service/notify", "tools/directive/submit"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var login_1 = require("validation/login");
    var notify_1 = require("tools/service/notify");
    var submit_1 = require("tools/directive/submit");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        IIndex.Event = {
            Signin: new artiste_1.Event("login:index:signin")
        };
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var Login = /** @class */ (function (_super) {
        __extends(Login, _super);
        function Login(observablizer, notifier, loginValidation) {
            var _this = _super.call(this) || this;
            _this.notifier = notifier;
            _this.loginValidation = loginValidation;
            _this.observable = observablizer.convert({ login: undefined });
            return _this;
        }
        Login.prototype.signin = function () {
            this.loginValidation.assertIsValid(this.observable.login);
            this.notifier.forEvent(IIndex.Event.Signin).notify(this, this.observable.login);
        };
        Login = __decorate([
            artiste_1.View({
                template: "tmpl/login/index.html",
                binding: {
                    "[data-id=login]": function (loginView) { return artiste_1.value({
                        get: function () { return loginView.observable.login; },
                        set: function (v) { return loginView.observable.login = v; }
                    }); },
                    "form": function (loginView) { return submit_1.submit(function () { return function (e) { return loginView.signin(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                notify_1.INotifier,
                login_1.ILoginValidation])
        ], Login);
        return Login;
    }(IIndex));
});
