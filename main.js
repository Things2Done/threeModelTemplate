import './style.css'
import * as THREE from 'three'
import { addBoilerPlateMeshes, addStandardMesh, addBackground, addTorus, addMatcap, flowerModel, heartModel} from './addMeshes'
import { addLight } from './addLights'

const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  .01,
  100
)

const clock = new THREE.Clock()
const scene = new THREE.Scene()
const meshes = {}
const lights = {}
const mixers = []

init()
function init() {
  // set up our render default settings, add scene/canvas to webpage
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //Flower Model Code
  flowerModel().then(({ scene: flowerScene, mixer: flowerMixer })=>{
    flowerScene.position.set(0,-0.3,0)
    flowerScene.scale.set(2,2,2)
    scene.add(flowerScene)
    mixers.push(flowerMixer)
  }).catch((error)=>{
    console.log('failed to load model', error)
  })


    //Flower Model Code
    heartModel().then(({ scene: heartScene, mixer: heartMixer })=>{
      heartScene.position.set(-2,-2,0)
      heartScene.scale.set(2,2,2)
      scene.add(heartScene)
      mixers.push(heartMixer)
    }).catch((error)=>{
      console.log('failed to load model', error)
    })
  

  meshes.default = addBoilerPlateMeshes()
  meshes.standard = addStandardMesh()
  meshes.background = addBackground()
  meshes.matcap = addMatcap()
  meshes.torus = addTorus()
  lights.default = addLight()

  scene.add(lights.default)
  // scene.add(meshes.standard)
  // scene.add(meshes.default)
  // scene.add(meshes.torus)
  // scene.add(meshes.background)
  // scene.add(meshes.matcap)



  camera.position.set(0, 0, 3)
  resize()
  animate()
}

function resize() {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })
}

function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
for (const mixer of mixers){
  mixer.update(delta)
}

  meshes.default.rotation.x += 0.01
  meshes.default.rotation.z += 0.01
  meshes.standard.rotation.y += 0.04
  meshes.standard.rotation.z += 0.04
  renderer.render(scene, camera)
}

