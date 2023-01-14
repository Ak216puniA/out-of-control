import { LoopOnce } from '../../node_modules/three/build/three.module.js'
import * as THREE from '../../node_modules/three/build/three.module.js'
// import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { OrbitControls } from './OrbitControls.js'
// import { GUI } from '../modules/dat.gui.module.js'


const renderer = new THREE.WebGL1Renderer()
const screenWidth = window.innerWidth/2
const screenHeight = window.innerHeight

console.log(screenWidth)
console.log(screenHeight)

renderer.setSize(screenWidth,screenHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, screenWidth/screenHeight, 0.1, 1000)
const controls =new OrbitControls(camera,renderer.domElement)
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

camera.position.set(0,3,5)
camera.lookAt(0,0)

//resize
function resize(){
    renderer.height=window.innerHeight
    renderer.width=window.innerWidth/2
    renderer.setSize(renderer.width,renderer.height)
    camera.aspect=renderer.width/renderer.heightcamera.updateProjectionMatrix
}

//light
const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)
const directionalLight=new THREE.DirectionalLight(0xffffff,0.5)
scene.add(directionalLight)
directionalLight.position.set(0,10,0)
const dLightHelper=new THREE.DirectionalLightHelper(directionalLight)
scene.add(dLightHelper)

//orbitcontrols
// orbit.update()

//cube
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x91FFF2
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)
cube.position.set(0,0.5,0)

// //plane
// const PlaneGeometry=new THREE.PlaneGeometry(30,30)
// const PlaneMaterial=new THREE.MeshStandardMaterial({
//     color:0x000000,
//     side:THREE.DoubleSide
// })
// const Plane=new THREE.Mesh(PlaneGeometry,PlaneMaterial)
// scene.add(Plane)
// Plane.rotation.z=-0.5*Math.PI


//mesh
// var mesh = null;
// var dummy = new THREE.Object3D();
// var sectionWidth = 200;

// function addInstancedMesh() {
//   // An InstancedMesh of 4 cubes
//   mesh = new THREE.InstancedMesh(new THREE.BoxBufferGeometry(50,50,50), new THREE.MeshNormalMaterial(), 4);
//   scene.add(mesh);
//   setInstancedMeshPositions(mesh);
// }

// function setInstancedMeshPositions(mesh) {
//   for ( var i = 0; i < mesh.count; i ++ ) {
//     // we add 200 units of distance (the width of the section) between each.
//     var xStaticPosition = -sectionWidth * (i - 1)
//     dummy.position.set(xStaticPosition, 0, 0);
//     dummy.updateMatrix();
//     mesh.setMatrixAt( i, dummy.matrix );
//   }
//   mesh.instanceMatrix.needsUpdate = true;
// }


//lane
const lane=new THREE.LineBasicMaterial({
    color:0x000000
})

cube.position.clamp(
    new THREE.Vector3(-2, 0.5, 0),
    new THREE.Vector3(2,0,0));

//grid
const gridHelper=new THREE.GridHelper(30,100)
scene.add(gridHelper)

// function rotateCube() {
//     //cube.rotation.x -= SPEED * 2;
//     var STEP = 10;
// var newCubeMatrix = cube.matrix;        
// newCubeMatrix.identity();
// //newCubeMatrix.multiplySelf(THREE.Matrix4.rotationYMatrix(cube.rotation.y));

//     window.addEventListener("keydown", function (e) {
//       if (e.key === "ArrowLeft") {
//         var forth = true;
//         cube.translateX(-0.01);
        
//         //   new TWEEN.Tween(cube.position)
//         //     .to(cube.position.clone().setX(forth ? 50 : 0), 1000)
  
//         //     .onComplete(function () {
//         //       forth = !forth;
//         //     })
//         //     .start();
//       } else if (e.key === "ArrowRight") {
//         cube.translateX(0.01);
        
//       } else if (e.key === "ArrowUp") {
//         cube.translateY(0.002);
//       }
//     });
//     requestAnimationFrame(rotateCube);
    
//     renderer.render(scene, camera);
//   }
  
//   rotateCube();
var xSpeed = 2;
var ySpeed = 2;

document.addEventListener("keydown", function onDocumentKeyDown(e) {
    var key = e.key;
    if (key === 'w') {
        cube.position.y += ySpeed;
    } else if (key === 's') {
        cube.position.y -= ySpeed;
    } else if (key === 'a') {
        cube.position.x -= xSpeed;
    } else if (key === 'd') {
        cube.position.x += xSpeed;
    } else if (key == 32) {
        cube.position.set(0, 0, 0);
    }
    render();
});

var render = function() {
  requestAnimationFrame(render);
//   cube.rotation.x += 0.03;
//   cube.rotation.y += 0.02;
//   cube.rotation.z += 0.01;
  renderer.render(scene, camera);
};

render();