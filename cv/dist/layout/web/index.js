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
        define(["require", "exports", "../base/abstract", "artiste", "../../service/resourceText", "../../service/porteFolio"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abstract_1 = require("../base/abstract");
    var artiste_1 = require("artiste");
    var resourceText_1 = require("../../service/resourceText");
    var porteFolio_1 = require("../../service/porteFolio");
    var IWeb = /** @class */ (function (_super) {
        __extends(IWeb, _super);
        function IWeb() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IWeb;
    }(abstract_1.Abstract));
    exports.IWeb = IWeb;
    var Web = /** @class */ (function (_super) {
        __extends(Web, _super);
        function Web(_resourceText, _porteFolioService, _viewProvider, observalizer, notifier) {
            return _super.call(this, _resourceText, _porteFolioService, _viewProvider, observalizer, notifier) || this;
        }
        Web = __decorate([
            artiste_1.View({
                template: "tmpl/layout/web.html"
            }),
            __metadata("design:paramtypes", [resourceText_1.IResourceText,
                porteFolio_1.IPorteFolioService,
                artiste_1.IViewProvider,
                artiste_1.IObservablizer,
                artiste_1.INotifier])
        ], Web);
        return Web;
    }(IWeb));
});
