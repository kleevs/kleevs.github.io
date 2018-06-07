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
        define(["require", "exports", "artiste", "tools/directive/view", "tools/service/notify"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var view_1 = require("tools/directive/view");
    var notify_1 = require("tools/service/notify");
    var IModal = /** @class */ (function () {
        function IModal() {
        }
        IModal.Event = {
            Close: new artiste_1.Event("modal:close")
        };
        return IModal;
    }());
    exports.IModal = IModal;
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        function Modal(observablizer, notifier) {
            var _this = _super.call(this) || this;
            _this.notifier = notifier;
            _this.observable = observablizer.convert({ view: undefined });
            notifier.forEvent(IModal.Event.Close).listen(_this, function (context, content) {
                _this.callback();
                return true;
            });
            return _this;
        }
        Modal.prototype.setContent = function (view, callback) {
            this.observable.view = view;
            this.callback = callback;
        };
        Modal = __decorate([
            artiste_1.View({
                template: "tmpl/modal.html",
                binding: {
                    "[data-id=content]": function (modalView) { return view_1.view(function () { return modalView.observable.view; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, notify_1.INotifier])
        ], Modal);
        return Modal;
    }(IModal));
});
