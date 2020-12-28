/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';

class Plane {
  constructor(location, angle, scales) {
    this.gl = new WebGLRenderer('gl-canvas');
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = Plane.initModel();
      this.NV = this.vertices.length;
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  update() {
    const rs = MV.mult(MV.rotate(this.angle, [0, 0, 1]), MV.scalem(this.scales));
    this.trs = MV.mult(MV.translate(this.location), rs);
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, MV.flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  static initModel() {
    const rawverts = [
      MV.vec3(-0.5, -0.5, 0.5),
      MV.vec3(-0.5, 0.5, 0.5),
      MV.vec3(0.5, 0.5, 0.5),
      MV.vec3(0.5, -0.5, 0.5),
    ];
    const vertices = [];
    const indices = [1, 0, 3, 1, 3, 2];

    function doPlane() {
      for (let i = 0; i < indices.length; i += 1) {
        vertices.push(rawverts[indices[i]]);
      }
    }

    doPlane();
    return vertices;
  }

  getName() {
    return this.name;
  }

  setModelColour(color) {
    this.color = color;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  setLocation(location) {
    this.location = location;
  }
}

export { Plane as default };
