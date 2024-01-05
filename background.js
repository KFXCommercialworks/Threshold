import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { blurShader } from '/shaders/blurShader';


//Color Management
THREE.ColorManagement.enabled = true;
const wColor = new THREE.Color("rgb(255, 0, 0)");

//Render Info here

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);


//Scene Setup

const scene = new THREE.Scene();
scene.colorSpace = THREE.SRGBColorSpace;




const bwTone = new THREE.TextureLoader().load('/toneMap/fourTone4.jpg');
bwTone.minFilter = THREE.LinearFilter;
bwTone.magFilter = THREE.LinearFilter;
bwTone.fog = true;




const normalMap = new THREE.TextureLoader().load('/models/bump.jpg');

const material = new THREE.MeshToonMaterial();
material.gradientMap = bwTone;
material.normalMap = normalMap;
material.normalScale = new THREE.Vector2(0.1, 0.1);



//Models// 

const objLoader = new OBJLoader()
objLoader.load(
    'models/Lilly2.obj',
    (object) => {
        
         object.traverse(function (child) {
            if ( child.isMesh ) child.material = material;
                
             
         })
        object.rotation.y = Math.PI / 10;
        object.rotation.z = - Math.PI / 10;
        scene.add(object)
    },
    
);



//Lights
    

const light1 = new THREE.SpotLight( wColor , 0.6, 0., 0.7, 0.3, 0.);
light1.position.y = 8;
light1.position.z = -6;


const light2 = new THREE.AmbientLight(wColor, 0.08);

const light3 = new THREE.SpotLight( wColor , 0.3, 0., 0.7, 0.3, 0.);
light3.position.y = 6;
light3.position.z = -1;




scene.add(light1, light2, light3);


//Camera

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 15, 0, 1 );

controls.update();

//Effects// 

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};


const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

const blur = new ShaderPass( blurShader );
composer.addPass( blur );




function animate() {

	requestAnimationFrame( animate );
	controls.update();
    composer.render();
    

}
animate();


