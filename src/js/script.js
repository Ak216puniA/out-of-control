import * as THREE from '../../node_modules/three/build/three.module.js'

const renderer = new THREE.WebGL1Renderer()

const screenWidth = window.innerWidth/2
const screenHeight = window.innerHeight

console.log(screenWidth)
console.log(screenHeight)

renderer.setSize(screenWidth,screenHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, screenWidth/screenHeight, 0.1, 1000)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

camera.position.z = 5

const cubeGeometry = new THREE.BoxGeometry()
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xEEEEEE
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

renderer.render(scene, camera)