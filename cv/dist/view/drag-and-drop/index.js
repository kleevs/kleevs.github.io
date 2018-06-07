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
        define(["require", "exports", "artiste", "./block", "./item", "service/person", "model/filter/person"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var block_1 = require("./block");
    var item_1 = require("./item");
    var person_1 = require("service/person");
    var person_2 = require("model/filter/person");
    var IDragAndDrop = /** @class */ (function () {
        function IDragAndDrop() {
        }
        return IDragAndDrop;
    }());
    exports.IDragAndDrop = IDragAndDrop;
    var DragAndDropView = /** @class */ (function (_super) {
        __extends(DragAndDropView, _super);
        function DragAndDropView(viewProvider, observalizer, notifier, _personService) {
            var _this = _super.call(this) || this;
            _this._personService = _personService;
            _this.observable = observalizer.convert({
                left: viewProvider.newInstance(block_1.IBlock, block_1.TYPE.ACTIVE),
                right: viewProvider.newInstance(block_1.IBlock, block_1.TYPE.DESACTIVE)
            });
            _personService.search(new person_2.PersonFilter()).then(function (persons) {
                var views = persons.map(function (person) {
                    var view = viewProvider.newInstance(item_1.IItem);
                    view.setPerson(person);
                    return view;
                });
                views.forEach(function (view) { return _this.observable.left.add(view); });
            });
            return _this;
        }
        DragAndDropView = __decorate([
            artiste_1.View({
                template: "tmpl/draganddrop/index.html",
                binding: {
                    "[left]": function (layout) { return artiste_1.view(function () { return layout.observable.left; }); },
                    "[right]": function (layout) { return artiste_1.view(function () { return layout.observable.right; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IViewProvider, artiste_1.IObservablizer, artiste_1.INotifier, person_1.IPersonService])
        ], DragAndDropView);
        return DragAndDropView;
    }(IDragAndDrop));
});
