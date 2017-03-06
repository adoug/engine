/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

Pyramid.vertices = [];

function Pyramid(location, angle, scales)
{
    var gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = vec4(0.8, 0.7, 0.3, 1.0);
    if (Pyramid.vertices.length == 0)
    {
        Pyramid.vertices = Pyramid.initModel();
        Pyramid.offset = gl.addSubdata(Pyramid.vertices);
    }
}

Pyramid.prototype.render = function(worldview, gl, program)
{
    var colLoc = gl.getUniformLocation(program, "colour");
    var mvLoc = gl.getUniformLocation(program, "modelView");
    gl.uniform4fv(colLoc, flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, Pyramid.offset, Pyramid.NV);
};

Pyramid.prototype.update = function()
{
    var rs = mult(rotate(this.angle, [0, 0, 1]), scalem(this.scales));
    this.trs = mult(translate(this.location), rs);
}

Pyramid.prototype.setModelColour = function(color)
{
    this.color = color;
}

Pyramid.prototype.setWidth = function(width)
{
    this.width;
}

Pyramid.prototype.setHeight = function(height)
{
    this.height;
}

Pyramid.prototype.setLocation = function(location)
{
    this.location = location;
}

Pyramid.prototype.setAngle

Pyramid.initModel = function()
{
    // The 5 raw vertices of a pyramid
    var rawverts = [
        vec3(-0.5, -0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(0.5, 0.5, 0.5),
        vec3(0.5, -0.5, 0.5),
        vec3(0.0, 0.0, 1.5)
    ];
    var vertices = [];
    var indices = [1, 0, 3, 1, 3, 2, 1, 0, 4, 0, 3, 4, 3, 2, 4, 2, 1, 4];

    function doPyramid()
    {
        for (var i = 0; i < indices.length; ++i)
        {
            vertices.push(rawverts[indices[i]]);
        }
    }

    doPyramid();
    Pyramid.NV = vertices.length;
    return vertices;
}
