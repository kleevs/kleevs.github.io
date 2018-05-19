var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "artiste", "tools/directive/modal", "view/home", "view/niveau", "view/play", "view/modal", "service/soundPlayer"], function (require, exports, artiste_1, modal_1, home_1, niveau_1, play_1, modal_2, soundPlayer_1) {
    "use strict";
    exports.__esModule = true;
    var Startup = /** @class */ (function () {
        function Startup(observalizer, router, viewProvider, soundPlayer, notifier) {
            var _this = this;
            this.viewProvider = viewProvider;
            this.observable = observalizer.convert({ view: viewProvider.newInstance(home_1.IHome), modal: undefined });
            this.isMute = undefined;
            router.on(function (href, pathname, hash) {
                if (_this.observable.view && _this.observable.view instanceof play_1.IPlay) {
                    _this.observable.view.destroy();
                }
                if (hash.indexOf("#/niveau/") === 0) {
                    var level = parseInt(hash.split("/").pop());
                    var niveauScreen = viewProvider.newInstance(niveau_1.INiveau);
                    niveauScreen.setNiveau(level);
                    _this.observable.view = niveauScreen;
                }
                else if (hash.indexOf("#/play/") === 0) {
                    var playId = parseInt(hash.split("/").pop());
                    var playScreen = viewProvider.newInstance(play_1.IPlay);
                    notifier.forEvent(play_1.IPlay.Event.Modal).listen(playScreen, function (item) {
                        var modalView = viewProvider.newInstance(modal_2.IModal);
                        modalView.setMessage(item.message);
                        modalView.setCallback(function () {
                            setTimeout(function () { return _this.observable.modal = undefined; });
                            item.callback();
                        });
                        !item.isMute && soundPlayer.play(soundPlayer_1.ISoundPlayer.Keys.Popup);
                        _this.observable.modal = modalView;
                    });
                    notifier.forEvent(play_1.IPlay.Event.MuteMusic).listen(playScreen, function (isMute) {
                        if (_this.isMute !== isMute) {
                            // // !isMute && soundPlayer.play(ISoundPlayer.Keys.Background) || 
                            // // soundPlayer.stop(ISoundPlayer.Keys.Background);
                            _this.isMute = isMute;
                        }
                    });
                    playScreen.init(playId, !!_this.isMute);
                    _this.observable.view = playScreen;
                }
                else {
                    _this.observable.view = viewProvider.newInstance(home_1.IHome);
                }
            });
        }
        Startup = __decorate([
            artiste_1.View({
                template: "dist/template/layout.html",
                binding: {
                    "[data-id=game]": function (starter) { return artiste_1.view(function () { return starter.observable.view; }); },
                    "[data-id=modal]": function (starter) { return modal_1.modal(function () { return starter.observable.modal; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IRouter,
                artiste_1.IViewProvider,
                soundPlayer_1.ISoundPlayer,
                artiste_1.INotifier])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
