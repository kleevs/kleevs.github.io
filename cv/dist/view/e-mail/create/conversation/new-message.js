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
        define(["require", "exports", "artiste", "tools/submit", "service/email", "service/login", "model/person", "model/message"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var submit_1 = require("tools/submit");
    var email_1 = require("service/email");
    var login_1 = require("service/login");
    var person_1 = require("model/person");
    var message_1 = require("model/message");
    var IMsg = /** @class */ (function () {
        function IMsg() {
        }
        IMsg.CREATE = new artiste_1.Event("CREATE");
        return IMsg;
    }());
    exports.IMsg = IMsg;
    var MsgView = /** @class */ (function (_super) {
        __extends(MsgView, _super);
        function MsgView(observalizer, loginService, _emailService, _notifier) {
            var _this = _super.call(this) || this;
            _this._emailService = _emailService;
            _this._notifier = _notifier;
            _this.observable = observalizer.convert({
                content: "",
            });
            _this._connected = loginService.isConnected();
            return _this;
        }
        MsgView.prototype.initialize = function () {
            this.observable.content = "";
        };
        MsgView.prototype.send = function () {
            var _this = this;
            this._connected.then(function (user) {
                if (_this.observable.content) {
                    var msg = new message_1.Message();
                    msg.writtenBy = new person_1.Person();
                    msg.message = _this.observable.content;
                    msg.writtenBy.id = user.id;
                    _this._notifier.forEvent(IMsg.CREATE).notify(_this, msg);
                }
            });
        };
        MsgView = __decorate([
            artiste_1.View({
                template: "tmpl/email/create/conversation/new-message.html",
                binding: {
                    "input[data-id=msg]": function (msgview) { return artiste_1.value({
                        get: function () { return msgview.observable.content; },
                        set: function (v) { return msgview.observable.content = v; }
                    }); },
                    "this": function (msgview) { return submit_1.submit(function () { return function () { return msgview.send(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                login_1.ILoginService,
                email_1.IEmailService,
                artiste_1.INotifier])
        ], MsgView);
        return MsgView;
    }(IMsg));
});
