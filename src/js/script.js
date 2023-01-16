import * as THREE from '../../node_modules/three/build/three.module.js'
import OrbitControls from './OrbitControls.js'
import { GLTFLoader } from './GLTFLoader.js'

const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth
const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(gameWindowWidth,gameWindowHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, gameWindowWidth/gameWindowHeight, 0.1, 1000)
const orbit = new OrbitControls(camera, renderer.domElement)

// const gridHelper = new THREE.GridHelper(100,100)
// scene.add(gridHelper)
// const axesHelper = new THREE.AxesHelper(1000)
// scene.add(axesHelper)

const cube = new URL('../assets/cube_actions.glb', import.meta.url)
const spikes = new URL('../assets/spikes.glb', import.meta.url)
const wall = new URL('../assets/wall.glb', import.meta.url)
const bar = new URL('../assets/bar.glb', import.meta.url)

const timeStep = 1/60;
const obstacleTypes = []
const obstacles = []
const obstacleSpeed = 0.1
const cubeActionSpeedMultiplier = 3
const clock = new THREE.Clock()

camera.position.set(0,4,8)
camera.lookAt(0,0)
orbit.update()

const trackGeometry = new THREE.PlaneGeometry(124816,124816)
const trackMaterial = new THREE.MeshBasicMaterial({
    color:0x273349,
    side: THREE.DoubleSide,
})
const track = new THREE.Mesh(trackGeometry, trackMaterial)
scene.add(track)
track.rotateX(-Math.PI/2);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
directionalLight.position.set(0, 10, 0);
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper)

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
    goLeftAction.timeScale = cubeActionSpeedMultiplier
    goLeftAction.loop = THREE.LoopOnce

    const goRightClip = THREE.AnimationClip.findByName(clips, 'goRight')
    const goRightAction = cubeMixer.clipAction(goRightClip)
    goRightAction.timeScale = cubeActionSpeedMultiplier
    goRightAction.loop = THREE.LoopOnce

    const duckClip = THREE.AnimationClip.findByName(clips, 'duck')
    const duckAction = cubeMixer.clipAction(duckClip)
    duckAction.timeScale = cubeActionSpeedMultiplier
    duckAction.loop = THREE.LoopOnce

    const idleClip = THREE.AnimationClip.findByName(clips, 'idle')
    const idleAction = cubeMixer.clipAction(idleClip)
    idleAction.loop = THREE.LoopOnce

    const jumpClip = THREE.AnimationClip.findByName(clips, 'jump')
    const jumpAction = cubeMixer.clipAction(jumpClip)
    jumpAction.timeScale = cubeActionSpeedMultiplier
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
        } else if (key == 'ArrowLeft'){
            goLeftAction.reset()
            goLeftAction.play()
        } else if (key == 'ArrowUp'){
            jumpAction.reset()
            jumpAction.play()
        } else if (key == 'ArrowRight'){
            goRightAction.reset()
            goRightAction.play()
        } else if (key == 'ArrowDown'){
            duckAction.reset()
            duckAction.play()
        }
        if(cubeModel.position){
            cubeModel.position.clamp(
                new THREE.Vector3(-2,0,0),
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

assetLoader.load(spikes.href, function(gltf){
    const spikesModel = gltf.scene
    scene.add(spikesModel)
    spikesModel.position.set(0,0,-20)
    spikesMixer = new THREE.AnimationMixer(spikesModel)
    obstacleTypes.push(spikesModel)
    obstacles.push(spikesModel)
})

assetLoader.load(wall.href, function(gltf){
    const wallModel = gltf.scene
    scene.add(wallModel)
    wallModel.position.set(-2,0,-24)
    wallMixer = new THREE.AnimationMixer(wallModel)
    obstacleTypes.push(wallModel)
    obstacles.push(wallModel)
})

assetLoader.load(bar.href, function(gltf){
    const barModel = gltf.scene
    scene.add(barModel)
    barModel.position.set(2,0,-16)
    barModel.rotateY(-Math.PI/2);
    barMixer = new THREE.AnimationMixer(barModel)
    obstacleTypes.push(barModel)
    obstacles.push(barModel)
})

function createObstacle(){
    const randomX = 2*Math.floor(Math.random() * 3) - 2;
    const randomY = 0
    const randomZ = -60
    const obstaclePosition = new THREE.Vector3(randomX, randomY, randomZ)
    const randomObstacle = Math.floor(Math.random() * 3);
    if(obstacleTypes[randomObstacle]){
        const newObstacle = obstacleTypes[randomObstacle].clone()
        scene.add(newObstacle)
        newObstacle.position.copy(obstaclePosition)
        obstacles.push(newObstacle)
    }
}

function addObstacles() {
    var randomDelay = Math.floor(Math.random() * 3) + 1;
    createObstacle()
    setTimeout(addObstacles, randomDelay*1000)
}

function animate() {
    if(cubeMixer) cubeMixer.update(clock.getDelta())

    if(obstacles.length>0){
        if(obstacles[0].position.z>5) {
            scene.remove(obstacles[0])
            obstacles.shift()
        }
    }

    for(let i=0; i<obstacles.length; i++){
        obstacles[i].position.z += obstacleSpeed
    }

    renderer.render(scene, camera)
}

addObstacles()
renderer.setAnimationLoop(animate)