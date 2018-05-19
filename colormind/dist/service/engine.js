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
define(["require", "exports", "artiste", "imageLoader", "factory", "app", "soundPlayer", "router"], function (require, exports, artiste_1, imageLoader_1, factory_1, app_1, soundPlayer_1, router_1) {
    "use strict";
    exports.__esModule = true;
    var IEngine = /** @class */ (function () {
        function IEngine() {
        }
        IEngine.Event = {
            Modal: new artiste_1.Event("IEngine.Modal"),
            Sound: new artiste_1.Event("IEngine.Sound")
        };
        return IEngine;
    }());
    exports.IEngine = IEngine;
    var Engine = /** @class */ (function (_super) {
        __extends(Engine, _super);
        function Engine(imageLoader, factory, router, app, notifier, customRouter) {
            var _this = _super.call(this) || this;
            _this.imageLoader = imageLoader;
            _this.factory = factory;
            _this.router = router;
            _this.app = app;
            _this.notifier = notifier;
            _this.customRouter = customRouter;
            return _this;
        }
        Engine.prototype.create = function (id, level) {
            var _this = this;
            return this.factory.create(level).then(function (sprites) {
                var selectedColor = 0;
                var isfinished = false;
                var nbcolumn = level.colonne;
                var nbrow = parseInt("" + level.data.length / level.colonne);
                var savedStates = [];
                var score = 0;
                var block = sprites.filter(function (sprite) { return sprite.block; });
                var until = function (callback) {
                    while (!callback()) { }
                };
                var save = function () {
                    savedStates.push(block.map(function (sprite) {
                        return {
                            x: sprite.x,
                            y: sprite.y
                        };
                    }));
                    if (savedStates.length >= 6) {
                        savedStates.shift();
                    }
                };
                var deplacement = function (vitessex, vitessey) {
                    var movingBlock = block.filter(function (sprite) { return sprite.moving; }).sort(function (a, b) {
                        return vitessex < 0 && a.x - b.x ||
                            vitessex > 0 && b.x - a.x ||
                            vitessey < 0 && a.y - b.y ||
                            vitessey > 0 && b.y - a.y || 0;
                    });
                    var cycles = [];
                    var cont = false;
                    movingBlock.forEach(function (sprite) {
                        var to = block.filter(function (s) { return s.position.x === sprite.position.x + vitessex && s.position.y === sprite.position.y + vitessey; })[0];
                        if (!to || to.moving) {
                            (function () {
                                var s = sprite;
                                var x = sprite.position.x + vitessex;
                                var y = sprite.position.y + vitessey;
                                s.position.x = x;
                                s.position.y = y;
                                cont = true;
                                sprite.moving = true;
                                cycles.push(function () {
                                    s.x = x;
                                    s.y = y;
                                    return sprites;
                                });
                            })();
                        }
                        else {
                            if (to && sprite.moving === true && (to.color === 2 || to.color >= 0 && sprite.color === 2)) {
                                to.moving = true;
                                cont = true;
                            }
                            if (to && sprite.moving === true && (to.color === 3 || to.color >= 0 && sprite.color === 3)) {
                                var old = { value: sprite.value, color: sprite.color, image: sprite.image };
                                sprite.value = to.value;
                                sprite.color = to.color;
                                sprite.image = to.image;
                                to.value = old.value;
                                to.color = old.color;
                                to.image = old.image;
                                cont = true;
                            }
                            sprite.moving === true && cycles.push(function () {
                                _this.notifier.forEvent(IEngine.Event.Sound).notify(_this, soundPlayer_1.ISoundPlayer.Keys.Tap);
                                return sprites;
                            });
                            sprite.moving = false;
                        }
                    });
                    return { cycles: cycles, "continue": cont };
                };
                var move = function (vitessex, vitessey) {
                    if (isfinished)
                        return undefined;
                    save();
                    block.filter(function (s) { return (s.moving = false) || s.color === selectedColor; })
                        .forEach(function (s) { return s.moving = 'yes'; });
                    var cycles = [];
                    until(function () {
                        var tmp = deplacement(vitessex, vitessey);
                        cycles = tmp && cycles.concat(tmp.cycles) || cycles;
                        return !tmp["continue"];
                    });
                    cycles.length > 0 && score++;
                    if (finish()) {
                        isfinished = true;
                        cycles.push(function () {
                            _this.notifier.forEvent(IEngine.Event.Sound).notify(_this, soundPlayer_1.ISoundPlayer.Keys.Win);
                            _this.notifier.forEvent(IEngine.Event.Modal).notify(_this, {
                                message: "R\u00E9ussi !!! " + score + " coups.",
                                callback: function () {
                                    next();
                                }
                            });
                            return sprites;
                        });
                    }
                    return cycles;
                };
                var back = function () {
                    if (savedStates.length > 0) {
                        score--;
                        savedStates.pop().forEach(function (s, i) {
                            block[i].x = block[i].position.x = s.x;
                            block[i].y = block[i].position.y = s.y;
                        });
                    }
                    return [function () { return sprites; }];
                };
                var finish = function () {
                    return !block.filter(function (s) { return s.color >= 0; })
                        .filter(function (s) { return level.data[s.position.x / 50 + s.position.y / 50 * nbcolumn] !== s.value + 1; })[0];
                };
                var next = function () {
                    _this.app.saveNiveau(id, score);
                    _this.router.trigger(_this.customRouter.getUrl("/#/play/" + ++id));
                };
                // tuto
                if (id === 1) {
                    _this.tuto("Placez le bloc bleu dans le cadre de la même couleur en faisant glisser votre doigt sur l'écran.");
                }
                if (id === 3) {
                    _this.tuto("Placez chaque bloc dans le cadre correspondant. Sélectionnez la couleur du bloc à déplacer à l'aide du bouton situé en haut à droite de l'écran ou cliquez directement sur le bloc.");
                }
                if (id === 2) {
                    _this.tuto("Si vous faites un mauvais déplacement, vous pouvez revenir en arrière à l'aide du bouton situé en bas à gauche de l'écran.");
                }
                if (id === 12) {
                    _this.tuto("Les blocs jaunes se déplacent lorsqu'ils sont percutés et déplacent les blocs qu'ils percutent.");
                }
                if (id === 21) {
                    _this.tuto("Les blocs verts permuttent avec les blocs qu'ils percutent.");
                }
                if (id === 51) {
                    _this.tuto("Lorqu'une couleur est sélectionnée, tous les blocs de cette couleur se déplacent en même temps.");
                }
                return {
                    getSprites: function () { return sprites; },
                    getScore: function () { return score; },
                    getBackNumber: function () { return savedStates.length; },
                    controller: {
                        setSelectedColor: function (v) { selectedColor = v; },
                        left: function () { return move(-50, 0); },
                        up: function () { return move(0, -50); },
                        right: function () { return move(50, 0); },
                        down: function () { return move(0, 50); },
                        back: function () { return back(); }
                    }
                };
            });
        };
        Engine.prototype.tuto = function (message) {
            this.notifier.forEvent(IEngine.Event.Modal).notify(this, {
                message: message,
                callback: function () {
                }
            });
        };
        Engine = __decorate([
            artiste_1.Service({
                key: IEngine
            }),
            __metadata("design:paramtypes", [imageLoader_1.IImageLoader,
                factory_1.IFactory,
                artiste_1.IRouter,
                app_1.IApp,
                artiste_1.INotifier,
                router_1.IRouter])
        ], Engine);
        return Engine;
    }(IEngine));
});
