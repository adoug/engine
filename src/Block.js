/*
 Author:     Andrew Douglas
 Student No: 11362345

 */

import MV from '../common/MV';

class Block {
  constructor(location, angle, scales, gl) {
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
      this.offset = gl.addSubdata(this.vertices);
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

  setModelColour(color) {
    this.color = color;
  }

  initModel() {
    // The 8 raw vertices of a cube
    const rawverts = [
      MV.vec3(-0.5, -0.5, 0.5),
      MV.vec3(-0.5, 0.5, 0.5),
      MV.vec3(0.5, 0.5, 0.5),
      MV.vec3(0.5, -0.5, 0.5),
      MV.vec3(-0.5, -0.5, -0.5),
      MV.vec3(-0.5, 0.5, -0.5),
      MV.vec3(0.5, 0.5, -0.5),
      MV.vec3(0.5, -0.5, -0.5),
    ];
    // A local array in which to develop the 36 vertices
    const vertices = [];

    // A nested function generating the vertices for each face
    function quad(a, b, c, d) {
      // if abcd is an anticlockwise winding on a face
      // then abc and acd are anticlockwise windings on its triangles
      const indices = [a, b, c, a, c, d];

      for (let i = 0; i < indices.length; i += 1) {
        vertices.push(rawverts[indices[i]]);
      }
    }

    // A nested function generating the cube's faces
    function doCube() {
      // Use anticlockwise windings
      quad(1, 0, 3, 2);
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(6, 5, 1, 2);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
    }

    doCube();
    this.NV = vertices.length;
    return vertices;
  }

  static getNumberOfVertices() {
    return this.NV;
  }
}

Block.NV = Block.getNumberOfVertices();

export { Block as default };

