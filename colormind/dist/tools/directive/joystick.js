define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var last;
    function joystick(valueAccessor) {
        return function (element) {
            last && document.removeEventListener('keyup', last);
            document.addEventListener("keyup", last = function (e) {
                if (e.keyCode === 37) {
                    valueAccessor()({ cmd: 'LEFT' });
                }
                else if (e.keyCode === 38) {
                    valueAccessor()({ cmd: 'UP' });
                }
                else if (e.keyCode === 39) {
                    valueAccessor()({ cmd: 'RIGHT' });
                }
                else if (e.keyCode === 40) {
                    valueAccessor()({ cmd: 'DOWN' });
                }
            });
            return function () {
            };
        };
    }
    exports.joystick = joystick;
});
