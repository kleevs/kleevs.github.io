"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular_extend_1 = require("angular.extend");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var a_component_1 = require("./a.component");
var a_directivet_1 = require("./a.directivet");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        angular_extend_1.ViewModule({
            imports: [platform_browser_1.BrowserModule],
            declarations: [app_component_1.AppComponent, a_component_1.AComponent, a_directivet_1.ADirective],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map