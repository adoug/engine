/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';

class Cylinder {
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
    gl.drawArrays(gl.TRIANGLE_STRIP, this.offset, this.NV);
  }

  setModelColour(color) {
    console.log(color);
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
    const baseVerts = [];
    const topVerts = [];

    const vertices = [];

    function doCylinder() {
      const bottom = 0.0;
      const top = 10.0;

      for (let i = 0; i <= 180; i += 1) {
        const theta = (Math.PI / 180) * ((2 * i) + 0.5);
        const b = MV.vec3(Math.cos(theta), Math.sin(theta), bottom);
        const t = MV.vec3(Math.cos(theta), Math.sin(theta), top);
        baseVerts.push(b);
        topVerts.push(t);
      }

      for (let j = 0; j <= 180; j++) {
        const theta = (Math.PI / 180) * (2 * j + 0.5);
        const v = MV.vec3(Math.cos(theta), Math.sin(theta), top);
        topVerts.push(v);
      }

      for (let k = 0; k <= 180; k++) {
        vertices.push(baseVerts[k]);
        vertices.push(topVerts[k]);
        vertices.push(baseVerts[k++]);
        vertices.push(topVerts[k++]);
      }
    }

    doCylinder();
    this.NV = vertices.length;
    return vertices;
  }
}

export { Cylinder as default };
