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
        return ICycleScheduler;
    }());
    exports.ICycleScheduler = ICycleScheduler;
    var CycleScheduler = /** @class */ (function (_super) {
        __extends(CycleScheduler, _super);
        function CycleScheduler() {
            var _this = _super.call(this) || this;
            _this.cycles = [];
            _this.callbacks = [];
            return _this;
        }
        CycleScheduler.prototype.on = function (callback) {
            var _this = this;
            this.callbacks.push(callback);
            return { stop: function () {
                    _this.callbacks = _this.callbacks.filter(function (c) { return c !== callback; });
                } };
        };
        CycleScheduler.prototype.push = function (cycles) {
            var _this = this;
            this.cycles = this.cycles.concat(cycles || []);
            this.routine = this.routine || setInterval(function () {
                if (_this.cycles.length > 0) {
                    var cycle = _this.cycles.shift();
                    if (cycle) {
                        var c = cycle();
                        _this.callbacks.forEach(function (callback) { return callback(c); });
                    }
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
            __metadata("design:paramtypes", [])
        ], CycleScheduler);
        return CycleScheduler;
    }(ICycleScheduler));
});
