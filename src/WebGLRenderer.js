/*
    Author:     Andrew Douglas
    Date:       19/10/2015

*/
import MV from '../common/MV';
import WebGLUtils from '../common/webgl-utils';
import initShaders from '../common/initShaders';

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

      this.up = MV.vec3(0.0, 0.0, 1.0); // VUP along world vertical
      this.eye = MV.vec3(0.0, -300, 100.0);
      this.at = MV.vec3(0.0, 100.0, 25.0);

      this.worldObjects = [];

      this.renderer = WebGLUtils.setupWebGL(canvasElement);
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

      this.program = initShaders.initShaders(this.renderer, 'vertex-shader', 'fragment-shader');
      this.renderer.useProgram(this.program);

      this.bufferId = this.renderer.createBuffer();
      this.renderer.bindBuffer(this.renderer.ARRAY_BUFFER, this.bufferId);
      this.renderer.bufferData(this.renderer.ARRAY_BUFFER, MV._sizeof('vec3') * this.bufferSize, this.renderer.STATIC_DRAW);

      const vPosition = this.renderer.getAttribLocation(this.program, 'vPosition');
      this.renderer.vertexAttribPointer(vPosition, 3, this.renderer.FLOAT, false, 0, 0);
      this.renderer.enableVertexAttribArray(vPosition);
      this.renderer.vertexAttribPointer(vPosition, 3, this.renderer.FLOAT, false, 0, 0);
      this.renderer.enableVertexAttribArray(vPosition);

      this.projLoc = this.renderer.getUniformLocation(this.program, 'projection');

      this.projection = MV.perspective(this.fovy, this.aspect, this.near, this.far);
      this.renderer.uniformMatrix4fv(this.projLoc, false, MV.flatten(this.projection));
      instance = this;
    }
    return instance;
  }

  setRenderColor(colour) {
    const u = this.renderer.getUniformLocation(this.program, 'colour');
    this.renderer.uniform4fv(u, MV.flatten(colour));
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
    this.worldview = MV.lookAt(this.eye, this.at, this.up);

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
    this.at = MV.add(this.at, MV.vec3(0.0, 0.0, 1.5));
  }

  climb() {
    this.at = MV.add(this.at, MV.vec3(0.0, 0.0, 0.5));
    this.eye = MV.add(this.eye, MV.vec3(0.0, 0.0, 0.5));
  }

  descend() {
    this.at = MV.add(this.at, MV.vec3(0.0, 0.0, -0.5));
    this.eye = MV.add(this.eye, MV.vec3(0.0, 0.0, -0.5));
  }

  tiltDown() {
    this.at = MV.add(this.at, MV.vec3(0.0, 0.0, -1.5));
  }

  slideForward() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const fore = MV.normalize(forev); // current view forward direction
    this.at = MV.add(this.at, fore);
    this.eye = MV.add(this.eye, fore);
  }

  slideBackward() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const fore = MV.normalize(forev); // current view forward direction
    this.at = MV.subtract(this.at, fore);
    this.eye = MV.subtract(this.eye, fore);
  }

  slideLeft() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const fore = MV.normalize(forev); // current view forward direction
    const right = MV.normalize(MV.cross(fore, this.up)); // current horizontal right direction
    this.at = MV.subtract(this.at, right);
    this.eye = MV.subtract(this.eye, right);
  }

  slideRight() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const fore = MV.normalize(forev); // current view forward direction
    const right = MV.normalize(MV.cross(fore, this.up)); // current horizontal right direction
    this.at = MV.add(this.at, right);
    this.eye = MV.add(this.eye, right);
  }

  pivotLeft() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const foreLen = MV.length(forev); // current view forward vector length
    const fore = MV.normalize(forev); // current view forward direction
    const right = MV.normalize(MV.cross(fore, this.up)); // current horizontal right direction
    const ddir = (1.0 * Math.PI) / 180.0; // incremental view anrenderere change
    const dat = MV.subtract(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore),
        MV.scale(foreLen * Math.sin(ddir), right));
    this.at = MV.add(this.at, dat);
  }

  pivotRight() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const foreLen = MV.length(forev); // current view forward vector length
    const fore = MV.normalize(forev); // current view forward direction
    const right = MV.normalize(MV.cross(fore, this.up)); // current horizontal right direction
    const ddir = (1.0 * Math.PI) / 180.0; // incremental view angle change
    const dat = MV.add(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore), MV.scale(foreLen * Math.sin(ddir), right));
    this.at = MV.add(this.at, dat);
  }

  addSubdata(data) {
    this.renderer.bufferSubData(this.renderer.ARRAY_BUFFER, this.currentOffset, MV.flatten(data));
    const prevDataLength = this.dataLength;
    this.dataLength += data.length;
    this.currentOffset += (data.length * MV._sizeof('vec3'));
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

export { WebGLRenderer as default };
