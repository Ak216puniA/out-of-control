import * as THREE from '../../node_modules/three/build/three.module.js'
import * as CANNON from '../../node_modules/cannon-es/dist/cannon-es.js'
import OrbitControls from './OrbitControls.js'
import { GLTFLoader } from './GLTFLoader.js'
// import { AdditiveAnimationBlendMode } from '../../node_modules/three/build/three.module.js'

const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth
const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

// const cubeSide = gameWindowWidth/4
// console.log(cubeSide)

// const spikesUrl=new URL('../assets/spikes.glb', import.meta.url);

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
// const assetLoader = new GLTFLoader();
// let mixer;
// assetLoader.load(spikesUrl.href, function(glb){
//     const model = glb.scene;
//     scene.add(model);  
    // mixer = new THREE.AnimationMixer(model);
    // const clips = THREE.AnimationClip.findByName(clips, 'spikes');
    // const action = mixer.clipAction(clip);
    // action.play(); 
// }, undefined, function(error){
// console.error(error);
// });

const cube = new URL('../assets/cube_actions.glb', import.meta.url)
const spikes = new URL('../assets/spikes.glb', import.meta.url)
const wall = new URL('../assets/wall.glb', import.meta.url)
const bar = new URL('../assets/bar.glb', import.meta.url)

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(gameWindowWidth,gameWindowHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, gameWindowWidth/gameWindowHeight, 0.1, 1000)
const orbit = new OrbitControls(camera, renderer.domElement)
// const orbit = new OrbitControls()
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, 0, 0)
})

const timeStep = 1/60;

// const gridHelper = new THREE.GridHelper(100,100)
// scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(1000)
scene.add(axesHelper)

camera.position.set(0,4,8)
camera.lookAt(0,0)
orbit.update()

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial({
//     color: 0xEEEEEE
// })
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// scene.add(cube)
// cube.position.set(0,1,1)

const groundGeo = new THREE.PlaneGeometry(124816,124816)
const groundMat = new THREE.MeshBasicMaterial({
    color:0x273349,
    side: THREE.DoubleSide,
})
const groundMesh = new THREE.Mesh(groundGeo, groundMat)
scene.add(groundMesh)
groundMesh.rotateX(-Math.PI/2);
groundMesh.position.set(0, 100, -1248)

const groundBody = new CANNON.Body({
    shape: new CANNON.Plane(),
    mass: 1,
})
world.addBody(groundBody)
groundBody.quaternion.setFromEuler(-Math.PI/2,0,0)

// const lineMaterial = new THREE.LineBasicMaterial({
//     color: 0xFFFFFF
// });

//light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
directionalLight.position.set(0, 10, 0);
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper)

// const pointsArray1 = [];
// pointsArray1.push( new THREE.Vector3( - 2, 0, 12481632 ) );
// pointsArray1.push( new THREE.Vector3( -2, 0, -12481632 ) );
// const lineGeometry1 = new THREE.BufferGeometry().setFromPoints( pointsArray1 );
// const line1 = new THREE.Line( lineGeometry1, lineMaterial );
// scene.add( line1 );

// const pointsArray2 = [];
// pointsArray2.push( new THREE.Vector3( 2, 0, 12481632 ) );
// pointsArray2.push( new THREE.Vector3( 2, 0, -12481632 ) );
// const lineGeometry2 = new THREE.BufferGeometry().setFromPoints( pointsArray2 );
// const line2 = new THREE.Line( lineGeometry2, lineMaterial );
// scene.add( line2 );


// const pointsArray3 = [];
// pointsArray3.push( new THREE.Vector3( 0, 0, 12481632 ) );
// pointsArray3.push( new THREE.Vector3( 0, 0, -12481632 ) );
// const lineGeometry3 = new THREE.BufferGeometry().setFromPoints( pointsArray3 );
// const line3 = new THREE.Line( lineGeometry3, lineMaterial );
// scene.add( line3 );

// const pointsArray4 = [];
// pointsArray4.push( new THREE.Vector3( -1, 0, 12481632 ) );
// pointsArray4.push( new THREE.Vector3( -1, 0, -12481632 ) );
// const lineGeometry4 = new THREE.BufferGeometry().setFromPoints( pointsArray4 );
// const line4 = new THREE.Line( lineGeometry4, lineMaterial );
// scene.add( line4 );

const assetLoader = new GLTFLoader()
var cubeMixer;
var spikesMixer;
var wallMixer;
var barMixer;

assetLoader.load(cube.href, function(gltf){
    const cubeModel = gltf.scene
    scene.add(cubeModel)
    cubeModel.name = "cube"
    cubeMixer = new THREE.AnimationMixer(cubeModel)
    const clips = gltf.animations

    const goLeftClip = THREE.AnimationClip.findByName(clips, 'goLeft')
    const goLeftAction = cubeMixer.clipAction(goLeftClip)
    goLeftAction.timeScale = 3
    goLeftAction.loop = THREE.LoopOnce

    const goRightClip = THREE.AnimationClip.findByName(clips, 'goRight')
    const goRightAction = cubeMixer.clipAction(goRightClip)
    goRightAction.timeScale = 3
    goRightAction.loop = THREE.LoopOnce

    const duckClip = THREE.AnimationClip.findByName(clips, 'duck')
    const duckAction = cubeMixer.clipAction(duckClip)
    duckAction.timeScale = 2
    duckAction.loop = THREE.LoopOnce

    const idleClip = THREE.AnimationClip.findByName(clips, 'idle')
    const idleAction = cubeMixer.clipAction(idleClip)
    idleAction.loop = THREE.LoopOnce

    const jumpClip = THREE.AnimationClip.findByName(clips, 'jump')
    const jumpAction = cubeMixer.clipAction(jumpClip)
    jumpAction.timeScale = 3
    jumpAction.loop = THREE.LoopOnce

    document.addEventListener("keydown", onArrowClick, false);
    function onArrowClick(event){
        var key = event.key;
        if (key == 'a') {
            goLeftAction.reset()
            goLeftAction.play()
        } else if (key == 'w') {
            jumpAction.reset()
            jumpAction.play()
        } else if (key == 'd') {
            goRightAction.reset()
            goRightAction.play()
        } else if (key == 's') {
            duckAction.reset()
            duckAction.play()
        } else if (key == 13) {
            cube.position.set(0, 0, 0);
        }
        if(cubeModel.position){
            cubeModel.position.clamp(
                new THREE.Vector3(-2,0.5,0),
                new THREE.Vector3(2,0,0)
            )
        }
        renderer.render(scene, camera)
    }

    cubeMixer.addEventListener('finished', function(event){
        if(event.action._clip.name==='goLeft'){
            if(cubeModel.position) cubeModel.position.x -= 2
        }
        if(event.action._clip.name==='goRight'){
            if(cubeModel.position) cubeModel.position.x += 2
        }
        renderer.render(scene, camera)
    })
})

const obstacleTypes = []
assetLoader.load(spikes.href, function(gltf){
    const spikesModel = gltf.scene
    scene.add(spikesModel)
    spikesModel.name = "obstacle"
    spikesModel.position.set(0,0,-20)
    spikesMixer = new THREE.AnimationMixer(spikesModel)
    obstacleTypes.push(spikesModel)
})

assetLoader.load(wall.href, function(gltf){
    const wallModel = gltf.scene
    scene.add(wallModel)
    wallModel.name = "obstacle"
    wallModel.position.set(-2,0,-24)
    wallMixer = new THREE.AnimationMixer(wallModel)
    obstacleTypes.push(wallModel)
})

assetLoader.load(bar.href, function(gltf){
    const barModel = gltf.scene
    scene.add(barModel)
    barModel.name = "obstacle"
    barModel.position.set(2,0,-16)
    barMixer = new THREE.AnimationMixer(barModel)
    obstacleTypes.push(barModel)
})

const obstacles = []
function createObstacle(){
    const randomX = 2*Math.floor(Math.random() * 3) - 2;
    const randomY = 0
    const randomZ = -20
    const obstaclePosition = new THREE.Vector3(randomX, randomY, randomZ)
    const randomObstacle = Math.floor(Math.random() * 3);
    if(obstacleTypes[randomObstacle]){
        const newObstacle = obstacleTypes[randomObstacle].clone()
        scene.add(newObstacle)
        newObstacle.name = "obstacle"
        newObstacle.position.copy(obstaclePosition)
        obstacles.push(newObstacle)
    }
}

function addObstacles() {
    var randomDelay = Math.floor(Math.random() * 3) + 1;
    createObstacle()
    setTimeout(addObstacles, randomDelay*1000)
}

// let spikes;
// var spikemixer;
// assetLoader.load(spikesUrl.href, function(glb){
//     console.log(glb)
//     spikes=glb.scene;
// },function(xhr){
//     console.log((xhr.loaded/xhr.total*100)+"% loaded")
// },function(error){
//     console.log(error)
// });


// const spikesarray=[];
// function cloneSpikes(){
//     var a = Math.floor(Math.random()*3)*2-2;
//     const dimension=new THREE.Vector3(a,1,-5);
//     const spikeclone=spikes.clone();
//     spikeclone.position.copy(dimension);
//     scene.add(spikeclone);
//     console.log("helo");
//     spikesarray.push(spikeclone);
//     if(spikesarray.length>3){
//         spikesarray.pop();
//         console.log(spikesarray.length)
//     }
// }

// var time=setInterval(cloneSpikes,5000);

//create obstacles
// const spikes_objects=[]
// function create_spikes(){
//     const spikesClone=spikes.clone()
//     spikesClone.position.copy

// }


let step = 0
let speed = 0.05
const clock = new THREE.Clock()
function animate() {
    if(cubeMixer){
        cubeMixer.update(clock.getDelta())
    }

    // if(scene.getObjectByName('obstacle')){
    //     console.log(scene.getObjectByName('obstacle').length())
    //     scene.getObjectByName('obstacle').position.z += 0.1
    // }
    // let randomDelay = Math.floor(Math.random() * 3) + 1;
    //     setTimeout(function(){
    //         console.log("random onstacle")
    //     }, 3000)

    // createObstacle()

    // if(scene.getObjectByName('what-model')){
    //     scene.getObjectByName('what-model').position.z -=0.01
    // }
    
    // if(spikemixer){
    //     spikemixer.update(clock.getDelta())
    // }
    // cube.rotation.x -= 0.03

    // if(scene.getObjectByName('spikes')){
    //     scene.getObjectByName('spikes').position.z += 0.05
    // }
    world.step(timeStep)

    groundMesh.position.copy(groundBody.position)
    groundMesh.quaternion.copy(groundBody.quaternion)
    // spikesarray[0].position.y-=0.1;

    // step += speed
    // cube.position.y = Math.abs(Math.sin(step))

    renderer.render(scene, camera)
}

// document.addEventListener("keydown", onDocumentKeyDown, false);
// function onDocumentKeyDown(event) {
//     var keyCode = event.which;
//     if (keyCode == 37) {
//         cube.position.x -= 2;
//     } else if (keyCode == 38) {
//         cube.position.y += 2;
//     } else if (keyCode == 39) {
//         cube.position.x += 2;
//     } else if (keyCode == 40) {
//         cube.position.y -= 2;
//         cube.scale.y = cube.scale.y>0.8 ? cube.scale.y-0.4 : cube.scale.y+0.4;
//     } else if (keyCode == 13) {
//         cube.position.set(0, 0, 0);
//     }
//     cube.position.clamp(
//         new THREE.Vector3(-2,0.5,0),
//         new THREE.Vector3(2,0,0)
//     )
//     renderer.render(scene, camera)
// };

// var render=function(time){
//     requestAnimationFrame(render);
//     if(mixer)
//         mixer.update(clock,getDelta());
//     renderer.render(scene,camera);
// }

addObstacles()
renderer.setAnimationLoop(animate)
// addObstacles()
// renderer.render(scene, camera)