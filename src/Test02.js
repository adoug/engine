import App from './App';
import { Block, Plane, Cone, Cylinder, Pyramid, SceneObject, Scene, MV, Utils } from './App';

class Test02 {
    constructor(canvas) {
        this.canvas = canvas;
        this.app = new App(this.canvas);
        this.scene = new Scene();
        this.cube = null;
        this.circlePositions = [];
        this.counter = 0;
    }

    update(deltaTime) {
        let randomIndex = Utils.shuffle(this.scene.greensIndicies);

        this.cube.setModelColour(this.scene.greens[this.scene.greensIndicies[randomIndex[0]]]);
        this.cube.update(deltaTime);
        if (this.counter > 350) {
            this.counter = 0;
        } else {
            this.counter = this.counter + 1;
        }
    }

    init() {

        for (let i = 0; i < 360; i++) {
            var x = 50 * Math.cos(i);
            var y = 50 * Math.sin(i);
            this.circlePositions.push(MV.vec3(x, y, 0.0));
        }

        console.log(this.circlePositions);
        let randomIndex = Utils.shuffle(this.scene.greensIndicies);
        this.cube = this.app.createObjModel('Assets/Models/cube.obj', "1");

        this.cube.setModelColour(this.scene.greens[this.scene.greensIndicies[randomIndex[0]]]);
        this.cube.setRotation([1.0, 1.0, 1.0], 30.0, 30.0);

        this.app.addWorldObject(this.cube);

        this.app.setCamera(MV.vec3(0.0, -200, 100.0), MV.vec3(0.0, 50.0, 0.0));

        this.app.onUpdate(this.update.bind(this));

        this.app.start();
    }
}

window.onload = function() {
    const test02 = new Test02(document.getElementById('gl-canvas'));
    test02.init();
};

export { Test02 as default };