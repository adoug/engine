/*
    Author:     Andrew Douglas
    Date:       19/10/2015

    main application

*/
import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';
import Scene from './Scene';
import SceneObject from './SceneObj';
import Pyramid from './Pyramid';
import Block from './Block';

const App = {
  init() {
        // Init WebGL
    let canvasElement;
    canvasElement = document.getElementById('gl-canvas');

    const gl = WebGLRenderer.getInstance(canvasElement);

    gl.setViewPort(canvasElement.width, canvasElement.height);
    gl.setColor(0.6, 0.8, 1.0, 1.0);

        // Setup camera
    const eye = MV.vec3(0.0, -300, 100.0);
    const at = MV.vec3(0.0, 100.0, 25.0);
    gl.setCamera(eye, at);

    addGround();
    addHuts();
    addPath();
    addTrees();

    addObjModel('Assets/Models/cube.obj');

        // Keboard camera control
    const keyDownEventHandler = function (key) {
      switch (key) {
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

    const updateCallback = function (fps) {
      const fpsElement = document.getElementById('fps');
      fpsElement.innerHTML = fps.toFixed(2);
    };

    gl.onClick(addBlock);
    gl.onKey(keyDownEventHandler);
    gl.onUpdate(updateCallback);
    gl.render();


        // TODO: Sceen to 3d location
    let addBlock = function (event) {
      const block = new Block(MV.vec3(event.offsetX, event.offsetY, 2.05), 0, MV.vec3(5.0, 5.0, 5.0));
      block.setModelColour(Scene.grey);
      gl.addWorldObject(block);
    };

    function addGround() {
      const ground = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(1000, 10000, 1.0));
      ground.setModelColour(Scene.green0);
      gl.addWorldObject(ground);
    }

    function addHuts() {
      const block = new Block(MV.vec3(20.0, 15.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0));
      const myPyramid = new Pyramid(MV.vec3(20.0, 15.0, 0.0), 0, MV.vec3(8.0, 8.0, 8.0));
      myPyramid.setModelColour(Scene.pale);
      block.setModelColour(Scene.grey);
      gl.addWorldObject(myPyramid);
      gl.addWorldObject(block);

      const block2 = new Block(MV.vec3(-20.0, -15.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0));
      const myPyramid2 = new Pyramid(MV.vec3(-20.0, -15.0, 0.0), 0, MV.vec3(8.0, 8.0, 8.0));
      myPyramid2.setModelColour(Scene.pale);
      block2.setModelColour(Scene.grey);
      gl.addWorldObject(myPyramid2);
      gl.addWorldObject(block2);
    }

    function addPath() {
      const myPath1 = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(1000.0, 10.0, 1.1));
      const myPath2 = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(10.0, 1000.0, 1.1));
      myPath1.setModelColour(Scene.road);
      myPath2.setModelColour(Scene.road);
      gl.addWorldObject(myPath1);
      gl.addWorldObject(myPath2);
    }

    function addTrees() {
      for (let i = 2; i < 10; i++) {
        const x = (i * 20);
        for (let j = 1; j < 10; j++) {
          const trunkColors = shuffle(Scene.brownsIndicies);
          const canopyColors = shuffle(Scene.greensIndicies);
          const trees = shuffle(Scene.sizeIndicies);
          const y = (j * 20);
          const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
          const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
          myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
          myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
          gl.addWorldObject(myCylinder);
          gl.addWorldObject(myCone);
        }
      }

      for (let i = 2; i < 10; i++) {
        const x = (i * -20);
        for (let j = 1; j < 10; j++) {
          const trunkColors = shuffle(Scene.brownsIndicies);
          const canopyColors = shuffle(Scene.greensIndicies);
          const trees = shuffle(Scene.sizeIndicies);
          const y = (j * -20);
          const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
          const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
          myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
          myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
          gl.addWorldObject(myCylinder);
          gl.addWorldObject(myCone);
        }
      }

      for (let i = 2; i < 10; i++) {
        const x = (i * 20);
        for (let j = 1; j < 10; j++) {
          const trunkColors = shuffle(Scene.brownsIndicies);
          const canopyColors = shuffle(Scene.greensIndicies);
          const trees = shuffle(Scene.sizeIndicies);
          const y = (j * -20);
          const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
          const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
          myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
          myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
          gl.addWorldObject(myCylinder);
          gl.addWorldObject(myCone);
        }
      }

      for (let i = 2; i < 10; i++) {
        const x = (i * -20);
        for (let j = 1; j < 10; j++) {
          const trunkColors = shuffle(Scene.brownsIndicies);
          const canopyColors = shuffle(Scene.greensIndicies);
          const trees = shuffle(Scene.sizeIndicies);
          const y = (j * 20);
          const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
          const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
          myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
          myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
          gl.addWorldObject(myCylinder);
          gl.addWorldObject(myCone);
        }
      }
    }

    function addObjModel(path) {
      const sceneObj = new SceneObject(MV.vec3(10.0, 30.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), path);
      sceneObj.setModelColour(Scene.red);
      gl.addWorldObject(sceneObj);
    }
  },
};

module.exports = App;
