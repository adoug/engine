import MV from '../common/MV';

class Camera {
  constructor(up, eye, at) {
    this.up = up;
    this.eye = eye;
    this.at = at;
  }

  setCamera(direction, location) {
    this.eye = direction;
    this.at = location;
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
    const ddir = (Math.PI) / 180.0; // incremental view anrenderere change
    const dat = MV.subtract(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore),
      MV.scale(foreLen * Math.sin(ddir), right));
    this.at = MV.add(this.at, dat);
  }

  pivotRight() {
    const forev = MV.subtract(this.at, this.eye); // current view forward vector
    const foreLen = MV.length(forev); // current view forward vector length
    const fore = MV.normalize(forev); // current view forward direction
    const right = MV.normalize(MV.cross(fore, this.up)); // current horizontal right direction
    const ddir = (Math.PI) / 180.0; // incremental view angle change
    const dat = MV.add(MV.scale(foreLen * (Math.cos(ddir) - 1.0), fore), MV.scale(foreLen * Math.sin(ddir), right));
    this.at = MV.add(this.at, dat);
  }
}

export { Camera as default };
