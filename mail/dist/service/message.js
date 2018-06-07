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
        define(["require", "exports", "artiste", "database/message", "validation/message", "tools/service/ajax"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var message_1 = require("database/message");
    var message_2 = require("validation/message");
    var ajax_1 = require("tools/service/ajax");
    var IMessageService = /** @class */ (function () {
        function IMessageService() {
        }
        return IMessageService;
    }());
    exports.IMessageService = IMessageService;
    var MessageService = /** @class */ (function (_super) {
        __extends(MessageService, _super);
        function MessageService(userDatabase, messageValidation, ajax) {
            var _this = _super.call(this) || this;
            _this.userDatabase = userDatabase;
            _this.messageValidation = messageValidation;
            _this.ajax = ajax;
            return _this;
        }
        MessageService.prototype.create = function (message) {
            var _this = this;
            return this.ajax.do(function () {
                _this.messageValidation.assertIsValid(message);
                _this.userDatabase.create(message);
            });
        };
        MessageService.prototype.inbox = function (login) {
            var _this = this;
            return this.ajax.do(function () {
                return _this.userDatabase.inbox(login);
            });
        };
        MessageService.prototype.sent = function (login) {
            var _this = this;
            return this.ajax.do(function () {
                return _this.userDatabase.sent(login);
            });
        };
        MessageService.prototype.read = function (messageId) {
            var _this = this;
            return this.ajax.do(function () {
                _this.userDatabase.read(messageId);
            });
        };
        MessageService = __decorate([
            artiste_1.Service({
                key: IMessageService
            }),
            __metadata("design:paramtypes", [message_1.IMessageDatabase,
                message_2.IMessageValidation,
                ajax_1.IAjax])
        ], MessageService);
        return MessageService;
    }(IMessageService));
});
