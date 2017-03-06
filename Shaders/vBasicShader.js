var vBasicShaderCode  =`
attribute vec3 aPosition; 
attribute vec3 aColour;
varying vec3 vColour;
uniform mat4 umWorldMatrix;
uniform mat4 umProjectionMatrix;
void 
main() 
{	
	vec4 transformedPos = umWorldMatrix * vec4(aPosition, 1.0);
	//float dist = sqrt(transformedPos.z * transformedPos.z + transformedPos.y * transformedPos.y + transformedPos.z * transformedPos.z);
	// light to dark
	//vColour = vec3(1.0 - (dist-2.1)/10.0, 0.0, 0.0);

	// dark to light
	//vColour = vec3((dist-2.1)/10.0, 0.0, 0.0);

	float distSquared  = (transformedPos.z*transformedPos.z + transformedPos.y*transformedPos.y + transformedPos.x*transformedPos.x);

	vColour=vec3(1.0-(distSquared-2.1*2.1)/60.0 ,0,0);

    gl_Position = umProjectionMatrix * umWorldMatrix * vec4(aPosition, 1.0);
}`;
