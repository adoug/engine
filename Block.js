Block.offset = this.offset;
Block.vertices = [];

function Block(location, angle, scales)
{
    var gl = WebGLRenderer.getInstance();
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = vec4(0.8, 0.7, 0.3, 1.0);
    if (Block.vertices.length == 0)
    {
        Block.vertices = Block.initModel();
        this.offset = gl.addSubdata(Block.vertices);
    }
}

Block.prototype.render = function(worldview, gl, program)
{
    var colLoc = gl.getUniformLocation(program, "colour");
    var mvLoc = gl.getUniformLocation(program, "modelView");
    gl.uniform4fv(colLoc, flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, Block.NV);
};

Block.prototype.update = function()
{
    var rs = mult(rotate(this.angle, [0, 0, 1]), scalem(this.scales));
    this.trs = mult(translate(this.location), rs);
}

Block.prototype.setModelColour = function(color)
{
    this.color = color;
}

Block.prototype.setWidth = function(width)
{
    this.width;
}

Block.prototype.setHeight = function(height)
{
    this.height;
}

Block.prototype.setLocation = function(location)
{
    this.location = location;
}

Block.prototype.setAngle

Block.initModel = function()
{
    // The 8 raw vertices of a cube
    var rawverts = [
        vec3(-0.5, -0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(0.5, 0.5, 0.5),
        vec3(0.5, -0.5, 0.5),
        vec3(-0.5, -0.5, -0.5),
        vec3(-0.5, 0.5, -0.5),
        vec3(0.5, 0.5, -0.5),
        vec3(0.5, -0.5, -0.5)
    ];
    // A local array in which to develop the 36 vertices
    var vertices = [];

    // A nested function generating the vertices for each face
    function quad(a, b, c, d)
    {
        // if abcd is an anticlockwise winding on a face
        // then abc and acd are anticlockwise windings on its triangles
        var indices = [a, b, c, a, c, d];

        for (var i = 0; i < indices.length; ++i)
        {
            vertices.push(rawverts[indices[i]]);
        }
    }

    // A nested function generating the cube's faces
    function doCube()
    {
        // Use anticlockwise windings
        quad(1, 0, 3, 2);
        quad(2, 3, 7, 6);
        quad(3, 0, 4, 7);
        quad(6, 5, 1, 2);
        quad(4, 5, 6, 7);
        quad(5, 4, 0, 1);
    }

    doCube();
    Block.NV = vertices.length;
    return vertices;
}
