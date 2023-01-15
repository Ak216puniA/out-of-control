// import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import * as THREE from '../../node_modules/three/build/three.module.js'
import * as CANNON from '../../node_modules/cannon-es/dist/cannon-es.js'
import OrbitControls from './OrbitControls.js'
import {GLTFLoader} from './GLTFLoader.js'
// import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'  
// import { OrbitControls } from 'https://unpkg.com/three@0.138.3/examples/jsm/controls/OrbitControls.js';
// import { OrbitControls } from './OrbitControls.js'

const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth

const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

// const cubeSide = gameWindowWidth/4
// console.log(cubeSide)

const spikesUrl=new URL('../assets/spikes.glb', import.meta.url);

//GLTF
// const loader=new GLTFLoader()
// loader.load('./assets/spikes.glb',function(glb){
//     console.log(glb)
//     const root=glb.scene;
//     scene.add(root);
// },function(xhr){
//     console.log((xhr.loaded/xhr.total*100)+"% loaded")
// },function(error){
//     console.log('error')
// })
const assetLoader = new GLTFLoader();
// let mixer;
assetLoader.load(spikesUrl.href, function(glb){
    const model = glb.scene;
    scene.add(model);  
    // mixer = new THREE.AnimationMixer(model);
    // const clips = THREE.AnimationClip.findByName(clips, 'spikes');
    // const action = mixer.clipAction(clip);
    // action.play(); 
}, undefined, function(error){
console.error(error);
});


const renderer = new THREE.WebGL1Renderer()
renderer.setSize(gameWindowWidth,gameWindowHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, gameWindowWidth/gameWindowHeight, 0.1, 1000)
const orbit = new OrbitControls(camera, renderer.domElement)
// const orbit = new OrbitControls()
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, 0, -1)
})

const timeStep = 1/60;

// const gridHelper = new THREE.GridHelper(100,100)
// scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)

camera.position.set(0,2,5)
camera.lookAt(0,0)
orbit.update()

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial({
//     color: 0xEEEEEE
// })
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// scene.add(cube)
// cube.position.set(0,1,1)

const groundGeo = new THREE.PlaneGeometry(100,100, 100, 100)
const groundMat = new THREE.MeshBasicMaterial({
    color:0x273349,
    side: THREE.DoubleSide,
})
const groundMesh = new THREE.Mesh(groundGeo, groundMat)
scene.add(groundMesh)
groundMesh.rotateX(-Math.PI/2);

const groundBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    mass: 1,
})
world.addBody(groundBody)
groundBody.quaternion.setFromEuler(-Math.PI/2,0,0)

const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xFFFFFF
});

//light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
directionalLight.position.set(0, 10, 0);
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper)

const pointsArray1 = [];
pointsArray1.push( new THREE.Vector3( - 2, 0, 10 ) );
pointsArray1.push( new THREE.Vector3( -2, 0, -10 ) );
const lineGeometry1 = new THREE.BufferGeometry().setFromPoints( pointsArray1 );
const line1 = new THREE.Line( lineGeometry1, lineMaterial );
scene.add( line1 );

const pointsArray2 = [];
pointsArray2.push( new THREE.Vector3( 2, 0, 10 ) );
pointsArray2.push( new THREE.Vector3( 2, 0, -10 ) );
const lineGeometry2 = new THREE.BufferGeometry().setFromPoints( pointsArray2 );
const line2 = new THREE.Line( lineGeometry2, lineMaterial );
scene.add( line2 );


const pointsArray3 = [];
pointsArray3.push( new THREE.Vector3( 0, 0, 10 ) );
pointsArray3.push( new THREE.Vector3( 0, 0, -10 ) );
const lineGeometry3 = new THREE.BufferGeometry().setFromPoints( pointsArray3 );
const line3 = new THREE.Line( lineGeometry3, lineMaterial );
scene.add( line3 );

const pointsArray4 = [];
pointsArray4.push( new THREE.Vector3( -1, 0, 10 ) );
pointsArray4.push( new THREE.Vector3( -1, 0, -10 ) );
const lineGeometry4 = new THREE.BufferGeometry().setFromPoints( pointsArray4 );
const line4 = new THREE.Line( lineGeometry4, lineMaterial );
scene.add( line4 );




let step = 0
let speed = 0.05

// function jump() {

// }

function animate() {
    // cube.rotation.x -= 0.03
    world.step(timeStep)

    groundMesh.position.copy(groundBody.position)
    groundMesh.quaternion.copy(groundBody.quaternion)

    // step += speed
    // cube.position.y = Math.abs(Math.sin(step))

    renderer.render(scene, camera)
}

const clock=new THREE.Clock();
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 37) {
        cube.position.x -= 2;
    } else if (keyCode == 38) {
        cube.position.y += 2;
    } else if (keyCode == 39) {
        cube.position.x += 2;
    } else if (keyCode == 40) {
        cube.position.y -= 2;
        cube.scale.y = cube.scale.y>0.8 ? cube.scale.y-0.4 : cube.scale.y+0.4;
    } else if (keyCode == 13) {
        cube.position.set(0, 0, 0);
    }
    cube.position.clamp(
        new THREE.Vector3(-2,0.5,0),
        new THREE.Vector3(2,0,0)
    )
    render();
};

var render=function(time){
    requestAnimationFrame(render);
    if(mixer)
        mixer.update(clock,getDelta());
    renderer.render(scene,camera);
}

// renderer.setAnimationLoop(render)
// renderer.render(scene, camera)