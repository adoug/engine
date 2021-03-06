import MV from '../common/MV';
import ObjParser from './ObjParser';

class SceneObject {
  constructor(location, angle, axis, scales, path, gl, id) {
    this.id = id;
    this.vertices = [];
    this.NV = 0;
    this.gl = gl;
    this.location = location;
    this.angle = angle;
    this.axis = axis;
    this.rate = 1;
    this.scales = scales;
    this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel(path);
      this.offset = this.gl.addSubdata(this.vertices);
    }
    this.update();
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, MV.flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  initModel(modelPath) {
    const cubeObjModel = new ObjParser(modelPath);

    this.vertices = cubeObjModel.vertexPositions;

    this.NV = cubeObjModel.vertexPositions.length;
    return cubeObjModel.vertexPositions;
  }

  update(deltaTime) {
    this.angle += (this.rate * deltaTime);
    const rs = MV.mult(MV.rotate(this.angle, this.axis), MV.scalem(this.scales));
    this.trs = MV.mult(MV.translate(this.location), rs);
  }

  setModelColour(color) {
    this.color = color;
  }

  setRotation(axis, angle, rate) {
    this.angle = angle;
    this.axis = axis;
    this.rate = rate;
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

export { SceneObject as default };
