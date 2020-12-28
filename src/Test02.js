import App, { Scene, MV, Utils } from './app';


class Test02 {
  constructor(canvas) {
    this.canvas = canvas;
    this.app = new App(this.canvas);
    this.cube = null;
    this.circlePositions = [];
    this.counter = 0;
  }

  update(deltaTime) {
    const randomIndex = Utils.shuffle(Scene.greensIndicies);

    this.cube.setModelColour(Scene.greens[Scene.greensIndicies[randomIndex[0]]]);
    this.cube.update(deltaTime);
    if (this.counter > 350) {
      this.counter = 0;
    } else {
      this.counter = this.counter + 1;
    }
  }

  init() {
    for (let i = 0; i < 360; i++) {
      const x = 50 * Math.cos(i);
      const y = 50 * Math.sin(i);
      this.circlePositions.push(MV.vec3(x, y, 0.0));
    }

    console.log(this.circlePositions);
    const randomIndex = Utils.shuffle(Scene.greensIndicies);
    this.cube = this.app.createObjModel('Assets/Models/cube.obj', '1');

    this.cube.setModelColour(Scene.greens[Scene.greensIndicies[randomIndex[0]]]);
    this.cube.setRotation([1.0, 1.0, 1.0], 30.0, 30.0);

    this.app.addWorldObject(this.cube);

    this.app.setCamera(MV.vec3(0.0, -200, 100.0), MV.vec3(0.0, 50.0, 0.0));

    this.app.onUpdate(this.update.bind(this));

    this.app.start();
  }
}

window.onload = function () {
  const test02 = new Test02(document.getElementById('gl-canvas'));
  test02.init();
};

export { Test02 as default };
