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
        define(["require", "exports", "artiste", "service/user", "tools/directive/date", "tools/directive/boolean", "tools/service/notify"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var user_1 = require("service/user");
    var date_1 = require("tools/directive/date");
    var boolean_1 = require("tools/directive/boolean");
    var notify_1 = require("tools/service/notify");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        IIndex.Event = {
            DeleteConfirm: new artiste_1.Event("custom:list:index:deleteconfirm")
        };
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(observablizer, userService, notifier) {
            var _this = _super.call(this) || this;
            _this.userService = userService;
            _this.notifier = notifier;
            _this.observable = observablizer.convert({ list: [] });
            _this.refresh();
            return _this;
        }
        List.prototype.remove = function (user) {
            var _this = this;
            if (user.isActif) {
                this.notifier.forEvent(IIndex.Event.DeleteConfirm).notify(this, function (response) {
                    if (response) {
                        _this.userService.remove(user);
                        _this.refresh();
                    }
                });
            }
            else {
                this.userService.remove(user);
                this.refresh();
            }
            return true;
        };
        List.prototype.refresh = function () {
            var _this = this;
            this.userService.list().then(function (list) { return _this.observable.list = list; });
        };
        List = __decorate([
            artiste_1.View({
                template: "tmpl/list/index.html",
                binding: {
                    "tbody": function (userView) { return artiste_1.each(function () {
                        return userView.observable.list.map(function (user) {
                            return {
                                "[data-id=first-name]": artiste_1.text(function () { return user.firstName; }),
                                "[data-id=last-name]": artiste_1.text(function () { return user.lastName; }),
                                "[data-id=birthdate]": date_1.text(function () { return user.birthDate; }),
                                "[data-id=login]": artiste_1.text(function () { return user.login; }),
                                "[data-id=password]": artiste_1.text(function () { return user.password; }),
                                "[data-id=actif]": boolean_1.text(function () { return user.isActif; }),
                                "[data-id=action] [data-action=update]": artiste_1.attr(function () { return { href: "./#/detail/" + user.id }; }),
                                "[data-id=action] [data-action=remove]": artiste_1.click(function () { return function () { return userView.remove(user); }; })
                            };
                        });
                    }); }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                user_1.IUserService,
                notify_1.INotifier])
        ], List);
        return List;
    }(IIndex));
});
