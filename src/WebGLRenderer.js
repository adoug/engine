/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/

const MV = require('../common/MV');

var WebGLRenderer = (function()
{
    // private
    let renderer_instance;
    let renderer;
    let canvas;
    let program;
    let data;
    let near = 1.0;
    let far = 1000;
    let fovy = 27.0;
    let aspect;
    let worldview;
    let modelview;
    let projection;
    let projLoc;
    let updateCallback;
    let up = MV.vec3(0.0, 0.0, 1.0); // VUP along world vertical

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
        renderer.bufferData(renderer.ARRAY_BUFFER, MV._sizeof('vec3') * bufferSize, renderer.STATIC_DRAW);

        let vPosition = renderer.getAttribLocation(program, "vPosition");
        renderer.vertexAttribPointer(vPosition, 3, renderer.FLOAT, false, 0, 0);
        renderer.enableVertexAttribArray(vPosition);
        renderer.vertexAttribPointer(vPosition, 3, renderer.FLOAT, false, 0, 0);
        renderer.enableVertexAttribArray(vPosition);

        projLoc = renderer.getUniformLocation(program, "projection");

        projection = MV.perspective(fovy, aspect, near, far);
        renderer.uniformMatrix4fv(projLoc, false, MV.flatten(projection));

        var setRenderColor = function(colour)
        {
            var u = renderer.getUniformLocation(program, "colour");
            renderer.uniform4fv(u, MV.flatten(colour));
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

            worldview = MV.lookAt(this.eye, this.at, up);

            for (var i = 0; i < worldObjects.length; i++)
            {
                worldObjects[i].update();
                worldObjects[i].render(worldview, renderer, program);
            }
            requestAnimFrame(update);
        };

        var tiltUp = function()
        {
            this.at = MV.add(this.at, MV.vec3(0.0, 0.0, 1.5));
        };

        var climb = function()
        {
            var forev = MV.subtract(this.at, this.eye); // current view forward vector
            var foreLen = MV.length(forev); // current view forward vector length
            var fore = MV.normalize(forev); // current view forward direction
            this.at = MV.add(this.at, MV.vec3(0.0, 0.0, 0.5));
            this.eye = MV.add(this.eye, MV.vec3(0.0, 0.0, 0.5));
        };

        var descend = function()
        {
            // var forev = MV.subtract(this.at, this.eye); // current view forward vector
            // var foreLen = MV.length(forev); // current view forward vector length
            // var fore = MV.normalize(forev); // current view forward direction
            this.at = MV.add(this.at, MV.vec3(0.0, 0.0, -0.5));
            this.eye = MV.add(this.eye, MV.vec3(0.0, 0.0, -0.5));
        };

        var tiltDown = function()
        {
            at = add(at, MV.vec3(0.0, 0.0, -1.5));
        };

        var slideForward = function()
        {
            var forev = MV.subtract(at, eye); // current view forward vector
            var foreLen = length(forev); // current view forward vector length
            var fore = MV.normalize(forev); // current view forward direction
            this.at = add(at, fore);
            this.eye = add(this.eye, fore);
        };

        var slideBackward = function()
        {
            var forev = MV.subtract(this.at, this.eye); // current view forward vector
            //var foreLen = MV.length(forev); // current view forward vector length
            var fore = MV.normalize(forev); // current view forward direction
            this.at = MV.subtract(this.at, fore);
            this.eye = MV.subtract(this.eye, fore);
        }

        var slideLeft = function()
        {
            var forev = MV.subtract(this.at, this.eye); // current view forward vector
            var fore = MV.normalize(forev); // current view forward direction
            var right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
            this.at = MV.subtract(this.at, right);
            this.eye = MV.subtract(this.eye, right);
        };

        var slideRight = function()
        {
            var forev = MV.subtract(at, eye); // current view forward vector
            var fore = MV.normalize(forev); // current view forward direction
            var right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
            this.at = add(at, right);
            this.eye = add(eye, right);
        };

        let pivotLeft = function()
        {
            let dat;
            let forev = MV.subtract(this.at, this.eye); // current view forward vector
            let foreLen = length(forev); // current view forward vector length
            let fore = MV.normalize(forev); // current view forward direction
            let right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
            let ddir = 1.0 * Math.PI / 180.0; // incremental view anrenderere change
            dat = MV.subtract(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore), MV.scale(foreLen * Math.sin(ddir), right));
            this.at = add(at, dat);
        };

        let pivotRight = function()
        {
            let dat;
            let forev = MV.subtract(this.at, this.eye); // current view forward vector
            let foreLen = MV.length(forev); // current view forward vector length
            let fore = MV.normalize(forev); // current view forward direction
            let right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
            let ddir = 1.0 * Math.PI / 180.0; // incremental view angle change
            dat = MV.add(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore), MV.scale(foreLen * Math.sin(ddir), right));
            this.at = MV.add(this.at, dat);
        };

        let addSubdata = function(data)
        {
            renderer.bufferSubData(renderer.ARRAY_BUFFER, currentOffset, MV.flatten(data));
            let prevDataLength = dataLength;
            dataLength = dataLength + data.length;
            currentOffset = currentOffset + (data.length * MV._sizeof('vec3'));
            return prevDataLength;
        };

        let setViewPort = function(width, height)
        {
            renderer.viewport(0, 0, width, height);
        };

        let setColor = function(r, g, b, a)
        {
            renderer.clearColor(r, g, b, a);
        };

        let onClick = function(callback)
        {
            if (callback && typeof callback != "undefined")
            {
                canvas.addEventListener("mousedown", function(event)
                {
                    callback(event);
                });
            }
        };

        let onKey = function(callback)
        {
            if (callback && typeof callback != "undefined")
            {
                document.addEventListener('keydown', function(event)
                {
                    let key = String.fromCharCode(event.keyCode);
                    callback(key);
                });
            }
        };


        let getCurrentRenderMode = function()
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

        let addWorldObject = function(object)
        {
            worldObjects.push(object);
        };

        let getWorldObjects = function()
        {
            return worldObjects;
        };

        let setCamera = function(location, direction)
        {
            this.eye = location;
            this.at = direction;
        };

        let getFps = function()
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


module.exports = WebGLRenderer;