/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

import WebGLRenderer from './WebGLRenderer';
import MV from '../common/MV';

class Plane {
  constructor(location, angle, scales) {
    this.gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
    if (Plane.vertices.length == 0)
    {
      Plane.vertices = Plane.initModel();
      this.offset = this.gl.addSubdata(Plane.vertices);
    }
  }

  update()
  {
    let rs = MV.mult(MV.rotate(this.angle, [0, 0, 1]), MV.scalem(this.scales));
    this.trs = MV.mult(MV.translate(this.location), rs);
  }

  render(worldview, gl, program)
  {
    let colLoc = gl.getUniformLocation(program, 'colour');
    let mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, MV.flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, Plane.NV);
  }

  initModel() {
    let rawverts = [
      MV.vec3(-0.5, -0.5, 0.5),
      MV.vec3(-0.5, 0.5, 0.5),
      MV.vec3(0.5, 0.5, 0.5),
      MV.vec3(0.5, -0.5, 0.5),
    ];
    let vertices = [];
    let indices = [1, 0, 3, 1, 3, 2];

    function doPlane()
    {
      for (let i = 0; i < indices.length; ++i)
      {
        vertices.push(rawverts[indices[i]]);
      }
    }

    doPlane();
    Plane.NV = vertices.length;
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

Plane.offset = this.offset;
Plane.vertices = [];

export { Plane as default };
