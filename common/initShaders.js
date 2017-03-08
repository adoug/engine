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

export { initShaders as default };
