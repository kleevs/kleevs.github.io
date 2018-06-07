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
        define(["require", "exports", "artiste", "service/login", "service/person", "service/email", "tools/directive/keyup", "./new-message", "./message"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var login_1 = require("service/login");
    var person_1 = require("service/person");
    var email_1 = require("service/email");
    var keyup_1 = require("tools/directive/keyup");
    var new_message_1 = require("./new-message");
    var message_1 = require("./message");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, _viewProvider, notifier, _personService, _loginService, _emailService) {
            var _this = _super.call(this) || this;
            _this._viewProvider = _viewProvider;
            _this._personService = _personService;
            _this._loginService = _loginService;
            _this._emailService = _emailService;
            _this._lastId = 0;
            _this.observable = observalizer.convert({
                messages: [],
                nouveau: undefined,
                filter: undefined
            });
            return _this;
        }
        IndexView.prototype.initialize = function (conversation) {
            this._conversation = conversation;
            this._conversation.messages = [];
            this.observable.nouveau = this._viewProvider.newInstance(new_message_1.INewMessage, conversation);
            this.read();
        };
        IndexView.prototype.read = function () {
            var _this = this;
            this._emailService.message(this._conversation.id, this._lastId)
                .then(function (messages) {
                _this._lastId = Math.max.apply(Math, messages.map(function (m) { return m.id; }).concat([_this._lastId]));
                return messages;
            })
                .then(function (messages) { messages.forEach(function (m) { return _this._conversation.messages.push(m); }); return messages; })
                .then(function (messages) { return messages.length > 0 && _this.search(); });
        };
        IndexView.prototype.search = function () {
            var _this = this;
            this.observable.messages = this._conversation.messages.filter(function (m) {
                return !_this.observable.filter ||
                    m.message.toLowerCase().indexOf(_this.observable.filter.toLowerCase()) >= 0;
            })
                .map(this._viewProvider.map(message_1.IMessage));
        };
        IndexView.prototype.start = function () {
            var _this = this;
            this._timer = setInterval(function () {
                _this.read();
            }, 1000);
        };
        IndexView.prototype.stop = function () {
            clearInterval(this._timer);
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/email/read/conversation/index.html",
                binding: {
                    "this": function (indxview) { return artiste_1.dom({ in: function (e) { return indxview.start(); }, out: function (e) { return indxview.stop(); } }); },
                    "[data-id=content]": function (indxview) { return artiste_1.view(function () { return indxview.observable.messages; }); },
                    "[data-id=new-message]": function (indx) { return artiste_1.view(function () { return indx.observable.nouveau; }); },
                    "[data-id=search]": function (indx) { return [
                        artiste_1.value({ get: function () { return indx.observable.filter; }, set: function (v) { return indx.observable.filter = v; } }),
                        keyup_1.keyup(function () { return function () { return indx.search(); }; })
                    ]; }
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
