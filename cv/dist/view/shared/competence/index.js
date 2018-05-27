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
        define(["require", "exports", "artiste", "service/competence", "tools/directive/tree"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var competence_1 = require("service/competence");
    var tree_1 = require("tools/directive/tree");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var Index = /** @class */ (function (_super) {
        __extends(Index, _super);
        function Index(observablizer, competenceService) {
            var _this = _super.call(this) || this;
            _this.observable = observablizer.convert({ tree: undefined });
            competenceService.getCompetences().then(function (value) { return _this.observable.tree = value; });
            return _this;
        }
        Index = __decorate([
            artiste_1.View({
                template: "tmpl/shared/competence.html",
                binding: {
                    "[data-id=list]": function (view) { return tree_1.tree(function () { return view.observable.tree; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, competence_1.ICompetenceService])
        ], Index);
        return Index;
    }(IIndex));
});
