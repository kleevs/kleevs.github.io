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
var registeredView = [];
function View(options) {
    return function (constructor) {
        var bootstrap = core_1.Component({
            template: options.template,
            templateUrl: options.html,
            styles: ['']
        })(constructor) || constructor;
        var key = bootstrap;
        while (key && key.constructor !== key) {
            registeredView.unshift({
                key: key,
                component: bootstrap
            });
            key = Object.getPrototypeOf(key);
        }
        return bootstrap;
    };
}
exports.View = View;
var ViewProvider = /** @class */ (function () {
    function ViewProvider(componentFactoryResolver, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    ViewProvider.prototype.create = function (type) {
        var component = registeredView.filter(function (item) { return item.key === type; }).map(function (item) { return item.component; })[0];
        if (component) {
            var componentRef = this.componentFactoryResolver
                .resolveComponentFactory(component)
                .create(this.injector);
            componentRef.instance.__ref__ = componentRef;
            return componentRef.instance;
        }
    };
    ViewProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.Injector])
    ], ViewProvider);
    return ViewProvider;
}());
exports.ViewProvider = ViewProvider;
var ViewContainerDirective = /** @class */ (function () {
    function ViewContainerDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.last = [];
    }
    Object.defineProperty(ViewContainerDirective.prototype, "content", {
        set: function (value) { this.change(value); },
        enumerable: true,
        configurable: true
    });
    ;
    ViewContainerDirective.prototype.change = function (content) {
        var _this = this;
        var array = content instanceof Array && content || [content];
        this.last.forEach(function (view) {
            var componentRef = view.__ref__;
            _this.viewContainerRef.remove(_this.viewContainerRef.indexOf(componentRef.hostView));
        });
        this.last = array.map(function (view) {
            if (view && view.__ref__) {
                var componentRef = view.__ref__;
                _this.viewContainerRef.insert(componentRef.hostView);
                return view;
            }
        }).filter(function (_) { return !!_; });
    };
    __decorate([
        core_1.Input('view'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ViewContainerDirective.prototype, "content", null);
    ViewContainerDirective = __decorate([
        core_1.Directive({
            selector: '[view]',
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], ViewContainerDirective);
    return ViewContainerDirective;
}());
exports.ViewContainerDirective = ViewContainerDirective;
function bootstrap(selector, module) {
    var MainComponent = /** @class */ (function () {
        function MainComponent() {
        }
        MainComponent = __decorate([
            core_1.Component({
                selector: selector,
                template: '<app [view]=root></app>'
            }),
            __metadata("design:paramtypes", [])
        ], MainComponent);
        return MainComponent;
    }());
    var ViewModule = /** @class */ (function () {
        function ViewModule() {
        }
        ViewModule = __decorate([
            core_1.NgModule({
                declarations: [ViewContainerDirective],
                exports: [ViewContainerDirective],
                providers: [ViewProvider],
                bootstrap: [MainComponent]
            })
        ], ViewModule);
        return ViewModule;
    }());
}
exports.bootstrap = bootstrap;
function ViewModule(options) {
    return function (constructor) {
        var views = registeredView.map(function (_) { return _.component; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        var entryComponents = options.entryComponents || [];
        var declarations = options.declarations || [];
        var providers = options.providers || [];
        entryComponents = entryComponents.concat(views);
        declarations = declarations.concat([ViewContainerDirective]).concat(views);
        providers = providers.concat([ViewProvider]);
        return core_1.NgModule({
            providers: providers,
            declarations: declarations,
            imports: options.imports,
            exports: options.exports,
            entryComponents: entryComponents,
            bootstrap: options.bootstrap,
            schemas: options.schemas,
            id: options.id,
        })(constructor);
    };
}
exports.ViewModule = ViewModule;
//# sourceMappingURL=index.js.map