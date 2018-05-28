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
        define(["require", "exports", "node_modules/web-sql-api/dist/web-sql-api", "tools/service", "./resource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const web_sql_api_1 = require("node_modules/web-sql-api/dist/web-sql-api");
    const service_1 = require("tools/service");
    const resource_1 = require("./resource");
    class IDataBase {
    }
    exports.IDataBase = IDataBase;
    let DataBase = class DataBase extends IDataBase {
        constructor() {
            super();
            this._name = "website";
            this._version = "1.0";
            this._size = 2000000;
            this._db = new web_sql_api_1.DataBase(this._name, this._version, "", this._size, (db) => {
                Promise.all([resource_1.read('sql/create-database.sql'), resource_1.read('sql/init-database.sql')]).then((values) => {
                    db.transaction(`${values[0]}${values[1]}`);
                });
            });
        }
        connexion(login, password) {
            return resource_1.read('sql/connexion.sql').then((sql) => this._db.transaction(tr => {
                return tr.select(sql, { login, password });
            })).then(results => {
                return results[0];
            });
        }
        listOfPerson(filter) {
            return resource_1.read('sql/list-person.sql').then((sql) => this._db.transaction((t) => {
                return t.select(sql, filter);
            }));
        }
        friend(id) {
            return resource_1.read('sql/list-friend-by-person-id.sql')
                .then((sql) => this._db.transaction((t) => t.select(sql, { id })));
        }
        getPersonById(id) {
            return resource_1.read('sql/get-person-by-id.sql')
                .then((sql) => this._db.transaction((t) => t.select(sql, { id })))
                .then((results) => results[0]);
        }
        conversation(personId) {
            return resource_1.read('sql/list-conversation-by-person-id.sql')
                .then((sql) => this._db.transaction((t) => t.select(sql, { personId })));
        }
        conversationById(conversationId) {
            return resource_1.read('sql/get-conversation-by-id.sql')
                .then(sql => this._db.transaction((t) => t.select(sql, { conversationId })))
                .then((results) => results.map(c => {
                var res = {
                    id: c.id,
                    objet: c.objet,
                    createdBy: { id: c.createdBy },
                    persons: []
                };
                return resource_1.read('sql/list-participant-by-conversation-id.sql')
                    .then((sql) => this._db.transaction((t) => t.select(sql, { conversationId })))
                    .then((users) => res.persons = users)
                    .then(() => res);
            })[0]);
        }
        message(data) {
            return resource_1.read('sql/list-message-by-conversation-id.sql')
                .then(sql => this._db.transaction((t) => t.select(sql, { lastId: data.lastId || 0, conversationId: data.conversationId })))
                .then((results) => results.filter(m => m.id > data.lastId));
        }
        send(data) {
            return resource_1.read('sql/insert-message.sql')
                .then(sql => this._db.transaction((t) => t.execute(sql, data) && false || true));
        }
        save(persons) {
            return resource_1.read('sql/insert-person.sql')
                .then(sql => this._db.transaction((t) => persons && persons.forEach(p => t.execute(sql, p)) && false || true));
        }
        allMessages() {
            return resource_1.read('sql/list-message.sql')
                .then(sql => this._db.transaction((t) => t.select(sql)));
        }
        create(data) {
            return Promise.all([
                resource_1.read('sql/insert-conversation.sql'),
                resource_1.read('sql/insert-participant.sql'),
                resource_1.read('sql/insert-message.sql')
            ]).then(sqls => this._db.transaction((t) => {
                if (data.destinataires.length <= 0)
                    return undefined;
                return t.execute(sqls[0], {
                    createdBy: data.writtenBy,
                    objet: data.objet
                }).then((res) => {
                    var conversationId = res.insertId;
                    data.destinataires.forEach(p => t.execute(sqls[1], {
                        conversation: conversationId,
                        person: p
                    }));
                    t.execute(sqls[1], {
                        conversation: conversationId,
                        person: data.writtenBy
                    });
                    t.execute(sqls[2], {
                        writtenBy: data.writtenBy,
                        conversation: conversationId,
                        message: data.message,
                        date: new Date().getTime()
                    });
                    return conversationId;
                });
            }));
        }
    };
    DataBase = __decorate([
        service_1.Service({
            interface: IDataBase
        }),
        __metadata("design:paramtypes", [])
    ], DataBase);
});
