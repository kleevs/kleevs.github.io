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
        define(["require", "exports", "node_modules/artist/dist/artist", "tools/extends/jquery"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("node_modules/artist/dist/artist");
    const jquery_1 = require("tools/extends/jquery");
    class IRouter {
    }
    exports.IRouter = IRouter;
    let Router = Router_1 = class Router extends IRouter {
        constructor(_viewProvider, observalizer, notifier) {
            super();
            this._viewProvider = _viewProvider;
            this.observable = observalizer.convert({
                view: undefined
            });
            jquery_1.jQuery("body").on("click", "a[href]", (event) => {
                var href = event.currentTarget.pathname;
                history.pushState({}, '', href);
                this.change(href);
                return false;
            });
            window.onpopstate = (state) => {
                var href = location.pathname;
                this.change(href);
            };
            this.change(location.pathname);
        }
        change(href) {
            var thref = href.split("/");
            thref.shift();
            var layoutName = thref[0].startsWith("layout=") ? thref.shift().substr(7) : "";
            var screenName = thref[0].replace(/\/$/gi, "").replace(/^\//, "");
            var layoutUri = `layout/${layoutName || "default"}/index`;
            var screenUri = `view/${screenName || 'accueil'}/index`;
            new Promise((resolve) => {
                window.require(`/${layoutUri}`).then((module) => {
                    for (var i in module) {
                        resolve(module[i]);
                        break;
                    }
                });
            })
                .then(view => this.observable.view = this._viewProvider.newInstance(view))
                .then(view => {
                return new Promise((resolve) => {
                    window.require(`/${screenUri}`).then((module) => {
                        for (var i in module) {
                            resolve(module[i]);
                            break;
                        }
                    });
                });
            })
                .then((screen) => {
                this.observable.view.setScreen(screen, href);
            });
        }
    };
    Router = Router_1 = __decorate([
        artist_1.View({
            html: "<div class='full-screen'></div>",
            binding: {
                "this": (router) => artist_1.view(() => router.observable.view),
            }
        }),
        artist_1.Service({ interface: Router_1 }),
        __metadata("design:paramtypes", [artist_1.IViewProvider,
            artist_1.IObservablizer,
            artist_1.INotifier])
    ], Router);
    var Router_1;
});
