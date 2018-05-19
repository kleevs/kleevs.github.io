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
    var ISoundPlayer = /** @class */ (function () {
        function ISoundPlayer() {
        }
        ISoundPlayer.Keys = {
            Win: "win",
            Tap: "tap",
            Popup: "popup",
            Background: "background"
        };
        return ISoundPlayer;
    }());
    exports.ISoundPlayer = ISoundPlayer;
    var SoundPlayer = /** @class */ (function (_super) {
        __extends(SoundPlayer, _super);
        function SoundPlayer() {
            var _this = _super.call(this) || this;
            _this._sound = {};
            _this.load(ISoundPlayer.Keys.Win, "win.mp3");
            _this.load(ISoundPlayer.Keys.Tap, "tap.wav");
            _this.load(ISoundPlayer.Keys.Popup, "popup.mp3");
            _this.load(ISoundPlayer.Keys.Background, "background.mp3", { loop: true });
            return _this;
        }
        SoundPlayer.prototype.load = function (key, src, option) {
            var audio = new Audio(), source = document.createElement('source');
            source.type = 'audio/mpeg';
            source.src = "/dist/content/sound/" + src;
            audio.appendChild(source);
            audio.loop = option && option.loop;
            this._sound[key] = audio;
        };
        SoundPlayer.prototype.play = function (key) {
            if (this._sound[key].paused)
                this._sound[key].play();
        };
        SoundPlayer.prototype.stop = function (key) {
            this._sound[key].pause();
        };
        SoundPlayer = __decorate([
            artiste_1.Service({
                key: ISoundPlayer
            }),
            __metadata("design:paramtypes", [])
        ], SoundPlayer);
        return SoundPlayer;
    }(ISoundPlayer));
});
