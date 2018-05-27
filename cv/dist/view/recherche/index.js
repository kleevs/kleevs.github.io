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
        define(["require", "exports", "artiste", "service/person", "service/resourceText", "tools/directive/datatable", "model/filter/person"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var person_1 = require("service/person");
    var resourceText_1 = require("service/resourceText");
    var datatable_1 = require("tools/directive/datatable");
    var person_2 = require("model/filter/person");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, _personService, resourceTextService) {
            var _this = _super.call(this) || this;
            _this._personService = _personService;
            _this.observable = observalizer.convert({
                text: {
                    first: resourceTextService.Recherche.first,
                    last: resourceTextService.Recherche.last,
                    age: resourceTextService.Recherche.age,
                    search: resourceTextService.Recherche.search
                },
                filter: observalizer.convert({
                    first: undefined,
                    last: undefined,
                    age: undefined
                }),
                resultats: []
            });
            return _this;
        }
        IndexView.prototype.search = function () {
            var _this = this;
            var filter = new person_2.PersonFilter();
            filter.first = this.observable.filter.first;
            filter.last = this.observable.filter.last;
            filter.age = this.observable.filter.age;
            this._personService.search(filter).then(function (res) { return _this.observable.resultats = res; });
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/recherche/index.html",
                binding: {
                    "[filter=true][name=first]": function (view) { return artiste_1.value({ get: function () { return view.observable.filter.first; }, set: function (v) { return view.observable.filter.first = v; } }); },
                    "[filter=true][name=last]": function (view) { return artiste_1.value({ get: function () { return (view.observable.filter.last || '').toString(); }, set: function (v) { return view.observable.filter.last = v; } }); },
                    "[filter=true][name=age]": function (view) { return artiste_1.value({ get: function () { return (view.observable.filter.age || '').toString(); }, set: function (v) { return view.observable.filter.age = parseInt(v); } }); },
                    "[data-action=search]": function (view) { return [
                        artiste_1.text(function () { return view.observable.text.search; }),
                        artiste_1.click(function () { return function () { return view.search() || false; }; })
                    ]; },
                    "[for=first]": function (view) { return artiste_1.text(function () { return view.observable.text.first; }); },
                    "[for=last]": function (view) { return artiste_1.text(function () { return view.observable.text.last; }); },
                    "[for=age]": function (view) { return artiste_1.text(function () { return view.observable.text.age; }); },
                    "[data-id=resultat]": function (view) { return datatable_1.datatable(function () {
                        return {
                            columns: {
                                first: { header: view.observable.text.first },
                                last: { header: view.observable.text.last },
                                age: { header: view.observable.text.age }
                            },
                            data: view.observable.resultats
                        };
                    }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                person_1.IPersonService,
                resourceText_1.IResourceText])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
