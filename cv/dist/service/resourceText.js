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
            this.resume = {
                paragraphe: {
                    $1: "Je suis D\u00E9veloppeur web depuis maintenant 5 ans. \n                Mes domaines de comp\u00E9tences sont le C#.Net (Mvc et Core), Javascript, Android et l'IOS.\n                J'ai pu travailler sur des projets de maintenance corrective et \u00E9volutive, mais aussi sur de projets d'application web \"Ex nihilo\" pour de grands comptes (V\u00E9olia, A\u00E9roport de Paris, Sodexo, MAF, ...).\n                Le d\u00E9veloppement d'application Android et IOS est une activit\u00E9 que j'exerce seul et \u00E0 titre personnel."
                }
            };
            this.fullstack = {
                paragraphe: {
                    $1: "Avant de concevoir une application web, il est important de définir ce qu'est une application web.",
                    $2: "Une application web d\u00E9signe un logiciel d\u00E9velopp\u00E9 avec les m\u00EAmes technologies que celles utilis\u00E9es pour les sites internet. \n                Ce type d'application est h\u00E9berg\u00E9 sur un serveur et accessible via un navigateur web. Par cons\u00E9quent, l'\u00E9cosyst\u00E8me dans lequel \u00E9volue\n                une application web est compos\u00E9 a minima de deux machines qui communiquent. Ce qu'on appelle donc commun\u00E9ment une application web est un programme\n                s'\u00E9xecutant sur un serveur (C#, Java, Php, NodeJs, ...) qui fournit \u00E0 chaque requ\u00EAte http le contenu compr\u00E9hensible aux navigateurs web (html, css, javascript)\n                permettant alors \u00E0 l'utilisateur d'acceder aux fonctionnalit\u00E9s d\u00E9sir\u00E9es via une interface graphique.\n                Le programme s'\u00E9xecutant sur le serveur distant est appel\u00E9 backend et l'ensemble des fichier html, css et javascript compris par le navigateur web est appel\u00E9 frontend.",
                    $3: "Aujourd'hui, la volont\u00E9 d'acceder aux fonctionnalit\u00E9s d'une application via diff\u00E9rents terminaux (pc, tablettes et mobiles) obligent les concepteurs \u00E0 fournir pour la m\u00EAme application\n                des interfaces adapt\u00E9es pour chaque support. Ainsi, la responsabilit\u00E9 de la cr\u00E9ation de l'interface utilisateur est incomb\u00E9e aux applications frontend tandis que l'application backend reste \n                en charge de la gestion et l'\u00E9change des donn\u00E9es ayant un sens fonctionnel. L'\u00E9volution du javascript et de ses performances a permis l'\u00E9mergence de ces applications frontend.",
                    $4: "Voici un exemple d'architecture qui illuste ce concept."
                }
            };
            this.education = {
                sherbrooke: {
                    title: "Université de Sherbrooke (Qc)",
                    diplome: "Maitrise en informatique",
                    periode: "Juin 2011 - Aout 2013"
                },
                ensiie: {
                    title: "ENSIIE",
                    diplome: "Ingénieur en informatique",
                    periode: "Septembre 2009 - Aout 2013"
                },
                prepa: {
                    title: "Institut Galilée",
                    diplome: "Classe préparatoire PCSI",
                    periode: "Septembre 2007 - Juin 2009"
                }
            };
            this.experience = {};
            this.navigation = {};
            this.portefolio = {
                title: "Porte folio",
                colormind: {
                    description: "Colormind",
                    link: "site web"
                },
                artiste: {
                    description: "Artiste",
                    link: "package npm"
                },
                usermanager: {
                    description: "POC application de gestion des utilisateurs",
                    link: "site web"
                },
                ngusermanager: {
                    description: "POC application de gestion des utilisateurs (Angular version)",
                    link: "site web"
                },
                mail: {
                    description: "POC webmail",
                    link: "site web"
                }
            };
            this.skill = {};
            this.Accueil = {
                hello: "Bonjour,",
                paragraphe: "Je suis D\u00E9veloppeur web depuis maintenant 5 ans. \n        Mes domaines de comp\u00E9tences sont le C#.Net (Mvc et Core), Javascript, Android et l'IOS.\n        J'ai pu travailler sur des projets de maintenance corrective et \u00E9volutive, mais aussi sur de projets d'application web \"Ex nihilo\" pour de grands comptes (V\u00E9olia, A\u00E9roport de Paris, Sodexo, MAF, ...).\n        Le d\u00E9veloppement d'application Android et IOS est une activit\u00E9 que j'exerce seul et \u00E0 titre personnel.",
                conception: {
                    title: "Conception frontend-backend",
                    paragraphe: {
                        $1: "Avant de concevoir une application web, il est important de définir ce qu'est une application web.",
                        $2: "Une application web d\u00E9signe un logiciel d\u00E9velopp\u00E9 avec les m\u00EAmes technologies que celles utilis\u00E9es pour les sites internet. \n                Ce type d'application est h\u00E9berg\u00E9 sur un serveur et accessible via un navigateur web. Par cons\u00E9quent, l'\u00E9cosyst\u00E8me dans lequel \u00E9volue\n                une application web est compos\u00E9 a minima de deux machines qui communiquent. Ce qu'on appelle donc commun\u00E9ment une application web est un programme\n                s'\u00E9xecutant sur un serveur (C#, Java, Php, NodeJs, ...) qui fournit \u00E0 chaque requ\u00EAte http le contenu compr\u00E9hensible aux navigateurs web (html, css, javascript)\n                permettant alors \u00E0 l'utilisateur d'acceder aux fonctionnalit\u00E9s d\u00E9sir\u00E9es via une interface graphique.\n                Le programme s'\u00E9xecutant sur le serveur distant est appel\u00E9 backend et l'ensemble des fichier html, css et javascript compris par le navigateur web est appel\u00E9 frontend.",
                        $3: "Aujourd'hui, la volont\u00E9 d'acceder aux fonctionnalit\u00E9s d'une application via diff\u00E9rents terminaux (pc, tablettes et mobiles) obligent les concepteurs \u00E0 fournir pour la m\u00EAme application\n                des interfaces adapt\u00E9es pour chaque support. Ainsi, la responsabilit\u00E9 de la cr\u00E9ation de l'interface utilisateur est incomb\u00E9e aux applications frontend tandis que l'application backend reste \n                en charge de la gestion et l'\u00E9change des donn\u00E9es ayant un sens fonctionnel. L'\u00E9volution du javascript et de ses performances a permis l'\u00E9mergence de ces applications frontend.",
                        $4: "Voici un exemple d'architecture qui illuste ce concept."
                    }
                },
                frontend: {
                    title: "Architecture frontend",
                    paragraphe: {
                        $1: "La partie frontend d'une application web est constitu\u00E9e de l'ensemble des fichiers html, css et javascript.\n                Cette partie peut \u00EAtre consid\u00E9r\u00E9 comme un site statique heberg\u00E9 sur un serveur de fichier. \n                L'html/css permet l'affichage des donn\u00E9es et des interfaces d'interactions. Le javascript est le principal langage de cette partie.\n                Il peut \u00EAtre s\u00E9par\u00E9 en plusieurs parties :",
                        $2: [
                            "Le code gérant l'affichage de l'interface via l'html.",
                            "Le code qui manipule le DOM.",
                            "Le code implémentant les règles de gestion de l'application.",
                            "Le code implémentant les outils réutilisables."
                        ],
                        $3: "Voici un exemple d'architecture frontend pour une application affichant une liste d'utilisateurs."
                    }
                },
                backend: {
                    title: "Architecture backend (API Rest)",
                    paragraphe: {
                        $1: "La partie backend d'une application web constitue le programme s'\u00E9xecutant sur le serveur distant. \n                Ce programme n'ayant pas la responsabilit\u00E9 de la cr\u00E9ation de l'interface utilisateur, \n                n'a pas \u00E0 se soucier de l'affichage des donn\u00E9es qu'il renvoient aux applications frontend\n                avec lesquelles il communique. Un atout majeur de cela est la construction du backend en tant qu'API\n                orient\u00E9e fonctionnel et d\u00E9velopp\u00E9e dans une technologie standard comme JSON ou XML.\n                L'architecture REST est un ensemble de r\u00E8gle permettant de d\u00E9crire cette API et le protocole de communication\n                entre les parties frontend et backend.",
                        $2: "L'architecture 3 tiers peut être utilisé pour la création du backend de l'application et séparer le code entre :",
                        $3: [
                            "Le controller responsable du formatage de la requête http reçue et renvoyée et de la validité du format des données reçues.",
                            "Le modèle ou couche métier responsable des règles de gestion métiers.",
                            "La couche d'accès au données responsable de la sauvegarde, la récupération et l'agrégation des données."
                        ],
                        $4: "Voici un exemple d'architecture backend pour une application affichant une liste d'utilisateurs."
                    }
                }
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
