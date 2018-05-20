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
        define(["require", "exports", "artiste", "tools/chart/pie", "service/email"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var pie_1 = require("tools/chart/pie");
    var email_1 = require("service/email");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, emailService) {
            var _this = _super.call(this) || this;
            _this.emailService = emailService;
            _this.observable = observalizer.convert({
                data: undefined
            });
            return _this;
        }
        IndexView.prototype.initialize = function () {
            var _this = this;
            this.emailService.statistiqueMessageSent().then(function (res) { return _this.observable.data = res; });
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/chart/pie/index.html",
                binding: {
                    "[data-id=pie-msg-send]": function (indx) { return pie_1.pie(function () { return indx.observable.data; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                email_1.IEmailService])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
