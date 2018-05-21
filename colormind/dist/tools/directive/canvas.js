define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function canvas(cycleAccessor) {
        return function (element) {
            var context = element.getContext('2d');
            return function () {
                var items = cycleAccessor();
                if (!items || items.length <= 0)
                    return;
                var offset = {
                    x: parseInt(element.getAttribute("offsetx")) || 0,
                    y: parseInt(element.getAttribute("offsety")) || 0
                };
                context.save();
                context.clearRect(0, 0, element.width, element.height);
                items && items.forEach(function (item) {
                    if (item && item.image) {
                        context.drawImage(item.image, offset.x + item.x - item.width / 2, offset.y + item.y - item.height / 2);
                    }
                });
                context.restore();
            };
        };
    }
    exports.canvas = canvas;
});
