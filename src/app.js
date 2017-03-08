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
import Plane from './Plane';
import Cone from './Cone';
import Cylinder from './Cylinder';
import Utils from './utils';

class App {
  constructor(canvasElement) {
    this.gl = new WebGLRenderer(canvasElement);
    this.gl.setViewPort(canvasElement.width, canvasElement.height);
    this.gl.setColor(0.6, 0.8, 1.0, 1.0);

    // Setup camera
    this.eye = MV.vec3(0.0, -300, 100.0);
    this.at = MV.vec3(0.0, 100.0, 25.0);
    this.gl.setCamera(this.eye, this.at);
  }

  // TODO: Sceen to 3d location
  addBlock(event) {
    const block = new Block(MV.vec3(event.offsetX, event.offsetY, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), this.gl);
    block.setModelColour(Scene.grey);
    this.gl.addWorldObject(block);
  }

  addGround() {
    const ground = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(1000, 10000, 1.0));
    ground.setModelColour(Scene.green0);
    this.gl.addWorldObject(ground);
  }

  addHuts() {
    const block = new Block(MV.vec3(20.0, 15.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), this.gl);
    const myPyramid = new Pyramid(MV.vec3(20.0, 15.0, 0.0), 0, MV.vec3(8.0, 8.0, 8.0));
    myPyramid.setModelColour(Scene.pale);
    block.setModelColour(Scene.grey);
    this.gl.addWorldObject(myPyramid);
    this.gl.addWorldObject(block);

    const block2 = new Block(MV.vec3(-20.0, -15.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), this.gl);
    const myPyramid2 = new Pyramid(MV.vec3(-20.0, -15.0, 0.0), 0, MV.vec3(8.0, 8.0, 8.0));
    myPyramid2.setModelColour(Scene.pale);
    block2.setModelColour(Scene.grey);
    this.gl.addWorldObject(myPyramid2);
    this.gl.addWorldObject(block2);
  }

  addPath() {
    const myPath1 = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(1000.0, 10.0, 1.1));
    const myPath2 = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(10.0, 1000.0, 1.1));
    myPath1.setModelColour(Scene.road);
    myPath2.setModelColour(Scene.road);
    this.gl.addWorldObject(myPath1);
    this.gl.addWorldObject(myPath2);
  }


  addTrees() {
    for (let i = 2; i < 10; i++) {
      const x = (i * 20);
      for (let j = 1; j < 10; j++) {
        const trunkColors = Utils.shuffle(Scene.brownsIndicies);
        const canopyColors = Utils.shuffle(Scene.greensIndicies);
        const trees = Utils.shuffle(Scene.sizeIndicies);
        const y = (j * 20);
        const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
        const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
        myCone.setModelColour(Scene.green2);
        myCylinder.setModelColour(Scene.brown0);
        this.gl.addWorldObject(myCylinder);
        this.gl.addWorldObject(myCone);
      }
    }

    // for (let i = 2; i < 10; i += 1) {
    //   const x = (i * -20);
    //   for (let j = 1; j < 10; j += 1) {
    //     const trunkColors = Utils.shuffle(Scene.brownsIndicies);
    //     const canopyColors = Utils.shuffle(Scene.greensIndicies);
    //     const trees = Utils.shuffle(Scene.sizeIndicies);
    //     const y = (j * -20);
    //     const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
    //     const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
    //     myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
    //     myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
    //     this.gl.addWorldObject(myCylinder);
    //     this.gl.addWorldObject(myCone);
    //   }
    // }
    //
    // for (let i = 2; i < 10; i += 1) {
    //   const x = (i * 20);
    //   for (let j = 1; j < 10; j += 1) {
    //     const trunkColors = Utils.shuffle(Scene.brownsIndicies);
    //     const canopyColors = Utils.shuffle(Scene.greensIndicies);
    //     const trees = Utils.shuffle(Scene.sizeIndicies);
    //     const y = (j * -20);
    //     const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
    //     const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
    //     myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
    //     myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
    //     this.gl.addWorldObject(myCylinder);
    //     this.gl.addWorldObject(myCone);
    //   }
    // }
    //
    // for (let i = 2; i < 10; i += 1) {
    //   const x = (i * -20);
    //   for (let j = 1; j < 10; j += 1) {
    //     const trunkColors = Utils.shuffle(Scene.brownsIndicies);
    //     const canopyColors = Utils.shuffle(Scene.greensIndicies);
    //     const trees = Utils.shuffle(Scene.sizeIndicies);
    //     const y = (j * 20);
    //     const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
    //     const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
    //     myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
    //     myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
    //     this.gl.addWorldObject(myCylinder);
    //     this.gl.addWorldObject(myCone);
    //   }
    // }
  }

  addObjModel(path, gl) {
    const sceneObj = new SceneObject(MV.vec3(10.0, 30.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), path, gl);
    sceneObj.setModelColour(Scene.red);
    this.gl.addWorldObject(sceneObj);
  }

  updateCallback(fps) {
    const fpsElement = document.getElementById('fps');
    fpsElement.innerHTML = fps.toFixed(2);
  }

  init() {
    this.addGround();
    this.addHuts();
    this.addPath();
    this.addTrees();

    // const myCylinder = new Cylinder(MV.vec3(2, 1, 0.0), 0, MV.vec3(2.0, 2.0, 2.0));
    // myCylinder.setModelColour(Scene.brown0);
    // this.gl.addWorldObject(myCylinder);
    //
    // const myCone = new Cone(MV.vec3(2, 1, 8.5), 0, MV.vec3(7.0, 7.0, 7.0));
    // myCone.setModelColour(Scene.green0);
    // this.gl.addWorldObject(myCone);

    this.addObjModel('Assets/Models/cube.obj', this.gl);

    // Keboard camera control
    const keyDownEventHandler = function eventHandler(key) {
      switch (key) {
        case 'W':
          this.gl.slideForward();
          break;
        case 'S':
          this.gl.slideBackward();
          break;
        case 'A':
          this.gl.slideLeft();
          break;
        case 'D':
          this.gl.slideRight();
          break;
        case 'Q':
          this.gl.pivotLeft();
          break;
        case 'E':
          this.gl.pivotRight();
          break;
        case 'Z':
          this.gl.tiltUp();
          break;
        case 'X':
          this.gl.tiltDown();
          break;
        case 'C':
          this.gl.climb();
          break;
        case 'V':
          this.gl.descend();
          break;
        default:
          break;
      }
    };

    this.gl.onClick(this.addBlock.bind(this));
    this.gl.onKey(keyDownEventHandler.bind(this));
    this.gl.onUpdate(this.updateCallback);
    this.gl.render();
  }
}

window.onload = function () {
  const app = new App(document.getElementById('gl-canvas'));
  app.init();
};

export { App as default };

