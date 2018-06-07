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
        define(["require", "exports", "artiste", "service/message", "model/message", "tools/directive/error", "tools/directive/slideOutRight", "tools/service/notify", "modal", "model/user", "tools/error/businessError", "validation/message", "validation/login"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var message_1 = require("service/message");
    var message_2 = require("model/message");
    var error_1 = require("tools/directive/error");
    var slideOutRight_1 = require("tools/directive/slideOutRight");
    var notify_1 = require("tools/service/notify");
    var modal_1 = require("modal");
    var user_1 = require("model/user");
    var businessError_1 = require("tools/error/businessError");
    var message_3 = require("validation/message");
    var login_1 = require("validation/login");
    var ICreate = /** @class */ (function () {
        function ICreate() {
        }
        return ICreate;
    }());
    exports.ICreate = ICreate;
    var Create = /** @class */ (function (_super) {
        __extends(Create, _super);
        function Create(observablizer, viewProvider, messageService, notifier) {
            var _this = _super.call(this) || this;
            _this.viewProvider = viewProvider;
            _this.messageService = messageService;
            _this.notifier = notifier;
            _this.observable = observablizer.convert({
                callback: undefined,
                login: undefined,
                to: undefined,
                object: undefined,
                message: undefined,
                errors: observablizer.convert({
                    to: false,
                    object: false,
                    message: false
                })
            });
            return _this;
        }
        Create.prototype.setLogin = function (login, message) {
            this.observable.login = login;
            if (message) {
                this.observable.to = message.destinataires && message.destinataires.map(function (d) { return d.email; }).join(",");
                this.observable.object = message.object;
                this.observable.message = message.content;
            }
        };
        Create.prototype.close = function () {
            var _this = this;
            this.observable.callback = function () {
                _this.notifier.forEvent(modal_1.IModal.Event.Close).notify(_this, null);
            };
            return true;
        };
        Create.prototype.create = function () {
            var _this = this;
            this.observable.errors.to = false;
            this.observable.errors.object = false;
            this.observable.errors.message = false;
            var message = new message_2.Message();
            message.object = this.observable.object;
            message.content = this.observable.message;
            message.destinataires = this.observable.to && this.observable.to.split(",").map(function (email) {
                var user = new user_1.User();
                user.email = email.trim();
                return user.email && user || undefined;
            }).filter(function (_) { return !!_; });
            message.sender = (function () {
                var user = new user_1.User();
                user.email = _this.observable.login;
                return user;
            })();
            message.isOpen = false;
            this.messageService.create(message).then(function () {
                _this.close();
            }).catch(function (exception) {
                if (exception instanceof businessError_1.BusinessError) {
                    exception.forEach(function (error) {
                        if (error.getCode() === message_3.IMessageValidation.ErrorCode.ContentIsEmpty) {
                            _this.observable.errors.message = true;
                        }
                        if (error.getCode() === message_3.IMessageValidation.ErrorCode.DestinatairesIsEmpty) {
                            _this.observable.errors.to = true;
                        }
                        if (error.getCode() === message_3.IMessageValidation.ErrorCode.ObjectIsEmpty) {
                            _this.observable.errors.object = true;
                        }
                        if (error.getCode() === message_3.IMessageValidation.ErrorCode.DestinatairesIsInvalid) {
                            _this.observable.errors.to = true;
                        }
                        if (error.getCode() === login_1.ILoginValidation.ErrorCode.NoValidEmail) {
                            throw error;
                        }
                        return false;
                    });
                }
                else {
                    throw exception;
                }
            });
            ;
            return true;
        };
        Create = __decorate([
            artiste_1.View({
                template: "tmpl/inbox/create.html",
                binding: {
                    "this": function (modal) { return slideOutRight_1.slideOutRight(function () { return modal.observable.callback; }); },
                    "[data-action=close]": function (modal) { return artiste_1.click(function () { return function (e) { return modal.close(); }; }); },
                    "[data-id=to]": function (modal) { return [
                        artiste_1.value({
                            get: function () { return modal.observable.to; },
                            set: function (v) { return modal.observable.to = v; }
                        }),
                        error_1.error(function () { return modal.observable.errors.to; })
                    ]; },
                    "[data-id=object]": function (modal) { return [
                        artiste_1.value({
                            get: function () { return modal.observable.object; },
                            set: function (v) { return modal.observable.object = v; }
                        }),
                        error_1.error(function () { return modal.observable.errors.object; })
                    ]; },
                    "[data-id=message]": function (modal) { return [
                        artiste_1.value({
                            get: function () { return modal.observable.message; },
                            set: function (v) { return modal.observable.message = v; }
                        }),
                        error_1.error(function () { return modal.observable.errors.message; })
                    ]; },
                    "[data-action=confirm]": function (modal) { return artiste_1.click(function () { return function (e) { return modal.create(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                message_1.IMessageService,
                notify_1.INotifier])
        ], Create);
        return Create;
    }(ICreate));
});
