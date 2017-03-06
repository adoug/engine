var fBasicShaderCode =`
precision mediump float; 
varying vec3 vColour;
void 
main() 
{ 
    gl_FragColor = vec4( vColour, 1.0 ); 
}`;