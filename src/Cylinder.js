/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';

class Cylinder {
  constructor(location, angle, scales) {
    this.gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = MV.vec4(0.5, 0.5, 0.5, 1.0);
    if(Cylinder.vertices.length === 0)
    {
      Cylinder.vertices = Cylinder.initModel();
      this.offset = this.gl.addSubdata(Cylinder.vertices);
      Cylinder.offset = this.offset;
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
    gl.drawArrays(gl.TRIANGLE_STRIP, Cylinder.offset, Cylinder.NV);
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
    let baseVerts = [];
    let topVerts = [];

    let vertices = [];

    function doCylinder() {
      let bottom = 0.0;
      let top = 10.0;

      for (let i = 0; i <= 180; i++) {
        let theta = (Math.PI / 180) * (2 * i + 0.5);
        let b = MV.vec3(Math.cos(theta), Math.sin(theta), bottom);
        let t = MV.vec3(Math.cos(theta), Math.sin(theta), top);
        baseVerts.push(b);
        topVerts.push(t);
      }

      for (let j = 0; j <= 180; j++) {
        let theta = (Math.PI / 180) * (2 * j + 0.5);
        let v = MV.vec3(Math.cos(theta), Math.sin(theta), top);
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
    Cylinder.NV = vertices.length;
    return vertices;
  }
}

export { Cylinder as default };


