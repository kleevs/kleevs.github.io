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
define(["require", "exports", "artiste", "imageLoader"], function (require, exports, artiste_1, imageLoader_1) {
    "use strict";
    exports.__esModule = true;
    var IFactory = /** @class */ (function () {
        function IFactory() {
        }
        return IFactory;
    }());
    exports.IFactory = IFactory;
    var Factory = /** @class */ (function (_super) {
        __extends(Factory, _super);
        function Factory(imageLoader) {
            var _this = _super.call(this) || this;
            _this.imageLoader = imageLoader;
            return _this;
        }
        Factory.prototype.create = function (level) {
            return this.imageLoader.load([
                "sol",
                "invisible",
                "mur",
                "blue",
                "sol.blue",
                "red",
                "sol.red",
                "yellow",
                "sol.yellow",
                "green",
                "sol.green",
                "mur.blue",
                "mur.red",
                "mur.yellow",
                "mur.green"
            ]).then(function (result) {
                var selectedColor = 0;
                var nbcolumn = level.colonne;
                var nbrow = parseInt("" + level.data.length / level.colonne);
                var sprites = level.data.map(function (n, i) {
                    return n !== 1 && n !== 2 ? {
                        image: result[0],
                        x: i % nbcolumn * 50,
                        y: parseInt("" + i / nbcolumn) * 50,
                        width: 50,
                        height: 50,
                        zindex: 1,
                        value: 0,
                        block: false,
                        color: -1,
                        moving: undefined,
                        position: { x: i % nbcolumn * 50, y: parseInt("" + i / nbcolumn) * 50 }
                    } : undefined;
                }).concat(level.data.map(function (n, i) {
                    return n !== 0 ? {
                        image: result[n],
                        x: i % nbcolumn * 50,
                        y: parseInt("" + i / nbcolumn) * 50,
                        width: 50,
                        height: 50,
                        zindex: 1,
                        value: n,
                        block: n === 3 || n === 5 || n === 7 || n === 9 || n === 1 || n === 2,
                        color: n === 3 ? 0 : n === 5 ? 1 : n === 7 ? 2 : n === 9 ? 3 : -1,
                        moving: undefined,
                        position: { x: i % nbcolumn * 50, y: parseInt("" + i / nbcolumn) * 50 }
                    } : undefined;
                })).filter(function (_) { return _; });
                return sprites;
            });
        };
        Factory = __decorate([
            artiste_1.Service({
                key: IFactory
            }),
            __metadata("design:paramtypes", [imageLoader_1.IImageLoader])
        ], Factory);
        return Factory;
    }(IFactory));
});
