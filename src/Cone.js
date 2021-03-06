/*
 Author:     Andrew Douglas
 Student No: 11362345

 */

import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';

class Cone {
  constructor(location, angle, scales) {
    this.gl = new WebGLRenderer('gl-canvas');
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = MV.vec4(0.5, 0.5, 0.5, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
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
    gl.drawArrays(gl.TRIANGLE_FAN, this.offset, this.NV);
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

  initModel() {
    const rawverts = [];
    const vertices = [];

    function doCone() {
      const z = 0.0;
      const top = MV.vec3(0.0, 0.0, 1.5);

      for (let i = 0; i <= 180; i++) {
        const theta = (Math.PI / 180) * (2 * i + 0.5);
        const v = MV.vec3(Math.cos(theta), Math.sin(theta), z);
        rawverts.push(v);
      }

      for (let j = 0; j < rawverts.length;) {
        vertices.push(rawverts[j]);
        vertices.push(top);
        vertices.push(rawverts[j++]);
      }
    }

    doCone();
    this.NV = vertices.length;
    return vertices;
  }
}

export { Cone as default };
