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
define(["require", "exports", "artiste", "../service/app", "../service/engine", "../tools/directive/canvas", "../tools/directive/joystick", "../service/soundPlayer", "../service/router", "tools/directive/hide", "tools/directive/mousemove", "service/imageLoader"], function (require, exports, artiste_1, app_1, engine_1, canvas_1, joystick_1, soundPlayer_1, router_1, hide_1, mousemove_1, imageLoader_1) {
    "use strict";
    exports.__esModule = true;
    var IPlay = /** @class */ (function () {
        function IPlay() {
        }
        IPlay.Event = {
            Modal: new artiste_1.Event("IPlay.Modal"),
            MuteMusic: new artiste_1.Event("IPlay.MuteMusic")
        };
        return IPlay;
    }());
    exports.IPlay = IPlay;
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play(app, observablizer, engine, notifier, soundPlayer, imageLoader, router) {
            var _this = _super.call(this) || this;
            _this.app = app;
            _this.engine = engine;
            _this.notifier = notifier;
            _this.imageLoader = imageLoader;
            _this.router = router;
            _this.color = ['blue', 'red', 'yellow', 'green'];
            _this.avaibleColor = [];
            _this.observable = observablizer.convert({
                id: undefined,
                number: undefined,
                score: undefined,
                backNumber: 0,
                indexColor: 0,
                selector: 0,
                screen: undefined,
                nbcols: 0,
                nbrows: 0,
                isMuteSound: _this.app.getMuteSound()
            });
            _this.listeners = [
                notifier.forEvent(engine_1.IEngine.Event.Modal).listen(engine, function (item) {
                    _this.notifier.forEvent(IPlay.Event.Modal).notify(_this, {
                        message: item.message,
                        callback: item.callback,
                        isMute: _this.observable.isMuteSound
                    });
                }),
                _this.notifier.forEvent(engine_1.IEngine.Event.Sound).listen(engine, function (key) {
                    !_this.observable.isMuteSound && soundPlayer.play(key);
                }),
                _this.notifier.forEvent(engine_1.IEngine.Event.Cycle).listen(engine, function (obj) {
                    _this.loadImage().then(function (images) {
                        var res = [];
                        obj && obj.forEach(function (item, i) {
                            var x = (i % _this.observable.nbcols) * 50;
                            var y = parseInt("" + i / _this.observable.nbcols) * 50;
                            item.sol && res.push({
                                image: images[item.sol.value],
                                x: x,
                                y: y,
                                width: 50,
                                height: 50,
                                zindex: 1
                            });
                            item.item && res.push({
                                image: images[item.item.value],
                                x: x,
                                y: y,
                                width: 50,
                                height: 50,
                                zindex: 1
                            });
                            item.sol;
                        });
                        _this.observable.screen = res;
                    });
                })
            ];
            return _this;
        }
        Play.prototype.init = function (id, isMute) {
            var data = this.app.getById(id);
            this.isMuteMusic = isMute;
            this.notifier.forEvent(IPlay.Event.MuteMusic).notify(this, isMute);
            this.observable.id = id;
            this.observable.number = data.number;
            this.observable.score = 0;
            this.observable.backNumber = 0;
            var level = this.app.getDataById(id);
            this.observable.nbcols = level.colonne;
            this.observable.nbrows = parseInt("" + level.data.length / level.colonne);
            this.game = this.engine.create(id, level);
            this.observable.score = this.game.getScore();
            this.observable.backNumber = this.game.getBackNumber();
            this.tutotrial(id);
            this.game.controller.setSelectedColor(this.observable.selector);
            this.avaibleColor = level.data
                .filter(function (d) { return d === 3 || d === 5 || d === 7 || d === 9; })
                .filter(function (d, pos, arr) { return arr.indexOf(d) === pos; })
                .map(function (d) { return (d - 3) / 2; })
                .sort();
            this.observable.selector = this.avaibleColor[this.observable.indexColor];
        };
        Play.prototype.changeSelector = function () {
            this.observable.indexColor = (this.observable.indexColor + 1) % this.avaibleColor.length;
            this.observable.selector = this.avaibleColor[this.observable.indexColor];
            this.game.controller.setSelectedColor(this.observable.selector);
            return true;
        };
        Play.prototype.colorUrl = function (color) {
            return this.router.getUrl("/dist/content/imgs/" + color + ".png");
        };
        Play.prototype.muteMusic = function () {
            this.isMuteMusic = !this.isMuteMusic;
            this.notifier.forEvent(IPlay.Event.MuteMusic).notify(this, this.isMuteMusic);
            return true;
        };
        Play.prototype.muteSound = function () {
            this.observable.isMuteSound = !this.observable.isMuteSound;
            this.app.setMuteSound(this.observable.isMuteSound);
            return true;
        };
        Play.prototype.controller = function (e) {
            var game = this.game;
            e.cmd === "LEFT" && game.controller.left() ||
                e.cmd === "UP" && game.controller.up() ||
                e.cmd === "RIGHT" && game.controller.right() ||
                e.cmd === "DOWN" && game.controller.down() ||
                e.cmd === "BACK" && this.observable.backNumber > 0 && game.controller.back();
            this.observable.score = game.getScore();
            this.observable.backNumber = game.getBackNumber();
            return true;
        };
        Play.prototype.destroy = function () {
            this.listeners.forEach(function (l) { return l.stop(); });
        };
        Play.prototype.loadImage = function () {
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
                "sol.green"
            ]);
        };
        Play.prototype.tuto = function (message) {
            this.notifier.forEvent(IPlay.Event.Modal).notify(this, {
                message: message,
                isMute: this.observable.isMuteSound,
                callback: function () {
                }
            });
        };
        Play.prototype.tutotrial = function (id) {
            // tuto
            if (id === 1) {
                this.tuto("Placez le bloc bleu dans le cadre de la même couleur en faisant glisser votre doigt sur l'écran.");
            }
            if (id === 3) {
                this.tuto("Placez chaque bloc dans le cadre correspondant. Sélectionnez la couleur du bloc à déplacer à l'aide du bouton situé en haut à droite de l'écran ou cliquez directement sur le bloc.");
            }
            if (id === 2) {
                this.tuto("Si vous faites un mauvais déplacement, vous pouvez revenir en arrière à l'aide du bouton situé en bas à gauche de l'écran.");
            }
            if (id === 12) {
                this.tuto("Les blocs jaunes se déplacent lorsqu'ils sont percutés et déplacent les blocs qu'ils percutent.");
            }
            if (id === 21) {
                this.tuto("Les blocs verts permuttent avec les blocs qu'ils percutent.");
            }
            if (id === 51) {
                this.tuto("Lorqu'une couleur est sélectionnée, tous les blocs de cette couleur se déplacent en même temps.");
            }
        };
        Play = __decorate([
            artiste_1.View({
                template: "dist/template/play.html",
                binding: {
                    "[data-id=title]": function (playView) { return artiste_1.text(function () { return "niveau " + playView.observable.number; }); },
                    "[data-id=score]": function (playView) { return artiste_1.text(function () { return "" + playView.observable.score; }); },
                    "[data-id=back-number]": function (playView) { return artiste_1.text(function () { return "" + playView.observable.backNumber; }); },
                    "[data-id=color-selection]": function (playView) { return [
                        artiste_1.attr(function () { return { src: playView.colorUrl(playView.color[playView.observable.selector]) }; }),
                        artiste_1.click(function () { return function () { return playView.changeSelector(); }; })
                    ]; },
                    "#music": function (playView) { return artiste_1.click(function () { return function () { return playView.muteMusic(); }; }); },
                    "#sound": function (playView) { return artiste_1.click(function () { return function () { return playView.muteSound(); }; }); },
                    "#sound [data-id=no]": function (playView) { return hide_1.hide(function () { return !playView.observable.isMuteSound; }); },
                    "#back": function (playView) { return artiste_1.click(function () { return function () { return playView.controller({ cmd: 'BACK' }); }; }); },
                    "this": function (playView) { return [
                        joystick_1.joystick(function () { return function (e) { return playView.controller(e); }; }),
                        mousemove_1.mousemove(function () { return function (e) { return playView.controller(e); }; })
                    ]; },
                    "canvas": function (playView) { return [
                        canvas_1.canvas(function () { return playView.observable.screen; }),
                        artiste_1.attr(function () {
                            return {
                                offsetx: "" + (400 - playView.observable.nbcols * 50) / 2,
                                offsety: "" + (600 - playView.observable.nbrows * 50) / 2
                            };
                        })
                    ]; }
                }
            }),
            __metadata("design:paramtypes", [app_1.IApp,
                artiste_1.IObservablizer,
                engine_1.IEngine,
                artiste_1.INotifier,
                soundPlayer_1.ISoundPlayer,
                imageLoader_1.IImageLoader,
                router_1.IRouter])
        ], Play);
        return Play;
    }(IPlay));
});
