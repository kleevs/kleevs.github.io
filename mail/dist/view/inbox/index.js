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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "artiste", "view/inbox/create", "tools/directive/view", "tools/service/notify", "draft", "sent", "inbox"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var create_1 = require("view/inbox/create");
    var view_1 = require("tools/directive/view");
    var notify_1 = require("tools/service/notify");
    var draft_1 = require("draft");
    var sent_1 = require("sent");
    var inbox_1 = require("inbox");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        IIndex.Event = {
            Create: new artiste_1.Event("inbox:index:create")
        };
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var Inbox = /** @class */ (function (_super) {
        __extends(Inbox, _super);
        function Inbox(observablizer, viewProvider, notifier) {
            var _this = _super.call(this) || this;
            _this.viewProvider = viewProvider;
            _this.notifier = notifier;
            _this.observable = observablizer.convert({ view: undefined, login: undefined });
            return _this;
        }
        Inbox.prototype.setLogin = function (login) {
            this.observable.login = login;
        };
        Inbox.prototype.changeScreen = function (screen) {
            this.observable.view = this.viewProvider.newInstance(screen === "draft" && draft_1.IDraft ||
                screen === "sent" && sent_1.ISent ||
                inbox_1.IInbox);
            this.observable.view.setLogin && this.observable.view.setLogin(this.observable.login);
        };
        Inbox.prototype.create = function () {
            var view = this.viewProvider.newInstance(create_1.ICreate);
            view.setLogin(this.observable.login);
            this.notifier.forEvent(IIndex.Event.Create).notify(this, view);
            return true;
        };
        Inbox = __decorate([
            artiste_1.View({
                template: "tmpl/inbox/index.html",
                binding: {
                    "[data-id=content]": function (inboxView) { return view_1.view(function () { return inboxView.observable.view; }); },
                    "[data-id=login]": function (inboxView) { return artiste_1.text(function () { return inboxView.observable.login; }); },
                    "[data-action=create]": function (inboxView) { return artiste_1.click(function () { return function (e) { return inboxView.create(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                notify_1.INotifier])
        ], Inbox);
        return Inbox;
    }(IIndex));
});
