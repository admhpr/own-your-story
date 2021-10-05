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

renderer.render(scene, camera)
