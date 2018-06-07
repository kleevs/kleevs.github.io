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
        define(["require", "exports", "tools/service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    // import { IReferenceAjax } from 'ajax/reference';
    var IReferenceService = /** @class */ (function () {
        function IReferenceService() {
        }
        return IReferenceService;
    }());
    exports.IReferenceService = IReferenceService;
    var ReferenceService = /** @class */ (function (_super) {
        __extends(ReferenceService, _super);
        function ReferenceService() {
            return _super.call(this) || this;
        }
        ReferenceService.prototype.getPorteFolio = function () {
            return Promise.resolve([
                { link: "#/formulaire", text: "Formulaire" },
                { link: "#/recherche", text: "Recherche" },
                { link: "#/drag-and-drop", text: "Drag & Drop" },
                // { link: "#/e-mail", text: "E-mail" },
                { link: "#/chart", text: "Google Charts" },
                { link: "https://kleevs.github.io/colormind/", text: "Colormind" }
            ]);
        };
        ReferenceService.prototype.getCompetences = function () {
            return Promise.resolve({
                "Système d’exploitation": ["Windows", "UNIX-Linux (Ubuntu)", "Mac"],
                "Back end": {
                    "C#": [".Net Core", ".Net MVC", ".Net Webform", "Entity framework"],
                    "Nodejs": [],
                    "Php": ["Zend 2", "Symphony 2"],
                    "Sql": ["Sql server", "Mysql"]
                },
                "Front end": {
                    "Html/Css": [],
                    "Sass": [],
                    "Typescript/javascript": ["Angular", "<a href='https://github.com/kleevs/artist'>Artist</a>", "Knockout", "Backbonejs", "Requirejs"]
                },
                "Outils": ["Visual Studio 2017", "Visual Studio Code", "SVN", "Git", "Nugget", "Npm", "Sql Server Management"]
            });
        };
        ReferenceService = __decorate([
            service_1.Service({
                key: IReferenceService
            }),
            __metadata("design:paramtypes", [])
        ], ReferenceService);
        return ReferenceService;
    }(IReferenceService));
});
