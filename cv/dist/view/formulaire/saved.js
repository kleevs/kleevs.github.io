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
        define(["require", "exports", "artiste", "tools/extends/jquery", "service/person", "model/filter/person"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var jquery_1 = require("tools/extends/jquery");
    var person_1 = require("service/person");
    var person_2 = require("model/filter/person");
    var ISaved = /** @class */ (function () {
        function ISaved() {
        }
        return ISaved;
    }());
    exports.ISaved = ISaved;
    var Saved = /** @class */ (function (_super) {
        __extends(Saved, _super);
        function Saved(observalizer, _personService) {
            var _this = _super.call(this) || this;
            _this._personService = _personService;
            _this.observable = observalizer.convert({
                users: []
            });
            _this._personService.search(new person_2.PersonFilter()).then(function (users) { return _this.observable.users = users; });
            return _this;
        }
        Saved.prototype.save = function (users) {
            var _this = this;
            this._personService.save(users);
            this._personService.search(new person_2.PersonFilter()).then(function (users) { return _this.observable.users = users; });
        };
        Saved = __decorate([
            artiste_1.View({
                template: "tmpl/formulaire/saved.html",
                binding: {
                    "[panel-title]": function (view) { return artiste_1.text(function () { return "Saved"; }); },
                    "table tbody": function (view) { return artiste_1.each(function () {
                        return jquery_1.jQuery.map(view.observable.users, function (row) {
                            return {
                                "[first]": artiste_1.text(function () { return row.first; }),
                                "[last]": artiste_1.text(function () { return row.last; }),
                                "[full]": artiste_1.text(function () { return jquery_1.jQuery.grep([row.first, row.last], function (item) { return !!item; }).join(" "); }),
                                "[age]": artiste_1.text(function () { return row.age; })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer, person_1.IPersonService])
        ], Saved);
        return Saved;
    }(ISaved));
});
