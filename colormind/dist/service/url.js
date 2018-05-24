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
    var IUrl = /** @class */ (function () {
        function IUrl() {
        }
        return IUrl;
    }());
    exports.IUrl = IUrl;
    var Url = /** @class */ (function (_super) {
        __extends(Url, _super);
        function Url() {
            var _this = _super.call(this) || this;
            _this.home = _this.getUrl("#");
            _this.niveau = _this.getUrl("#/niveau");
            _this.play = _this.getUrl("#/play");
            _this.images = _this.getUrl("dist/content/imgs");
            _this.sounds = _this.getUrl("dist/content/sound");
            _this.iconemusique = _this.getUrl("dist/content/imgs/iconemusique.png");
            _this.iconesound = _this.getUrl("dist/content/imgs/iconesound.png");
            _this.iconeno = _this.getUrl("dist/content/imgs/no.png");
            _this.iconeback = _this.getUrl("dist/content/imgs/back.png");
            return _this;
        }
        Url.prototype.getUrl = function (uri) {
            var vbaseUrl = baseUrl.replace(/\/+$/, '');
            var vurl = uri.replace(/^\/+/, '').replace(/\/+$/, '');
            return vbaseUrl + "/" + vurl;
        };
        Url = __decorate([
            artiste_1.Service({
                key: IUrl
            }),
            __metadata("design:paramtypes", [])
        ], Url);
        return Url;
    }(IUrl));
});
