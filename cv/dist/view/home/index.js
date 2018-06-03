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
        define(["require", "exports", "artiste", "tools/directive/view", "view/home/navigation", "view/home/resume", "view/home/fullstack", "view/home/education", "view/home/skill", "view/home/portefolio"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var view_1 = require("tools/directive/view");
    var navigation_1 = require("view/home/navigation");
    var resume_1 = require("view/home/resume");
    var fullstack_1 = require("view/home/fullstack");
    var education_1 = require("view/home/education");
    var skill_1 = require("view/home/skill");
    var portefolio_1 = require("view/home/portefolio");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(navigation, resume, fullstack, education, skill, portefolio) {
            var _this = _super.call(this) || this;
            _this.navigation = navigation;
            _this.resume = resume;
            _this.fullstack = fullstack;
            _this.education = education;
            _this.skill = skill;
            _this.portefolio = portefolio;
            return _this;
        }
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/home/index.html",
                binding: {
                    "[navigation]": function (indxView) { return view_1.view(function () { return indxView.navigation; }); },
                    "[resume]": function (indxView) { return view_1.view(function () { return indxView.resume; }); },
                    "[fullstack]": function (indxView) { return view_1.view(function () { return indxView.fullstack; }); },
                    "[education]": function (indxView) { return view_1.view(function () { return indxView.education; }); },
                    "[skill]": function (indxView) { return view_1.view(function () { return indxView.skill; }); },
                    "[portefolio]": function (indxView) { return view_1.view(function () { return indxView.portefolio; }); }
                }
            }),
            __metadata("design:paramtypes", [navigation_1.IIndex,
                resume_1.IIndex,
                fullstack_1.IIndex,
                education_1.IIndex,
                skill_1.IIndex,
                portefolio_1.IIndex])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
