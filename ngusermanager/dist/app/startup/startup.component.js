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
var angular_extend_1 = require("angular.extend");
var home_view_1 = require("../view/home/home.view");
var detail_view_1 = require("../view/detail/detail.view");
var router_1 = require("../../tools/service/router");
var StartupComponent = /** @class */ (function () {
    function StartupComponent(viewProvider, router) {
        var _this = this;
        router.on(function (href, pathname, hash) {
            var thref = hash.split("/");
            var view = thref[1];
            var id = parseInt(thref[2]) || 0;
            if (view === "detail") {
                _this.root = viewProvider.create(detail_view_1.DetailView);
                _this.root.setUser(id);
            }
            else {
                _this.root = viewProvider.create(home_view_1.HomeView);
            }
        });
    }
    StartupComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './dist/app/startup/startup.component.html',
            styles: ['']
        }),
        __metadata("design:paramtypes", [angular_extend_1.ViewProvider, router_1.Router])
    ], StartupComponent);
    return StartupComponent;
}());
exports.StartupComponent = StartupComponent;
//# sourceMappingURL=startup.component.js.map