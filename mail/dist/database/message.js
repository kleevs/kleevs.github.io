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
        define(["require", "exports", "artiste", "tools/database/db", "model/message", "model/user", "tools/date"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var db_1 = require("tools/database/db");
    var message_1 = require("model/message");
    var user_1 = require("model/user");
    var date_1 = require("tools/date");
    var IMessageDatabase = /** @class */ (function () {
        function IMessageDatabase() {
        }
        return IMessageDatabase;
    }());
    exports.IMessageDatabase = IMessageDatabase;
    var MessageDatabase = /** @class */ (function (_super) {
        __extends(MessageDatabase, _super);
        function MessageDatabase() {
            var _this = _super.call(this) || this;
            _this.db = new db_1.Database("db.poc-mail.message");
            return _this;
        }
        MessageDatabase.prototype.create = function (message) {
            var _this = this;
            var now = new Date();
            message.destinataires.forEach(function (destinataire) {
                _this.db.insert({
                    object: message.object,
                    content: message.content,
                    inbox: destinataire.email,
                    destinataires: message.destinataires.map(function (d) { return d.email; }).join(","),
                    sender: message.sender.email,
                    isOpen: false,
                    date: date_1.toTime(now)
                });
            });
            this.db.insert({
                object: message.object,
                content: message.content,
                inbox: message.sender.email,
                destinataires: message.destinataires.map(function (d) { return d.email; }).join(","),
                sender: message.sender.email,
                isOpen: false,
                date: date_1.toTime(now)
            });
        };
        MessageDatabase.prototype.inbox = function (login) {
            return this.db.find({ inbox: login })
                .sort(function (a, b) { return b.id - a.id; })
                .map(function (m) {
                var message = new message_1.Message();
                message.id = m.id;
                message.object = m.object;
                message.content = m.content;
                message.destinataires = m.destinataires.split(",").map(function (email) {
                    var user = new user_1.User();
                    user.email = email;
                    return user;
                });
                message.sender = (function () {
                    var user = new user_1.User();
                    user.email = m.sender;
                    return user;
                })();
                message.isOpen = m.isOpen;
                message.date = date_1.parseTime(m.date);
                return message;
            })
                .filter(function (m) { return m.destinataires.some(function (d) { return d.email === login; }); });
        };
        MessageDatabase.prototype.sent = function (login) {
            return this.db.find({ inbox: login })
                .sort(function (a, b) { return b.id - a.id; })
                .map(function (m) {
                var message = new message_1.Message();
                message.id = m.id;
                message.object = m.object;
                message.content = m.content;
                message.destinataires = m.destinataires.split(",").map(function (email) {
                    var user = new user_1.User();
                    user.email = email;
                    return user;
                });
                message.sender = (function () {
                    var user = new user_1.User();
                    user.email = m.sender;
                    return user;
                })();
                message.isOpen = m.isOpen;
                message.date = date_1.parseTime(m.date);
                return message;
            })
                .filter(function (m) { return m.sender.email === login; });
        };
        MessageDatabase.prototype.read = function (messageId) {
            this.db.update({ id: messageId }, { isOpen: true });
        };
        MessageDatabase = __decorate([
            artiste_1.Service({
                key: IMessageDatabase
            }),
            __metadata("design:paramtypes", [])
        ], MessageDatabase);
        return MessageDatabase;
    }(IMessageDatabase));
});
