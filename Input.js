/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/

var Input = (function() {
    function init() {
        return {
            onClick: onClick,
            onKey: onKey,
        }

        var onClick = function(callback) {
            if (callback && typeof callback != "undefined") {
                canvas.addEventListener("mousedown", function(event) {
                    callback(event);
                });
            }
        };

        var onKey = function(callback) {
            if (callback && typeof callback != "undefined") {
                document.addEventListener('keydown', function(event) {
                    var key = String.fromCharCode(event.keyCode);
                    callback(key);
                });
            }
        };

        return {
            getInstance: function() {
                if (!input_instance) {
                    input_instance = init();
                }
                return input_instance;
            }
        }
    }
})();
