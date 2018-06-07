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
        define(["require", "exports", "artiste", "tools/exception/business", "tools/directive/notify", "tools/directive/focus", "service/login", "service/person", "service/email", "model/conversation", "./new-message", "./contact"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var business_1 = require("tools/exception/business");
    var notify_1 = require("tools/directive/notify");
    var focus_1 = require("tools/directive/focus");
    var login_1 = require("service/login");
    var person_1 = require("service/person");
    var email_1 = require("service/email");
    var conversation_1 = require("model/conversation");
    var new_message_1 = require("./new-message");
    var contact_1 = require("./contact");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, _viewProvider, notifier, _personService, _loginService, emailService) {
            var _this = _super.call(this) || this;
            _this._viewProvider = _viewProvider;
            _this._personService = _personService;
            _this._loginService = _loginService;
            _this.observable = observalizer.convert({
                destinataires: [],
                newMessage: undefined,
                objet: '',
                errorObjet: undefined,
                errorDestinataire: undefined
            });
            var conversation = new conversation_1.Conversation();
            _this._destinataires = [];
            _this.observable.newMessage = _this._viewProvider.newInstance(new_message_1.IMsg);
            notifier.forEvent(new_message_1.IMsg.CREATE).listen(_this.observable.newMessage, function (message) {
                conversation.persons = _this._destinataires.map(function (x) { return x; });
                conversation.objet = _this.observable.objet;
                message.conversation = conversation;
                _this.observable.errorObjet = undefined;
                _this.observable.errorDestinataire = undefined;
                emailService.nouveau(message).then(function (conversationId) {
                    if (conversationId) {
                        location.href = "/e-mail/read/" + conversationId;
                    }
                })
                    .catch(function (e) {
                    if (e instanceof business_1.BusinessException && e.data === "OBJREQ") {
                        _this.observable.errorObjet = e.message;
                        return false;
                    }
                    if (e instanceof business_1.BusinessException && e.data === "DESTREQ") {
                        _this.observable.errorDestinataire = e.message;
                        return false;
                    }
                    throw e;
                });
            });
            return _this;
        }
        IndexView.prototype.add = function (personId) {
            var _this = this;
            !this._destinataires
                .some(function (p) { return p.id === personId; }) &&
                this._personService.getById(personId)
                    .then(function (p) { _this._destinataires.push(p); return p; })
                    .then(this._viewProvider.map(contact_1.IContact))
                    .then(function (view) {
                    _this.observable.destinataires.push(view);
                    _this.observable.errorDestinataire = undefined;
                });
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/email/create/conversation/index.html",
                binding: {
                    "[data-id=objet]": function (indx) { return [
                        artiste_1.value({ get: function () { return indx.observable.objet; }, set: function (v) { return indx.observable.objet = v; } }),
                        notify_1.error(function () { return indx.observable.errorObjet; }),
                        focus_1.focus(function () { return function () { return indx.observable.errorObjet = undefined; }; })
                    ]; },
                    "[data-id=content]": function (indx) { return [
                        artiste_1.view(function () { return indx.observable.destinataires; }),
                        notify_1.error(function () { return indx.observable.errorDestinataire; })
                    ]; },
                    "[data-id=new-message]": function (indx) { return artiste_1.view(function () { return indx.observable.newMessage; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                artiste_1.INotifier,
                person_1.IPersonService,
                login_1.ILoginService,
                email_1.IEmailService])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
