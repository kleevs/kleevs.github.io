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
        define(["require", "exports", "artiste", "service/email", "tools/directive/href"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var email_1 = require("service/email");
    var href_1 = require("tools/directive/href");
    var INouveau = /** @class */ (function () {
        function INouveau() {
        }
        return INouveau;
    }());
    exports.INouveau = INouveau;
    var NouveauView = /** @class */ (function (_super) {
        __extends(NouveauView, _super);
        function NouveauView(observalizer, _notifier, _emailService) {
            var _this = _super.call(this) || this;
            _this._notifier = _notifier;
            _this._emailService = _emailService;
            _this.observable = observalizer.convert({
                title: "Nouveau message",
                selected: false
            });
            return _this;
        }
        NouveauView.prototype.nouveau = function () {
        };
        NouveauView = __decorate([
            artiste_1.View({
                template: "tmpl/email/inbox/selection/nouveau.html",
                binding: {
                    "this": function (nouveau) { return href_1.href(function () { return "/e-mail/create"; }); },
                    "[data-id=content]": function (nouveau) { return artiste_1.text(function () { return nouveau.observable.title; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.INotifier,
                email_1.IEmailService])
        ], NouveauView);
        return NouveauView;
    }(INouveau));
});
