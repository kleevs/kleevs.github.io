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
    var ICycleScheduler = /** @class */ (function () {
        function ICycleScheduler() {
        }
        ICycleScheduler.Event = function () {
            return {
                Cycle: new artiste_1.Event("ICycleScheduler.Cycle")
            };
        };
        return ICycleScheduler;
    }());
    exports.ICycleScheduler = ICycleScheduler;
    var CycleScheduler = /** @class */ (function (_super) {
        __extends(CycleScheduler, _super);
        function CycleScheduler(notifier) {
            var _this = _super.call(this) || this;
            _this.notifier = notifier;
            _this.event = ICycleScheduler.Event().Cycle;
            _this.cycles = [];
            return _this;
        }
        CycleScheduler.prototype.push = function (cycles) {
            var _this = this;
            this.cycles = this.cycles.concat(cycles || []);
            this.routine = this.routine || setInterval(function () {
                if (_this.cycles.length > 0) {
                    var cycle = _this.cycles.shift();
                    cycle && _this.notifier.forEvent(_this.event).notify(_this, cycle());
                }
                else {
                    clearInterval(_this.routine);
                    _this.routine = undefined;
                }
            }, 50);
        };
        CycleScheduler = __decorate([
            artiste_1.Service({
                key: ICycleScheduler
            }),
            __metadata("design:paramtypes", [artiste_1.INotifier])
        ], CycleScheduler);
        return CycleScheduler;
    }(ICycleScheduler));
});
