(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // T is {[s:string]: Data}
    var Database = /** @class */ (function () {
        function Database(name) {
            this.name = name;
            this.index = {};
            this.objects = {};
            this.length = 0;
            this.load();
        }
        Database.prototype.filter = function (criteria) {
            var _this = this;
            var ids = undefined;
            Object.keys(criteria).map(function (key) {
                var index = _this.index[key] || [];
                var tmp = {};
                index.filter(function (item) { return !ids || ids[item.id]; })
                    .map(function (item) { return !criteria[key] || item.value === criteria[key] ? item.id : undefined; })
                    .filter(function (_) { return _; })
                    .forEach(function (id) {
                    tmp[id] = true;
                });
                ids = tmp;
            });
            return Object.keys(ids || this.objects);
        };
        Database.prototype.find = function (criteria) {
            var _this = this;
            return this.filter(criteria || {}).map(function (id) { return JSON.parse(JSON.stringify(_this.objects[id])); });
        };
        Database.prototype.insert = function (data) {
            var _this = this;
            var id = ++this.length, toSave = JSON.parse(JSON.stringify(data));
            toSave.id = id;
            Object.keys(toSave).forEach(function (key) {
                var value = toSave[key];
                _this.index[key] = _this.index[key] || [];
                _this.index[key].push({ value: value, id: id });
                _this.index[key] = _this.index[key].sort(function (a, b) { return a.value > b.value ? 1 : a.value === b.value ? 0 : -1; });
            });
            this.objects[id] = toSave;
            this.save();
            return id;
        };
        Database.prototype.update = function (criteria, data) {
            var _this = this;
            var ids = this.filter(criteria), toSave = JSON.parse(JSON.stringify(data));
            Object.keys(toSave).forEach(function (key) {
                ids.forEach(function (id) {
                    _this.objects[id][key] = toSave[key];
                    _this.index[key] = _this.index[key] || [];
                    _this.index[key].filter(function (_) { return _.id === id; }).forEach(function (_) { return _.value = toSave[key]; });
                });
                _this.index[key] = _this.index[key] || [];
                _this.index[key] = _this.index[key].sort(function (a, b) { return a.value > b.value ? 1 : a.value === b.value ? 0 : -1; });
            });
            this.save();
            return ids.length;
        };
        Database.prototype.remove = function (criteria) {
            var _this = this;
            var ids = this.filter(criteria);
            ids.forEach(function (id) {
                var tmp = _this.objects[id];
                delete _this.objects[id];
                Object.keys(tmp).forEach(function (key) {
                    _this.index[key] = _this.index[key] && _this.index[key].filter(function (_) { return _.id !== id; }) || [];
                    _this.index[key] = _this.index[key].sort(function (a, b) { return a.value > b.value ? 1 : a.value === b.value ? 0 : -1; });
                });
            });
            this.save();
            return ids.length;
        };
        Database.prototype.save = function () {
            var result = JSON.stringify(this);
            localStorage.setItem(this.name, result);
        };
        Database.prototype.load = function () {
            var storage = localStorage.getItem(this.name);
            if (storage) {
                var result = JSON.parse(storage);
                this.index = result.index || {};
                this.objects = result.objects || {};
                this.length = result.length || 0;
            }
        };
        return Database;
    }());
    exports.Database = Database;
});
