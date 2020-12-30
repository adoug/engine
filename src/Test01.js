import App, {
  Block, Plane, Cone, Cylinder, Pyramid, Scene, MV, Utils,
} from './app';
import Camera from './Camera';

class Test01 {
  constructor(canvas) {
    this.canvas = canvas;
    this.app = new App(this.canvas);
    this.camera = new Camera(
      MV.vec3(0.0, 0.0, 1.0),
      MV.vec3(0.0, 0.1, 200.0),
      MV.vec3(0.0, 0.11, -1.0),
    );
  }

  addGround() {
    const ground = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(1000, 10000, 1.0));
    ground.setModelColour(Scene.greens[0].colour);
    this.app.addWorldObject(ground);
  }

  // TODO: Screen to 3d location
  addBlock(event) {
    const block = new Block(
      MV.vec3(event.offsetX, event.offsetY, 2.05),
      0,
      MV.vec3(5.0, 5.0, 5.0), this.app.gl,
    );
    block.setModelColour(Scene.Colors.grey);
    this.app.addWorldObject(block);
  }

  addHuts() {
    const block = new Block(MV.vec3(20.0, 15.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), this.app.gl);
    const myPyramid = new Pyramid(MV.vec3(20.0, 15.0, 0.0), 0, MV.vec3(8.0, 8.0, 8.0));
    myPyramid.setModelColour(Scene.Colors.pale);
    block.setModelColour(Scene.Colors.grey);
    this.app.addWorldObject(myPyramid);
    this.app.addWorldObject(block);

    const block2 = new Block(MV.vec3(-20.0, -15.0, 2.05), 0, MV.vec3(5.0, 5.0, 5.0), this.app.gl);
    const myPyramid2 = new Pyramid(MV.vec3(-20.0, -15.0, 0.0), 0, MV.vec3(8.0, 8.0, 8.0));
    myPyramid2.setModelColour(Scene.Colors.pale);
    block2.setModelColour(Scene.Colors.grey);
    this.app.addWorldObject(myPyramid2);
    this.app.addWorldObject(block2);
  }

  addPath() {
    const myPath1 = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(1000.0, 10.0, 1.1));
    const myPath2 = new Plane(MV.vec3(0.0, 0.0, 0.0), 0, MV.vec3(10.0, 1000.0, 1.1));
    myPath1.setModelColour(Scene.Colors.road);
    myPath2.setModelColour(Scene.Colors.road);
    this.app.addWorldObject(myPath1);
    this.app.addWorldObject(myPath2);
  }

  addTrees() {
    for (let i = 2; i < 10; i++) {
      const x = (i * 20);
      for (let j = 1; j < 10; j++) {
        // const trunkColors = Utils.shuffle(Scene.brownsIndicies);
        // const canopyColors = Utils.shuffle(Scene.greensIndicies);
        const trees = Utils.shuffle(Scene.sizeIndicies);
        const y = (j * 20);
        const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
        const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
        myCone.setModelColour(Scene.greens[2].colour);
        myCylinder.setModelColour(Scene.browns[0]);
        this.app.addWorldObject(myCylinder);
        this.app.addWorldObject(myCone);
      }
    }
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

    // const objModel = this.app.createObjModel('Assets/Models/cube.obj');
    // objModel.setModelColour(Scene.red);
    // this.app.addWorldObject(objModel);

    // Keyboard camera control
    const keyDownEventHandler = function eventHandler(key) {
      switch (key) {
        case 'w':
          this.camera.slideForward();
          break;
        case 's':
          this.camera.slideBackward();
          break;
        case 'a':
          this.camera.slideLeft();
          break;
        case 'd':
          this.camera.slideRight();
          break;
        case 'q':
          this.camera.pivotLeft();
          break;
        case 'e':
          this.camera.pivotRight();
          break;
        case 'z':
          this.camera.tiltUp();
          break;
        case 'x':
          this.camera.tiltDown();
          break;
        case 'c':
          this.camera.climb();
          break;
        case 'v':
          this.camera.descend();
          break;
        default:
          break;
      }
    };

    this.app.gl.onClick(this.addBlock.bind(this));
    this.app.gl.onKey(keyDownEventHandler.bind(this));
    this.app.gl.onUpdate(this.updateCallback);
    this.app.gl.render(this.camera);
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

window.onload = function () {
  const test01 = new Test01(document.getElementById('gl-canvas'));
  test01.init();
};

export { Test01 as default };
