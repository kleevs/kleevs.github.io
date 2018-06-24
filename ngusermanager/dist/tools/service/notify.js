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
var INotifier = /** @class */ (function () {
    function INotifier() {
    }
    return INotifier;
}());
exports.INotifier = INotifier;
var Notifier = /** @class */ (function (_super) {
    __extends(Notifier, _super);
    function Notifier(viewProvider) {
        var _this = _super.call(this) || this;
        _this.viewProvider = viewProvider;
        return _this;
    }
    Notifier.prototype.forEvent = function (event) {
        var _this = this;
        return {
            listen: function (context, callback) {
                _this.viewProvider.getNode(context).then(function (e) { return e && $(e).on(event.key, function (e, data) {
                    var emitter = _this.viewProvider.getView(e.target);
                    return emitter && callback(emitter, data);
                }); });
            },
            notify: function (context, param) {
                if (context) {
                    _this.viewProvider.getNode(context).then(function (e) {
                        $(e).trigger(event.key, [param]);
                    });
                }
            }
        };
    };
    Notifier = __decorate([
        Service({
            key: INotifier
        }),
        __metadata("design:paramtypes", [Object])
    ], Notifier);
    return Notifier;
}(INotifier));
//# sourceMappingURL=notify.js.map