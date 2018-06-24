"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular_extend_1 = require("angular.extend");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var startup_component_1 = require("./startup.component");
var user_1 = require("../service/user");
var user_2 = require("../database/user");
var user_3 = require("../validation/user");
var ajax_1 = require("../../tools/service/ajax");
var trycatch_1 = require("../../tools/service/trycatch");
var router_1 = require("../../tools/service/router");
var date_1 = require("../../tools/directive/date");
var href_1 = require("../../tools/directive/href");
var StartupModule = /** @class */ (function () {
    function StartupModule() {
    }
    StartupModule = __decorate([
        angular_extend_1.ViewModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [startup_component_1.StartupComponent, date_1.DateDirective, href_1.HrefDirective],
            bootstrap: [startup_component_1.StartupComponent],
            providers: [
                user_1.UserService,
                user_2.UserDatabase,
                ajax_1.Ajax,
                trycatch_1.TryCatch,
                user_3.UserValidation,
                router_1.Router
            ]
        })
    ], StartupModule);
    return StartupModule;
}());
exports.StartupModule = StartupModule;
//# sourceMappingURL=startup.module.js.map