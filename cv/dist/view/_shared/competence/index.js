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
        define(["require", "exports", "node_modules/artist/dist/artist", "../../../service/competence", "../../../tools/tree"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const artist_1 = require("node_modules/artist/dist/artist");
    const competence_1 = require("../../../service/competence");
    const tree_1 = require("../../../tools/tree");
    class IIndex {
    }
    exports.IIndex = IIndex;
    let Index = Index_1 = class Index extends IIndex {
        constructor(_competenceService) {
            super();
            this._competenceService = _competenceService;
        }
    };
    Index = Index_1 = __decorate([
        artist_1.View({
            template: "tmpl/_shared/competence.html",
            binding: {
                "[data-id=list]": (view) => tree_1.tree(() => view._competenceService.getCompetences())
            }
        }),
        artist_1.Service({ interface: Index_1 }),
        __metadata("design:paramtypes", [competence_1.ICompetenceService])
    ], Index);
    var Index_1;
});
