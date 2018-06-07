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
        define(["require", "exports", "../tools/service", "./base/abstract", "model/conversation", "model/message", "model/person"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("../tools/service");
    const abstract_1 = require("./base/abstract");
    const conversation_1 = require("model/conversation");
    const message_1 = require("model/message");
    const person_1 = require("model/person");
    class IEmailAjax {
    }
    exports.IEmailAjax = IEmailAjax;
    let EmailAjax = class EmailAjax extends IEmailAjax {
        constructor(_ajax) {
            super();
            this._ajax = _ajax;
        }
        conversation(id) {
            return this._ajax.ajax({
                url: "/api/e-mail/conversations/",
                data: id
            }).then((results) => results.map(c => {
                var res = new conversation_1.Conversation();
                res.id = c.id;
                res.objet = c.objet;
                res.createdBy = new person_1.Person();
                res.createdBy.id = c.createdBy;
                return res;
            }));
        }
        conversationById(id) {
            return this._ajax.ajax({
                url: "/api/e-mail/conversation/",
                data: id
            }).then(c => {
                var res = new conversation_1.Conversation();
                res.id = c.id;
                res.objet = c.objet;
                res.createdBy = new person_1.Person();
                res.createdBy.id = c.createdBy.id;
                res.persons = c.persons.map(u => {
                    var user = new person_1.Person();
                    user.id = u.id;
                    user.age = u.age;
                    user.last = u.last;
                    user.first = u.first;
                    return user;
                });
                return res;
            });
        }
        message(conversationId, lastId) {
            return this._ajax.ajax({
                url: "/api/e-mail/messages/",
                data: { conversationId, lastId }
            }).then(results => results.map(m => {
                var res = new message_1.Message();
                res.id = m.id;
                res.writtenBy = new person_1.Person();
                res.writtenBy.id = m.writtenBy;
                res.writtenBy.first = m.first;
                res.writtenBy.last = m.last;
                res.message = m.message;
                res.date = m.date;
                return res;
            }));
        }
        allMessages() {
            return this._ajax.ajax({
                url: "/api/e-mail/all-messages/"
            }).then(results => results.map(m => {
                var res = new message_1.Message();
                res.id = m.id;
                res.writtenBy = new person_1.Person();
                res.writtenBy.id = m.writtenBy;
                res.writtenBy.first = m.first;
                res.writtenBy.last = m.last;
                res.message = m.message;
                res.date = m.date;
                return res;
            }));
        }
        send(message) {
            return this._ajax.ajax({
                url: "/api/e-mail/send/",
                data: {
                    writtenBy: message.writtenBy.id,
                    conversation: message.conversation.id,
                    message: message.message,
                    date: message.date
                }
            });
        }
        nouveau(message) {
            return this._ajax.ajax({
                url: "/api/e-mail/create/",
                data: {
                    writtenBy: message.writtenBy.id,
                    message: message.message,
                    date: new Date().getTime(),
                    destinataires: message.conversation.persons.map(p => p.id),
                    objet: message.conversation.objet
                }
            });
        }
    };
    EmailAjax = __decorate([
        service_1.Service({
            interface: IEmailAjax
        }),
        __metadata("design:paramtypes", [abstract_1.IAjax])
    ], EmailAjax);
});
