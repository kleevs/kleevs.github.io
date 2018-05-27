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
        define(["require", "exports", "artiste", "service/resourceText", "service/porteFolio", "tools/directive/href", "view/shared/competence/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var resourceText_1 = require("service/resourceText");
    var porteFolio_1 = require("service/porteFolio");
    var href_1 = require("tools/directive/href");
    var index_1 = require("view/shared/competence/index");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var Index = /** @class */ (function (_super) {
        __extends(Index, _super);
        function Index(_resourceText, _porteFolioService, _viewProvider, observalizer, notifier) {
            var _this = _super.call(this) || this;
            _this._resourceText = _resourceText;
            _this._porteFolioService = _porteFolioService;
            _this._viewProvider = _viewProvider;
            _this.observable = observalizer.convert({ screen: undefined, competences: undefined });
            _this.observable.competences = _viewProvider.newInstance(index_1.IIndex);
            return _this;
        }
        Index.prototype.setScreen = function (screen, href) {
            this.observable.screen = this._viewProvider.newInstance(screen, href);
        };
        Index = __decorate([
            artiste_1.View({
                template: "tmpl/layout/default.html",
                binding: {
                    "[data-id=title]": function (layout) { return artiste_1.text(function () { return layout._resourceText.Layout.competence; }); },
                    "[data-id=frame]": function (layout) { return artiste_1.view(function () { return layout.observable.screen; }); },
                    "[data-id=competence]": function (layout) { return artiste_1.view(function () { return layout.observable.competences; }); },
                    "[data-id=home]": function (layout) { return [
                        artiste_1.text(function () { return layout._resourceText.Layout.accueil; }),
                        href_1.href(function () { return "#/accueil"; })
                    ]; },
                    "[data-id=porte-folio]": function (layout) { return [
                        artiste_1.text(function () { return layout._resourceText.Layout.porteFolio; }),
                        href_1.href(function () { return "#/porte-folio"; })
                    ]; },
                    "[data-id=search]": function (layout) { return artiste_1.value({ get: function () { return layout._porteFolioService.search; }, set: function (v) { return layout._porteFolioService.search = v; } }); }
                }
            }),
            __metadata("design:paramtypes", [resourceText_1.IResourceText,
                porteFolio_1.IPorteFolioService,
                artiste_1.IViewProvider,
                artiste_1.IObservablizer,
                artiste_1.INotifier])
        ], Index);
        return Index;
    }(IIndex));
});
