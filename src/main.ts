import "./style.css"

import * as THREE from "three"

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(`#content`)!,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
})

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const lightColor = 0xffffff
const ambientLight = new THREE.AmbientLight(lightColor)
const pointLight = new THREE.PointLight(lightColor)


pointLight.position.set(5, 5, 5)

scene.add(ambientLight, pointLight)

function draw() {
  requestAnimationFrame(draw)
  renderer.render(scene, camera)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
}
draw()
