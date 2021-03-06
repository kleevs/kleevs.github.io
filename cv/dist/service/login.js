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
        define(["require", "exports", "tools/service", "database/compte"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    var compte_1 = require("database/compte");
    var ILoginService = /** @class */ (function () {
        function ILoginService() {
        }
        return ILoginService;
    }());
    exports.ILoginService = ILoginService;
    var LoginService = /** @class */ (function (_super) {
        __extends(LoginService, _super);
        function LoginService(compteDatabase) {
            var _this = _super.call(this) || this;
            _this.compteDatabase = compteDatabase;
            return _this;
        }
        LoginService.prototype.connexion = function (login, password) {
            var user = this.compteDatabase.find({ login: login, password: password })[0];
            localStorage.setItem("user", JSON.stringify({ id: user.id }));
            return Promise.resolve(user && { id: user.id });
        };
        LoginService.prototype.isConnected = function () {
            return new Promise(function (resolve, reject) {
                var data = localStorage.getItem("user");
                if (data)
                    resolve(JSON.parse(data));
                else
                    resolve();
            });
        };
        LoginService = __decorate([
            service_1.Service({
                key: ILoginService
            }),
            __metadata("design:paramtypes", [compte_1.ICompteDatabase])
        ], LoginService);
        return LoginService;
    }(ILoginService));
});
