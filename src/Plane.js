/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

const WebGLRenderer = require('./WebGLRenderer');
const MV = require('../common/MV');

Plane.offset = this.offset;
Plane.vertices = [];

function Plane(location, angle, scales)
{
    var gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
    if (Plane.vertices.length == 0)
    {
        Plane.vertices = Plane.initModel();
        this.offset = gl.addSubdata(Plane.vertices);
    }
}

Plane.prototype.render = function(worldview, gl, program)
{
    var colLoc = gl.getUniformLocation(program, "colour");
    var mvLoc = gl.getUniformLocation(program, "modelView");
    gl.uniform4fv(colLoc, flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, Plane.NV);
};

Plane.prototype.update = function()
{
    var rs = mult(rotate(this.angle, [0, 0, 1]), scalem(this.scales));
    this.trs = mult(translate(this.location), rs);
}

Plane.prototype.getName = function()
{
    return this.name;
}

Plane.prototype.setModelColour = function(color)
{
    this.color = color;
}

Plane.prototype.setWidth = function(width)
{
    this.width;
}

Plane.prototype.setHeight = function(height)
{
    this.height;
}

Plane.prototype.setLocation = function(location)
{
    this.location = location;
}

Plane.prototype.setAngle

Plane.initModel = function()
{
    var rawverts = [
        vec3(-0.5, -0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(0.5, 0.5, 0.5),
        vec3(0.5, -0.5, 0.5)
    ];
    var vertices = [];
    var indices = [1, 0, 3, 1, 3, 2];

    function doPlane()
    {
        for (var i = 0; i < indices.length; ++i)
        {
            vertices.push(rawverts[indices[i]]);
        }
    }

    doPlane();
    Plane.NV = vertices.length;
    return vertices;
}
