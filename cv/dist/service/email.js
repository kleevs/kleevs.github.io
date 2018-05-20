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
        define(["require", "exports", "tools/exception/business", "tools/service", "ajax/email"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var business_1 = require("tools/exception/business");
    var service_1 = require("tools/service");
    var email_1 = require("ajax/email");
    var IEmailService = /** @class */ (function () {
        function IEmailService() {
        }
        return IEmailService;
    }());
    exports.IEmailService = IEmailService;
    var EmailService = /** @class */ (function (_super) {
        __extends(EmailService, _super);
        function EmailService(_ajax) {
            var _this = _super.call(this) || this;
            _this._ajax = _ajax;
            return _this;
        }
        EmailService.prototype.conversation = function (id) {
            return this._ajax.conversation(id);
        };
        EmailService.prototype.conversationById = function (id) {
            return this._ajax.conversationById(id);
        };
        EmailService.prototype.message = function (id, lastId) {
            return this._ajax.message(id, lastId);
        };
        EmailService.prototype.send = function (message) {
            return this._ajax.send(message);
        };
        EmailService.prototype.nouveau = function (message) {
            if (!message.conversation.objet) {
                return new Promise(function () {
                    throw new business_1.BusinessException("L'objet du message est obligatoire.", "OBJREQ");
                });
            }
            if (!message.conversation.persons || message.conversation.persons.length <= 0) {
                return new Promise(function () {
                    throw new business_1.BusinessException("Ajouter au minimum un destinataire.", "DESTREQ");
                });
            }
            return this._ajax.nouveau(message);
        };
        EmailService.prototype.statistiqueMessageSent = function () {
            return this._ajax.allMessages().then(function (messages) { return messages
                .map(function (m) { return m.writtenBy.id; })
                .filter(function (v, i, a) { return a.indexOf(v) === i; })
                .map(function (id) { return { id: id, messages: messages.filter(function (m) { return m.writtenBy.id === id; }) }; })
                .map(function (d) { return [
                d.messages[0].writtenBy.first + " " + d.messages[0].writtenBy.last,
                d.messages.length
            ]; }); }).then(function (res) {
                res.unshift(["Nom", "Messages envoyés"]);
                return res;
            });
        };
        EmailService = __decorate([
            service_1.Service({
                key: IEmailService
            }),
            __metadata("design:paramtypes", [email_1.IEmailAjax])
        ], EmailService);
        return EmailService;
    }(IEmailService));
});
