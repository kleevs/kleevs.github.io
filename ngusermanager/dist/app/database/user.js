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
var db_1 = require("../../tools/database/db");
var user_1 = require("../model/user");
var date_1 = require("../../tools/date");
var UserDatabase = /** @class */ (function () {
    function UserDatabase() {
        this.db = new db_1.Database("db.ng.user-manager.user");
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
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserDatabase);
    return UserDatabase;
}());
exports.UserDatabase = UserDatabase;
//# sourceMappingURL=user.js.map