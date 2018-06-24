import { Type, ModuleWithProviders, ComponentFactoryResolver, Injector, ViewContainerRef, SchemaMetadata, Provider } from '@angular/core';
export declare function View<T>(options: {
    template?: string;
    html?: string;
    imports?: Array<Type<any> | ModuleWithProviders | any[]>;
    declarations?: Array<Type<any> | any[]>;
}): (constructor: Function & {
    prototype: T;
}) => any;
export declare class ViewProvider {
    private componentFactoryResolver;
    private injector;
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    create<T>(type: Function & {
        prototype: T;
    }): T;
}
export declare class ViewContainerDirective {
    private viewContainerRef;
    private last;
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    change(content: any): void;
}
export declare function bootstrap<M>(selector: string, module: Type<M>): void;
export declare function ViewModule(options: {
    providers?: Provider[];
    declarations?: Array<Type<any> | any[]>;
    imports?: Array<Type<any> | ModuleWithProviders | any[]>;
    exports?: Array<Type<any> | any[]>;
    entryComponents?: Array<Type<any> | any[]>;
    bootstrap?: Array<Type<any> | any[]>;
    schemas?: Array<SchemaMetadata | any[]>;
    id?: string;
}): (constructor: Function) => void;
