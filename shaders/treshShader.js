const treshShader = {

	name: 'treshShader',

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		
		varying vec2 vUv;

		void main() {
			
			vec4 texel = texture2D( tDiffuse, vUv );
			
			
            vec4 passa = step( 0.19 , (opacity * texel));
			float m = passa.r;
            
            if (m < 0.1)
               passa = vec4(0.188, 0.0, 0.122, 1.0);       
            else
               passa = vec4(0., 1.0, 0.725, 1.0);
            
            
            gl_FragColor = passa;
            

		}`

};

export { treshShader };