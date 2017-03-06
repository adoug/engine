/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/

var WebGLRenderer = (function()
{
    // private
    var renderer_instance;
    var renderer;
    var canvas;
    var program;
    var data;
    var near = 1.0;
    var far = 1000;
    var fovy = 27.0;
    var aspect;
    var worldview;
    var modelview;
    var projection;
    var projLoc;
    var updateCallback;
    const up = vec3(0.0, 0.0, 1.0); // VUP along world vertical

    var worldObjects = [];

    var currentAngle = [0.0, 0.0];

    var bufferId;
    var renderMode;


    // Constructor like method
    function init(canvasElement)
    {
        var bufferSize = 10000;
        var currentOffset = 0;
        var dataLength = 0;
        var then;
        var fps = 0.0;
        then = Date.now() / 1000; // get time in seconds
        canvas = canvasElement;
        renderer = WebGLUtils.setupWebGL(canvasElement);

        var renderModeTypes = {
            TRIANGLES: renderer.TRIANGLES,
            TRIANGLE_STRIP: renderer.TRIANGLE_STRIP,
            TRIANGLE_FAN: renderer.TRIANGLE_FAN,
            LINES: renderer.LINES,
            LINE_LOOP: renderer.LINE_LOOP,
            LINE_STRIP: renderer.LINE_STRIP,
            POINTS: renderer.POINTS
        };

        renderMode = renderModeTypes.TRIANGLE_STRIP;

        if (!renderer)
        {
            alert("WebGL isn't available");
        }

        renderer.viewport(0, 0, canvas.width, canvas.height);
        aspect = canvas.width / canvas.height;

        renderer.enable(renderer.DEPTH_TEST);

        program = initShaders(renderer, "vertex-shader", "fragment-shader");
        renderer.useProgram(program);

        bufferId = renderer.createBuffer();
        renderer.bindBuffer(renderer.ARRAY_BUFFER, bufferId);
        renderer.bufferData(renderer.ARRAY_BUFFER, sizeof['vec3'] * bufferSize, renderer.STATIC_DRAW);

        var vPosition = renderer.getAttribLocation(program, "vPosition");
        renderer.vertexAttribPointer(vPosition, 3, renderer.FLOAT, false, 0, 0);
        renderer.enableVertexAttribArray(vPosition);
        var vPosition = renderer.getAttribLocation(program, "vPosition");
        renderer.vertexAttribPointer(vPosition, 3, renderer.FLOAT, false, 0, 0);
        renderer.enableVertexAttribArray(vPosition);

        projLoc = renderer.getUniformLocation(program, "projection");

        projection = perspective(fovy, aspect, near, far);
        renderer.uniformMatrix4fv(projLoc, false, flatten(projection));

        var setRenderColor = function(colour)
        {
            var u = renderer.getUniformLocation(program, "colour");
            renderer.uniform4fv(u, flatten(colour));
        };

        var setRenderMode = function(renderMode)
        {
            renderer.renderMode = renderMode;
        };

        var onUpdate = function(callback)
        {
            if (callback && typeof callback != "undefined")
            {
                updateCallback = callback;
            }
        };

        var update = function()
        {
            updateCallback(fps);            
            var now = Date.now() / 1000; // get time in seconds

            // compute time since last frame
            var elapsedTime = now - then;
            then = now;

            // compute fps
            fps = 1 / elapsedTime;
            render();
        };

        var render = function()
        {
            renderer.clear(renderer.COLOR_BUFFER_BIT | renderer.DEPTH_BUFFER_BIT);

            worldview = lookAt(eye, at, up);

            for (var i = 0; i < worldObjects.length; i++)
            {
                worldObjects[i].update();
                worldObjects[i].render(worldview, renderer, program);
            }
            requestAnimFrame(update);
        };

        var tiltUp = function()
        {
            at = add(at, vec3(0.0, 0.0, 1.5));
        };

        var climb = function()
        {
            var forev = subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = normalize(forev); // current view forward direction
            at = add(at, vec3(0.0, 0.0, 0.5));
            eye = add(eye, vec3(0.0, 0.0, 0.5));
        };

        var descend = function()
        {
            var forev = subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = normalize(forev); // current view forward direction
            at = add(at, vec3(0.0, 0.0, -0.5));
            eye = add(eye, vec3(0.0, 0.0, -0.5));
        }

        var tiltDown = function()
        {
            at = add(at, vec3(0.0, 0.0, -1.5));
        };

        var slideForward = function()
        {
            var forev = subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = normalize(forev); // current view forward direction
            at = add(at, fore);
            eye = add(eye, fore);
        };

        var slideBackward = function()
        {
            var forev = subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = normalize(forev); // current view forward direction
            at = subtract(at, fore);
            eye = subtract(eye, fore);
        }

        var slideLeft = function()
        {
            var forev = subtract(at, eye); // current view forward vector
            var fore = normalize(forev); // current view forward direction
            var right = normalize(cross(fore, up)); // current horizontal right direction
            at = subtract(at, right);
            eye = subtract(eye, right);
        };

        var slideRight = function()
        {
            var forev = subtract(at, eye); // current view forward vector
            var fore = normalize(forev); // current view forward direction
            var right = normalize(cross(fore, up)); // current horizontal right direction
            at = add(at, right);
            eye = add(eye, right);
        };

        var pivotLeft = function()
        {
            var dat;
            var forev = subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = normalize(forev); // current view forward direction
            var right = normalize(cross(fore, up)); // current horizontal right direction
            var ddir = 1.0 * Math.PI / 180.0; // incremental view anrenderere change
            dat = subtract(scale(foreLen * (Math.cos(ddir) - 1.0), fore), scale(foreLen * Math.sin(ddir), right));
            at = add(at, dat);
        };

        var pivotRight = function()
        {
            var dat;
            var forev = subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = normalize(forev); // current view forward direction
            var right = normalize(cross(fore, up)); // current horizontal right direction
            var ddir = 1.0 * Math.PI / 180.0; // incremental view angle change
            dat = add(scale(foreLen * (Math.cos(ddir) - 1.0), fore), scale(foreLen * Math.sin(ddir), right));
            at = add(at, dat);
        };

        var addSubdata = function(data)
        {
            renderer.bufferSubData(renderer.ARRAY_BUFFER, currentOffset, flatten(data));
            var prevDataLength = dataLength;
            dataLength = dataLength + data.length;
            currentOffset = currentOffset + (data.length * sizeof['vec3']);
            return prevDataLength;
        };

        var setViewPort = function(width, height)
        {
            renderer.viewport(0, 0, width, height);
        };

        var setColor = function(r, g, b, a)
        {
            renderer.clearColor(r, g, b, a);
        };

        var onClick = function(callback)
        {
            if (callback && typeof callback != "undefined")
            {
                canvas.addEventListener("mousedown", function(event)
                {
                    callback(event);
                });
            }
        };

        var onKey = function(callback)
        {
            if (callback && typeof callback != "undefined")
            {
                document.addEventListener('keydown', function(event)
                {
                    var key = String.fromCharCode(event.keyCode);
                    callback(key);
                });
            }
        };


        var getCurrentRenderMode = function()
        {
            switch (renderMode)
            {
                case 4:
                    return "TRIANGLES";
                    break;
                case 5:
                    return "TRIANGLE_STRIP";
                    break;
                default:
                    return "UNKNOWN";
                    break;
            }
        };

        var addWorldObject = function(object)
        {
            worldObjects.push(object);
        }

        var getWorldObjects = function()
        {
            return worldObjects;
        };

        var setCamera = function(location, direction)
        {
            eye = location;
            at = direction;
        };

        var getFps = function()
        {
            return fps;
        };

        // Interface/API: public methods, available after calling getInstance
        return {
            render: render,
            setViewPort: setViewPort,
            setColor: setColor,
            renderModeTypes: renderModeTypes,
            onClick: onClick,
            onKey: onKey,
            setRenderMode: setRenderMode,
            getCurrentRenderMode: getCurrentRenderMode,
            addSubdata: addSubdata,
            addWorldObject: addWorldObject,
            getWorldObjects: getWorldObjects,
            slideForward: slideForward,
            slideBackward: slideBackward,
            slideLeft: slideLeft,
            slideRight: slideRight,
            pivotLeft: pivotLeft,
            pivotRight: pivotRight,
            tiltUp: tiltUp,
            tiltDown: tiltDown,
            climb: climb,
            descend: descend,
            setCamera: setCamera,
            getFps: getFps,
            onUpdate: onUpdate
        };
    } // end init  

    return {
        getInstance: function(canvasElement)
        {
            if (!renderer_instance)
            {
                renderer_instance = init(canvasElement);
            }
            return renderer_instance;
        }
    };
})();
