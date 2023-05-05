import * as THREE from '../../node_modules/three/build/three.module.js'
import OrbitControls from './OrbitControls.js'
import { GLTFLoader } from './GLTFLoader.js'

const screenHeight =  window.innerHeight
const screenWidth = window.innerWidth
const gameWindowWidth = screenHeight/screenWidth<1.5 ? screenHeight/1.5 : screenWidth
const gameWindowHeight = screenHeight/screenWidth<1.5 ? screenHeight : screenWidth*1.5

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(gameWindowWidth,gameWindowHeight)
renderer.domElement.id = 'gameCanvas'
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, gameWindowWidth/gameWindowHeight, 0.1, 1000)
const orbit = new OrbitControls(camera, renderer.domElement)
const textureLoader = new THREE.TextureLoader()

const cube = new URL('../assets/cube_actions.glb', import.meta.url)
const spikes = new URL('../assets/spikes.glb', import.meta.url)
const wall = new URL('../assets/wall.glb', import.meta.url)
const bar = new URL('../assets/bar.glb', import.meta.url)

const obstacleTypes = []
const obstacles = []
const obstacleBBs = []
const lanePositions = [-1.75,0,1.75]
const cubeActionSpeedMultiplier = 3
const increaseScoreTimeDelay = 200
const clock = new THREE.Clock()
var obstacleSpeed = 0.1
var obstacleAppearanceTimeDelay = 1.5
var score = 0
var controlKeys = JSON.parse(localStorage.getItem('controlKeys'))

scene.background = textureLoader.load('/src/assets/background-image.svg')
camera.position.set(0,3,6)
camera.lookAt(0,0)
orbit.update()

const trackGeometry = new THREE.PlaneGeometry(8,124)
const trackMaterial = new THREE.MeshBasicMaterial({
    color:0x080E18,
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

const assetLoader = new GLTFLoader()

var cubeMixer;
var cubeBoundingBox;
var cubeModel;

assetLoader.load(cube.href, function(gltf){
    cubeModel = gltf.scene
    scene.add(cubeModel)
    cubeBoundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    cubeBoundingBox.setFromObject(cubeModel.children[0])

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
        if (key == controlKeys[0][0]) {
            if(cubeModel.position.x>lanePositions[0]){
                goLeftAction.reset()
                goLeftAction.play()
            }
        } else if (key == controlKeys[1][0]) {
            jumpAction.reset()
            jumpAction.play()
        } else if (key == controlKeys[2][0]) {
            if(cubeModel.position.x<lanePositions[2]){
                goRightAction.reset()
                goRightAction.play()
            } 
        } else if (key == controlKeys[3][0]) {
            duckAction.reset()
            duckAction.play()
        } else if (key == controlKeys[0][1]){
            if(cubeModel.position.x>lanePositions[0]){
                goLeftAction.reset()
                goLeftAction.play()
            }
        } else if (key == controlKeys[1][1]){
            jumpAction.reset()
            jumpAction.play()
        } else if (key == controlKeys[2][1]){
            if(cubeModel.position.x<lanePositions[2]){
                goRightAction.reset()
                goRightAction.play()
            } 
        } else if (key == controlKeys[3][1]){
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
            if(cubeModel.position) cubeModel.position.x -= 1.75
        }
        if(event.action._clip.name==='goRight'){
            if(cubeModel.position) cubeModel.position.x += 1.75
        }
        renderer.render(scene, camera)
    })
})

assetLoader.load(spikes.href, function(gltf){
    const spikesModel = gltf.scene
    scene.add(spikesModel)
    spikesModel.name = 'spikes'
    spikesModel.position.set(lanePositions[0],0,-60)
    obstacleTypes.push(spikesModel)
    obstacles.push(spikesModel)
    var obstacleBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    obstacleBB.setFromObject(spikesModel.children[0])
    obstacleBBs.push(obstacleBB)
})

assetLoader.load(wall.href, function(gltf){
    const wallModel = gltf.scene
    scene.add(wallModel)
    wallModel.name = 'wall'
    wallModel.position.set(lanePositions[1],0,-24)
    obstacleTypes.push(wallModel)
    obstacles.push(wallModel)
    var obstacleBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    obstacleBB.setFromObject(wallModel.children[0])
    obstacleBBs.push(obstacleBB)
})

assetLoader.load(bar.href, function(gltf){
    const barModel = gltf.scene
    scene.add(barModel)
    barModel.name = 'bar'
    barModel.position.set(lanePositions[2],0,-48)
    obstacleTypes.push(barModel)
    obstacles.push(barModel)
    var obstacleBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
    obstacleBB.setFromObject(barModel.children[0])
    obstacleBBs.push(obstacleBB)
})

function createObstacle(){
    const randomLane = Math.floor(Math.random() * 3)
    const randomX = lanePositions[randomLane]
    const randomY = 0
    const randomZ = -60
    const obstaclePosition = new THREE.Vector3(randomX, randomY, randomZ)
    const randomObstacle = Math.floor(Math.random() * 3);
    if(obstacleTypes[randomObstacle]){
        const newObstacle = obstacleTypes[randomObstacle].clone()
        scene.add(newObstacle)
        newObstacle.position.copy(obstaclePosition)
        obstacles.push(newObstacle)
        var obstacleBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
        obstacleBB.setFromObject(newObstacle.children[0])
        obstacleBBs.push(obstacleBB)
    }
}

function addObstacles() {
    if(!JSON.parse(localStorage.getItem('pauseGame'))){
        var randomDelay = (Math.random() * obstacleAppearanceTimeDelay) + 1;
        createObstacle()
        setTimeout(addObstacles, randomDelay*1000)
    }
}

function increaseScore() {
    if(!JSON.parse(localStorage.getItem('pauseGame'))){
        localStorage.setItem('globalScore', ++score)
        document.getElementById('globalScore').innerHTML = score
    }
}

function randomizeControls() {
    let keys = JSON.parse(localStorage.getItem('controlKeys'))
    let j;
    for(let i=keys.length; i>0; i--){
        j = Math.floor(Math.random() * i)
        if(j!=i) keys[i-1] = [ keys[j], keys[j] = keys[i-1]][0]
    }
    localStorage.setItem('controlKeys', JSON.stringify(keys))
}

function increaseObstacleSpeed() {
    if(!JSON.parse(localStorage.getItem('pauseGame'))){
        obstacleSpeed+=0.0008
        if(obstacleAppearanceTimeDelay>0.5) obstacleAppearanceTimeDelay-=0.002
    }  
}

function checkCollision() {
    if(cubeModel && cubeBoundingBox && obstacleBBs.length>0 && score>50){
        let check1, check2;
        for(let i=0; i<obstacleBBs.length; i++){
            check1 = cubeBoundingBox.intersectsBox(obstacleBBs[i])
            if(check1){
                check2 = obstacles[i].name==='bar'
                check2 = check2 && cubeModel.position.x===obstacles[i].position.x
                check2 = check2 && cubeBoundingBox.max.y - cubeBoundingBox.min.y < 1
                if(!check2) stopGame()
            }
        }
    }
}

function stopGame() {
    var killGame = setInterval(function(){
        if(obstacleSpeed<0){
            clearInterval(killGame)
            setTimeout(function(){
                if(parseInt(localStorage.getItem('globalScore'))>parseInt(localStorage.getItem('globalHighScore'))){
                    localStorage.setItem('globalHighScore',localStorage.getItem('globalScore'))
                }
                localStorage.setItem('gameEnd', JSON.stringify(true))
                localStorage.setItem('pauseGame', JSON.stringify(false))
                window.location.href = "game-end.html"
            },800)
            return
        }
        obstacleSpeed-=0.01
    },200)
}

function animate() {

    if(JSON.parse(localStorage.getItem('pauseGame'))) return

    if(cubeModel && cubeBoundingBox) cubeBoundingBox.copy(cubeModel.children[0].geometry.boundingBox).applyMatrix4(cubeModel.children[0].matrixWorld)

    if(cubeMixer) cubeMixer.update(clock.getDelta())

    if(obstacles.length>0){

        if(obstacles[0].position.z>5){
            if(obstacles[0].name==='spikes'){
                score+=33
            }else if(obstacles[0].name==='wall'){
                score+=59
            }else if(obstacles[0].name==='bar'){
                score+=68
            }
            localStorage.setItem('globalScore', score)
            document.getElementById('globalScore').innerHTML = score
        }

        if(obstacles[0].position.z>5) {
            scene.remove(obstacles[0])
            obstacles.shift()
            obstacleBBs.shift()
        }
    }

    for(let i=0; i<obstacles.length; i++){
        obstacles[i].position.z += obstacleSpeed
        obstacleBBs[i].copy(obstacles[i].children[0].geometry.boundingBox).applyMatrix4(obstacles[i].children[0].matrixWorld)
    }

    checkCollision()

    renderer.render(scene, camera)
}

if(JSON.parse(localStorage.getItem('gameEnd'))){
    randomizeControls()
    controlKeys = JSON.parse(localStorage.getItem('controlKeys'))
    localStorage.setItem('gameEnd', JSON.stringify(false))
}
setInterval(increaseObstacleSpeed, 250)
setInterval(increaseScore, increaseScoreTimeDelay)
addObstacles()
renderer.setAnimationLoop(animate)