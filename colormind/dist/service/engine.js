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
define(["require", "exports", "artiste", "app", "soundPlayer", "router", "./cycleScheduler"], function (require, exports, artiste_1, app_1, soundPlayer_1, router_1, cycleScheduler_1) {
    "use strict";
    exports.__esModule = true;
    var IEngine = /** @class */ (function () {
        function IEngine() {
        }
        IEngine.Event = {
            Modal: new artiste_1.Event("IEngine.Modal"),
            Sound: new artiste_1.Event("IEngine.Sound"),
            Cycle: new artiste_1.Event("IEngine.Cycle")
        };
        return IEngine;
    }());
    exports.IEngine = IEngine;
    var Engine = /** @class */ (function (_super) {
        __extends(Engine, _super);
        function Engine(router, app, notifier, customRouter, cycleScheduler) {
            var _this = _super.call(this) || this;
            _this.router = router;
            _this.app = app;
            _this.notifier = notifier;
            _this.customRouter = customRouter;
            _this.cycleScheduler = cycleScheduler;
            _this.notifier.forEvent(cycleScheduler_1.ICycleScheduler.Event().Cycle).listen(cycleScheduler, function (obj) {
                _this.notifier.forEvent(IEngine.Event.Cycle).notify(_this, obj);
            });
            return _this;
        }
        Engine.prototype.create = function (id, level) {
            var _this = this;
            var column = level.colonne;
            var length = level.data.length;
            var isfinished = false;
            var savedStates = [];
            var score = 0;
            var selectedColor = 3;
            var sol = level.data.map(function (n) { return !(n === 1 || n === 2 || n === 3 || n === 5 || n === 7 || n === 9) && {
                value: n,
                moving: false
            } || n !== 1 && {
                value: 0,
                moving: false
            } || undefined; });
            var scene = level.data.map(function (n) { return (n === 1 || n === 2 || n === 3 || n === 5 || n === 7 || n === 9) && {
                value: n,
                moving: false
            } || undefined; });
            var until = function (callback) {
                while (!callback()) { }
            };
            var deplacement = function (vitessex, vitessey) {
                var lgth = length - 1;
                var cont = false;
                var cycles = [];
                var scn = scene.map(function (item, it) {
                    var origin = vitessex < 0 && it ||
                        vitessex > 0 && lgth - it ||
                        vitessey < 0 && (it * column - 1) % lgth + 1 ||
                        vitessey > 0 && lgth - (it * column + 1) % lgth - 1 ||
                        0;
                    return {
                        index: origin,
                        item: scene[origin],
                        sol: sol[origin]
                    };
                }).map(function (current, i, arr) {
                    var to = i > 0 && arr[i - 1] && arr[i - 1];
                    if (!current.item || !current.item.moving) { }
                    else if (!to.item) {
                        to.item = current.item;
                        current.item = undefined;
                        cont = true;
                        to.item.moving = true;
                    }
                    else {
                        var tap = current.item.moving === true;
                        current.item.moving = false;
                        if (tap &&
                            (to.item.value === 7 ||
                                (to.item.value === 3 || to.item.value === 5 || to.item.value === 7 || to.item.value === 9)
                                    && current.item.value === 7)) {
                            to.item.moving = 'yes';
                            cont = true;
                        }
                        if (tap &&
                            (to.item.value === 9 ||
                                (to.item.value === 3 || to.item.value === 5 || to.item.value === 7 || to.item.value === 9) &&
                                    current.item.value === 9)) {
                            var old = current.item;
                            current.item = {
                                value: to.item.value,
                                moving: old.moving
                            };
                            to.item = {
                                value: old.value,
                                moving: to.item.moving
                            };
                            cont = true;
                        }
                        if (tap) {
                            cont = true;
                            cycles.push(function () {
                                _this.notifier.forEvent(IEngine.Event.Sound).notify(_this, soundPlayer_1.ISoundPlayer.Keys.Tap);
                            });
                        }
                    }
                    return current;
                }).sort(function (a, b) { return a.index - b.index; }).map(function (_) { return { item: _.item, sol: _.sol }; });
                scene = scn.map(function (_) { return _.item; });
                return {
                    cycle: function () { cycles.forEach(function (c) { return c(); }); return scn; },
                    "continue": cont
                };
            };
            var finish = function () {
                return !scene.filter(function (item, i) {
                    return item && (item.value === 3 || item.value === 5 || item.value === 7 || item.value === 9) &&
                        item.value + 1 !== level.data[i];
                })[0];
            };
            var getSprites = function () { return scene.map(function (item, i) {
                return {
                    item: item,
                    sol: sol[i]
                };
            }); };
            var next = function () {
                _this.app.saveNiveau(id, score);
                setTimeout(function () {
                    _this.router.trigger(_this.customRouter.getUrl("/#/play/" + ++id));
                }, 500);
            };
            var back = function () {
                if (savedStates.length > 0) {
                    score--;
                    scene = savedStates.pop();
                }
                var sprites = getSprites();
                _this.cycleScheduler.push([function () { return sprites; }]);
            };
            var move = function (vitessex, vitessey) {
                if (isfinished)
                    return undefined;
                savedStates.push(scene.map(function (item) { return item; }));
                scene.filter(function (s) { return !!s; }).filter(function (s) { return (s.moving = false) || s.value === selectedColor; }).forEach(function (s) { return s.moving = 'yes'; });
                var cycles = [];
                until(function () {
                    var tmp = deplacement(vitessex, vitessey);
                    tmp && tmp["continue"] && cycles.push(tmp.cycle);
                    return !tmp["continue"];
                });
                cycles.length > 0 && score++;
                cycles.length <= 0 && savedStates.pop();
                if (savedStates.length >= 6) {
                    savedStates.shift();
                }
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
                        return undefined;
                    });
                }
                _this.cycleScheduler.push(cycles);
            };
            // initialisation
            var init = scene.map(function (item, i) {
                return {
                    item: scene[i],
                    sol: sol[i]
                };
            });
            this.cycleScheduler.push([
                function () { return init; }
            ]);
            return {
                getScore: function () { return score; },
                getBackNumber: function () { return savedStates.length; },
                getValue: function (i, j) {
                    var obj = scene[i + j * column];
                    return obj && obj.value || undefined;
                },
                controller: {
                    setSelectedColor: function (v) { selectedColor = v * 2 + 3; },
                    left: function () { return move(-50, 0); },
                    up: function () { return move(0, -50); },
                    right: function () { return move(50, 0); },
                    down: function () { return move(0, 50); },
                    back: function () { return back(); }
                }
            };
        };
        Engine = __decorate([
            artiste_1.Service({
                key: IEngine
            }),
            __metadata("design:paramtypes", [artiste_1.IRouter,
                app_1.IApp,
                artiste_1.INotifier,
                router_1.IRouter,
                cycleScheduler_1.ICycleScheduler])
        ], Engine);
        return Engine;
    }(IEngine));
});
