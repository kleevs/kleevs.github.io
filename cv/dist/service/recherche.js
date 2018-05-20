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
        define(["require", "exports", "../tools/service", "../ajax/recherche", "../ajax/reference"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("../tools/service");
    var recherche_1 = require("../ajax/recherche");
    var reference_1 = require("../ajax/reference");
    var IRechercheService = /** @class */ (function () {
        function IRechercheService() {
        }
        return IRechercheService;
    }());
    exports.IRechercheService = IRechercheService;
    var RechercheService = /** @class */ (function (_super) {
        __extends(RechercheService, _super);
        function RechercheService(_ajax, _refAjax) {
            var _this = _super.call(this) || this;
            _this._ajax = _ajax;
            _this._refAjax = _refAjax;
            return _this;
        }
        RechercheService.prototype.search = function (filter) {
            return this._ajax.search(filter);
        };
        RechercheService = __decorate([
            service_1.Service({
                key: IRechercheService
            }),
            __metadata("design:paramtypes", [recherche_1.IRechercheAjax, reference_1.IReferenceAjax])
        ], RechercheService);
        return RechercheService;
    }(IRechercheService));
});
