/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/

// const MV = require('../common/MV');
import { MV } from '../common/MV';

class WebGLRenderer {
  constructor(canvasElement) {

  }
}

const _WebGLRenderer = (function () {
    // private
  let renderer_instance;
  let renderer;
  let canvas;
  let program;
  let data;
  const near = 1.0;
  const far = 1000;
  const fovy = 27.0;
  let aspect;
  let worldview;
  let modelview;
  let projection;
  let projLoc;
  let updateCallback;
  const up = MV.vec3(0.0, 0.0, 1.0); // VUP along world vertical

  const worldObjects = [];

  const currentAngle = [0.0, 0.0];

  let bufferId;
  let renderMode;


    // Constructor like method
  function init(canvasElement) {
    const bufferSize = 10000;
    let currentOffset = 0;
    let dataLength = 0;
    let then;
    let fps = 0.0;
    then = Date.now() / 1000; // get time in seconds
    canvas = canvasElement;
    renderer = WebGLUtils.setupWebGL(canvasElement);

    const renderModeTypes = {
      TRIANGLES: renderer.TRIANGLES,
      TRIANGLE_STRIP: renderer.TRIANGLE_STRIP,
      TRIANGLE_FAN: renderer.TRIANGLE_FAN,
      LINES: renderer.LINES,
      LINE_LOOP: renderer.LINE_LOOP,
      LINE_STRIP: renderer.LINE_STRIP,
      POINTS: renderer.POINTS,
    };

    renderMode = renderModeTypes.TRIANGLE_STRIP;

    if (!renderer) {
      alert("WebGL isn't available");
    }

    renderer.viewport(0, 0, canvas.width, canvas.height);
    aspect = canvas.width / canvas.height;

    renderer.enable(renderer.DEPTH_TEST);

    program = initShaders(renderer, 'vertex-shader', 'fragment-shader');
    renderer.useProgram(program);

    bufferId = renderer.createBuffer();
    renderer.bindBuffer(renderer.ARRAY_BUFFER, bufferId);
    renderer.bufferData(renderer.ARRAY_BUFFER, MV._sizeof('vec3') * bufferSize, renderer.STATIC_DRAW);

    const vPosition = renderer.getAttribLocation(program, 'vPosition');
    renderer.vertexAttribPointer(vPosition, 3, renderer.FLOAT, false, 0, 0);
    renderer.enableVertexAttribArray(vPosition);
    renderer.vertexAttribPointer(vPosition, 3, renderer.FLOAT, false, 0, 0);
    renderer.enableVertexAttribArray(vPosition);

    projLoc = renderer.getUniformLocation(program, 'projection');

    projection = MV.perspective(fovy, aspect, near, far);
    renderer.uniformMatrix4fv(projLoc, false, MV.flatten(projection));

    const setRenderColor = function (colour) {
      const u = renderer.getUniformLocation(program, 'colour');
      renderer.uniform4fv(u, MV.flatten(colour));
    };

    const setRenderMode = function (renderMode) {
      renderer.renderMode = renderMode;
    };

    const onUpdate = function (callback) {
      if (callback && typeof callback !== 'undefined') {
        updateCallback = callback;
      }
    };

    const update = function () {
      updateCallback(fps);
      const now = Date.now() / 1000; // get time in seconds

            // compute time since last frame
      const elapsedTime = now - then;
      then = now;

            // compute fps
      fps = 1 / elapsedTime;
      render();
    };

    var render = function () {
      renderer.clear(renderer.COLOR_BUFFER_BIT | renderer.DEPTH_BUFFER_BIT);

      worldview = MV.lookAt(this.eye, this.at, up);

      for (let i = 0; i < worldObjects.length; i++) {
        worldObjects[i].update();
        worldObjects[i].render(worldview, renderer, program);
      }
      requestAnimFrame(update);
    };

    const tiltUp = function () {
      this.at = MV.add(this.at, MV.vec3(0.0, 0.0, 1.5));
    };

    const climb = function () {
      const forev = MV.subtract(this.at, this.eye); // current view forward vector
      const foreLen = MV.length(forev); // current view forward vector length
      const fore = MV.normalize(forev); // current view forward direction
      this.at = MV.add(this.at, MV.vec3(0.0, 0.0, 0.5));
      this.eye = MV.add(this.eye, MV.vec3(0.0, 0.0, 0.5));
    };

    const descend = function () {
            // var forev = MV.subtract(this.at, this.eye); // current view forward vector
            // var foreLen = MV.length(forev); // current view forward vector length
            // var fore = MV.normalize(forev); // current view forward direction
      this.at = MV.add(this.at, MV.vec3(0.0, 0.0, -0.5));
      this.eye = MV.add(this.eye, MV.vec3(0.0, 0.0, -0.5));
    };

    const tiltDown = function () {
      at = add(at, MV.vec3(0.0, 0.0, -1.5));
    };

    const slideForward = function () {
      const forev = MV.subtract(at, eye); // current view forward vector
      const foreLen = length(forev); // current view forward vector length
      const fore = MV.normalize(forev); // current view forward direction
      this.at = add(at, fore);
      this.eye = add(this.eye, fore);
    };

    const slideBackward = function () {
      const forev = MV.subtract(this.at, this.eye); // current view forward vector
            // var foreLen = MV.length(forev); // current view forward vector length
      const fore = MV.normalize(forev); // current view forward direction
      this.at = MV.subtract(this.at, fore);
      this.eye = MV.subtract(this.eye, fore);
    };

    const slideLeft = function () {
      const forev = MV.subtract(this.at, this.eye); // current view forward vector
      const fore = MV.normalize(forev); // current view forward direction
      const right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
      this.at = MV.subtract(this.at, right);
      this.eye = MV.subtract(this.eye, right);
    };

    const slideRight = function () {
      const forev = MV.subtract(at, eye); // current view forward vector
      const fore = MV.normalize(forev); // current view forward direction
      const right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
      this.at = add(at, right);
      this.eye = add(eye, right);
    };

    const pivotLeft = function () {
      let dat;
      const forev = MV.subtract(this.at, this.eye); // current view forward vector
      const foreLen = length(forev); // current view forward vector length
      const fore = MV.normalize(forev); // current view forward direction
      const right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
      const ddir = 1.0 * Math.PI / 180.0; // incremental view anrenderere change
      dat = MV.subtract(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore), MV.scale(foreLen * Math.sin(ddir), right));
      this.at = add(at, dat);
    };

    const pivotRight = function () {
      let dat;
      const forev = MV.subtract(this.at, this.eye); // current view forward vector
      const foreLen = MV.length(forev); // current view forward vector length
      const fore = MV.normalize(forev); // current view forward direction
      const right = MV.normalize(MV.cross(fore, up)); // current horizontal right direction
      const ddir = 1.0 * Math.PI / 180.0; // incremental view angle change
      dat = MV.add(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore), MV.scale(foreLen * Math.sin(ddir), right));
      this.at = MV.add(this.at, dat);
    };

    const addSubdata = function (data) {
      renderer.bufferSubData(renderer.ARRAY_BUFFER, currentOffset, MV.flatten(data));
      const prevDataLength = dataLength;
      dataLength += data.length;
      currentOffset += (data.length * MV._sizeof('vec3'));
      return prevDataLength;
    };

    const setViewPort = function (width, height) {
      renderer.viewport(0, 0, width, height);
    };

    const setColor = function (r, g, b, a) {
      renderer.clearColor(r, g, b, a);
    };

    const onClick = function (callback) {
      if (callback && typeof callback !== 'undefined') {
        canvas.addEventListener('mousedown', (event) => {
          callback(event);
        });
      }
    };

    const onKey = function (callback) {
      if (callback && typeof callback !== 'undefined') {
        document.addEventListener('keydown', (event) => {
          const key = String.fromCharCode(event.keyCode);
          callback(key);
        });
      }
    };


    const getCurrentRenderMode = function () {
      switch (renderMode) {
        case 4:
          return 'TRIANGLES';
          break;
        case 5:
          return 'TRIANGLE_STRIP';
          break;
        default:
          return 'UNKNOWN';
          break;
      }
    };

    const addWorldObject = function (object) {
      worldObjects.push(object);
    };

    const getWorldObjects = function () {
      return worldObjects;
    };

    const setCamera = function (location, direction) {
      this.eye = location;
      this.at = direction;
    };

    const getFps = function () {
      return fps;
    };

        // Interface/API: public methods, available after calling getInstance
    return {
      render,
      setViewPort,
      setColor,
      renderModeTypes,
      onClick,
      onKey,
      setRenderMode,
      getCurrentRenderMode,
      addSubdata,
      addWorldObject,
      getWorldObjects,
      slideForward,
      slideBackward,
      slideLeft,
      slideRight,
      pivotLeft,
      pivotRight,
      tiltUp,
      tiltDown,
      climb,
      descend,
      setCamera,
      getFps,
      onUpdate,
    };
  } // end init

  return {
    getInstance(canvasElement) {
      if (!renderer_instance) {
        renderer_instance = init(canvasElement);
      }
      return renderer_instance;
    },
  };
}());


module.exports = WebGLRenderer;
