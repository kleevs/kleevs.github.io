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
        define(["require", "exports", "artiste", "service/message", "model/message", "tools/directive/mail", "tools/directive/slideOutRight", "tools/service/notify", "modal", "view/inbox/create"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var message_1 = require("service/message");
    var message_2 = require("model/message");
    var mail_1 = require("tools/directive/mail");
    var slideOutRight_1 = require("tools/directive/slideOutRight");
    var notify_1 = require("tools/service/notify");
    var modal_1 = require("modal");
    var create_1 = require("view/inbox/create");
    var IRead = /** @class */ (function () {
        function IRead() {
        }
        IRead.Event = {
            Create: new artiste_1.Event("inbox:read:create")
        };
        return IRead;
    }());
    exports.IRead = IRead;
    var Read = /** @class */ (function (_super) {
        __extends(Read, _super);
        function Read(observablizer, viewProvider, messageService, notifier) {
            var _this = _super.call(this) || this;
            _this.viewProvider = viewProvider;
            _this.messageService = messageService;
            _this.notifier = notifier;
            _this.observable = observablizer.convert({
                callback: undefined,
                login: undefined,
                from: undefined,
                object: undefined,
                message: undefined
            });
            return _this;
        }
        Read.prototype.setLogin = function (login, message) {
            this.observable.login = login;
            this.observable.message = message.content;
            this.observable.object = message.object;
            this.observable.from = message.sender.email;
            this.message = message;
            this.messageService.read(message.id);
        };
        Read.prototype.close = function () {
            var _this = this;
            this.observable.callback = function () {
                _this.notifier.forEvent(modal_1.IModal.Event.Close).notify(_this, null);
            };
            return true;
        };
        Read.prototype.response = function () {
            var _this = this;
            var view = this.viewProvider.newInstance(create_1.ICreate);
            var message = new message_2.Message();
            message.content = "\n\n------------------------------\n---- " + (this.message.content || '').replace(/\n/gi, "\n---- ");
            message.object = this.message.object;
            message.destinataires = this.message.destinataires.filter(function (d) { return d.email !== _this.observable.login; });
            message.destinataires.push(this.message.sender);
            view.setLogin(this.observable.login, message);
            this.notifier.forEvent(IRead.Event.Create).notify(this, view);
            this.notifier.forEvent(modal_1.IModal.Event.Close).notify(this, null);
            return true;
        };
        Read = __decorate([
            artiste_1.View({
                template: "tmpl/inbox/read.html",
                binding: {
                    "this": function (modal) { return slideOutRight_1.slideOutRight(function () { return modal.observable.callback; }); },
                    "[data-action=close]": function (modal) { return artiste_1.click(function () { return function (e) { return modal.close(); }; }); },
                    "[data-id=message]": function (modal) { return mail_1.text(function () { return modal.observable.message; }); },
                    "[data-id=title]": function (modal) { return artiste_1.text(function () { return modal.observable.from + " - " + modal.observable.object; }); },
                    "[data-action=response]": function (modal) { return artiste_1.click(function () { return function (e) { return modal.response(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                message_1.IMessageService,
                notify_1.INotifier])
        ], Read);
        return Read;
    }(IRead));
});
