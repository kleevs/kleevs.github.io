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
        define(["require", "exports", "artiste", "tools/service/trycatch", "login", "tools/error/businessError"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var trycatch_1 = require("tools/service/trycatch");
    var login_1 = require("login");
    var businessError_1 = require("tools/error/businessError");
    var IMessageValidation = /** @class */ (function () {
        function IMessageValidation() {
        }
        IMessageValidation.ErrorCode = {
            DestinatairesIsEmpty: "MessageValidation.DestinatairesIsEmpty",
            DestinatairesIsInvalid: "MessageValidation.DestinatairesIsInvalid",
            ObjectIsEmpty: "MessageValidation.ObjectIsEmpty",
            ContentIsEmpty: "MessageValidation.ContentIsEmpty"
        };
        return IMessageValidation;
    }());
    exports.IMessageValidation = IMessageValidation;
    var MessageValidation = /** @class */ (function (_super) {
        __extends(MessageValidation, _super);
        function MessageValidation(tryCatch, loginValidation) {
            var _this = _super.call(this) || this;
            _this.tryCatch = tryCatch;
            _this.loginValidation = loginValidation;
            return _this;
        }
        MessageValidation.prototype.assertIsValid = function (message) {
            var _this = this;
            this.tryCatch.try(function () {
                _this.loginValidation.assertIsValid(message.sender.email);
            }).then(function () {
                if (!message.destinataires || message.destinataires.length <= 0) {
                    throw new businessError_1.BusinessError(IMessageValidation.ErrorCode.DestinatairesIsEmpty);
                }
                try {
                    message.destinataires.forEach(function (destinataire) {
                        _this.loginValidation.assertIsValid(destinataire.email);
                    });
                }
                catch (e) {
                    throw new businessError_1.BusinessError(IMessageValidation.ErrorCode.DestinatairesIsInvalid);
                }
            }).then(function () {
                if (!message.object) {
                    throw new businessError_1.BusinessError(IMessageValidation.ErrorCode.ObjectIsEmpty);
                }
            }).then(function () {
                if (!message.content) {
                    throw new businessError_1.BusinessError(IMessageValidation.ErrorCode.ContentIsEmpty);
                }
            }).catch(function (errors) {
                throw new businessError_1.BusinessError(errors.filter(function (_) { return _; }));
            });
        };
        MessageValidation = __decorate([
            artiste_1.Service({
                key: IMessageValidation
            }),
            __metadata("design:paramtypes", [trycatch_1.ITryCatch, login_1.ILoginValidation])
        ], MessageValidation);
        return MessageValidation;
    }(IMessageValidation));
});
