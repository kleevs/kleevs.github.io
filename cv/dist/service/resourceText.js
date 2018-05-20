var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tools/service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    var IResourceText = /** @class */ (function () {
        function IResourceText() {
            this.Layout = {
                accueil: "Accueil",
                competence: "Compétences",
                porteFolio: "Porte Folio"
            };
            this.PorteFolio = {
                layouts: "Layouts",
                screens: "Ecrans"
            };
            this.Accueil = {
                hello: "Bonjour,",
                paragraphe: "Je suis D\u00E9veloppeur web depuis maintenant 5 ans. \n        Mes domaines de comp\u00E9tences sont le C#.Net (Mvc et Core), Javascript, Android et l'IOS.\n        J'ai pu travailler sur des projets de maintenance corrective et \u00E9volutive, mais aussi sur de projets d'application web \"Ex nihilo\" pour de grands comptes (V\u00E9olia, A\u00E9roport de Paris, Sodexo, MAF, ...).\n        Le d\u00E9veloppement d'application Android et IOS est une activit\u00E9 que j'exerce seul et \u00E0 titre personnel."
            };
            this.Recherche = {
                person: "Utilisateurs",
                first: "Prénom",
                last: "Nom",
                age: "Age",
                search: "Recherche"
            };
        }
        IResourceText_1 = IResourceText;
        IResourceText = IResourceText_1 = __decorate([
            service_1.Service({
                key: IResourceText_1
            })
        ], IResourceText);
        return IResourceText;
        var IResourceText_1;
    }());
    exports.IResourceText = IResourceText;
});
