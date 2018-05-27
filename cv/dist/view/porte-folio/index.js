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
        define(["require", "exports", "artiste", "tools/extends/jquery", "service/porteFolio", "service/resourceText"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var jquery_1 = require("tools/extends/jquery");
    var porteFolio_1 = require("service/porteFolio");
    var resourceText_1 = require("service/resourceText");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, porteFolio, resourceTextService) {
            var _this = _super.call(this) || this;
            _this.observable = observalizer.convert({
                layouts: [],
                screens: [],
                layoutLabel: resourceTextService.PorteFolio.layouts,
                screenLabel: resourceTextService.PorteFolio.screens
            });
            porteFolio.getScreens().then(function (result) { return _this.observable.screens = result; });
            return _this;
        }
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/porte-folio.html",
                binding: {
                    "[data-id=layouts]": function (view) { return artiste_1.each(function () {
                        var array = view.observable.layouts;
                        return jquery_1.jQuery.map(array, function (row) {
                            return {
                                "this": artiste_1.attr(function () { return { href: row.link }; }),
                                "[data-id=text]": artiste_1.text(function () { return row.text; })
                            };
                        });
                    }); },
                    "[data-id=screens]": function (view) { return artiste_1.each(function () {
                        var array = view.observable.screens;
                        return jquery_1.jQuery.map(array, function (row) {
                            return {
                                "this": artiste_1.attr(function () { return { href: "" + row.link }; }),
                                "[data-id=text]": artiste_1.text(function () { return row.text; })
                            };
                        });
                    }); },
                    "[data-id=layout-label]": function (view) { return artiste_1.text(function () { return view.observable.layoutLabel; }); },
                    "[data-id=screen-label]": function (view) { return artiste_1.text(function () { return view.observable.screenLabel; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, porteFolio_1.IPorteFolioService, resourceText_1.IResourceText])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
