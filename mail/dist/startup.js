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
        define(["require", "exports", "artiste", "modal", "view/login/index", "view/inbox/index", "view/inbox/inbox", "view/inbox/sent", "view/inbox/read", "tools/directive/view", "tools/directive/hide", "tools/service/notify"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var modal_1 = require("modal");
    var index_1 = require("view/login/index");
    var index_2 = require("view/inbox/index");
    var inbox_1 = require("view/inbox/inbox");
    var sent_1 = require("view/inbox/sent");
    var read_1 = require("view/inbox/read");
    var view_1 = require("tools/directive/view");
    var hide_1 = require("tools/directive/hide");
    var notify_1 = require("tools/service/notify");
    var Startup = /** @class */ (function () {
        function Startup(observalizer, viewProvider, notifier, router) {
            var _this = this;
            this.observable = observalizer.convert({
                screen: undefined,
                login: undefined,
                modal: []
            });
            router.on(function (href, pathname, hash) {
                if (!_this.observable.login) {
                    _this.observable.screen = viewProvider.newInstance(index_1.IIndex);
                }
                else {
                    if (!(_this.observable.screen instanceof index_2.IIndex)) {
                        _this.observable.screen = viewProvider.newInstance(index_2.IIndex);
                        _this.observable.screen.setLogin(_this.observable.login);
                    }
                    _this.observable.screen.changeScreen(hash && hash.replace(/^\#\/inbox\/?/gi, ''));
                }
            });
            notifier.forEvent(index_1.IIndex.Event.Signin).listen(this, function (context, login) {
                _this.observable.login = login;
                router.trigger("./#/");
                return true;
            });
            notifier.forEvent(index_2.IIndex.Event.Create).listen(this, function (context, content) {
                var modal = viewProvider.newInstance(modal_1.IModal);
                modal.setContent(content, function () {
                    _this.observable.modal = _this.observable.modal.filter(function (_) { return _ !== modal; });
                });
                _this.observable.modal.push(modal);
                return true;
            });
            notifier.forEvent(read_1.IRead.Event.Create).listen(this, function (context, content) {
                var modal = viewProvider.newInstance(modal_1.IModal);
                modal.setContent(content, function () {
                    _this.observable.modal = _this.observable.modal.filter(function (_) { return _ !== modal; });
                });
                _this.observable.modal.push(modal);
                return true;
            });
            notifier.forEvent(inbox_1.IInbox.Event.Read).listen(this, function (context, content) {
                var modal = viewProvider.newInstance(modal_1.IModal);
                modal.setContent(content, function () {
                    _this.observable.modal = _this.observable.modal.filter(function (_) { return _ !== modal; });
                });
                _this.observable.modal.push(modal);
                return true;
            });
            notifier.forEvent(sent_1.ISent.Event.Read).listen(this, function (context, content) {
                var modal = viewProvider.newInstance(modal_1.IModal);
                modal.setContent(content, function () {
                    _this.observable.modal = _this.observable.modal.filter(function (_) { return _ !== modal; });
                });
                _this.observable.modal.push(modal);
                return true;
            });
            window.onerror = function (errorMsg, url, lineNumber, colNumber, error) {
                return false;
            };
        }
        Startup = __decorate([
            artiste_1.View({
                template: "tmpl/layout/index.html",
                binding: {
                    "[content]": function (starter) { return view_1.view(function () { return starter.observable.screen; }); },
                    "[modal]": function (starter) { return [
                        view_1.view(function () { return starter.observable.modal; }),
                        hide_1.hide(function () { return starter.observable.modal.length <= 0; })
                    ]; }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                notify_1.INotifier,
                artiste_1.IRouter])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
