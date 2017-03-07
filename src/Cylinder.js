/*
    Author:     Andrew Douglas
    Student No: 11362345

*/

const WebGLRenderer = require('./WebGLRenderer');
const MV = require('../common/MV');

Cylinder.vertices = [];

function Cylinder(location, angle, scales)
{
    var gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = MV.vec4(0.5, 0.5, 0.5, 1.0);
    if(Cylinder.vertices.length == 0)
    {        
        Cylinder.vertices = Cylinder.initModel(); 
        this.offset = gl.addSubdata(Cylinder.vertices);
        Cylinder.offset = this.offset;
    }    
}

Cylinder.prototype.render = function(worldview, gl, program)
{
    var colLoc = gl.getUniformLocation(program, "colour");
    var mvLoc = gl.getUniformLocation(program, "modelView");
    gl.uniform4fv(colLoc, flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLE_STRIP, Cylinder.offset, Cylinder.NV);
};

Cylinder.prototype.update = function()
{
    var rs = mult(rotate(this.angle, [0, 0, 1]), scalem(this.scales));
    this.trs = mult(translate(this.location), rs);
};

Cylinder.prototype.setModelColour = function(color)
{
    this.color = color;
};

Cylinder.prototype.setWidth = function(width)
{
    this.width;
};

Cylinder.prototype.setHeight = function(height)
{
    this.height;
};

Cylinder.prototype.setLocation = function(location)
{
    this.location = location;
};

Cylinder.initModel = function()
{
    var baseVerts = [];
    var topVerts = [];

    var vertices = [];

    function doCylinder()
    {
        var bottom = 0.0;
        var top = 10.0;

        for (var i = 0; i <= 180; i++)
        {
            theta = (Math.PI / 180) * (2 * i + 0.5);
            var b = vec3(Math.cos(theta), Math.sin(theta), bottom);
            var t = vec3(Math.cos(theta), Math.sin(theta), top);
            baseVerts.push(b);
            topVerts.push(t);
        }

        for (var j = 0; j <= 180; j++)
        {
            theta = (Math.PI / 180) * (2 * j + 0.5);
            var v = vec3(Math.cos(theta), Math.sin(theta), top);
            topVerts.push(v);
        }

        for (var k = 0; k <= 180; k++)
        {
            vertices.push(baseVerts[k]);
            vertices.push(topVerts[k]);
            vertices.push(baseVerts[k++]);
            vertices.push(topVerts[k++]);
        }
    }

    doCylinder();
    Cylinder.NV = vertices.length;
    return vertices;
};
