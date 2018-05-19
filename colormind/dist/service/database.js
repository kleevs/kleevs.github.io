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
define(["require", "exports", "artiste"], function (require, exports, artiste_1) {
    "use strict";
    exports.__esModule = true;
    var IDatabase = /** @class */ (function () {
        function IDatabase() {
        }
        return IDatabase;
    }());
    exports.IDatabase = IDatabase;
    var Database = /** @class */ (function (_super) {
        __extends(Database, _super);
        function Database() {
            return _super.call(this) || this;
        }
        Database.prototype.save = function (data) {
            localStorage.setItem("database", JSON.stringify(data));
        };
        Database.prototype.load = function () {
            var str = localStorage.getItem("database");
            var data;
            if (!str) {
                data = {
                    isMuteSound: false,
                    niveau: []
                };
                for (var i = 0; i < 150; i++) {
                    data.niveau.push({
                        id: i + 1,
                        number: i % 50 + 1,
                        score: 0,
                        dificulty: parseInt("" + i / 50) + 1
                    });
                }
            }
            else {
                data = JSON.parse(str);
            }
            return data;
        };
        Database = __decorate([
            artiste_1.Service({
                key: IDatabase
            }),
            __metadata("design:paramtypes", [])
        ], Database);
        return Database;
    }(IDatabase));
});
