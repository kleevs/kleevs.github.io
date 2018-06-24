"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toStringDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var fullYear = date.getFullYear();
    return "" + (day < 10 && '0' || '') + day + " / " + (month < 10 && '0' || '') + month + " / " + fullYear;
}
exports.toStringDate = toStringDate;
function parseDate(str) {
    try {
        var arr = str && str.split("/");
        var date = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));
        if (arr.length === 3 && arr[0].length <= 2 && arr[1].length <= 2 && arr[2].length == 4 && !isNaN(date.getTime())) {
            return date;
        }
    }
    catch (e) { }
    throw "Date format exception - " + str;
}
exports.parseDate = parseDate;
function parseTime(time) {
    return time && new Date(time) || undefined;
}
exports.parseTime = parseTime;
function toTime(date) {
    return date && date.getTime() || undefined;
}
exports.toTime = toTime;
//# sourceMappingURL=date.js.map