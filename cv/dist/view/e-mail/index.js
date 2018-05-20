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
        define(["require", "exports", "artiste", "service/login", "./login", "./inbox/index", "./create/index", "./read/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var login_1 = require("service/login");
    var login_2 = require("./login");
    var index_1 = require("./inbox/index");
    var index_2 = require("./create/index");
    var index_3 = require("./read/index");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(_viewProvider, observalizer, _loginService) {
            var _this = _super.call(this) || this;
            _this._viewProvider = _viewProvider;
            _this._loginService = _loginService;
            _this.observable = observalizer.convert({
                body: undefined
            });
            return _this;
        }
        IndexView.prototype.initialize = function (href) {
            var _this = this;
            this._loginService.isConnected().then(function (user) {
                if (!user) {
                    _this.observable.body = _this._viewProvider.newInstance(login_2.ILogin);
                }
                else if (href.endsWith("create")) {
                    _this.observable.body = _this._viewProvider.newInstance(index_2.IIndex);
                }
                else if (href.indexOf("read/") > 0) {
                    var id = href.substr(href.indexOf("read/") + 5);
                    _this.observable.body = _this._viewProvider.newInstance(index_3.IIndex, id);
                }
                else {
                    _this.observable.body = _this._viewProvider.newInstance(index_1.IInbox);
                }
            });
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/email/index.html",
                binding: {
                    "[data-id=body]": function (indx) { return artiste_1.view(function () { return indx.observable.body; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IViewProvider,
                artiste_1.IObservablizer,
                login_1.ILoginService])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
