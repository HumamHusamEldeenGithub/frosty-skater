THREE.FresnelShader = {

	uniforms: {},
	vertexShader: [
	
		"varying vec3 vPositionW;",
		"varying vec3 vNormalW;",

		"void main() {",

		"	vPositionW = normalize(vec3(modelViewMatrix * vec4(position, 1.0)).xyz);",
		"   vNormalW = normalize(normalMatrix * normal);",

		"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [
	
		"varying vec3 vPositionW;",
		"varying vec3 vNormalW;",

		"void main() {",
		
		"	vec3 color = vec3(1., .2, .2);",
		"	vec3 white = vec3(1., 1., 1.);",
		"	float fresnelTerm = ( 1.0 - -min(dot(vPositionW, normalize(vNormalW) ), 0.0) ); ",
		"	gl_FragColor = vec4(mix(white, color, fresnelTerm), .4);",

		"}"

	].join( "\n" )

};
export const shieldComp = {
    schema: {

    },
    multiple: true,
    init: function () {
        this.model = this.el;
        var material = new THREE.ShaderMaterial( {
            transparent: true,
            vertexShader: THREE.FresnelShader.vertexShader,
            fragmentShader: THREE.FresnelShader.fragmentShader
        });
        
        this.model.setAttribute("gltf-model", "#sphereShield");
        this.el.addEventListener("model-loaded", () => {
            var mesh = this.model.getObject3D("mesh");

            mesh.traverse((child) => {
                child.material = material;
            });

        });
        this.el.setAttribute("visible",false);
    },
    chanceGenerator: function () {
      var chance = parseInt(Math.random() * 10);
      return chance;
    },
  };
  