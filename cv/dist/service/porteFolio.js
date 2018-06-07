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
        define(["require", "exports", "tools/service", "./resourceText", "./reference"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var service_1 = require("tools/service");
    var resourceText_1 = require("./resourceText");
    var reference_1 = require("./reference");
    var IPorteFolioService = /** @class */ (function () {
        function IPorteFolioService() {
        }
        return IPorteFolioService;
    }());
    exports.IPorteFolioService = IPorteFolioService;
    var PorteFolioService = /** @class */ (function (_super) {
        __extends(PorteFolioService, _super);
        function PorteFolioService(_resourceText, _refService) {
            var _this = _super.call(this) || this;
            _this._resourceText = _resourceText;
            _this._refService = _refService;
            _this.search = undefined;
            return _this;
        }
        PorteFolioService.prototype.getScreens = function () {
            return this._refService.getPorteFolio();
        };
        PorteFolioService.prototype.recherche = function (value) {
            if (value) {
                this.porteFoliosFiltered = this.porteFolios.filter(function (item) { return item.text.toLowerCase().indexOf(value) >= 0; });
            }
            else {
                this.porteFoliosFiltered = this.porteFolios;
            }
        };
        PorteFolioService = __decorate([
            service_1.Service({
                key: IPorteFolioService
            }),
            __metadata("design:paramtypes", [resourceText_1.IResourceText, reference_1.IReferenceService])
        ], PorteFolioService);
        return PorteFolioService;
    }(IPorteFolioService));
});
