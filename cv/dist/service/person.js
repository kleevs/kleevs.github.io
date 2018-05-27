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
        define(["require", "exports", "tools/service", "database/user"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    var user_1 = require("database/user");
    var IPersonService = /** @class */ (function () {
        function IPersonService() {
        }
        return IPersonService;
    }());
    exports.IPersonService = IPersonService;
    var PersonService = /** @class */ (function (_super) {
        __extends(PersonService, _super);
        function PersonService(_database) {
            var _this = _super.call(this) || this;
            _this._database = _database;
            return _this;
        }
        PersonService.prototype.search = function (filter) {
            return Promise.resolve(this._database.find({
                first: filter.first,
                last: filter.last,
                age: filter.age
            }));
        };
        PersonService.prototype.save = function (persons) {
            var _this = this;
            return Promise.resolve(persons.forEach(function (p) { return _this._database.insert(p); }));
        };
        PersonService.prototype.friend = function (id) {
            return Promise.resolve([]);
        };
        PersonService.prototype.getById = function (id) {
            return Promise.resolve(this._database.find({
                id: id
            })[0]);
        };
        PersonService = __decorate([
            service_1.Service({
                key: IPersonService
            }),
            __metadata("design:paramtypes", [user_1.IUserDatabase])
        ], PersonService);
        return PersonService;
    }(IPersonService));
});
