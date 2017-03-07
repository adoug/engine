const WebGLRenderer = require('./WebGLRenderer');
const MV = require('../common/MV');

class SceneObject {

    constructor(location, angle, scales, path, offset)
    {
        this.offset = offset;
        this.vertices = [];
        this.NV = 0;
        const gl = WebGLRenderer.getInstance();
        this.location = location;
        this.angle = angle;
        this.scales = scales;
        this.color = MV.vec4(0.8, 0.7, 0.3, 1.0);
        if (this.vertices.length == 0)
        {
            this.vertices = this.initModel(path);
            this.offset = gl.addSubdata(this.vertices);
        }
    }

    render (worldview, gl, program)
    {
        let colLoc = gl.getUniformLocation(program, "colour");
        let mvLoc = gl.getUniformLocation(program, "modelView");
        gl.uniform4fv(colLoc, MV.flatten(this.color));
        gl.uniformMatrix4fv(mvLoc, false, MV.flatten(MV.mult(worldview, this.trs)));
        gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
    }

    initModel (modelPath)
    {
        let cubeObjModel = new ObjParser(modelPath);

        this.vertices = cubeObjModel.vertexPositions;

        this.NV = cubeObjModel.vertexPositions.length;
        return cubeObjModel.vertexPositions;
    }

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
}

module.exports = SceneObject;
