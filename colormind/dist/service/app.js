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
define(["require", "exports", "artiste", "../data/leveldata", "database"], function (require, exports, artiste_1, leveldata_1, database_1) {
    "use strict";
    exports.__esModule = true;
    var IApp = /** @class */ (function () {
        function IApp() {
        }
        return IApp;
    }());
    exports.IApp = IApp;
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App(database) {
            var _this = _super.call(this) || this;
            _this.database = database;
            return _this;
        }
        App.prototype.listByNiveau = function (niveau) {
            return this.database.load().niveau.filter(function (n) { return n.dificulty === niveau; }).map(function (_) {
                return {
                    id: _.id,
                    number: _.number,
                    score: _.score
                };
            });
        };
        App.prototype.getById = function (id) {
            return this.database.load().niveau.filter(function (d) { return d.id === id; })[0];
        };
        App.prototype.getDataById = function (id) {
            return leveldata_1.data[parseInt("" + id / 50)][id % 50 - 1];
        };
        App.prototype.saveNiveau = function (id, score) {
            var data = this.database.load();
            var niveau = data.niveau.filter(function (d) { return d.id === id; })[0];
            niveau.score = Math.min(score, niveau.score) || score;
            this.database.save(data);
        };
        App.prototype.setMuteSound = function (isMute) {
            var data = this.database.load();
            data.isMuteSound = isMute;
            this.database.save(data);
        };
        App.prototype.getMuteSound = function () {
            var data = this.database.load();
            return data.isMuteSound;
        };
        App = __decorate([
            artiste_1.Service({
                key: IApp
            }),
            __metadata("design:paramtypes", [database_1.IDatabase])
        ], App);
        return App;
    }(IApp));
});
