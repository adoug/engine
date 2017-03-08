/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';

class Pyramid {
  constructor(location, angle, scales) {
    this.gl = new WebGLRenderer('gl-canvas');
    this.vertices = [];
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, MV.flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  update() {
    const rs = MV.mult(MV.rotate(this.angle, [0, 0, 1]), MV.scalem(this.scales));
    this.trs = MV.mult(MV.translate(this.location), rs);
  }

  doPyramid() {
    for (let i = 0; i < this.indices.length; i += 1) {
      this.vertices.push(this.rawverts[this.indices[i]]);
    }
  }


  initModel() {
        // The 5 raw vertices of a pyramid
    this.rawverts = [
      MV.vec3(-0.5, -0.5, 0.5),
      MV.vec3(-0.5, 0.5, 0.5),
      MV.vec3(0.5, 0.5, 0.5),
      MV.vec3(0.5, -0.5, 0.5),
      MV.vec3(0.0, 0.0, 1.5),
    ];
    this.vertices = [];
    this.indices = [1, 0, 3, 1, 3, 2, 1, 0, 4, 0, 3, 4, 3, 2, 4, 2, 1, 4];

    this.doPyramid();
    this.NV = this.vertices.length;
    return this.vertices;
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

export { Pyramid as default };

