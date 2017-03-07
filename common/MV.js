//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

class Helper {

    static _argumentsToArray(args) {
        return [].concat.apply([], Array.prototype.slice.apply(args));
    }

    static radians(degrees) {
        return degrees * Math.PI / 180.0;
    }

    static vec2() {
        let result = Helper._argumentsToArray(arguments);

        switch (result.length) {
            case 0:
                result.push(0.0);
                break;
            case 1:
                result.push(0.0);
                break;
        }

        return result.splice(0, 2);
    }

    static vec3() {
        let result = Helper._argumentsToArray(arguments);

        switch (result.length) {
            case 0:
                result.push(0.0);
                break;
            case 1:
                result.push(0.0);
                break;
            case 2:
                result.push(0.0);
                break;
        }

        return result.splice(0, 3);
    }

    static vec4() {
        let result = Helper._argumentsToArray(arguments);

        switch (result.length) {
            case 0:
                result.push(0.0);
                break;
            case 1:
                result.push(0.0);
                break;
            case 2:
                result.push(0.0);
                break;
            case 3:
                result.push(1.0);
                break;
        }

        return result.splice(0, 4);
    }

    static mult(u, v) {
        let result = [];

        if (u.matrix && v.matrix) {
            if (u.length != v.length) {
                throw "mult(): trying to add matrices of different dimensions";
            }

            for (let i = 0; i < u.length; ++i) {
                if (u[i].length != v[i].length) {
                    throw "mult(): trying to add matrices of different dimensions";
                }
            }

            for (let i = 0; i < u.length; ++i) {
                result.push([]);

                for (let j = 0; j < v.length; ++j) {
                    let sum = 0.0;
                    for (let k = 0; k < u.length; ++k) {
                        sum += u[i][k] * v[k][j];
                    }
                    result[i].push(sum);
                }
            }

            result.matrix = true;

            return result;
        }
        else {
            if (u.length != v.length) {
                throw "mult(): vectors are not the same dimension";
            }

            for (let i = 0; i < u.length; ++i) {
                result.push(u[i] * v[i]);
            }

            return result;
        }
    }

    static mat2() {
        let v = Helper._argumentsToArray(arguments);

        let m = [];
        switch (v.length) {
            case 0:
                v[0] = 1;
                break;
            case 1:
                m = [
                    Helper.vec2(v[0], 0.0),
                    Helper.vec2(0.0, v[0])
                ];
                break;

            default:
                m.push(Helper.vec2(v));
                v.splice(0, 2);
                m.push(Helper.vec2(v));
                break;
        }

        m.matrix = true;

        return m;
    }


    static mat3() {
        let v = Helper._argumentsToArray(arguments);

        let m = [];
        switch (v.length) {
            case 0:
                v[0] = 1;
                break;
            case 1:
                m = [
                    Helper.vec3(v[0], 0.0, 0.0),
                    Helper.vec3(0.0, v[0], 0.0),
                    Helper.vec3(0.0, 0.0, v[0])
                ];
                break;

            default:
                m.push(Helper.vec3(v));
                v.splice(0, 3);
                m.push(Helper.vec3(v));
                v.splice(0, 3);
                m.push(Helper.vec3(v));
                break;
        }

        m.matrix = true;

        return m;
    }

//----------------------------------------------------------------------------

    static mat4() {
        let v = Helper._argumentsToArray(arguments);

        let m = [];
        switch (v.length) {
            case 0:
                v[0] = 1;
                break;
            case 1:
                m = [
                    Helper.vec4(v[0], 0.0, 0.0, 0.0),
                    Helper.vec4(0.0, v[0], 0.0, 0.0),
                    Helper.vec4(0.0, 0.0, v[0], 0.0),
                    Helper.vec4(0.0, 0.0, 0.0, v[0])
                ];
                break;

            default:
                m.push(Helper.vec4(v));
                v.splice(0, 4);
                m.push(Helper.vec4(v));
                v.splice(0, 4);
                m.push(Helper.vec4(v));
                v.splice(0, 4);
                m.push(Helper.vec4(v));
                break;
        }

        m.matrix = true;

        return m;
    }

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

    static equal(u, v) {
        if (u.length != v.length) {
            return false;
        }

        if (u.matrix && v.matrix) {
            for (let i = 0; i < u.length; ++i) {
                if (u[i].length != v[i].length) {
                    return false;
                }
                for (let j = 0; j < u[i].length; ++j) {
                    if (u[i][j] !== v[i][j]) {
                        return false;
                    }
                }
            }
        }
        else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
            return false;
        }
        else {
            for (let i = 0; i < u.length; ++i) {
                if (u[i] !== v[i]) {
                    return false;
                }
            }
        }

        return true;
    }

//----------------------------------------------------------------------------

    static add(u, v) {
        let result = [];

        if (u.matrix && v.matrix) {
            if (u.length != v.length) {
                throw "add(): trying to add matrices of different dimensions";
            }

            for (let i = 0; i < u.length; ++i) {
                if (u[i].length != v[i].length) {
                    throw "add(): trying to add matrices of different dimensions";
                }
                result.push([]);
                for (let j = 0; j < u[i].length; ++j) {
                    result[i].push(u[i][j] + v[i][j]);
                }
            }

            result.matrix = true;

            return result;
        }
        else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
            throw "add(): trying to add matrix and non-matrix variables";
        }
        else {
            if (u.length != v.length) {
                throw "add(): vectors are not the same dimension";
            }

            for (let i = 0; i < u.length; ++i) {
                result.push(u[i] + v[i]);
            }

            return result;
        }
    }

//----------------------------------------------------------------------------

    static subtract(u, v) {
        let result = [];
        if (u.matrix && v.matrix) {
            if (u.length != v.length) {
                throw "subtract(): trying to subtract matrices" +
                " of different dimensions";
            }

            for (let i = 0; i < u.length; ++i) {
                if (u[i].length != v[i].length) {
                    throw "subtract(): trying to subtact matrices" +
                    " of different dimensions";
                }
                result.push([]);
                for (let j = 0; j < u[i].length; ++j) {
                    result[i].push(u[i][j] - v[i][j]);
                }
            }

            result.matrix = true;

            return result;
        }
        else if (u.matrix && !v.matrix || !u.matrix && v.matrix) {
            throw "subtact(): trying to subtact  matrix and non-matrix variables";
        }
        else {
            if (u.length != v.length) {
                throw "subtract(): vectors are not the same length";
            }

            for (let i = 0; i < u.length; ++i) {
                result.push(u[i] - v[i]);
            }

            return result;
        }
    }

//----------------------------------------------------------------------------


//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

    static translate(x, y, z) {
        if (Array.isArray(x) && x.length == 3) {
            z = x[2];
            y = x[1];
            x = x[0];
        }

        let result = Helper.mat4();
        result[0][3] = x;
        result[1][3] = y;
        result[2][3] = z;

        return result;
    }

//----------------------------------------------------------------------------

    static rotate(angle, axis) {
        if (!Array.isArray(axis)) {
            axis = [arguments[1], arguments[2], arguments[3]];
        }

        let v = Helper.normalize(axis);

        let x = v[0];
        let y = v[1];
        let z = v[2];

        let c = Math.cos(Helper.radians(angle));
        let omc = 1.0 - c;
        let s = Math.sin(Helper.radians(angle));

        return Helper.mat4(
            Helper.vec4(x * x * omc + c, x * y * omc - z * s, x * z * omc + y * s, 0.0),
            Helper.vec4(x * y * omc + z * s, y * y * omc + c, y * z * omc - x * s, 0.0),
            Helper.vec4(x * z * omc - y * s, y * z * omc + x * s, z * z * omc + c, 0.0),
            Helper.vec4()
        );
    }

//----------------------------------------------------------------------------

    static scalem(x, y, z) {
        if (Array.isArray(x) && x.length == 3) {
            z = x[2];
            y = x[1];
            x = x[0];
        }

        let result = Helper.mat4();
        result[0][0] = x;
        result[1][1] = y;
        result[2][2] = z;

        return result;
    }

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

    static lookAt(eye, at, up) {
        if (!Array.isArray(eye) || eye.length != 3) {
            throw "lookAt(): first parameter [eye] must be an a vec3";
        }

        if (!Array.isArray(at) || at.length != 3) {
            throw "lookAt(): first parameter [at] must be an a vec3";
        }

        if (!Array.isArray(up) || up.length != 3) {
            throw "lookAt(): first parameter [up] must be an a vec3";
        }

        if (Helper.equal(eye, at)) {
            return Helper.mat4();
        }

        let v = Helper.normalize(Helper.subtract(at, eye)); // view direction vector
        let n = Helper.normalize(Helper.cross(v, up)); // perpendicular vector
        let u = Helper.normalize(Helper.cross(n, v)); // "new" up vector

        v = negate(v);

        return Helper.mat4(
            Helper.vec4(n, -Helper.dot(n, eye)),
            Helper.vec4(u, -Helper.dot(u, eye)),
            Helper.vec4(v, -Helper.dot(v, eye)),
            Helper.vec4()
        );
    }

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

    static ortho(left, right, bottom, top, near, far) {
        if (left == right) {
            throw "ortho(): left and right are equal";
        }
        if (bottom == top) {
            throw "ortho(): bottom and top are equal";
        }
        if (near == far) {
            throw "ortho(): near and far are equal";
        }

        let w = right - left;
        let h = top - bottom;
        let d = far - near;

        let result = Helper.mat4();
        result[0][0] = 2.0 / w;
        result[1][1] = 2.0 / h;
        result[2][2] = -2.0 / d;
        result[0][3] = -(left + right) / w;
        result[1][3] = -(top + bottom) / h;
        result[2][3] = -(near + far) / d;

        return result;
    }

//----------------------------------------------------------------------------

    static perspective(fovy, aspect, near, far) {
        let f = 1.0 / Math.tan(Helper.radians(fovy) / 2);
        let d = far - near;

        let result = Helper.mat4();
        result[0][0] = f / aspect;
        result[1][1] = f;
        result[2][2] = -(near + far) / d;
        result[2][3] = -2 * near * far / d;
        result[3][2] = -1;
        result[3][3] = 0.0;

        return result;
    }

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

    static transpose(m) {
        if (!m.matrix) {
            return "transpose(): trying to transpose a non-matrix";
        }

        let result = [];
        for (let i = 0; i < m.length; ++i) {
            result.push([]);
            for (let j = 0; j < m[i].length; ++j) {
                result[i].push(m[j][i]);
            }
        }

        result.matrix = true;

        return result;
    }

//----------------------------------------------------------------------------
//
//  Vector Functions
//

    static dot(u, v) {
        if (u.length != v.length) {
            throw "dot(): vectors are not the same dimension";
        }

        let sum = 0.0;
        for (let i = 0; i < u.length; ++i) {
            sum += u[i] * v[i];
        }

        return sum;
    }

//----------------------------------------------------------------------------

    static negate(u) {
        let result = [];
        for (let i = 0; i < u.length; ++i) {
            result.push(-u[i]);
        }

        return result;
    }

//----------------------------------------------------------------------------

    static cross(u, v) {
        if (!Array.isArray(u) || u.length < 3) {
            throw "cross(): first argument is not a vector of at least 3";
        }

        if (!Array.isArray(v) || v.length < 3) {
            throw "cross(): second argument is not a vector of at least 3";
        }

        return [
            u[1] * v[2] - u[2] * v[1],
            u[2] * v[0] - u[0] * v[2],
            u[0] * v[1] - u[1] * v[0]
        ];
    }

//----------------------------------------------------------------------------

    static length(u) {
        return Math.sqrt(Helper.dot(u, u));
    }

//----------------------------------------------------------------------------

    static normalize(u, excludeLastComponent) {
        if (excludeLastComponent) {
            let last = u.pop();
        }

        let len = length(u);

        if (!isFinite(len)) {
            throw "normalize: vector " + u + " has zero length";
        }

        for (let i = 0; i < u.length; ++i) {
            u[i] /= len;
        }

        if (excludeLastComponent) {
            u.push(last);
        }

        return u;
    }

//----------------------------------------------------------------------------

    static mix(u, v, s) {
        if (typeof s !== "number") {
            throw "mix: the last paramter " + s + " must be a number";
        }

        if (u.length != v.length) {
            throw "vector dimension mismatch";
        }

        let result = [];
        for (let i = 0; i < u.length; ++i) {
            result.push((1.0 - s) * u[i] + s * v[i]);
        }

        return result;
    }

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

    static scale(s, u) {
        if (!Array.isArray(u)) {
            throw "scale: second parameter " + u + " is not a vector";
        }

        let result = [];
        for (let i = 0; i < u.length; ++i) {
            result.push(s * u[i]);
        }

        return result;
    }

//----------------------------------------------------------------------------
//
//
//

    static flatten(v) {
        if (v.matrix === true) {
            v = Helper.transpose(v);
        }

        let n = v.length;
        let elemsAreArrays = false;

        if (Array.isArray(v[0])) {
            elemsAreArrays = true;
            n *= v[0].length;
        }

        let floats = new Float32Array(n);

        if (elemsAreArrays) {
            let idx = 0;
            for (let i = 0; i < v.length; ++i) {
                for (let j = 0; j < v[i].length; ++j) {
                    floats[idx++] = v[i][j];
                }
            }
        }
        else {
            for (let i = 0; i < v.length; ++i) {
                floats[i] = v[i];
            }
        }

        return floats;
    }

//----------------------------------------------------------------------------

    static _sizeof(type) {
        switch (type) {
            case 'vec2':
                return new Float32Array(this.flatten(this.vec2())).byteLength;
                break;
            case 'vec3':
                return new Float32Array(this.flatten(this.vec3())).byteLength;
                break;
            case 'vec4':
                return new Float32Array(this.flatten(this.vec4())).byteLength;
                break;
            case 'mat2':
                return new Float32Array(this.flatten(this.mat2())).byteLength;
                break;
            case 'mat3':
                return new Float32Array(this.flatten(this.mat3())).byteLength;
                break;
            case 'mat4':
                return new Float32Array(this.flatten(this.mat4())).byteLength;
                break;
            default:
                break;
        }
    }


    static printm(m) {
        if (m.length == 2)
            for (let i = 0; i < m.length; i++)
                console.log(m[i][0], m[i][1]);
        else if (m.length == 3)
            for (let i = 0; i < m.length; i++)
                console.log(m[i][0], m[i][1], m[i][2]);
        else if (m.length == 4)
            for (let i = 0; i < m.length; i++)
                console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
    }

// determinants

    static det2(m) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }

    static det3(m) {
        return m[0][0] * m[1][1] * m[2][2] + m[0][1] * m[1][2] * m[2][0] + m[0][2] * m[2][1] * m[1][0] - m[2][0] * m[1][1] * m[0][2] - m[1][0] * m[0][1] * m[2][2] - m[0][0] * m[1][2] * m[2][1];
    }

    static det4(m) {
        let m0 = [
            Helper.vec3(m[1][1], m[1][2], m[1][3]),
            Helper.vec3(m[2][1], m[2][2], m[2][3]),
            Helper.vec3(m[3][1], m[3][2], m[3][3])
        ];
        let m1 = [
            Helper.vec3(m[1][0], m[1][2], m[1][3]),
            Helper.vec3(m[2][0], m[2][2], m[2][3]),
            Helper.vec3(m[3][0], m[3][2], m[3][3])
        ];
        let m2 = [
            Helper.vec3(m[1][0], m[1][1], m[1][3]),
            Helper.vec3(m[2][0], m[2][1], m[2][3]),
            Helper.vec3(m[3][0], m[3][1], m[3][3])
        ];
        let m3 = [
            Helper.vec3(m[1][0], m[1][1], m[1][2]),
            Helper.vec3(m[2][0], m[2][1], m[2][2]),
            Helper.vec3(m[3][0], m[3][1], m[3][2])
        ];
        return m[0][0] * Helper.det3(m0) - m[0][1] * Helper.det3(m1) + m[0][2] * Helper.det3(m2) - m[0][3] * Helper.det3(m3);

    }

    static det(m) {
        if (m.matrix != true) console.log("not a matrix");
        if (m.length == 2) return Helper.det2(m);
        if (m.length == 3) return Helper.det3(m);
        if (m.length == 4) return Helper.det4(m);
    }

//---------------------------------------------------------

// inverses

    static inverse2(m) {
        let a = Helper.mat2();
        let d = Helper.det2(m);
        a[0][0] = m[1][1] / d;
        a[0][1] = -m[0][1] / d;
        a[1][0] = -m[1][0] / d;
        a[1][1] = m[0][0] / d;
        a.matrix = true;
        return a;
    }

    static inverse3(m) {
        var a = Helper.mat3();
        var d = Helper.det3(m);

        var a00 = [
            Helper.vec2(m[1][1], m[1][2]),
            Helper.vec2(m[2][1], m[2][2])
        ];
        var a01 = [
            Helper.vec2(m[1][0], m[1][2]),
            Helper.vec2(m[2][0], m[2][2])
        ];
        var a02 = [
            Helper.vec2(m[1][0], m[1][1]),
            Helper.vec2(m[2][0], m[2][1])
        ];
        var a10 = [
            Helper.vec2(m[0][1], m[0][2]),
            Helper.vec2(m[2][1], m[2][2])
        ];
        var a11 = [
            Helper.vec2(m[0][0], m[0][2]),
            Helper.vec2(m[2][0], m[2][2])
        ];
        var a12 = [
            Helper.vec2(m[0][0], m[0][1]),
            Helper.vec2(m[2][0], m[2][1])
        ];
        var a20 = [
            Helper.vec2(m[0][1], m[0][2]),
            Helper.vec2(m[1][1], m[1][2])
        ];
        var a21 = [
            Helper.vec2(m[0][0], m[0][2]),
            Helper.vec2(m[1][0], m[1][2])
        ];
        var a22 = [
            Helper.vec2(m[0][0], m[0][1]),
            Helper.vec2(m[1][0], m[1][1])
        ];

        a[0][0] = Helper.det2(a00) / d;
        a[0][1] = -Helper.det2(a10) / d;
        a[0][2] = Helper.det2(a20) / d;
        a[1][0] = -Helper.det2(a01) / d;
        a[1][1] = Helper.det2(a11) / d;
        a[1][2] = -Helper.det2(a21) / d;
        a[2][0] = Helper.det2(a02) / d;
        a[2][1] = -Helper.det2(a12) / d;
        a[2][2] = Helper.det2(a22) / d;

        return a;

    }

    static inverse4(m) {
        var a = Helper.mat4();
        var d = Helper.det4(m);

        var a00 = [
            Helper.vec3(m[1][1], m[1][2], m[1][3]),
            Helper.vec3(m[2][1], m[2][2], m[2][3]),
            Helper.vec3(m[3][1], m[3][2], m[3][3])
        ];
        var a01 = [
            Helper.vec3(m[1][0], m[1][2], m[1][3]),
            Helper.vec3(m[2][0], m[2][2], m[2][3]),
            Helper.vec3(m[3][0], m[3][2], m[3][3])
        ];
        var a02 = [
            Helper.vec3(m[1][0], m[1][1], m[1][3]),
            Helper.vec3(m[2][0], m[2][1], m[2][3]),
            Helper.vec3(m[3][0], m[3][1], m[3][3])
        ];
        var a03 = [
            Helper.vec3(m[1][0], m[1][1], m[1][2]),
            Helper.vec3(m[2][0], m[2][1], m[2][2]),
            Helper.vec3(m[3][0], m[3][1], m[3][2])
        ];
        var a10 = [
            Helper.vec3(m[0][1], m[0][2], m[0][3]),
            Helper.vec3(m[2][1], m[2][2], m[2][3]),
            Helper.vec3(m[3][1], m[3][2], m[3][3])
        ];
        var a11 = [
            Helper.vec3(m[0][0], m[0][2], m[0][3]),
            Helper.vec3(m[2][0], m[2][2], m[2][3]),
            Helper.vec3(m[3][0], m[3][2], m[3][3])
        ];
        var a12 = [
            Helper.vec3(m[0][0], m[0][1], m[0][3]),
            Helper.vec3(m[2][0], m[2][1], m[2][3]),
            Helper.vec3(m[3][0], m[3][1], m[3][3])
        ];
        var a13 = [
            Helper.vec3(m[0][0], m[0][1], m[0][2]),
            Helper.vec3(m[2][0], m[2][1], m[2][2]),
            Helper.vec3(m[3][0], m[3][1], m[3][2])
        ];
        var a20 = [
            Helper.vec3(m[0][1], m[0][2], m[0][3]),
            Helper.vec3(m[1][1], m[1][2], m[1][3]),
            Helper.vec3(m[3][1], m[3][2], m[3][3])
        ];
        var a21 = [
            Helper.vec3(m[0][0], m[0][2], m[0][3]),
            Helper.vec3(m[1][0], m[1][2], m[1][3]),
            Helper.vec3(m[3][0], m[3][2], m[3][3])
        ];
        var a22 = [
            Helper.vec3(m[0][0], m[0][1], m[0][3]),
            Helper.vec3(m[1][0], m[1][1], m[1][3]),
            Helper.vec3(m[3][0], m[3][1], m[3][3])
        ];
        var a23 = [
            Helper.vec3(m[0][0], m[0][1], m[0][2]),
            Helper.vec3(m[1][0], m[1][1], m[1][2]),
            Helper.vec3(m[3][0], m[3][1], m[3][2])
        ];

        var a30 = [
            Helper.vec3(m[0][1], m[0][2], m[0][3]),
            Helper.vec3(m[1][1], m[1][2], m[1][3]),
            Helper.vec3(m[2][1], m[2][2], m[2][3])
        ];
        var a31 = [
            Helper.vec3(m[0][0], m[0][2], m[0][3]),
            Helper.vec3(m[1][0], m[1][2], m[1][3]),
            Helper.vec3(m[2][0], m[2][2], m[2][3])
        ];
        var a32 = [
            Helper.vec3(m[0][0], m[0][1], m[0][3]),
            Helper.vec3(m[1][0], m[1][1], m[1][3]),
            Helper.vec3(m[2][0], m[2][1], m[2][3])
        ];
        var a33 = [
            Helper.vec3(m[0][0], m[0][1], m[0][2]),
            Helper.vec3(m[1][0], m[1][1], m[1][2]),
            Helper.vec3(m[2][0], m[2][1], m[2][2])
        ];


        a[0][0] = Helper.det3(a00) / d;
        a[0][1] = -Helper.det3(a10) / d;
        a[0][2] = Helper.det3(a20) / d;
        a[0][3] = -Helper.det3(a30) / d;
        a[1][0] = -Helper.det3(a01) / d;
        a[1][1] = Helper.det3(a11) / d;
        a[1][2] = -Helper.det3(a21) / d;
        a[1][3] = Helper.det3(a31) / d;
        a[2][0] = Helper.det3(a02) / d;
        a[2][1] = -Helper.det3(a12) / d;
        a[2][2] = Helper.det3(a22) / d;
        a[2][3] = -Helper.det3(a32) / d;
        a[3][0] = -Helper.det3(a03) / d;
        a[3][1] = Helper.det3(a13) / d;
        a[3][2] = -Helper.det3(a23) / d;
        a[3][3] = Helper.det3(a33) / d;

        return a;
    }

    static inverse(m) {
        if (m.matrix != true) console.log("not a matrix");
        if (m.length == 2) return Helper.inverse2(m);
        if (m.length == 3) return Helper.inverse3(m);
        if (m.length == 4) return Helper.inverse4(m);
    }

    static normalMatrix(m, flag) {
        let a = Helper.mat4();
        a = Helper.inverse(Helper.transpose(m));
        if (flag != true) return a;
        else {
            let b = Helper.mat3();
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++) b[i][j] = a[i][j];
            return b;
        }

    }
}

module.exports = Helper;
