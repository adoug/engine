/*
    Author:     Andrew Douglas
    Date:       19/10/2015

    main application

*/

var App = (function()
{
    window.onload = function init()
    {
        // Init WebGL
        var canvasElement;
        canvasElement = document.getElementById('gl-canvas');        

        var gl = WebGLRenderer.getInstance(canvasElement);

        gl.setViewPort(canvasElement.width, canvasElement.height);
        gl.setColor(0.6, 0.8, 1.0, 1.0);

        // Setup camera
        var eye = vec3(0.0, -300, 100.0);
        var at = vec3(0.0, 100.0, 25.0);
        gl.setCamera(eye, at);

        addGround();
        addHuts();
        addPath();
        addTrees();

        addObjModel("Assets/Models/cube.obj");

        // Keboard camera control
        var keyDownEventHandler = function(key)
        {
            switch (key)
            {
                case 'W':
                    gl.slideForward();
                    break;
                case 'S':
                    gl.slideBackward();
                    break;
                case 'A':
                    gl.slideLeft();
                    break;
                case 'D':
                    gl.slideRight();
                    break;
                case 'Q':
                    gl.pivotLeft();
                    break;
                case 'E':
                    gl.pivotRight();
                    break;
                case 'Z':
                    gl.tiltUp();
                    break;
                case 'X':
                    gl.tiltDown();
                    break;
                case 'C':
                    gl.climb();
                    break;
                case 'V':
                    gl.descend();
                    break;
                default:
                    break;
            }
        };

        var updateCallback = function(fps)
        {
            var fpsElement = document.getElementById("fps");
            fpsElement.innerHTML = fps.toFixed(2);
        };

        gl.onClick(addBlock);
        gl.onKey(keyDownEventHandler);
        gl.onUpdate(updateCallback);
        gl.render();
        

        // TODO: Sceen to 3d location
        var addBlock = function(event)
        {
            var block = new Block(vec3(event.offsetX, event.offsetY, 2.05), 0, vec3(5.0, 5.0, 5.0));
            block.setModelColour(grey);
            gl.addWorldObject(block);
        };

        function addGround()
        {
            var ground = new Plane(vec3(0.0, 0.0, 0.0), 0, vec3(1000, 10000, 1.0));
            ground.setModelColour(green0);
            gl.addWorldObject(ground);
        };

        function addHuts()
        {
            var block = new Block(vec3(20.0, 15.0, 2.05), 0, vec3(5.0, 5.0, 5.0));
            var myPyramid = new Pyramid(vec3(20.0, 15.0, 0.0), 0, vec3(8.0, 8.0, 8.0));
            myPyramid.setModelColour(pale);
            block.setModelColour(grey);
            gl.addWorldObject(myPyramid);
            gl.addWorldObject(block);

            var block2 = new Block(vec3(-20.0, -15.0, 2.05), 0, vec3(5.0, 5.0, 5.0));
            var myPyramid2 = new Pyramid(vec3(-20.0, -15.0, 0.0), 0, vec3(8.0, 8.0, 8.0));
            myPyramid2.setModelColour(pale);
            block2.setModelColour(grey);
            gl.addWorldObject(myPyramid2);
            gl.addWorldObject(block2);
        }

        function addPath()
        {
            var myPath1 = new Plane(vec3(0.0, 0.0, 0.0), 0, vec3(1000.0, 10.0, 1.1));
            var myPath2 = new Plane(vec3(0.0, 0.0, 0.0), 0, vec3(10.0, 1000.0, 1.1));
            myPath1.setModelColour(road);
            myPath2.setModelColour(road);
            gl.addWorldObject(myPath1);
            gl.addWorldObject(myPath2);
        };

        function addTrees()
        {
            for (var i = 2; i < 10; i++)
            {
                var x = (i * 20);
                for (var j = 1; j < 10; j++)
                {
                    var trunkColors = shuffle(brownsIndicies);
                    var canopyColors = shuffle(greensIndicies);
                    var trees = shuffle(sizeIndicies);
                    var y = (j * 20);
                    var myCylinder = new Cylinder(vec3(x, y, 0.0), 0, treeSizes[trees[i]].trunk);
                    var myCone = new Cone(vec3(x, y, 8.5), 0, treeSizes[trees[i]].canopy);
                    myCone.setModelColour(greens[canopyColors[i - 2]]);
                    myCylinder.setModelColour(browns[trunkColors[i - 2]]);
                    gl.addWorldObject(myCylinder);
                    gl.addWorldObject(myCone);
                }
            }

            for (var i = 2; i < 10; i++)
            {
                var x = (i * -20);
                for (var j = 1; j < 10; j++)
                {
                    var trunkColors = shuffle(brownsIndicies);
                    var canopyColors = shuffle(greensIndicies);
                    var trees = shuffle(sizeIndicies);
                    var y = (j * -20);
                    var myCylinder = new Cylinder(vec3(x, y, 0.0), 0, treeSizes[trees[i]].trunk);
                    var myCone = new Cone(vec3(x, y, 8.5), 0, treeSizes[trees[i]].canopy);
                    myCone.setModelColour(greens[canopyColors[i - 2]]);
                    myCylinder.setModelColour(browns[trunkColors[i - 2]]);
                    gl.addWorldObject(myCylinder);
                    gl.addWorldObject(myCone);
                }
            }

            for (var i = 2; i < 10; i++)
            {
                var x = (i * 20);
                for (var j = 1; j < 10; j++)
                {
                    var trunkColors = shuffle(brownsIndicies);
                    var canopyColors = shuffle(greensIndicies);
                    var trees = shuffle(sizeIndicies);
                    var y = (j * -20);
                    var myCylinder = new Cylinder(vec3(x, y, 0.0), 0, treeSizes[trees[i]].trunk);
                    var myCone = new Cone(vec3(x, y, 8.5), 0, treeSizes[trees[i]].canopy);
                    myCone.setModelColour(greens[canopyColors[i - 2]]);
                    myCylinder.setModelColour(browns[trunkColors[i - 2]]);
                    gl.addWorldObject(myCylinder);
                    gl.addWorldObject(myCone);
                }
            }

            for (var i = 2; i < 10; i++)
            {
                var x = (i * -20);
                for (var j = 1; j < 10; j++)
                {
                    var trunkColors = shuffle(brownsIndicies);
                    var canopyColors = shuffle(greensIndicies);
                    var trees = shuffle(sizeIndicies);
                    var y = (j * 20);
                    var myCylinder = new Cylinder(vec3(x, y, 0.0), 0, treeSizes[trees[i]].trunk);
                    var myCone = new Cone(vec3(x, y, 8.5), 0, treeSizes[trees[i]].canopy);
                    myCone.setModelColour(greens[canopyColors[i - 2]]);
                    myCylinder.setModelColour(browns[trunkColors[i - 2]]);
                    gl.addWorldObject(myCylinder);
                    gl.addWorldObject(myCone);
                }
            }
        };

        function addObjModel(path) {
            var sceneObj = new SceneObj(vec3(10.0, 30.0, 2.05), 0, vec3(5.0, 5.0, 5.0), path);
            sceneObj.setModelColour(red);
            gl.addWorldObject(sceneObj);
        }
    }
})();
