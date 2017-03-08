//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

class MV {

  static _argumentsToArray(args) {
    return [].concat.apply([], Array.prototype.slice.apply(args));
  }

//----------------------------------------------------------------------------

  static radians(degrees) {
    return degrees * Math.PI / 180.0;
  }

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

  static vec2() {
    var result = MV._argumentsToArray(arguments);

    switch (result.length) {
      case 0:
        result.push(0.0);
      case 1:
        result.push(0.0);
    }

    return result.splice(0, 2);
  }

  static vec3() {
    var result = MV._argumentsToArray(arguments);

    switch (result.length) {
      case 0:
        result.push(0.0);
      case 1:
        result.push(0.0);
      case 2:
        result.push(0.0);
    }

    return result.splice(0, 3);
  }

  static vec4() {
    var result = MV._argumentsToArray(arguments);

    switch (result.length) {
      case 0:
        result.push(0.0);
      case 1:
        result.push(0.0);
      case 2:
        result.push(0.0);
      case 3:
        result.push(1.0);
    }

    return result.splice(0, 4);
  }

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

  static mat2() {
    var v = MV._argumentsToArray(arguments);

    var m = [];
    switch (v.length) {
      case 0:
        v[0] = 1;
      case 1:
        m = [
          MV.vec2(v[0], 0.0),
          MV.vec2(0.0, v[0])
        ];
        break;

      default:
        m.push(MV.vec2(v));
        v.splice(0, 2);
        m.push(MV.vec2(v));
        break;
    }

    m.matrix = true;

    return m;
  }

//----------------------------------------------------------------------------

  static mat3() {
    var v = MV._argumentsToArray(arguments);

    var m = [];
    switch (v.length) {
      case 0:
        v[0] = 1;
      case 1:
        m = [
          MV.vec3(v[0], 0.0, 0.0),
          MV.vec3(0.0, v[0], 0.0),
          MV.vec3(0.0, 0.0, v[0])
        ];
        break;

      default:
        m.push(MV.vec3(v));
        v.splice(0, 3);
        m.push(MV.vec3(v));
        v.splice(0, 3);
        m.push(MV.vec3(v));
        break;
    }

    m.matrix = true;

    return m;
  }

//----------------------------------------------------------------------------

  static mat4() {
    var v = MV._argumentsToArray(arguments);

    var m = [];
    switch (v.length) {
      case 0:
        v[0] = 1;
      case 1:
        m = [
          MV.vec4(v[0], 0.0, 0.0, 0.0),
          MV.vec4(0.0, v[0], 0.0, 0.0),
          MV.vec4(0.0, 0.0, v[0], 0.0),
          MV.vec4(0.0, 0.0, 0.0, v[0])
        ];
        break;

      default:
        m.push(MV.vec4(v));
        v.splice(0, 4);
        m.push(MV.vec4(v));
        v.splice(0, 4);
        m.push(MV.vec4(v));
        v.splice(0, 4);
        m.push(MV.vec4(v));
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
      for (var i = 0; i < u.length; ++i) {
        if (u[i].length != v[i].length) {
          return false;
        }
        for (var j = 0; j < u[i].length; ++j) {
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
      for (var i = 0; i < u.length; ++i) {
        if (u[i] !== v[i]) {
          return false;
        }
      }
    }

    return true;
  }

//----------------------------------------------------------------------------

  static add(u, v) {
    var result = [];

    if (u.matrix && v.matrix) {
      if (u.length != v.length) {
        throw "add(): trying to add matrices of different dimensions";
      }

      for (var i = 0; i < u.length; ++i) {
        if (u[i].length != v[i].length) {
          throw "add(): trying to add matrices of different dimensions";
        }
        result.push([]);
        for (var j = 0; j < u[i].length; ++j) {
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

      for (var i = 0; i < u.length; ++i) {
        result.push(u[i] + v[i]);
      }

      return result;
    }
  }

//----------------------------------------------------------------------------

  static subtract(u, v) {
    var result = [];
    if (u.matrix && v.matrix) {
      if (u.length != v.length) {
        throw "subtract(): trying to subtract matrices" +
        " of different dimensions";
      }

      for (var i = 0; i < u.length; ++i) {
        if (u[i].length != v[i].length) {
          throw "subtract(): trying to subtact matrices" +
          " of different dimensions";
        }
        result.push([]);
        for (var j = 0; j < u[i].length; ++j) {
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

      for (var i = 0; i < u.length; ++i) {
        result.push(u[i] - v[i]);
      }

      return result;
    }
  }

//----------------------------------------------------------------------------

  static mult(u, v) {
    var result = [];

    if (u.matrix && v.matrix) {
      if (u.length != v.length) {
        throw "mult(): trying to add matrices of different dimensions";
      }

      for (var i = 0; i < u.length; ++i) {
        if (u[i].length != v[i].length) {
          throw "mult(): trying to add matrices of different dimensions";
        }
      }

      for (var i = 0; i < u.length; ++i) {
        result.push([]);

        for (var j = 0; j < v.length; ++j) {
          var sum = 0.0;
          for (var k = 0; k < u.length; ++k) {
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

      for (var i = 0; i < u.length; ++i) {
        result.push(u[i] * v[i]);
      }

      return result;
    }
  }

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

    var result = MV.mat4();
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

    var v = MV.normalize(axis);

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos(MV.radians(angle));
    var omc = 1.0 - c;
    var s = Math.sin(MV.radians(angle));

    var result = MV.mat4(
        MV.vec4(x * x * omc + c, x * y * omc - z * s, x * z * omc + y * s, 0.0),
        MV.vec4(x * y * omc + z * s, y * y * omc + c, y * z * omc - x * s, 0.0),
        MV.vec4(x * z * omc - y * s, y * z * omc + x * s, z * z * omc + c, 0.0),
        MV.vec4()
    );

    return result;
  }

//----------------------------------------------------------------------------

  static scalem(x, y, z) {
    if (Array.isArray(x) && x.length == 3) {
      z = x[2];
      y = x[1];
      x = x[0];
    }

    var result = MV.mat4();
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

    if (MV.equal(eye, at)) {
      return MV.mat4();
    }

    var v = MV.normalize(MV.subtract(at, eye)); // view direction vector
    var n = MV.normalize(MV.cross(v, up)); // perpendicular vector
    var u = MV.normalize(MV.cross(n, v)); // "new" up vector

    v = MV.negate(v);

    var result = MV.mat4(
        MV.vec4(n, -MV.dot(n, eye)),
        MV.vec4(u, -MV.dot(u, eye)),
        MV.vec4(v, -MV.dot(v, eye)),
        MV.vec4()
    );

    return result;
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

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = MV.mat4();
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
    var f = 1.0 / Math.tan(MV.radians(fovy) / 2);
    var d = far - near;

    var result = MV.mat4();
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

    var result = [];
    for (var i = 0; i < m.length; ++i) {
      result.push([]);
      for (var j = 0; j < m[i].length; ++j) {
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

    var sum = 0.0;
    for (var i = 0; i < u.length; ++i) {
      sum += u[i] * v[i];
    }

    return sum;
  }

//----------------------------------------------------------------------------

  static negate(u) {
    var result = [];
    for (var i = 0; i < u.length; ++i) {
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

    var result = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0]
    ];

    return result;
  }

//----------------------------------------------------------------------------

  static length(u) {
    return Math.sqrt(MV.dot(u, u));
  }

//----------------------------------------------------------------------------

  static normalize(u, excludeLastComponent) {
    if (excludeLastComponent) {
      var last = u.pop();
    }

    var len = MV.length(u);

    if (!isFinite(len)) {
      throw "normalize: vector " + u + " has zero length";
    }

    for (var i = 0; i < u.length; ++i) {
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

    var result = [];
    for (var i = 0; i < u.length; ++i) {
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

    var result = [];
    for (var i = 0; i < u.length; ++i) {
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
      v = MV.transpose(v);
    }

    var n = v.length;
    var elemsAreArrays = false;

    if (Array.isArray(v[0])) {
      elemsAreArrays = true;
      n *= v[0].length;
    }

    var floats = new Float32Array(n);

    if (elemsAreArrays) {
      var idx = 0;
      for (var i = 0; i < v.length; ++i) {
        for (var j = 0; j < v[i].length; ++j) {
          floats[idx++] = v[i][j];
        }
      }
    }
    else {
      for (var i = 0; i < v.length; ++i) {
        floats[i] = v[i];
      }
    }

    return floats;
  }

//----------------------------------------------------------------------------

  static _sizeof(type) {
    switch (type) {
      case 'vec2':
      return new Float32Array(MV.flatten(MV.vec2())).byteLength;
      case 'vec3':
      return new Float32Array(MV.flatten(MV.vec3())).byteLength;
      case 'vec4':
      return new Float32Array(MV.flatten(MV.vec4())).byteLength;
      case'mat2':
      return new Float32Array(MV.flatten(MV.mat2())).byteLength;
      case'mat3':
      return new Float32Array(MV.flatten(MV.mat3())).byteLength;
      case'mat4':
      return new Float32Array(MV.flatten(MV.mat4())).byteLength;
    }
  }

// new functions 5/2/2015

// printing

  static printm(m) {
    if (m.length == 2)
      for (var i = 0; i < m.length; i++)
        console.log(m[i][0], m[i][1]);
    else if (m.length == 3)
      for (var i = 0; i < m.length; i++)
        console.log(m[i][0], m[i][1], m[i][2]);
    else if (m.length == 4)
      for (var i = 0; i < m.length; i++)
        console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
  }

// determinants

  static det2(m) {

    return m[0][0] * m[1][1] - m[0][1] * m[1][0];

  }

  static det3(m) {
    var d = m[0][0] * m[1][1] * m[2][2] + m[0][1] * m[1][2] * m[2][0] + m[0][2] * m[2][1] * m[1][0] - m[2][0] * m[1][1] * m[0][2] - m[1][0] * m[0][1] * m[2][2] - m[0][0] * m[1][2] * m[2][1];
    return d;
  }

  static det4(m) {
    var m0 = [
      MV.vec3(m[1][1], m[1][2], m[1][3]),
      MV.vec3(m[2][1], m[2][2], m[2][3]),
      MV.vec3(m[3][1], m[3][2], m[3][3])
    ];
    var m1 = [
      MV.vec3(m[1][0], m[1][2], m[1][3]),
      MV.vec3(m[2][0], m[2][2], m[2][3]),
      MV.vec3(m[3][0], m[3][2], m[3][3])
    ];
    var m2 = [
      MV.vec3(m[1][0], m[1][1], m[1][3]),
      MV.vec3(m[2][0], m[2][1], m[2][3]),
      MV.vec3(m[3][0], m[3][1], m[3][3])
    ];
    var m3 = [
      MV.vec3(m[1][0], m[1][1], m[1][2]),
      MV.vec3(m[2][0], m[2][1], m[2][2]),
      MV.vec3(m[3][0], m[3][1], m[3][2])
    ];
    return m[0][0] * MV.det3(m0) - m[0][1] * MV.det3(m1) + m[0][2] * MV.det3(m2) - m[0][3] * MV.det3(m3);

  }

  static det(m) {
    if (m.matrix != true) console.log("not a matrix");
    if (m.length == 2) return MV.det2(m);
    if (m.length == 3) return MV.det3(m);
    if (m.length == 4) return MV.det4(m);
  }

//---------------------------------------------------------

// inverses

  static inverse2(m) {
    var a = MV.mat2();
    var d = MV.det2(m);
    a[0][0] = m[1][1] / d;
    a[0][1] = -m[0][1] / d;
    a[1][0] = -m[1][0] / d;
    a[1][1] = m[0][0] / d;
    a.matrix = true;
    return a;
  }

  static inverse3(m) {
    var a = MV.mat3();
    var d = MV.det3(m);

    var a00 = [
      MV.vec2(m[1][1], m[1][2]),
      MV.vec2(m[2][1], m[2][2])
    ];
    var a01 = [
      MV.vec2(m[1][0], m[1][2]),
      MV.vec2(m[2][0], m[2][2])
    ];
    var a02 = [
      MV.vec2(m[1][0], m[1][1]),
      MV.vec2(m[2][0], m[2][1])
    ];
    var a10 = [
      MV.vec2(m[0][1], m[0][2]),
      MV.vec2(m[2][1], m[2][2])
    ];
    var a11 = [
      MV.vec2(m[0][0], m[0][2]),
      MV.vec2(m[2][0], m[2][2])
    ];
    var a12 = [
      MV.vec2(m[0][0], m[0][1]),
      MV.vec2(m[2][0], m[2][1])
    ];
    var a20 = [
      MV.vec2(m[0][1], m[0][2]),
      MV.vec2(m[1][1], m[1][2])
    ];
    var a21 = [
      MV.vec2(m[0][0], m[0][2]),
      MV.vec2(m[1][0], m[1][2])
    ];
    var a22 = [
      MV.vec2(m[0][0], m[0][1]),
      MV.vec2(m[1][0], m[1][1])
    ];

    a[0][0] = MV.det2(a00) / d;
    a[0][1] = -MV.det2(a10) / d;
    a[0][2] = MV.det2(a20) / d;
    a[1][0] = -MV.det2(a01) / d;
    a[1][1] = MV.det2(a11) / d;
    a[1][2] = -MV.det2(a21) / d;
    a[2][0] = MV.det2(a02) / d;
    a[2][1] = -MV.det2(a12) / d;
    a[2][2] = MV.det2(a22) / d;

    return a;

  }

  static inverse4(m) {
    var a = MV.mat4();
    var d = MV.det4(m);

    var a00 = [
      MV.vec3(m[1][1], m[1][2], m[1][3]),
      MV.vec3(m[2][1], m[2][2], m[2][3]),
      MV.vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a01 = [
      MV.vec3(m[1][0], m[1][2], m[1][3]),
      MV.vec3(m[2][0], m[2][2], m[2][3]),
      MV.vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a02 = [
      MV.vec3(m[1][0], m[1][1], m[1][3]),
      MV.vec3(m[2][0], m[2][1], m[2][3]),
      MV.vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a03 = [
      MV.vec3(m[1][0], m[1][1], m[1][2]),
      MV.vec3(m[2][0], m[2][1], m[2][2]),
      MV.vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a10 = [
      MV.vec3(m[0][1], m[0][2], m[0][3]),
      MV.vec3(m[2][1], m[2][2], m[2][3]),
      MV.vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a11 = [
      MV.vec3(m[0][0], m[0][2], m[0][3]),
      MV.vec3(m[2][0], m[2][2], m[2][3]),
      MV.vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a12 = [
      vec3(m[0][0], m[0][1], m[0][3]),
      vec3(m[2][0], m[2][1], m[2][3]),
      vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a13 = [
      MV.vec3(m[0][0], m[0][1], m[0][2]),
      MV.vec3(m[2][0], m[2][1], m[2][2]),
      MV.vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a20 = [
      MV.vec3(m[0][1], m[0][2], m[0][3]),
      MV.vec3(m[1][1], m[1][2], m[1][3]),
      MV.vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a21 = [
      MV.vec3(m[0][0], m[0][2], m[0][3]),
      MV.vec3(m[1][0], m[1][2], m[1][3]),
      MV.vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a22 = [
      MV.vec3(m[0][0], m[0][1], m[0][3]),
      MV.vec3(m[1][0], m[1][1], m[1][3]),
      MV.vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a23 = [
      MV.vec3(m[0][0], m[0][1], m[0][2]),
      MV.vec3(m[1][0], m[1][1], m[1][2]),
      MV.vec3(m[3][0], m[3][1], m[3][2])
    ];

    var a30 = [
      MV.vec3(m[0][1], m[0][2], m[0][3]),
      MV.vec3(m[1][1], m[1][2], m[1][3]),
      MV.vec3(m[2][1], m[2][2], m[2][3])
    ];
    var a31 = [
      MV.vec3(m[0][0], m[0][2], m[0][3]),
      MV.vec3(m[1][0], m[1][2], m[1][3]),
      MV.vec3(m[2][0], m[2][2], m[2][3])
    ];
    var a32 = [
      MV.vec3(m[0][0], m[0][1], m[0][3]),
      MV.vec3(m[1][0], m[1][1], m[1][3]),
      MV.vec3(m[2][0], m[2][1], m[2][3])
    ];
    var a33 = [
      MV.vec3(m[0][0], m[0][1], m[0][2]),
      MV.vec3(m[1][0], m[1][1], m[1][2]),
      MV.vec3(m[2][0], m[2][1], m[2][2])
    ];


    a[0][0] = det3(a00) / d;
    a[0][1] = -det3(a10) / d;
    a[0][2] = det3(a20) / d;
    a[0][3] = -det3(a30) / d;
    a[1][0] = -det3(a01) / d;
    a[1][1] = det3(a11) / d;
    a[1][2] = -det3(a21) / d;
    a[1][3] = det3(a31) / d;
    a[2][0] = det3(a02) / d;
    a[2][1] = -det3(a12) / d;
    a[2][2] = det3(a22) / d;
    a[2][3] = -det3(a32) / d;
    a[3][0] = -det3(a03) / d;
    a[3][1] = det3(a13) / d;
    a[3][2] = -det3(a23) / d;
    a[3][3] = det3(a33) / d;

    return a;
  }

  static inverse(m) {
    if (m.matrix != true) console.log("not a matrix");
    if (m.length == 2) return MV.inverse2(m);
    if (m.length == 3) return MV.inverse3(m);
    if (m.length == 4) return MV.inverse4(m);
  }

  static normalMatrix(m, flag) {
    var a = MV.mat4();
    a = MV.inverse(MV.transpose(m));
    if (flag != true) return a;
    else {
      var b = MV.mat3();
      for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++) b[i][j] = a[i][j];
      return b;
    }

  }
}

export { MV as default };
