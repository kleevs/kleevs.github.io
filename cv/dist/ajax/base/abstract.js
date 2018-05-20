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
        define(["require", "exports", "tools/service", "model/enum/typePorteFolio", "./database"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    var typePorteFolio_1 = require("model/enum/typePorteFolio");
    var database_1 = require("./database");
    var IAjax = /** @class */ (function () {
        function IAjax() {
        }
        return IAjax;
    }());
    exports.IAjax = IAjax;
    var porteFolios = [
        { link: "/layout=default/porte-folio", text: "Default", type: typePorteFolio_1.TypePorteFolio.layout },
        { link: "/layout=blog/porte-folio", text: "Blog", type: typePorteFolio_1.TypePorteFolio.layout },
        { link: "/layout=web/porte-folio", text: "Web", type: typePorteFolio_1.TypePorteFolio.layout },
        { link: "#/formulaire", text: "Formulaire", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "#/recherche", text: "Recherche", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "#/drag-and-drop", text: "Drag & Drop", type: typePorteFolio_1.TypePorteFolio.screen },
        // { link: "#/e-mail", text: "E-mail", type: TypePorteFolio.screen },
        { link: "#/chart", text: "Google Charts", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "https://kleevs.github.io/colormind/", text: "Colormind", type: typePorteFolio_1.TypePorteFolio.screen }
    ];
    var competences = {
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
    };
    var database = [];
    var Ajax = /** @class */ (function (_super) {
        __extends(Ajax, _super);
        function Ajax(_database) {
            var _this = _super.call(this) || this;
            _this._database = _database;
            return _this;
        }
        Ajax.prototype.ajax = function (options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (options && options.url === "/api/persons/") {
                    var filter = options.data;
                    _this._database.listOfPerson(filter)
                        .then(function (v) { return resolve(v); })
                        .catch(function () { return reject(); });
                }
                else if (options && options.url === "/api/porte-folio/") {
                    resolve(porteFolios);
                }
                else if (options && options.url === "/api/competence/") {
                    resolve(competences);
                }
                else if (options && options.url === "/api/person/") {
                    options.data && _this._database.save(options.data)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/connexion/") {
                    options.data && _this._database.connexion(options.data.login, options.data.password)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/friends/") {
                    var id = options.data;
                    _this._database.friend(id)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/conversations/") {
                    var id = options.data;
                    _this._database.conversation(id)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/messages/") {
                    _this._database.message(options.data)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/send/") {
                    _this._database.send(options.data)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/person/get/") {
                    var id = options.data;
                    _this._database.getPersonById(id)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/create/") {
                    _this._database.create(options.data)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/conversation/") {
                    var id = options.data;
                    _this._database.conversationById(id)
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
                else if (options && options.url === "/api/e-mail/all-messages/") {
                    _this._database.allMessages()
                        .then(function (v) { return resolve(v); })
                        .catch(function (v) { return reject(v); });
                }
            });
        };
        Ajax = __decorate([
            service_1.Service({
                key: IAjax
            }),
            __metadata("design:paramtypes", [database_1.IDataBase])
        ], Ajax);
        return Ajax;
    }(IAjax));
});
