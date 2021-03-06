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
        define(["require", "exports", "tools/exception/business", "tools/service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var business_1 = require("tools/exception/business");
    var service_1 = require("tools/service");
    var IEmailService = /** @class */ (function () {
        function IEmailService() {
        }
        return IEmailService;
    }());
    exports.IEmailService = IEmailService;
    var EmailService = /** @class */ (function (_super) {
        __extends(EmailService, _super);
        function EmailService() {
            return _super.call(this) || this;
        }
        EmailService.prototype.conversation = function (id) {
            return Promise.resolve([]);
        };
        EmailService.prototype.conversationById = function (id) {
            return Promise.resolve(undefined);
        };
        EmailService.prototype.message = function (id, lastId) {
            return Promise.resolve([]);
        };
        EmailService.prototype.send = function (message) {
            return Promise.resolve(false);
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
            return Promise.resolve(undefined);
        };
        EmailService.prototype.statistiqueMessageSent = function () {
            return Promise.resolve([]);
        };
        EmailService = __decorate([
            service_1.Service({
                key: IEmailService
            }),
            __metadata("design:paramtypes", [])
        ], EmailService);
        return EmailService;
    }(IEmailService));
});
