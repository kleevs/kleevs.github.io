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
        define(["require", "exports", "artiste", "service/email", "./conversation/index", "./selection/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var email_1 = require("service/email");
    var index_1 = require("./conversation/index");
    var index_2 = require("./selection/index");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, _viewProvider, notifier, _emailService) {
            var _this = _super.call(this) || this;
            _this._viewProvider = _viewProvider;
            _this._emailService = _emailService;
            _this.observable = observalizer.convert({
                conversation: undefined,
                selection: undefined
            });
            return _this;
        }
        IndexView.prototype.initialize = function (conversationId) {
            var _this = this;
            this._emailService.conversationById(conversationId).then(function (conversation) {
                _this.observable.conversation = conversation && _this._viewProvider.newInstance(index_1.IIndex, conversation) || undefined;
                _this.observable.selection = conversation && _this._viewProvider.newInstance(index_2.IIndex, conversation) || undefined;
            });
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/email/read/index.html",
                binding: {
                    "[data-id=conversation]": function (indx) { return artiste_1.view(function () { return indx.observable.conversation; }); },
                    "[data-id=selection]": function (indx) { return artiste_1.view(function () { return indx.observable.selection; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                artiste_1.INotifier,
                email_1.IEmailService])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
