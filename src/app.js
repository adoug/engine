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
  }

  setCamera(eye, up) {
    this.gl.setCamera(eye, up);
  }

  addWorldObject(object) {
    this.gl.addWorldObject(object);
  }

  createObjModel(path, id) {
    return new SceneObject(MV.vec3(10.0, 30.0, 2.05), 10.0, [0, 0, 1], MV.vec3(5.0, 5.0, 5.0), path, this.gl, id);
  }

  getSceneObject(id) {
    return this.gl.getWorldObject(id);
  }

  start() {
    this.gl.render();
  }

  onUpdate(callback) {
    this.gl.onUpdate(callback);
  }
}

export { App as default };
export { Block, Plane, Cone, Cylinder, Pyramid, SceneObject, Scene, MV, Utils };
