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
        define(["require", "exports", "../../tools/service", "../../model/enum/typePorteFolio", "./database"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("../../tools/service");
    const typePorteFolio_1 = require("../../model/enum/typePorteFolio");
    const database_1 = require("./database");
    class IAjax {
    }
    exports.IAjax = IAjax;
    let porteFolios = [
        { link: "/layout=default/porte-folio", text: "Default", type: typePorteFolio_1.TypePorteFolio.layout },
        { link: "/layout=blog/porte-folio", text: "Blog", type: typePorteFolio_1.TypePorteFolio.layout },
        { link: "/layout=web/porte-folio", text: "Web", type: typePorteFolio_1.TypePorteFolio.layout },
        { link: "formulaire", text: "Formulaire", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "recherche", text: "Recherche", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "drag-and-drop", text: "Drag & Drop", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "e-mail", text: "E-mail", type: typePorteFolio_1.TypePorteFolio.screen },
        { link: "chart", text: "Google Charts", type: typePorteFolio_1.TypePorteFolio.screen }
    ];
    let competences = {
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
    let database = [];
    let Ajax = class Ajax extends IAjax {
        constructor(_database) {
            super();
            this._database = _database;
        }
        ajax(options) {
            return new Promise((resolve, reject) => {
                if (options && options.url === "/api/persons/") {
                    var filter = options.data;
                    this._database.listOfPerson(filter)
                        .then((v) => resolve(v))
                        .catch(() => reject());
                }
                else if (options && options.url === "/api/porte-folio/") {
                    resolve(porteFolios);
                }
                else if (options && options.url === "/api/competence/") {
                    resolve(competences);
                }
                else if (options && options.url === "/api/person/") {
                    options.data && this._database.save(options.data)
                        .then((v) => resolve(v))
                        .catch(v => reject(v));
                }
                else if (options && options.url === "/api/e-mail/connexion/") {
                    options.data && this._database.connexion(options.data.login, options.data.password)
                        .then(v => resolve(v))
                        .catch(v => reject(v));
                }
                else if (options && options.url === "/api/friends/") {
                    var id = options.data;
                    this._database.friend(id)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/e-mail/conversations/") {
                    var id = options.data;
                    this._database.conversation(id)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/e-mail/messages/") {
                    this._database.message(options.data)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/e-mail/send/") {
                    this._database.send(options.data)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/person/get/") {
                    var id = options.data;
                    this._database.getPersonById(id)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/e-mail/create/") {
                    this._database.create(options.data)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/e-mail/conversation/") {
                    var id = options.data;
                    this._database.conversationById(id)
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
                else if (options && options.url === "/api/e-mail/all-messages/") {
                    this._database.allMessages()
                        .then((v) => resolve(v))
                        .catch((v) => reject(v));
                }
            });
        }
    };
    Ajax = __decorate([
        service_1.Service({
            interface: IAjax
        }),
        __metadata("design:paramtypes", [database_1.IDataBase])
    ], Ajax);
});
