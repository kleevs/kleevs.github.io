define(["require", "exports", "artiste"], function (require, exports, artiste_1) {
    "use strict";
    exports.__esModule = true;
    function canvas(cycleAccessor) {
        var observable;
        var routine;
        return [function (element, serviceProvider) {
                observable = serviceProvider.getService(artiste_1.IObservablizer).convert({ currentSprites: undefined, cycles: [] });
                return function () {
                    var cycles = cycleAccessor() || [];
                    setTimeout(function () {
                        observable.cycles = observable.cycles.concat(cycles);
                        routine = routine || setInterval(function () {
                            if (observable.cycles.length > 0) {
                                var cycle = observable.cycles.shift();
                                cycle && (observable.currentSprites = cycle());
                            }
                            else {
                                clearInterval(routine);
                                routine = undefined;
                            }
                        }, 50);
                    });
                };
            },
            function (element) {
                var context = element.getContext('2d');
                return function () {
                    var items = observable.currentSprites;
                    var offset = {
                        x: parseInt(element.getAttribute("offsetx")) || 0,
                        y: parseInt(element.getAttribute("offsety")) || 0
                    };
                    context.save();
                    context.clearRect(0, 0, element.width, element.height);
                    items && items.forEach(function (item) {
                        if (item.image) {
                            context.drawImage(item.image, offset.x + item.x - item.width / 2, offset.y + item.y - item.height / 2);
                        }
                    });
                    context.restore();
                };
            }];
    }
    exports.canvas = canvas;
});
