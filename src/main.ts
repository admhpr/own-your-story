import "./style.css"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Mesh } from "three"

const width = window.innerWidth
const height = window.innerHeight
const aspect = width / height

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(`#content`)!,
})

let moon: Mesh
let avatar: Mesh

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

if (import.meta.env.MODE === "development") {
  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  scene.add(lightHelper, gridHelper)
}

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: lightColor })
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}
function addMoon() {
  const moonTexture = new THREE.TextureLoader().load("textures/moon.jpg")
  const normalTexture = new THREE.TextureLoader().load("normals/moon.jpg")
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  )

  scene.add(moon)

  moon.position.z = 30
  moon.position.setX(-10)
  return moon
}

function addAvatar() {
  const avatarTexture = new THREE.TextureLoader().load("textures/me.png")

  const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: avatarTexture })
  )

  scene.add(avatar)
  return avatar
}

function createStarScape() {
  const spaceTexture = new THREE.TextureLoader().load("textures/space.jpg")
  scene.background = spaceTexture

  Array(200)
    .fill(0)
    .forEach(addStar)

  moon = addMoon()
}

function moveCamera() {
  const top = document.body.getBoundingClientRect().top
  rotateMoon()
  rotateAvatar()
  camera.position.z = top * -0.01
  camera.position.x = top * -0.0002
  camera.rotation.y = top * -0.0002
}
function rotateAvatar() {
  avatar.rotation.y += 0.01
  avatar.rotation.z += 0.01
}
function rotateMoon() {
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05
}

function rotateTorus() {
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
}

function setup() {
  createStarScape()
  avatar = addAvatar()
  document.body.onscroll = moveCamera
  moveCamera()
}

function draw() {
  requestAnimationFrame(draw)
  renderer.render(scene, camera)
  rotateTorus()
  controls.update()
}

setup()
draw()
