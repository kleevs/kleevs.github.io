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
        define(["require", "exports", "artiste", "tools/directive/rotateOut"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var rotateOut_1 = require("tools/directive/rotateOut");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var DeleteUser = /** @class */ (function (_super) {
        __extends(DeleteUser, _super);
        function DeleteUser(observablizer) {
            var _this = _super.call(this) || this;
            _this.observable = observablizer.convert({ callback: undefined });
            return _this;
        }
        DeleteUser.prototype.setCallback = function (callback) {
            this.callback = callback;
        };
        DeleteUser.prototype.close = function () {
            var _this = this;
            this.observable.callback = function () { _this.callback(false); };
            return true;
        };
        DeleteUser.prototype.confirm = function () {
            var _this = this;
            this.observable.callback = function () { _this.callback(true); };
            return true;
        };
        DeleteUser = __decorate([
            artiste_1.View({
                template: "tmpl/modal/deleteUser/index.html",
                binding: {
                    ".modal": function (dview) { return rotateOut_1.rotateOut(function () { return dview.observable.callback; }); },
                    "[data-action=confirm]": function (dview) { return artiste_1.click(function () { return function () { return dview.confirm(); }; }); },
                    "[data-action=close]": function (dview) { return artiste_1.click(function () { return function () { return dview.close(); }; }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer])
        ], DeleteUser);
        return DeleteUser;
    }(IIndex));
});
