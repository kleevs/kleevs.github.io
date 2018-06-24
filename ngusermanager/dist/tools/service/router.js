"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Router = /** @class */ (function () {
    function Router() {
        var _this = this;
        this._callbacks = [];
        window.onpopstate = function (state) { return _this.change(location.href); };
        window.onhashchange = function (state) { return _this.change(location.href); };
    }
    Router.prototype.on = function (callback) {
        var parsed = this.parse(location.href);
        callback(parsed.href, parsed.pathname, parsed.hash);
        this._callbacks.push(callback);
    };
    Router.prototype.trigger = function (href, replace) {
        if (!replace) {
            history.pushState({}, '', href);
        }
        else {
            history.replaceState({}, '', href);
        }
        this.change(href);
    };
    Router.prototype.change = function (str) {
        if (this._last !== str) {
            this._last = str;
            var parsed = this.parse(str);
            this._callbacks.forEach(function (callback) { return callback(parsed.href, parsed.pathname, parsed.hash); });
        }
    };
    Router.prototype.parse = function (href) {
        var a = document.createElement('a');
        a.href = href;
        return a;
    };
    Router = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], Router);
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map