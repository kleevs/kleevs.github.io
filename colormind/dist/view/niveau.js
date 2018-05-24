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
define(["require", "exports", "artiste", "service/app", "service/url", "tools/directive/href"], function (require, exports, artiste_1, app_1, url_1, href_1) {
    "use strict";
    exports.__esModule = true;
    var INiveau = /** @class */ (function () {
        function INiveau() {
        }
        return INiveau;
    }());
    exports.INiveau = INiveau;
    var Niveau = /** @class */ (function (_super) {
        __extends(Niveau, _super);
        function Niveau(app, url, observablizer) {
            var _this = _super.call(this) || this;
            _this.app = app;
            _this.url = url;
            _this.observable = observablizer.convert({ data: [] });
            return _this;
        }
        Niveau.prototype.setNiveau = function (niveau) {
            this.observable.data = this.app.listByNiveau(niveau);
        };
        Niveau = __decorate([
            artiste_1.View({
                template: "dist/template/niveau.html",
                binding: {
                    "[data-id=content]": function (niveauView) { return artiste_1.each(function () {
                        return niveauView.observable.data.map(function (d) {
                            return {
                                "this": [artiste_1.attr(function () {
                                        return {
                                            done: d.score > 0 ? 'true' : 'false'
                                        };
                                    }), href_1.href(function () { return niveauView.url.play + "/" + d.id; })],
                                "[data-id=label]": artiste_1.text(function () { return "" + d.number; }),
                                "[data-id=score]": artiste_1.text(function () { return "" + d.score; }),
                                "[data-id=score-color]": artiste_1.classes(function () { return { won: d.score > 0, wait: d.score <= 0 }; })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [app_1.IApp, url_1.IUrl, artiste_1.IObservablizer])
        ], Niveau);
        return Niveau;
    }(INiveau));
});
