"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var angular_extend_1 = require("angular.extend");
var user_1 = require("../../service/user");
var HomeView = /** @class */ (function () {
    function HomeView() {
    }
    return HomeView;
}());
exports.HomeView = HomeView;
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(userService) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.list = [];
        userService.list().then(function (users) { return _this.list = users; });
        return _this;
    }
    Home.prototype.remove = function (user) {
        var _this = this;
        this.userService.remove(user);
        this.userService.list().then(function (users) { return _this.list = users; });
        return true;
    };
    Home = __decorate([
        angular_extend_1.View({
            html: './dist/app/view/home/home.html'
        }),
        __metadata("design:paramtypes", [user_1.UserService])
    ], Home);
    return Home;
}(HomeView));
//# sourceMappingURL=home.view.js.map