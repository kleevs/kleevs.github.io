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
        define(["require", "exports", "artiste", "tools/database/db", "model/user", "tools/date"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var db_1 = require("tools/database/db");
    var user_1 = require("model/user");
    var date_1 = require("tools/date");
    var IUserDatabase = /** @class */ (function () {
        function IUserDatabase() {
        }
        return IUserDatabase;
    }());
    exports.IUserDatabase = IUserDatabase;
    var UserDatabase = /** @class */ (function (_super) {
        __extends(UserDatabase, _super);
        function UserDatabase() {
            var _this = _super.call(this) || this;
            _this.db = new db_1.Database("db.user-manager.user");
            return _this;
        }
        UserDatabase.prototype.create = function (user) {
            this.db.insert({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: date_1.toTime(user.birthDate),
                login: user.login,
                password: user.password,
                isActif: user.isActif
            });
        };
        UserDatabase.prototype.update = function (user) {
            this.db.update({ id: user.id }, {
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: date_1.toTime(user.birthDate),
                login: user.login,
                password: user.password,
                isActif: user.isActif
            });
        };
        UserDatabase.prototype.list = function (criteria) {
            return this.db.find(criteria).map(function (u) {
                var user = new user_1.User();
                user.id = u.id;
                user.firstName = u.firstName,
                    user.lastName = u.lastName,
                    user.birthDate = date_1.parseTime(u.birthDate),
                    user.login = u.login,
                    user.password = u.password,
                    user.isActif = u.isActif;
                return user;
            });
        };
        UserDatabase.prototype.remove = function (user) {
            this.db.remove({ id: user.id });
        };
        UserDatabase = __decorate([
            artiste_1.Service({
                key: IUserDatabase
            }),
            __metadata("design:paramtypes", [])
        ], UserDatabase);
        return UserDatabase;
    }(IUserDatabase));
});
