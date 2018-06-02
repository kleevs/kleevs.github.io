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
        define(["require", "exports", "artiste", "view/detail/index", "view/list/index", "tools/directive/view", "tools/directive/hover", "tools/directive/hide", "tools/service/notify", "modal/deleteUser/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var index_1 = require("view/detail/index");
    var index_2 = require("view/list/index");
    var view_1 = require("tools/directive/view");
    var hover_1 = require("tools/directive/hover");
    var hide_1 = require("tools/directive/hide");
    var notify_1 = require("tools/service/notify");
    var index_3 = require("modal/deleteUser/index");
    window.Promise = window.Promise || Promise;
    var Startup = /** @class */ (function () {
        function Startup(observalizer, moduleProvider, viewProvider, router, notifier) {
            var _this = this;
            this.observable = observalizer.convert({ screen: undefined, modal: [] });
            router.on(function (href, pathname, hash) {
                var thref = hash.split("/");
                thref.shift();
                var screenName = thref[0] && thref[0].replace(/\/$/gi, "").replace(/^\//, "") || '';
                var screenUri = "view/" + (screenName || 'list') + "/index";
                moduleProvider.get(screenUri).then(function (modules) {
                    for (var i in modules) {
                        var screen = viewProvider.newInstance(modules[i]);
                        if (screen instanceof index_1.IIndex) {
                            var id = parseInt(thref[1]);
                            !isNaN(id) && screen.setUser(id);
                        }
                        _this.observable.screen = screen;
                        break;
                    }
                });
            });
            setTimeout(function () {
                notifier.forEvent(index_2.IIndex.Event.DeleteConfirm).listen(_this, function (ctx, callback) {
                    var modal = viewProvider.newInstance(index_3.IIndex);
                    modal.setCallback(function (response) {
                        callback(response);
                        _this.observable.modal = _this.observable.modal.filter(function (_) { return _ !== modal; });
                    });
                    _this.observable.modal.push(modal);
                    return true;
                });
            });
            window.onerror = function (errorMsg, url, lineNumber, colNumber, error) {
                return false;
            };
        }
        Startup = __decorate([
            artiste_1.View({
                template: "tmpl/layout/index.html",
                binding: {
                    "this": function (starter) { return hover_1.hover(); },
                    "[content]": function (starter) { return view_1.view(function () { return starter.observable.screen; }); },
                    "[modal]": function (starter) { return [
                        view_1.view(function () { return starter.observable.modal; }),
                        hide_1.hide(function () { return starter.observable.modal.length <= 0; })
                    ]; }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IModuleProvider,
                artiste_1.IViewProvider,
                artiste_1.IRouter,
                notify_1.INotifier])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
