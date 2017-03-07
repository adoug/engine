const MV = require('../common/MV');
const WebGLRenderer = require('./WebGLRenderer');

class Block {
    constructor(location, angle, scales)
    {
        const gl = WebGLRenderer.getInstance();
        this.location = location;
        this.angle = angle;
        this.scales = scales;
        this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
        if (Block.vertices.length == 0)
        {
            Block.vertices = Block.initModel();
            this.offset = gl.addSubdata(Block.vertices);
        }
    }

    render (worldview, gl, program)
    {
        let colLoc = gl.getUniformLocation(program, "colour");
        let mvLoc = gl.getUniformLocation(program, "modelView");
        gl.uniform4fv(colLoc, MV.flatten(this.color));
        gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
        gl.drawArrays(gl.TRIANGLES, this.offset, Block.NV);
    };

    update ()
    {
        let rs = MV.mult(MV.rotate(this.angle, [0, 0, 1]), MV.scalem(this.scales));
        this.trs = MV.mult(MV.translate(this.location), rs);
    }

    setModelColour (color)
    {
        this.color = color;
    }

    setWidth (width)
    {
        this.width = width;
    }

    setHeight (height)
    {
        this.height = height;
    }

    setLocation (location)
    {
        this.location = location;
    }

    initModel ()
    {
        // The 8 raw vertices of a cube
        let rawverts = [
            MV.vec3(-0.5, -0.5, 0.5),
            MV.vec3(-0.5, 0.5, 0.5),
            MV.vec3(0.5, 0.5, 0.5),
            MV.vec3(0.5, -0.5, 0.5),
            MV.vec3(-0.5, -0.5, -0.5),
            MV.vec3(-0.5, 0.5, -0.5),
            MV.vec3(0.5, 0.5, -0.5),
            MV.vec3(0.5, -0.5, -0.5)
        ];
        // A local array in which to develop the 36 vertices
        let vertices = [];

        // A nested function generating the vertices for each face
        function quad(a, b, c, d)
        {
            // if abcd is an anticlockwise winding on a face
            // then abc and acd are anticlockwise windings on its triangles
            let indices = [a, b, c, a, c, d];

            for (let i = 0; i < indices.length; ++i)
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
}

module.exports = Block;



