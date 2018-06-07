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
        define(["require", "exports", "../base/abstract", "node_modules/artist/dist/artist", "../../service/resourceText", "../../service/porteFolio"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const abstract_1 = require("../base/abstract");
    const artist_1 = require("node_modules/artist/dist/artist");
    const resourceText_1 = require("../../service/resourceText");
    const porteFolio_1 = require("../../service/porteFolio");
    class IWeb extends abstract_1.Abstract {
    }
    exports.IWeb = IWeb;
    let Web = Web_1 = class Web extends IWeb {
        constructor(_resourceText, _porteFolioService, _viewProvider, observalizer, notifier) {
            super(_resourceText, _porteFolioService, _viewProvider, observalizer, notifier);
        }
    };
    Web = Web_1 = __decorate([
        artist_1.View({
            template: "tmpl/layout/web.html"
        }),
        artist_1.Service({ interface: Web_1 }),
        __metadata("design:paramtypes", [resourceText_1.IResourceText,
            porteFolio_1.IPorteFolioService,
            artist_1.IViewProvider,
            artist_1.IObservablizer,
            artist_1.INotifier])
    ], Web);
    var Web_1;
});
