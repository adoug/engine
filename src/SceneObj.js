SceneObj.offset = this.offset;
SceneObj.vertices = [];

function SceneObj(location, angle, scales, path)
{
    var gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = vec4(0.8, 0.7, 0.3, 1.0);
    if (SceneObj.vertices.length == 0)
    {
        SceneObj.vertices = SceneObj.initModel(path);
        this.offset = gl.addSubdata(SceneObj.vertices);
    }
}

SceneObj.prototype.render = function(worldview, gl, program)
{
    var colLoc = gl.getUniformLocation(program, "colour");
    var mvLoc = gl.getUniformLocation(program, "modelView");
    gl.uniform4fv(colLoc, flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, SceneObj.NV);
};

SceneObj.prototype.update = function()
{
    var rs = mult(rotate(this.angle, [0, 0, 1]), scalem(this.scales));
    this.trs = mult(translate(this.location), rs);
}

SceneObj.prototype.setModelColour = function(color)
{
    this.color = color;
}

SceneObj.prototype.setWidth = function(width)
{
    this.width;
}

SceneObj.prototype.setHeight = function(height)
{
    this.height;
}

SceneObj.prototype.setLocation = function(location)
{
    this.location = location;
}

SceneObj.prototype.setAngle

SceneObj.initModel = function(modelPath)
{

    var cubeObjModel = new ObjParser(modelPath);

    var vertices = cubeObjModel.vertexPositions;

    SceneObj.NV = cubeObjModel.vertexPositions.length;
    return cubeObjModel.vertexPositions;
}
