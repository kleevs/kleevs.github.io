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
        define(["require", "exports", "artiste", "service/message", "tools/directive/date", "tools/service/notify", "view/inbox/read"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var message_1 = require("service/message");
    var date_1 = require("tools/directive/date");
    var notify_1 = require("tools/service/notify");
    var read_1 = require("view/inbox/read");
    var ISent = /** @class */ (function () {
        function ISent() {
        }
        ISent.Event = {
            Read: new artiste_1.Event("inbox:sent:read")
        };
        return ISent;
    }());
    exports.ISent = ISent;
    var Sent = /** @class */ (function (_super) {
        __extends(Sent, _super);
        function Sent(observablizer, viewProvider, messageService, notifier) {
            var _this = _super.call(this) || this;
            _this.viewProvider = viewProvider;
            _this.messageService = messageService;
            _this.notifier = notifier;
            _this.observable = observablizer.convert({ messages: [], login: undefined, currentPage: 0, pageLength: 10 });
            return _this;
        }
        Sent.prototype.setLogin = function (login) {
            var _this = this;
            this.observable.login = login;
            this.messageService.sent(login).then(function (messages) {
                _this.observable.messages = messages;
            });
        };
        Sent.prototype.read = function (message) {
            var view = this.viewProvider.newInstance(read_1.IRead);
            view.setLogin(this.observable.login, message);
            this.notifier.forEvent(ISent.Event.Read).notify(this, view);
            return true;
        };
        Sent = __decorate([
            artiste_1.View({
                template: "tmpl/inbox/sent.html",
                binding: {
                    "table tbody": function (inboxView) { return artiste_1.each(function () {
                        return inboxView.observable.messages.slice(inboxView.observable.currentPage * inboxView.observable.pageLength, (inboxView.observable.currentPage + 1) * inboxView.observable.pageLength).map(function (message) {
                            return {
                                "this": artiste_1.click(function () { return function (e) { return inboxView.read(message); }; }),
                                "[data-id=from]": artiste_1.text(function () { return message.sender.email; }),
                                "[data-id=object]": artiste_1.text(function () { return message.object; }),
                                "[data-id=date]": date_1.text(function () { return message.date; })
                            };
                        });
                    }); },
                    "[data-id=current-page]": function (inboxView) { return artiste_1.text(function () { return "" + (inboxView.observable.currentPage + 1); }); },
                    "[data-id=page]": function (inboxView) { return [
                        artiste_1.options(function () {
                            var length = inboxView.observable.messages.length / inboxView.observable.pageLength;
                            var res = [];
                            for (var i = 0; i < length; i++) {
                                res.push({
                                    id: i,
                                    text: "" + (i + 1)
                                });
                            }
                            return res;
                        }),
                        artiste_1.value({
                            get: function () { return "" + inboxView.observable.currentPage; },
                            set: function (v) { return inboxView.observable.currentPage = parseInt(v) || 0; }
                        })
                    ]; },
                    "[data-id=page-length]": function (inboxView) { return artiste_1.value({
                        get: function () { return "" + inboxView.observable.pageLength; },
                        set: function (v) { return inboxView.observable.pageLength = parseInt(v) || 0; }
                    }); },
                    "[data-id=nbmessage]": function (inboxView) { return artiste_1.text(function () { return "" + inboxView.observable.messages.length; }); },
                    "[data-id=login]": function (inboxView) { return artiste_1.text(function () { return inboxView.observable.login; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                message_1.IMessageService,
                notify_1.INotifier])
        ], Sent);
        return Sent;
    }(ISent));
});
