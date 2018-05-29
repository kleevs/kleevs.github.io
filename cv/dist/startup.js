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
        define(["require", "exports", "artiste", "tools/directive/view", "layout/index", "tools/polyfills/promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var view_1 = require("tools/directive/view");
    var index_1 = require("layout/index");
    var promise_1 = require("tools/polyfills/promise");
    window.Promise = window.Promise || promise_1.Promise;
    var Startup = /** @class */ (function () {
        function Startup(observalizer, moduleProvider, router, layout) {
            this.observable = observalizer.convert({ view: undefined, layout: layout });
            router.on(function (href, pathname, hash) {
                var thref = hash.split("/");
                thref.shift();
                var screenName = thref[0] && thref[0].replace(/\/$/gi, "").replace(/^\//, "") || '';
                var screenUri = "view/" + (screenName || 'accueil') + "/index";
                moduleProvider.get(screenUri).then(function (modules) {
                    for (var i in modules) {
                        layout.setScreen(modules[i], pathname);
                        break;
                    }
                });
            });
        }
        Startup = __decorate([
            artiste_1.View({
                html: "<div class='full-screen'></div>",
                binding: {
                    "this": function (starter) { return [view_1.view(function () { return starter.observable.layout; })]; }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IModuleProvider,
                artiste_1.IRouter,
                index_1.IIndex])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
