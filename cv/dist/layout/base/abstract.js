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
        define(["require", "exports", "node_modules/artist/dist/artist", "tools/href", "../../service/resourceText", "../../service/porteFolio", "../../view/_shared/competence/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("node_modules/artist/dist/artist");
    const href_1 = require("tools/href");
    const resourceText_1 = require("../../service/resourceText");
    const porteFolio_1 = require("../../service/porteFolio");
    const index_1 = require("../../view/_shared/competence/index");
    let Abstract = class Abstract {
        constructor(_resourceText, _porteFolioService, _viewProvider, observalizer, notifier) {
            this._resourceText = _resourceText;
            this._porteFolioService = _porteFolioService;
            this._viewProvider = _viewProvider;
            this.observable = observalizer.convert({ screen: undefined, competences: undefined });
            this.observable.competences = _viewProvider.newInstance(index_1.IIndex);
        }
        setScreen(screen, href) {
            this.observable.screen = this._viewProvider.newInstance(screen, href);
        }
    };
    Abstract = __decorate([
        artist_1.View({
            binding: {
                "[data-id=title]": (layout) => artist_1.text(() => layout._resourceText.Layout.competence),
                "[data-id=frame]": (layout) => artist_1.view(() => layout.observable.screen),
                "[data-id=competence]": (layout) => artist_1.view(() => layout.observable.competences),
                "[data-id=home]": (layout) => [
                    artist_1.text(() => layout._resourceText.Layout.accueil),
                    href_1.href(() => `/accueil`)
                ],
                "[data-id=porte-folio]": (layout) => [
                    artist_1.text(() => layout._resourceText.Layout.porteFolio),
                    href_1.href(() => `/porte-folio`)
                ],
                "[data-id=search]": (layout) => artist_1.value({ get: () => layout._porteFolioService.search, set: (v) => layout._porteFolioService.search = v })
            }
        }),
        __metadata("design:paramtypes", [resourceText_1.IResourceText,
            porteFolio_1.IPorteFolioService,
            artist_1.IViewProvider,
            artist_1.IObservablizer,
            artist_1.INotifier])
    ], Abstract);
    exports.Abstract = Abstract;
});
