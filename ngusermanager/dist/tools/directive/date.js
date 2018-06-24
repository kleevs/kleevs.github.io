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
var date_1 = require("../date");
var DateDirective = /** @class */ (function () {
    function DateDirective(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.last = [];
        this.change = new core_1.EventEmitter();
        this.elementRef.nativeElement.addEventListener('change', function () {
            var str = _this.elementRef.nativeElement.value;
            try {
                str = date_1.parseDate(str);
            }
            catch (e) { }
            _this.change.emit(str || '');
        });
    }
    Object.defineProperty(DateDirective.prototype, "setDate", {
        set: function (value) { this.set(value); },
        enumerable: true,
        configurable: true
    });
    ;
    DateDirective.prototype.set = function (value) {
        try {
            this.elementRef.nativeElement.value = date_1.toStringDate(value);
        }
        catch (e) {
            this.elementRef.nativeElement.value = value || '';
        }
    };
    __decorate([
        core_1.Input('myDate'),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [Date])
    ], DateDirective.prototype, "setDate", null);
    __decorate([
        core_1.Output('myDateChange'),
        __metadata("design:type", core_1.EventEmitter)
    ], DateDirective.prototype, "change", void 0);
    DateDirective = __decorate([
        core_1.Directive({
            selector: '[myDate]',
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DateDirective);
    return DateDirective;
}());
exports.DateDirective = DateDirective;
//# sourceMappingURL=date.js.map