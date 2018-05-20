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
        define(["require", "exports", "artiste", "node_modules/web-sql-api/dist/web-sql-api", "tools/service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var web_sql_api_1 = require("node_modules/web-sql-api/dist/web-sql-api");
    var service_1 = require("tools/service");
    var IDataBase = /** @class */ (function () {
        function IDataBase() {
        }
        return IDataBase;
    }());
    exports.IDataBase = IDataBase;
    var DataBase = /** @class */ (function (_super) {
        __extends(DataBase, _super);
        function DataBase(ajax) {
            var _this = _super.call(this) || this;
            _this.ajax = ajax;
            _this._name = "website";
            _this._version = "1.0";
            _this._size = 2000000;
            _this._db = new web_sql_api_1.DataBase(_this._name, _this._version, "", _this._size, function (db) {
                Promise.all([_this.read('sql/create-database.sql'), _this.read('sql/init-database.sql')]).then(function (values) {
                    db.transaction("" + values[0] + values[1]);
                });
            });
            return _this;
        }
        DataBase.prototype.read = function (filename) {
            return this.ajax.ajax({ url: filename.indexOf("/") === 0 ? filename : "/" + filename }).then(function (response) { return response.result; });
        };
        DataBase.prototype.connexion = function (login, password) {
            var _this = this;
            return this.read('sql/connexion.sql').then(function (sql) { return _this._db.transaction(function (tr) {
                return tr.select(sql, { login: login, password: password });
            }); }).then(function (results) {
                return results[0];
            });
        };
        DataBase.prototype.listOfPerson = function (filter) {
            var _this = this;
            return this.read('sql/list-person.sql').then(function (sql) { return _this._db.transaction(function (t) {
                return t.select(sql, filter);
            }); });
        };
        DataBase.prototype.friend = function (id) {
            var _this = this;
            return this.read('sql/list-friend-by-person-id.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql, { id: id }); }); });
        };
        DataBase.prototype.getPersonById = function (id) {
            var _this = this;
            return this.read('sql/get-person-by-id.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql, { id: id }); }); })
                .then(function (results) { return results[0]; });
        };
        DataBase.prototype.conversation = function (personId) {
            var _this = this;
            return this.read('sql/list-conversation-by-person-id.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql, { personId: personId }); }); });
        };
        DataBase.prototype.conversationById = function (conversationId) {
            var _this = this;
            return this.read('sql/get-conversation-by-id.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql, { conversationId: conversationId }); }); })
                .then(function (results) { return results.map(function (c) {
                var res = {
                    id: c.id,
                    objet: c.objet,
                    createdBy: { id: c.createdBy },
                    persons: []
                };
                return _this.read('sql/list-participant-by-conversation-id.sql')
                    .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql, { conversationId: conversationId }); }); })
                    .then(function (users) { return res.persons = users; })
                    .then(function () { return res; });
            })[0]; });
        };
        DataBase.prototype.message = function (data) {
            var _this = this;
            return this.read('sql/list-message-by-conversation-id.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql, { lastId: data.lastId || 0, conversationId: data.conversationId }); }); })
                .then(function (results) { return results.filter(function (m) { return m.id > data.lastId; }); });
        };
        DataBase.prototype.send = function (data) {
            var _this = this;
            return this.read('sql/insert-message.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.execute(sql, data) && false || true; }); });
        };
        DataBase.prototype.save = function (persons) {
            var _this = this;
            return this.read('sql/insert-person.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return persons && persons.forEach(function (p) { return t.execute(sql, p); }) && false || true; }); });
        };
        DataBase.prototype.allMessages = function () {
            var _this = this;
            return this.read('sql/list-message.sql')
                .then(function (sql) { return _this._db.transaction(function (t) { return t.select(sql); }); });
        };
        DataBase.prototype.create = function (data) {
            var _this = this;
            return Promise.all([
                this.read('sql/insert-conversation.sql'),
                this.read('sql/insert-participant.sql'),
                this.read('sql/insert-message.sql')
            ]).then(function (sqls) {
                return _this._db.transaction(function (t) {
                    if (data.destinataires.length <= 0)
                        return undefined;
                    return t.execute(sqls[0], {
                        createdBy: data.writtenBy,
                        objet: data.objet
                    }).then(function (res) {
                        var conversationId = res.insertId;
                        data.destinataires.forEach(function (p) { return t.execute(sqls[1], {
                            conversation: conversationId,
                            person: p
                        }); });
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
                });
            });
        };
        DataBase = __decorate([
            service_1.Service({
                key: IDataBase
            }),
            __metadata("design:paramtypes", [artiste_1.IAjax])
        ], DataBase);
        return DataBase;
    }(IDataBase));
});
