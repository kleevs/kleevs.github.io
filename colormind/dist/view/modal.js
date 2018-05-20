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
define(["require", "exports", "artiste", "tools/directive/modal"], function (require, exports, artiste_1, modal_1) {
    "use strict";
    exports.__esModule = true;
    var IModal = /** @class */ (function () {
        function IModal() {
        }
        return IModal;
    }());
    exports.IModal = IModal;
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        function Modal(observablizer) {
            var _this = _super.call(this) || this;
            _this.observable = observablizer.convert({ message: undefined, callback: undefined });
            return _this;
        }
        Modal.prototype.setMessage = function (msg) {
            this.observable.message = msg;
        };
        Modal.prototype.setCallback = function (callback) {
            this.observable.callback = callback;
        };
        Modal = __decorate([
            artiste_1.View({
                template: "dist/template/modal.html",
                binding: {
                    "[data-id=message]": function (modal) { return artiste_1.text(function () { return modal.observable.message; }); },
                    "this": function (modalView) { return [modal_1.dismiss(function () { return modalView.observable.callback; }), modal_1.modal()]; }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer])
        ], Modal);
        return Modal;
    }(IModal));
});
