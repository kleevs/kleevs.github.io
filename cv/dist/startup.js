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
        define(["require", "exports", "artiste", "tools/directive/view", "view/home/index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var view_1 = require("tools/directive/view");
    var index_1 = require("view/home/index");
    var Startup = /** @class */ (function () {
        function Startup(home) {
            this.home = home;
        }
        Startup = __decorate([
            artiste_1.View({
                template: "tmpl/layout/index.html",
                binding: {
                    "this": function (starter) { return view_1.view(function () { return starter.home; }); }
                }
            }),
            __metadata("design:paramtypes", [index_1.IIndex])
        ], Startup);
        return Startup;
    }());
    exports.Startup = Startup;
});
