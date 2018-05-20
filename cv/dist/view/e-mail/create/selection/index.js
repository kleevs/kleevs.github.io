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
        define(["require", "exports", "artiste", "service/login", "service/person", "service/email", "tools/keyup", "./contact"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var artiste_1 = require("artiste");
    var login_1 = require("service/login");
    var person_1 = require("service/person");
    var email_1 = require("service/email");
    var keyup_1 = require("tools/keyup");
    var contact_1 = require("./contact");
    var IIndex = /** @class */ (function () {
        function IIndex() {
        }
        IIndex.MOVE = new artiste_1.Event("MOVE");
        return IIndex;
    }());
    exports.IIndex = IIndex;
    var IndexView = /** @class */ (function (_super) {
        __extends(IndexView, _super);
        function IndexView(observalizer, _viewProvider, _notifier, _personService, _loginService, _emailService) {
            var _this = _super.call(this) || this;
            _this._viewProvider = _viewProvider;
            _this._notifier = _notifier;
            _this._personService = _personService;
            _this._loginService = _loginService;
            _this._emailService = _emailService;
            _this.observable = observalizer.convert({
                filter: undefined,
                contacts: []
            });
            var isConnected = _loginService.isConnected();
            _this._contacts = isConnected.then(function (data) { return _personService.friend(data.id); });
            _this.search();
            return _this;
        }
        IndexView.prototype.search = function () {
            var _this = this;
            this._contacts
                .then(function (contacts) { return contacts.filter(function (c) { return !_this.observable.filter ||
                c.last.toLowerCase().indexOf(_this.observable.filter.toLowerCase()) >= 0 ||
                c.first.toLowerCase().indexOf(_this.observable.filter.toLowerCase()) >= 0; }); })
                .then(function (contacts) { return contacts.map(_this._viewProvider.map(contact_1.IContact)); })
                .then(function (views) { return views.map(function (view) {
                _this._notifier.forEvent(contact_1.IContact.MOVE).listen(view, function (data) {
                    _this._notifier.forEvent(IIndex.MOVE).notify(_this, data);
                });
                return view;
            }); })
                .then(function (views) { return _this.observable.contacts = views; });
        };
        IndexView = __decorate([
            artiste_1.View({
                template: "tmpl/email/create/selection/index.html",
                binding: {
                    "[data-id=content]": function (indx) { return artiste_1.view(function () { return indx.observable.contacts; }); },
                    "[data-id=search]": function (indx) { return [
                        artiste_1.value({ get: function () { return indx.observable.filter; }, set: function (v) { return indx.observable.filter = v; } }),
                        keyup_1.keyup(function () { return function () { return indx.search(); }; })
                    ]; }
                }
            }),
            __metadata("design:paramtypes", [artiste_1.IObservablizer,
                artiste_1.IViewProvider,
                artiste_1.INotifier,
                person_1.IPersonService,
                login_1.ILoginService,
                email_1.IEmailService])
        ], IndexView);
        return IndexView;
    }(IIndex));
});
