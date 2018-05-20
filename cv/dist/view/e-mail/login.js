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
        define(["require", "exports", "artiste", "service/login", "tools/submit"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var login_1 = require("service/login");
    var submit_1 = require("tools/submit");
    var ILogin = /** @class */ (function () {
        function ILogin() {
        }
        return ILogin;
    }());
    exports.ILogin = ILogin;
    var LoginView = /** @class */ (function (_super) {
        __extends(LoginView, _super);
        function LoginView(observalizer, _loginService) {
            var _this = _super.call(this) || this;
            _this._loginService = _loginService;
            _this.observable = observalizer.convert({
                login: undefined,
                password: undefined,
                error: undefined
            });
            return _this;
        }
        LoginView.prototype.connect = function () {
            var _this = this;
            this.observable.error = "";
            this._loginService.connexion(this.observable.login, this.observable.password)
                .then(function (v) {
                if (v) {
                    location.reload();
                }
                else {
                    _this.observable.error = "Utilisateur et/ou mot de passe incorrect.";
                }
            });
            return false;
        };
        LoginView = __decorate([
            artiste_1.View({
                template: "tmpl/email/login.html",
                binding: {
                    "[data-text=title]": function (login) { return artiste_1.text(function () { return "Boîte e-mail"; }); },
                    "[data-text=description]": function (login) { return artiste_1.text(function () { return "Connectez vous à une des fausses boîtes e-mail pour tester l'interface utilisateur."; }); },
                    "[data-text=login]": function (login) { return artiste_1.text(function () { return "Login"; }); },
                    "[data-text=indication]": function (login) { return artiste_1.text(function () { return "Entrez votre nom d'utilisateur et votre mot de passe."; }); },
                    "[data-text=username]": function (login) { return artiste_1.text(function () { return "Nom d'utilisateur"; }); },
                    "[data-text=password]": function (login) { return artiste_1.text(function () { return "Mot de passe"; }); },
                    "[data-text=signin]": function (login) { return artiste_1.text(function () { return "Connexion"; }); },
                    "form": function (indx) { return submit_1.submit(function () { return function () { return indx.connect(); }; }); },
                    "[data-id=login]": function (indx) { return artiste_1.value({ get: function () { return indx.observable.login; }, set: function (v) { return indx.observable.login = v; } }); },
                    "[data-id=password]": function (indx) { return artiste_1.value({ get: function () { return indx.observable.password; }, set: function (v) { return indx.observable.password = v; } }); },
                    "[data-id=error]": function (indx) { return artiste_1.text(function () { return indx.observable.error; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, login_1.ILoginService])
        ], LoginView);
        return LoginView;
    }(ILogin));
});
