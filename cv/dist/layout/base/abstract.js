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
        define(["require", "exports", "artiste", "tools/href", "service/resourceText", "service/porteFolio", "view/shared/competence/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var href_1 = require("tools/href");
    var resourceText_1 = require("service/resourceText");
    var porteFolio_1 = require("service/porteFolio");
    var index_1 = require("view/shared/competence/index");
    var Abstract = /** @class */ (function () {
        function Abstract(_resourceText, _porteFolioService, _viewProvider, observalizer, notifier) {
            this._resourceText = _resourceText;
            this._porteFolioService = _porteFolioService;
            this._viewProvider = _viewProvider;
            this.observable = observalizer.convert({ screen: undefined, competences: undefined });
            this.observable.competences = _viewProvider.newInstance(index_1.IIndex);
        }
        Abstract.prototype.setScreen = function (screen, href) {
            this.observable.screen = this._viewProvider.newInstance(screen, href);
        };
        Abstract = __decorate([
            artiste_1.View({
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
        ], Abstract);
        return Abstract;
    }());
    exports.Abstract = Abstract;
});
