(function (global) {
    System.config({
        paths: {
            'npm:': '/node_modules/'
        },

        map: {
            // maps plain `app` module to `app` package
            main: 'dist/main.js',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            'angular.extend': 'npm:angular.extend/src/index.js',

            'rxjs': 'npm:rxjs',
            'rxjs-compat': 'npm:rxjs-compat',
            'rxjs/operators': 'npm:rxjs/operators',
        },

        packages: {
            'dist': {
                defaultExtension: 'js',
                meta: {
                    '': {
                        format: 'cjs'
                    }
                }
            },
            'rxjs': {main: 'index.js', defaultExtension: 'js'},
            'rxjs/operators': {main: 'index.js', defaultExtension: 'js'}
        }
    });
})(this);
