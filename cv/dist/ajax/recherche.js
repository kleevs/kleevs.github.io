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
        define(["require", "exports", "tools/service", "model/person", "./base/abstract"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    var person_1 = require("model/person");
    var abstract_1 = require("./base/abstract");
    var IRechercheAjax = /** @class */ (function () {
        function IRechercheAjax() {
        }
        return IRechercheAjax;
    }());
    exports.IRechercheAjax = IRechercheAjax;
    var RechercheAjax = /** @class */ (function (_super) {
        __extends(RechercheAjax, _super);
        function RechercheAjax(_ajax) {
            var _this = _super.call(this) || this;
            _this._ajax = _ajax;
            return _this;
        }
        RechercheAjax.prototype.search = function (filter) {
            return this._ajax.ajax({
                url: "/api/persons/",
                data: filter
            }).then(function (results) { return results.map(function (p) {
                var res = new person_1.Person();
                res.id = p.id;
                res.age = p.age;
                res.first = p.first;
                res.last = p.last;
                return res;
            }); });
        };
        RechercheAjax.prototype.save = function (person) {
            return this._ajax.ajax({
                url: "/api/person/",
                data: person
            });
        };
        RechercheAjax = __decorate([
            service_1.Service({
                key: IRechercheAjax
            }),
            __metadata("design:paramtypes", [abstract_1.IAjax])
        ], RechercheAjax);
        return RechercheAjax;
    }(IRechercheAjax));
});