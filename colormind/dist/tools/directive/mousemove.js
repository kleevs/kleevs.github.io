define(["require", "exports", "artiste", "jquery"], function (require, exports, artiste_1, $) {
    "use strict";
    exports.__esModule = true;
    exports.Direction = {
        Left: { cmd: "LEFT" },
        Up: { cmd: "UP" },
        Right: { cmd: "RIGHT" },
        Down: { cmd: "DOWN" }
    };
    function mousemove(valueAccessor) {
        var startX, startY, currentX, currentY;
        var start = function (e) {
            var x = e.offsetX !== undefined ?
                e.offsetX : e.touches ?
                e.touches[0].clientX - $(e.target).offset().left :
                e.originalEvent.touches[0].clientX - $(e.target).offset().left;
            var y = e.offsetY !== undefined ?
                e.offsetY : e.touches ?
                e.touches[0].clientY - $(e.target).offset().top :
                e.originalEvent.touches[0].clientY - $(e.target).offset().top;
            startX = x;
            startY = y;
            return true;
        };
        var event = function (e) {
            var x = e.offsetX !== undefined ?
                e.offsetX : e.touches ?
                e.touches[0].clientX - $(e.target).offset().left :
                e.originalEvent.touches[0].clientX - $(e.target).offset().left;
            var y = e.offsetY !== undefined ?
                e.offsetY : e.touches ?
                e.touches[0].clientY - $(e.target).offset().top :
                e.originalEvent.touches[0].clientY - $(e.target).offset().top;
            currentX = x;
            currentY = y;
            return true;
        };
        var end = function (e) {
            var x = currentX;
            var y = currentY;
            if (startX && startY && Math.abs(x - startX) >= 20 || Math.abs(y - startY) >= 20) {
                if (Math.abs(x - startX) > Math.abs(y - startY)) {
                    if (x > startX) {
                        valueAccessor()(exports.Direction.Right);
                    }
                    else {
                        valueAccessor()(exports.Direction.Left);
                    }
                }
                else {
                    if (y > startY) {
                        valueAccessor()(exports.Direction.Down);
                    }
                    else {
                        valueAccessor()(exports.Direction.Up);
                    }
                }
            }
            startX = undefined;
            startY = undefined;
            currentX = undefined;
            currentY = undefined;
            return true;
        };
        return [
            artiste_1.on("mousedown", function () { return function (e) { return start(e); }; }),
            artiste_1.on("touchstart", function () { return function (e) { return start(e); }; }),
            artiste_1.on("mousemove", function () { return function (e) { return event(e); }; }),
            artiste_1.on("touchmove", function () { return function (e) { return event(e); }; }),
            artiste_1.on("mouseup", function () { return function (e) { return end(e); }; }),
            artiste_1.on("touchend", function () { return function (e) { return end(e); }; })
        ];
    }
    exports.mousemove = mousemove;
});
