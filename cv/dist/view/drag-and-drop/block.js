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
        define(["require", "exports", "artiste"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var IBlock = /** @class */ (function () {
        function IBlock() {
        }
        return IBlock;
    }());
    exports.IBlock = IBlock;
    var TYPE;
    (function (TYPE) {
        TYPE[TYPE["ACTIVE"] = 1] = "ACTIVE";
        TYPE[TYPE["DESACTIVE"] = 2] = "DESACTIVE";
    })(TYPE = exports.TYPE || (exports.TYPE = {}));
    var BlockView = /** @class */ (function (_super) {
        __extends(BlockView, _super);
        function BlockView(_viewProvider, observalizer, notifier) {
            var _this = _super.call(this) || this;
            _this._viewProvider = _viewProvider;
            _this.observable = observalizer.convert({
                list: [],
                title: undefined
            });
            return _this;
        }
        BlockView.prototype.initialize = function (type) {
            this.observable.title = type === TYPE.ACTIVE && "Acitvé" || "Désactivé";
        };
        BlockView.prototype.add = function (item) {
            this.observable.list.push(item);
        };
        BlockView.prototype.remove = function (item) {
            this.observable.list.splice(this.observable.list.indexOf(item), 1);
        };
        BlockView.prototype.drag = function (item) {
            this.remove(item);
        };
        BlockView.prototype.drop = function (item) {
            this.add(item);
        };
        BlockView = __decorate([
            artiste_1.View({
                template: "tmpl/draganddrop/block.html",
                binding: {
                    "[data-id=content]": function (block) { return artiste_1.view(function () { return block.observable.list; }); },
                    "[data-id=title]": function (block) { return artiste_1.text(function () { return block.observable.title; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IViewProvider, artiste_1.IObservablizer, artiste_1.INotifier])
        ], BlockView);
        return BlockView;
    }(IBlock));
});
