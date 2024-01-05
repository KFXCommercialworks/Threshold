const blurShader = {

	name: 'blurShader',

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 },
        'v': {value: window.innerHeight },
        'h':{ value: window.innerWidth }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		//uniform float opacity;

		uniform sampler2D tDiffuse;
        uniform float v;
        uniform float h;

		varying vec2 vUv;

		void main() {
			
			vec4 Color = texture2D( tDiffuse, vUv );
            float Pi = 6.28318; // Pi*2
    
            // GAUSSIAN BLUR SETTINGS
            float Directions = 16.0; // BLUR DIRECTIONS (Default 16.0 - More is better but slower)
            float Quality = 4.0; // BLUR QUALITY (Default 4.0 - More is better but slower)
            float Size = 4.0; // BLUR SIZE (Radius)
            
           
            vec2 Radius = Size/ vec2(v,h);

       
            
            // Blur calculations
            for( float d=0.0; d<Pi; d+=Pi/Directions)
            {
                for(float i=1.001/Quality; i<=1.0; i+=1.0/Quality)
                {
                    Color += texture( tDiffuse, vUv+vec2(cos(d),sin(d))*Radius*i);		
                }
            }
            
            // Output to screen
            Color /= Quality * Directions + 1.0;

            Color = step( 0.15 , Color);
			float m = Color.r;
            
            if (m < 0.501)
               Color = vec4(0.188, 0.0, 0.122, 1.0);       
            else
               Color = vec4(0., 1.0, 0.725, 1.0);
            
        
            gl_FragColor =  Color;



		}`

};

export { blurShader };