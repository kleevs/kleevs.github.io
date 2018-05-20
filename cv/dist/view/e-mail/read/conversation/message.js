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
        define(["require", "exports", "artiste", "tools/hide", "service/login"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var hide_1 = require("tools/hide");
    var login_1 = require("service/login");
    var IMessage = /** @class */ (function () {
        function IMessage() {
        }
        return IMessage;
    }());
    exports.IMessage = IMessage;
    var MessageView = /** @class */ (function (_super) {
        __extends(MessageView, _super);
        function MessageView(observalizer, loginService) {
            var _this = _super.call(this) || this;
            _this.observable = observalizer.convert({
                content: "",
                isMine: false,
                id: 0,
                sender: ""
            });
            _this._connected = loginService.isConnected();
            return _this;
        }
        MessageView.prototype.initialize = function (msg) {
            var _this = this;
            this._connected.then(function (user) {
                _this.observable.id = msg.id;
                _this.observable.content = msg.message;
                _this.observable.sender = msg.writtenBy.last + " " + msg.writtenBy.first;
                _this.observable.isMine = msg.writtenBy.id == user.id;
            });
        };
        MessageView = __decorate([
            artiste_1.View({
                template: "tmpl/email/read/conversation/message.html",
                binding: {
                    "this": function (msgview) { return artiste_1.attr(function () { return { "id": "msg-" + msgview.observable.id }; }); },
                    "[data-id=content]": function (msgview) { return [
                        artiste_1.classes(function () {
                            return {
                                'pull-right': msgview.observable.isMine,
                                'green': msgview.observable.isMine,
                                'pull-left': !msgview.observable.isMine
                            };
                        })
                    ]; },
                    "[data-id=text]": function (msgview) { return artiste_1.text(function () { return msgview.observable.content; }); },
                    "[data-id=sender]": function (msgview) { return [
                        artiste_1.text(function () { return msgview.observable.sender; }),
                        hide_1.hide(function () { return msgview.observable.isMine; })
                    ]; }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, login_1.ILoginService])
        ], MessageView);
        return MessageView;
    }(IMessage));
});
