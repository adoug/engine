/*
 Author:     Andrew Douglas
 Student No: 11362345

 */

// const WebGLRenderer = require('./WebGLRenderer');
import { WebGLRenderer } from './WebGLRenderer';

import { MV } from '../common/MV';

class Cone {
  constructor(location, angle, scales) {
    const gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = MV.vec4(0.5, 0.5, 0.5, 1.0);
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, MV.flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLE_FAN, Cone.offset, Cone.NV);
  }
}

Cone.vertices = [];

function Cone(location, angle, scales) {
  const gl = WebGLRenderer.getInstance();
  this.location = location;
  this.angle = angle;
  this.scales = scales;
  this.color = MV.vec4(0.5, 0.5, 0.5, 1.0);
  if (Cone.vertices.length === 0) {
    Cone.vertices = Cone.initModel();
    this.offset = gl.addSubdata(Cone.vertices);
    Cone.offset = this.offset;
  }
}


Cone.prototype.render = function (worldview, gl, program) {
  var colLoc = gl.getUniformLocation(program, "colour");
  var mvLoc = gl.getUniformLocation(program, "modelView");
  gl.uniform4fv(colLoc, flatten(this.color));
  gl.uniformMatrix4fv(mvLoc, false, flatten(mult(worldview, this.trs)));
  gl.drawArrays(gl.TRIANGLE_FAN, Cone.offset, Cone.NV);
};

Cone.prototype.update = function () {
  var rs = mult(rotate(this.angle, [0, 0, 1]), scalem(this.scales));
  this.trs = mult(translate(this.location), rs);
};

Cone.prototype.setModelColour = function (color) {
  this.color = color;
};

Cone.prototype.setWidth = function (width) {
  this.width;
};

Cone.prototype.setHeight = function (height) {
  this.height;
};

Cone.prototype.setLocation = function (location) {
  this.location = location;
};

Cone.initModel = function () {
  var rawverts = [];
  var vertices = [];

  function doCone() {
    var z = 0.0;
    var top = vec3(0.0, 0.0, 1.5);

    for (var i = 0; i <= 180; i++) {
      theta = (Math.PI / 180) * (2 * i + 0.5);
      var v = vec3(Math.cos(theta), Math.sin(theta), z);
      rawverts.push(v);
    }

    for (var j = 0; j < rawverts.length;) {
      vertices.push(rawverts[j]);
      vertices.push(top);
      vertices.push(rawverts[j++]);
    }
  }

  doCone();
  Cone.NV = vertices.length;
  return vertices;
};
