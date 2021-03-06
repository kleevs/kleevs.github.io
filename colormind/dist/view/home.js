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
define(["require", "exports", "artiste", "tools/directive/href", "service/url"], function (require, exports, artiste_1, href_1, url_1) {
    "use strict";
    exports.__esModule = true;
    var IHome = /** @class */ (function () {
        function IHome() {
        }
        return IHome;
    }());
    exports.IHome = IHome;
    var Home = /** @class */ (function (_super) {
        __extends(Home, _super);
        function Home(observablizer, url) {
            var _this = _super.call(this) || this;
            _this.observable = observablizer.convert({
                niveau1: url.niveau + "/1", niveau2: url.niveau + "/2", niveau3: url.niveau + "/3"
            });
            return _this;
        }
        Home = __decorate([
            artiste_1.View({
                template: "dist/template/home.html",
                binding: {
                    "[data-id=niveau1]": function (homeView) { return href_1.href(function () { return homeView.observable.niveau1; }); },
                    "[data-id=niveau2]": function (homeView) { return href_1.href(function () { return homeView.observable.niveau2; }); },
                    "[data-id=niveau3]": function (homeView) { return href_1.href(function () { return homeView.observable.niveau3; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, url_1.IUrl])
        ], Home);
        return Home;
    }(IHome));
});
