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
define(["require", "exports", "artiste"], function (require, exports, artiste_1) {
    "use strict";
    exports.__esModule = true;
    var IRouter = /** @class */ (function () {
        function IRouter() {
        }
        return IRouter;
    }());
    exports.IRouter = IRouter;
    var Router = /** @class */ (function (_super) {
        __extends(Router, _super);
        function Router(configManager) {
            var _this = _super.call(this) || this;
            _this.configManager = configManager;
            return _this;
        }
        Router.prototype.getUrl = function (uri) {
            var configuration = this.configManager.getConfig();
            var url = uri;
            if (configuration && configuration.path) {
                configuration.path.some(function (path) {
                    if (url.match(path.test)) {
                        url = url.replace(path.test, path.result);
                        return true;
                    }
                });
            }
            return url;
        };
        Router = __decorate([
            artiste_1.Service({
                key: IRouter
            }),
            __metadata("design:paramtypes", [artiste_1.IConfigManager])
        ], Router);
        return Router;
    }(IRouter));
});
