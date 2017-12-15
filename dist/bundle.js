/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MV; });
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




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebGLRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_MV__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_webgl_utils__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_initShaders__ = __webpack_require__(4);
/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/




let instance = null;

class WebGLRenderer {
  constructor(canvasElement) {
    if (instance) {
      return instance;
    } else {
      this.near = 1.0;
      this.far = 1000;
      this.fovy = 27.0;
      this.bufferSize = 1000000;
      this.currentOffset = 0;
      this.dataLength = 0;
      this.then = Date.now() / 1000;
      this.fps = 0.0;
      this.canvas = canvasElement;
      this.updateCallback = function() {};

      this.up = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, 1.0); // VUP along world vertical
      this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, -300, 100.0);
      this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 100.0, 25.0);

      this.worldObjects = [];

      this.renderer = __WEBPACK_IMPORTED_MODULE_1__common_webgl_utils__["a" /* default */].setupWebGL(canvasElement);
      this.renderer_instance = this.renderer;

      if (!this.renderer) {
        throw new Error("WebGL isn't available");
      }

      this.renderModeTypes = {
        TRIANGLES: this.renderer.TRIANGLES,
        TRIANGLE_STRIP: this.renderer.TRIANGLE_STRIP,
        TRIANGLE_FAN: this.renderer.TRIANGLE_FAN,
        LINES: this.renderer.LINES,
        LINE_LOOP: this.renderer.LINE_LOOP,
        LINE_STRIP: this.renderer.LINE_STRIP,
        POINTS: this.renderer.POINTS,
      };

      this.renderMode = this.renderModeTypes.TRIANGLE_STRIP;

      this.renderer.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.aspect = this.canvas.width / this.canvas.height;

      this.renderer.enable(this.renderer.DEPTH_TEST);

      this.program = __WEBPACK_IMPORTED_MODULE_2__common_initShaders__["a" /* default */].initShaders(this.renderer, 'vertex-shader', 'fragment-shader');
      this.renderer.useProgram(this.program);

      this.bufferId = this.renderer.createBuffer();
      this.renderer.bindBuffer(this.renderer.ARRAY_BUFFER, this.bufferId);
      this.renderer.bufferData(this.renderer.ARRAY_BUFFER, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */]._sizeof('vec3') * this.bufferSize, this.renderer.STATIC_DRAW);

      const vPosition = this.renderer.getAttribLocation(this.program, 'vPosition');
      this.renderer.vertexAttribPointer(vPosition, 3, this.renderer.FLOAT, false, 0, 0);
      this.renderer.enableVertexAttribArray(vPosition);
      this.renderer.vertexAttribPointer(vPosition, 3, this.renderer.FLOAT, false, 0, 0);
      this.renderer.enableVertexAttribArray(vPosition);

      this.projLoc = this.renderer.getUniformLocation(this.program, 'projection');

      this.projection = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].perspective(this.fovy, this.aspect, this.near, this.far);
      this.renderer.uniformMatrix4fv(this.projLoc, false, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(this.projection));
      instance = this;
    }
    return instance;
  }

  setRenderColor(colour) {
    const u = this.renderer.getUniformLocation(this.program, 'colour');
    this.renderer.uniform4fv(u, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(colour));
  }

  setRenderMode(renderMode) {
    this.renderer.renderMode = renderMode;
  }

  onUpdate(callback) {
    if (callback && typeof callback !== 'undefined') {
      this.updateCallback = callback;
    }
  }

  render() {
    this.renderer.clear(this.renderer.COLOR_BUFFER_BIT | this.renderer.DEPTH_BUFFER_BIT);
    this.worldview = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].lookAt(this.eye, this.at, this.up);

    for (let i = 0; i < this.worldObjects.length; i += 1) {
      this.worldObjects[i].update();
      this.worldObjects[i].render(this.worldview, this.renderer, this.program);
    }
    window.requestAnimFrame(this.update.bind(this));
  }

  update() {
    this.updateCallback(this.fps);
    const now = Date.now() / 1000; // get time in seconds

    // compute time since last frame
    const elapsedTime = now - this.then;
    this.then = now;

    // compute fps
    this.fps = 1 / elapsedTime;
    this.render();
  }

  addWorldObject(object) {
    this.worldObjects.push(object);
  }

  setCamera(location, direction) {
    this.eye = location;
    this.at = direction;
  }

  tiltUp() {
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, 1.5));
  }

  climb() {
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, 0.5));
    this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.eye, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, 0.5));
  }

  descend() {
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, -0.5));
    this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.eye, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, -0.5));
  }

  tiltDown() {
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.0, 0.0, -1.5));
  }

  slideForward() {
    const forev = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, this.eye); // current view forward vector
    const fore = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(forev); // current view forward direction
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, fore);
    this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.eye, fore);
  }

  slideBackward() {
    const forev = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, this.eye); // current view forward vector
    const fore = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(forev); // current view forward direction
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, fore);
    this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.eye, fore);
  }

  slideLeft() {
    const forev = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, this.eye); // current view forward vector
    const fore = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(forev); // current view forward direction
    const right = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].cross(fore, this.up)); // current horizontal right direction
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, right);
    this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.eye, right);
  }

  slideRight() {
    const forev = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, this.eye); // current view forward vector
    const fore = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(forev); // current view forward direction
    const right = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].cross(fore, this.up)); // current horizontal right direction
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, right);
    this.eye = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.eye, right);
  }

  pivotLeft() {
    const forev = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, this.eye); // current view forward vector
    const foreLen = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].length(forev); // current view forward vector length
    const fore = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(forev); // current view forward direction
    const right = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].cross(fore, this.up)); // current horizontal right direction
    const ddir = (1.0 * Math.PI) / 180.0; // incremental view anrenderere change
    const dat = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].scale(foreLen * (Math.cos(ddir) - 1.0), fore),
        __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].scale(foreLen * Math.sin(ddir), right));
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, dat);
  }

  pivotRight() {
    const forev = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].subtract(this.at, this.eye); // current view forward vector
    const foreLen = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].length(forev); // current view forward vector length
    const fore = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(forev); // current view forward direction
    const right = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].normalize(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].cross(fore, this.up)); // current horizontal right direction
    const ddir = (1.0 * Math.PI) / 180.0; // incremental view angle change
    const dat = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].scale(foreLen * (Math.cos(ddir) - 1.0), fore), __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].scale(foreLen * Math.sin(ddir), right));
    this.at = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].add(this.at, dat);
  }

  addSubdata(data) {
    this.renderer.bufferSubData(this.renderer.ARRAY_BUFFER, this.currentOffset, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(data));
    const prevDataLength = this.dataLength;
    this.dataLength += data.length;
    this.currentOffset += (data.length * __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */]._sizeof('vec3'));
    return prevDataLength;
  }

  setViewPort(width, height) {
    this.renderer.viewport(0, 0, width, height);
  }

  setColor(r, g, b, a) {
    this.renderer.clearColor(r, g, b, a);
  }

  onClick(callback) {
    if (callback && typeof callback !== 'undefined') {
      this.canvas.addEventListener('mousedown', (event) => {
        callback(event);
      });
    }
  }

  onKey(callback) {
    if (callback && typeof callback !== 'undefined') {
      document.addEventListener('keydown', (event) => {
        const key = String.fromCharCode(event.keyCode);
        callback(key);
      });
    }
  }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_MV__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Scene__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SceneObj__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Pyramid__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Block__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Plane__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Cone__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Cylinder__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__Block__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__Plane__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__Cone__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__Cylinder__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__Pyramid__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_3__SceneObj__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__Scene__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__common_MV__["a"]; });
/*
    Author:     Andrew Douglas
    Date:       19/10/2015

    main application

*/











class App {
  constructor(canvasElement) {
    this.gl = new __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__["a" /* default */](canvasElement);
    this.gl.setViewPort(canvasElement.width, canvasElement.height);
    this.gl.setColor(0.6, 0.8, 1.0, 1.0);

    // Setup camera
    this.eye = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.0, -300, 100.0);
    this.at = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.0, 100.0, 25.0);
    this.gl.setCamera(this.eye, this.at);
  }

  addWorldObject(object) {
    gl.addWorldObject(object);
  }
}






/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Test01; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__(2);



class Test01 {

    constructor(canvas) {
        this.canvas = canvas;
        this.app = new __WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */](this.canvas);
    }

    addGround() {
        const ground = new __WEBPACK_IMPORTED_MODULE_0__App__["b" /* Plane */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(0.0, 0.0, 0.0), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(1000, 10000, 1.0));
        ground.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].green0);
        this.app.addWorldObject(ground);
    }

    // TODO: Sceen to 3d location
    addBlock(event) {
        const block = new __WEBPACK_IMPORTED_MODULE_0__App__["e" /* Block */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(event.offsetX, event.offsetY, 2.05), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(5.0, 5.0, 5.0), this.gl);
        block.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].grey);
        this.app.addWorldObject(block);
    }

    addHuts() {
        const block = new __WEBPACK_IMPORTED_MODULE_0__App__["e" /* Block */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(20.0, 15.0, 2.05), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(5.0, 5.0, 5.0), this.gl);
        const myPyramid = new __WEBPACK_IMPORTED_MODULE_0__App__["f" /* Pyramid */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(20.0, 15.0, 0.0), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(8.0, 8.0, 8.0));
        myPyramid.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].pale);
        block.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].grey);
        this.gl.addWorldObject(myPyramid);
        this.gl.addWorldObject(block);

        const block2 = new __WEBPACK_IMPORTED_MODULE_0__App__["e" /* Block */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(-20.0, -15.0, 2.05), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(5.0, 5.0, 5.0), this.gl);
        const myPyramid2 = new __WEBPACK_IMPORTED_MODULE_0__App__["f" /* Pyramid */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(-20.0, -15.0, 0.0), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(8.0, 8.0, 8.0));
        myPyramid2.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].pale);
        block2.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].grey);
        this.gl.addWorldObject(myPyramid2);
        this.gl.addWorldObject(block2);
    }

    addPath() {
        const myPath1 = new __WEBPACK_IMPORTED_MODULE_0__App__["b" /* Plane */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(0.0, 0.0, 0.0), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(1000.0, 10.0, 1.1));
        const myPath2 = new __WEBPACK_IMPORTED_MODULE_0__App__["b" /* Plane */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(0.0, 0.0, 0.0), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(10.0, 1000.0, 1.1));
        myPath1.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].road);
        myPath2.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].road);
        this.gl.addWorldObject(myPath1);
        this.gl.addWorldObject(myPath2);
    }


    addTrees() {
        for (let i = 2; i < 10; i++) {
            const x = (i * 20);
            for (let j = 1; j < 10; j++) {
                const trunkColors = Utils.shuffle(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].brownsIndicies);
                const canopyColors = Utils.shuffle(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].greensIndicies);
                const trees = Utils.shuffle(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].sizeIndicies);
                const y = (j * 20);
                const myCylinder = new __WEBPACK_IMPORTED_MODULE_0__App__["g" /* Cylinder */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(x, y, 0.0), 0, __WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].treeSizes[trees[i]].trunk);
                const myCone = new __WEBPACK_IMPORTED_MODULE_0__App__["h" /* Cone */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(x, y, 8.5), 0, __WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].treeSizes[trees[i]].canopy);
                myCone.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].green2);
                myCylinder.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].brown0);
                this.gl.addWorldObject(myCylinder);
                this.gl.addWorldObject(myCone);
            }
        }
    }

    addObjModel(path, gl) {
        const sceneObj = new __WEBPACK_IMPORTED_MODULE_0__App__["i" /* SceneObject */](__WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(10.0, 30.0, 2.05), 0, __WEBPACK_IMPORTED_MODULE_0__App__["c" /* MV */].vec3(5.0, 5.0, 5.0), path, gl);
        sceneObj.setModelColour(__WEBPACK_IMPORTED_MODULE_0__App__["d" /* Scene */].red);
        this.gl.addWorldObject(sceneObj);
    }

    updateCallback(fps) {
        const fpsElement = document.getElementById('fps');
        fpsElement.innerHTML = fps.toFixed(2);
    }

    init() {

        this.addGround();
        this.addHuts();
        this.addPath();
        this.addTrees();

        // const myCylinder = new Cylinder(MV.vec3(2, 1, 0.0), 0, MV.vec3(2.0, 2.0, 2.0));
        // myCylinder.setModelColour(Scene.brown0);
        // this.gl.addWorldObject(myCylinder);
        //
        // const myCone = new Cone(MV.vec3(2, 1, 8.5), 0, MV.vec3(7.0, 7.0, 7.0));
        // myCone.setModelColour(Scene.green0);
        // this.gl.addWorldObject(myCone);

        this.addObjModel('Assets/Models/cube.obj', this.gl);

        // Keboard camera control
        const keyDownEventHandler = function eventHandler(key) {
            switch (key) {
                case 'W':
                    this.gl.slideForward();
                    break;
                case 'S':
                    this.gl.slideBackward();
                    break;
                case 'A':
                    this.gl.slideLeft();
                    break;
                case 'D':
                    this.gl.slideRight();
                    break;
                case 'Q':
                    this.gl.pivotLeft();
                    break;
                case 'E':
                    this.gl.pivotRight();
                    break;
                case 'Z':
                    this.gl.tiltUp();
                    break;
                case 'X':
                    this.gl.tiltDown();
                    break;
                case 'C':
                    this.gl.climb();
                    break;
                case 'V':
                    this.gl.descend();
                    break;
                default:
                    break;
            }
        };

        this.gl.onClick(this.addBlock.bind(this));
        this.gl.onKey(keyDownEventHandler.bind(this));
        this.gl.onUpdate(this.updateCallback);
        this.gl.render();
    }

    // for (let i = 2; i < 10; i += 1) {
    //   const x = (i * -20);
    //   for (let j = 1; j < 10; j += 1) {
    //     const trunkColors = Utils.shuffle(Scene.brownsIndicies);
    //     const canopyColors = Utils.shuffle(Scene.greensIndicies);
    //     const trees = Utils.shuffle(Scene.sizeIndicies);
    //     const y = (j * -20);
    //     const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
    //     const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
    //     myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
    //     myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
    //     this.gl.addWorldObject(myCylinder);
    //     this.gl.addWorldObject(myCone);
    //   }
    // }
    //
    // for (let i = 2; i < 10; i += 1) {
    //   const x = (i * 20);
    //   for (let j = 1; j < 10; j += 1) {
    //     const trunkColors = Utils.shuffle(Scene.brownsIndicies);
    //     const canopyColors = Utils.shuffle(Scene.greensIndicies);
    //     const trees = Utils.shuffle(Scene.sizeIndicies);
    //     const y = (j * -20);
    //     const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
    //     const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
    //     myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
    //     myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
    //     this.gl.addWorldObject(myCylinder);
    //     this.gl.addWorldObject(myCone);
    //   }
    // }
    //
    // for (let i = 2; i < 10; i += 1) {
    //   const x = (i * -20);
    //   for (let j = 1; j < 10; j += 1) {
    //     const trunkColors = Utils.shuffle(Scene.brownsIndicies);
    //     const canopyColors = Utils.shuffle(Scene.greensIndicies);
    //     const trees = Utils.shuffle(Scene.sizeIndicies);
    //     const y = (j * 20);
    //     const myCylinder = new Cylinder(MV.vec3(x, y, 0.0), 0, Scene.treeSizes[trees[i]].trunk);
    //     const myCone = new Cone(MV.vec3(x, y, 8.5), 0, Scene.treeSizes[trees[i]].canopy);
    //     myCone.setModelColour(Scene.greens[canopyColors[i - 2]]);
    //     myCylinder.setModelColour(Scene.browns[trunkColors[i - 2]]);
    //     this.gl.addWorldObject(myCylinder);
    //     this.gl.addWorldObject(myCone);
    //   }
    // }
}

window.onload = function() {
    const test01 = new Test01(document.getElementById('gl-canvas'));
    test01.init();
};



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initShaders; });
//
//  initShaders.js
//

class initShaders {
  static initShaders(gl, vertexShaderId, fragmentShaderId) {
    var vertShdr;
    var fragShdr;
    const preStart = '<pre>';
    const preEnd = '</pre>';

    let vertElem = document.getElementById(vertexShaderId);
    if (!vertElem) {
      throw new Error(`Unable to load vertex shader ${vertexShaderId}`);
    } else {
      vertShdr = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertShdr, vertElem.text);
      gl.compileShader(vertShdr);
      if (!gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS)) {
        const msg = `Vertex shader failed to compile.
        The error log is: ${gl.getShaderInfoLog(vertShdr)} ${preEnd}`;
        throw new Error(msg);
      }
    }

    const fragElem = document.getElementById(fragmentShaderId);
    if (!fragElem) {
      throw new Error(`Unable to load vertex shader + ${fragmentShaderId}`);
    } else {
      fragShdr = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragShdr, fragElem.text);
      gl.compileShader(fragShdr);
      if (!gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS)) {
        const msg = `Fragment shader failed to compile. The error log is:
             ${preStart} ${gl.getShaderInfoLog(fragShdr)} ${preEnd}`;
        throw new Error(msg);
      }
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertShdr);
    gl.attachShader(program, fragShdr);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const msg = `Shader program failed to link.  The error log is:
          ${preStart} ${gl.getProgramInfoLog(program)} ${preEnd}`;
      throw new Error(msg);
    }

    return program;
  }
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebGLUtils; });
/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

const WebGLUtils = function()
{

    /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    var makeFailHTML = function(msg)
    {
        return '' +
            '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
            '<td align="center">' +
            '<div style="display: table-cell; vertical-align: middle;">' +
            '<div style="">' + msg + '</div>' +
            '</div>' +
            '</td></tr></table>';
    };

    /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    var GET_A_WEBGL_BROWSER = '' +
        'This page requires a browser that supports WebGL.<br/>' +
        '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

    /**
     * Mesasge for need better hardware
     * @type {string}
     */
    var OTHER_PROBLEM = '' +
        "It doesn't appear your computer can support WebGL.<br/>" +
        '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @param {Element} canvas. The canvas element to create a
     *     context from.
     * @param {WebGLContextCreationAttirbutes} opt_attribs Any
     *     creation attributes you want to pass in.
     * @return {WebGLRenderingContext} The created context.
     */
    var setupWebGL = function(canvas, opt_attribs)
    {
        function showLink(str)
        {
            var container = canvas.parentNode;
            if (container)
            {
                container.innerHTML = makeFailHTML(str);
            }
        };

        if (!window.WebGLRenderingContext)
        {
            showLink(GET_A_WEBGL_BROWSER);
            return null;
        }

        var context = create3DContext(canvas, opt_attribs);
        if (!context)
        {
            showLink(OTHER_PROBLEM);
        }
        return context;
    };

    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    var create3DContext = function(canvas, opt_attribs)
    {
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var context = null;
        for (var ii = 0; ii < names.length; ++ii)
        {
            try
            {
                context = canvas.getContext(names[ii], opt_attribs);
            }
            catch (e)
            {}
            if (context)
            {
                break;
            }
        }
        return context;
    }

    return {
        create3DContext: create3DContext,
        setupWebGL: setupWebGL
    };
}();

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function()
{
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element)
        {
            window.setTimeout(callback, 1000 / 60);
        };
})();




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Block; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_MV__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WebGLRenderer__ = __webpack_require__(1);
/*
 Author:     Andrew Douglas
 Student No: 11362345

 */




class Block {
  constructor(location, angle, scales, gl) {
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
      this.offset = gl.addSubdata(this.vertices);
    }
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  update() {
    const rs = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].rotate(this.angle, [0, 0, 1]), __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].scalem(this.scales));
    this.trs = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].translate(this.location), rs);
  }

  setModelColour(color) {
    this.color = color;
  }

  initModel() {
        // The 8 raw vertices of a cube
    const rawverts = [
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(-0.5, -0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(-0.5, 0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.5, 0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.5, -0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(-0.5, -0.5, -0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(-0.5, 0.5, -0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.5, 0.5, -0.5),
      __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(0.5, -0.5, -0.5),
    ];
        // A local array in which to develop the 36 vertices
    const vertices = [];

        // A nested function generating the vertices for each face
    function quad(a, b, c, d) {
            // if abcd is an anticlockwise winding on a face
            // then abc and acd are anticlockwise windings on its triangles
      const indices = [a, b, c, a, c, d];

      for (let i = 0; i < indices.length; i += 1) {
        vertices.push(rawverts[indices[i]]);
      }
    }

        // A nested function generating the cube's faces
    function doCube() {
            // Use anticlockwise windings
      quad(1, 0, 3, 2);
      quad(2, 3, 7, 6);
      quad(3, 0, 4, 7);
      quad(6, 5, 1, 2);
      quad(4, 5, 6, 7);
      quad(5, 4, 0, 1);
    }

    doCube();
    this.NV = vertices.length;
    return vertices;
  }

  static getNumberOfVertices() {
    return this.NV;
  }
}

Block.NV = Block.getNumberOfVertices();





/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cone; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_MV__ = __webpack_require__(0);
/*
 Author:     Andrew Douglas
 Student No: 11362345

 */




class Cone {
  constructor(location, angle, scales) {
    this.gl = new __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__["a" /* default */]('gl-canvas');
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec4(0.5, 0.5, 0.5, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  update() {
    const rs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].rotate(this.angle, [0, 0, 1]), __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].scalem(this.scales));
    this.trs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].translate(this.location), rs);
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLE_FAN, this.offset, this.NV);
  }

  setModelColour(color) {
    this.color = color;
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

  initModel() {
    const rawverts = [];
    const vertices = [];

    function doCone() {
      const z = 0.0;
      const top = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.0, 0.0, 1.5);

      for (let i = 0; i <= 180; i++) {
        let theta = (Math.PI / 180) * (2 * i + 0.5);
        let v = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(Math.cos(theta), Math.sin(theta), z);
        rawverts.push(v);
      }

      for (let j = 0; j < rawverts.length;) {
        vertices.push(rawverts[j]);
        vertices.push(top);
        vertices.push(rawverts[j++]);
      }
    }

    doCone();
    this.NV = vertices.length;
    return vertices;
  }
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cylinder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_MV__ = __webpack_require__(0);
/*
    Author:     Andrew Douglas
    Student No: 11362345

*/




class Cylinder {
  constructor(location, angle, scales) {
    this.gl = new __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__["a" /* default */]('gl-canvas');
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec4(0.5, 0.5, 0.5, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  update() {
    const rs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].rotate(this.angle, [0, 0, 1]), __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].scalem(this.scales));
    this.trs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].translate(this.location), rs);
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLE_STRIP, this.offset, this.NV);
  }

  setModelColour(color) {
    console.log(color);
    this.color = color;
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

  initModel() {
    let baseVerts = [];
    let topVerts = [];

    let vertices = [];

    function doCylinder() {
      let bottom = 0.0;
      let top = 10.0;

      for (let i = 0; i <= 180; i += 1) {
        let theta = (Math.PI / 180) * ((2 * i) + 0.5);
        let b = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(Math.cos(theta), Math.sin(theta), bottom);
        let t = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(Math.cos(theta), Math.sin(theta), top);
        baseVerts.push(b);
        topVerts.push(t);
      }

      for (let j = 0; j <= 180; j++) {
        let theta = (Math.PI / 180) * (2 * j + 0.5);
        let v = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(Math.cos(theta), Math.sin(theta), top);
        topVerts.push(v);
      }

      for (let k = 0; k <= 180; k++) {
        vertices.push(baseVerts[k]);
        vertices.push(topVerts[k]);
        vertices.push(baseVerts[k++]);
        vertices.push(topVerts[k++]);
      }
    }

    doCylinder();
    this.NV = vertices.length;
    return vertices;
  }
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjParser; });
class ObjParser {
  constructor(fileName) {
    this.filename = fileName;
    console.log('Now loading file:', this.filename);

    const modelStringData = this.loadFileAJAX(this.filename);

    if (!modelStringData) {
      throw new Error(`Could not retrieve model data:${this.filename}`);
    }

    const lineSplit = modelStringData.split('\n');

    const tempVertexPositionList = [];

    this.vertexPositions = [];

    let bfirstVertex = false;
    this.minValues = [-1, -1, -1];
    this.maxValues = [-1, -1, -1];
    this.centre = [];

    for (let lineId = 0; lineId < lineSplit.length; lineId += 1) {
      if (lineSplit[lineId][0] === 'v' && lineSplit[lineId][1] === ' ') {
        const posString = lineSplit[lineId].split(' ');
        const newPos = [
            parseFloat(posString[1]),
            parseFloat(posString[2]),
            parseFloat(posString[3])];

        if (bfirstVertex) {
          this.minValues = newPos;
          this.max = newPos;
          bfirstVertex = false;
        } else {
          // X axis
          if (newPos[0] < this.minValues[0]) {
            this.minValues[0] = newPos[0];
          }
          if (newPos[0] > this.maxValues[0]) {
            this.maxValues[0] = newPos[0];
          }
          // Y axis
          if (newPos[1] < this.minValues[1]) {
            this.minValues[1] = newPos[1];
          }
          if (newPos[1] > this.maxValues[1]) {
            this.maxValues[1] = newPos[1];
          }
          // Z axis
          if (newPos[2] < this.minValues[2]) {
            this.minValues[2] = newPos[2];
          }
          if (newPos[2] > this.maxValues[2]) {
            this.maxValues[2] = newPos[2];
          }
        }

        tempVertexPositionList.push(newPos);
      }
    }

    for (let lineId = 0; lineId > lineSplit.length; lineId++) {
      console.log(lineSplit[lineId][1]);
      console.log(lineSplit[lineId][2]);
    }


    for (let lineId = 0; lineId < lineSplit.length; lineId += 1) {
      if (lineSplit[lineId][0] === 'f' && lineSplit[lineId][1] === ' ') {
        const faceString = lineSplit[lineId].split(' ');
        // count

        const vxString = faceString[1].split('/');
        const vyString = faceString[2].split('/');
        const vzString = faceString[3].split('/');

        const vx = parseInt(vxString[0]);
        const vy = parseInt(vyString[0]);
        const vz = parseInt(vzString[0]);

        this.vertexPositions.push(tempVertexPositionList[vx - 1]);
        this.vertexPositions.push(tempVertexPositionList[vy - 1]);
        this.vertexPositions.push(tempVertexPositionList[vz - 1]);
      }
    }
    this.centre = [(this.maxValues[0] + this.minValues[0]) * 0.5,
      (this.maxValues[1] + this.minValues[1]) * 0.5, (this.maxValues[2] + this.minValues[2]) * 0.5];
  }

  loadFileAJAX(name) {
    var xhr = new XMLHttpRequest(),
      okStatus = document.location.protocol === 'file:' ? 0 : 200;
    xhr.open('GET', name, false);
    xhr.send(null);
    return xhr.status === okStatus ? xhr.responseText : null;
  }
}




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plane; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_MV__ = __webpack_require__(0);
/*
    Author:     Andrew Douglas
    Student No: 11362345

*/




class Plane {
  constructor(location, angle, scales) {
    this.gl = new __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__["a" /* default */]('gl-canvas');
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.vertices = [];
    this.color = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = Plane.initModel();
      this.NV = this.vertices.length;
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  update() {
    let rs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].rotate(this.angle, [0, 0, 1]), __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].scalem(this.scales));
    this.trs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].translate(this.location), rs);
  }

  render(worldview, gl, program) {
    let colLoc = gl.getUniformLocation(program, 'colour');
    let mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  static initModel() {
    let rawverts = [
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(-0.5, -0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(-0.5, 0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.5, 0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.5, -0.5, 0.5),
    ];
    let vertices = [];
    let indices = [1, 0, 3, 1, 3, 2];

    function doPlane() {
      for (let i = 0; i < indices.length; i += 1) {
        vertices.push(rawverts[indices[i]]);
      }
    }

    doPlane();
    return vertices;
  }

  getName() {
    return this.name;
  }

  setModelColour(color) {
    this.color = color;
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




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pyramid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_MV__ = __webpack_require__(0);
/*
    Author:     Andrew Douglas
    Student No: 11362345

*/




class Pyramid {
  constructor(location, angle, scales) {
    this.gl = new __WEBPACK_IMPORTED_MODULE_0__WebGLRenderer__["a" /* default */]('gl-canvas');
    this.vertices = [];
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel();
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  update() {
    const rs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].rotate(this.angle, [0, 0, 1]), __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].scalem(this.scales));
    this.trs = __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].translate(this.location), rs);
  }

  doPyramid() {
    for (let i = 0; i < this.indices.length; i += 1) {
      this.vertices.push(this.rawverts[this.indices[i]]);
    }
  }


  initModel() {
        // The 5 raw vertices of a pyramid
    this.rawverts = [
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(-0.5, -0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(-0.5, 0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.5, 0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.5, -0.5, 0.5),
      __WEBPACK_IMPORTED_MODULE_1__common_MV__["a" /* default */].vec3(0.0, 0.0, 1.5),
    ];
    this.vertices = [];
    this.indices = [1, 0, 3, 1, 3, 2, 1, 0, 4, 0, 3, 4, 3, 2, 4, 2, 1, 4];

    this.doPyramid();
    this.NV = this.vertices.length;
    return this.vertices;
  }

  setModelColour(color) {
    this.color = color;
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





/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scene; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_MV__ = __webpack_require__(0);
/*
    Author:     Andrew Douglas
    Date:       19/10/2015
    Student No: 11362345

    Scene objects

*/



const Scene = {
  green0: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.0, 0.8, 0.2, 1.0),
  green1: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.0, 0.4, 0.0, 1.0),
  green2: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.08, 0.2, 0.0, 1.0),
  green3: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.08, 0.5, 0.0, 1.0),
  green4: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.08, 0.3, 0.0, 1.0),
  green5: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.07, 0.2, 0.0, 1.0),
  green6: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.05, 0.3, 0.0, 1.0),
  green7: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.02, 0.5, 0.0, 1.0),

    // Browns
  brown0: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.6, 0.2, 0.0, 1.0),
  brown1: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.2, 0.09, 0.0, 1.0),
  brown2: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.4, 0.2, 0.0, 1.0),
  brown3: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.6, 0.34, 0.0, 1.0),

  pale: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.9, 0.6, 0.3, 1.0),
  grey: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.5, 0.5, 0.4, 1.0),
  road: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.6, 0.6, 0.6, 1.0),
  red: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(1.0, 0.0, 0.0, 1.0),

  treeSizes: [
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.0, 1.0, 1.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 7.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(2.0, 2.0, 2.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(8.0, 8.0, 12.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.0, 1.0, 1.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 7.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(2.0, 2.0, 2.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(8.0, 8.0, 12.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.0, 1.0, 1.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 7.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(2.0, 2.0, 2.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(8.0, 8.0, 12.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.0, 1.0, 1.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 7.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(1.5, 1.5, 1.5),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(7.0, 7.0, 10.0),
    },
    {
      trunk: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(2.0, 2.0, 2.0),
      canopy: __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec3(8.0, 8.0, 12.0),
    }],

  sizeIndicies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

  greens: [
    this.green1,
    this.green2,
    this.green3,
    this.green4,
    this.green5,
    this.green6,
    this.green7,
    this.green1,
    this.green2,
    this.green3,
    this.green4,
    this.green5,
    this.green6,
    this.green7,
    this.green1,
    this.green0
  ],

  greensIndicies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

  brownsIndicies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],

  browns: [
    this.brown0,
    this.brown1,
    this.brown2,
    this.brown3,
    this.brown0,
    this.brown1,
    this.brown2,
    this.brown3,
    this.brown0,
    this.brown1,
    this.brown2,
    this.brown3,
    this.brown0,
    this.brown1,
    this.brown2,
    this.brown0],
  rownsIndicies: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
};





/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SceneObject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_MV__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjParser__ = __webpack_require__(9);



class SceneObject {
  constructor(location, angle, scales, path, gl) {
    this.vertices = [];
    this.NV = 0;
    this.gl = gl;
    this.location = location;
    this.angle = angle;
    this.scales = scales;
    this.color = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].vec4(0.8, 0.7, 0.3, 1.0);
    if (this.vertices.length === 0) {
      this.vertices = this.initModel(path);
      this.offset = this.gl.addSubdata(this.vertices);
    }
  }

  render(worldview, gl, program) {
    const colLoc = gl.getUniformLocation(program, 'colour');
    const mvLoc = gl.getUniformLocation(program, 'modelView');
    gl.uniform4fv(colLoc, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(this.color));
    gl.uniformMatrix4fv(mvLoc, false, __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].mult(worldview, this.trs)));
    gl.drawArrays(gl.TRIANGLES, this.offset, this.NV);
  }

  initModel(modelPath) {
    const cubeObjModel = new __WEBPACK_IMPORTED_MODULE_1__ObjParser__["a" /* default */](modelPath);

    this.vertices = cubeObjModel.vertexPositions;

    this.NV = cubeObjModel.vertexPositions.length;
    return cubeObjModel.vertexPositions;
  }

  update() {
    const rs = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].rotate(this.angle, [0, 0, 1]), __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].scalem(this.scales));
    this.trs = __WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].mult(__WEBPACK_IMPORTED_MODULE_0__common_MV__["a" /* default */].translate(this.location), rs);
  }

  setModelColour(color) {
    this.color = color;
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




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
class Utils {
  static shuffle(array) {
    this.array = array;
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.array[currentIndex];
      this.array[currentIndex] = this.array[randomIndex];
      this.array[randomIndex] = temporaryValue;
    }

    return this.array;
  }
}




/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);