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
        define(["require", "exports", "../tools/service", "../model/person", "./base/abstract"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const service_1 = require("../tools/service");
    const person_1 = require("../model/person");
    const abstract_1 = require("./base/abstract");
    class IPersonAjax {
    }
    exports.IPersonAjax = IPersonAjax;
    let PersonAjax = class PersonAjax extends IPersonAjax {
        constructor(_ajax) {
            super();
            this._ajax = _ajax;
        }
        friend(id) {
            return this._ajax.ajax({
                url: "/api/friends/",
                data: id
            }).then((results) => results.map(p => {
                var res = new person_1.Person();
                res.id = p.id;
                res.age = p.age;
                res.first = p.first;
                res.last = p.last;
                return res;
            }));
        }
        getById(id) {
            return this._ajax.ajax({
                url: "/api/person/get/",
                data: id
            }).then(p => {
                var res = new person_1.Person();
                res.id = p.id;
                res.age = p.age;
                res.first = p.first;
                res.last = p.last;
                return res;
            });
        }
    };
    PersonAjax = __decorate([
        service_1.Service({
            interface: IPersonAjax
        }),
        __metadata("design:paramtypes", [abstract_1.IAjax])
    ], PersonAjax);
});
