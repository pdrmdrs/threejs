import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line,
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new Scene()
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

function createLine(color: string): Line {
  const material = new LineBasicMaterial({ color })
  const points = [
    new Vector3(-5, 0, 0),
    new Vector3(0, 5, 0),
    new Vector3(5, 0, 0),
    new Vector3(0, -5, 0),
    new Vector3(-5, 0, 0),
  ]
  const geometry = new BufferGeometry().setFromPoints(points)
  const line = new Line(geometry, material)
  return line
}

function createCube(color: string, x = 0, y = 0, z = 0): Mesh {
  const geometry = new BoxGeometry()
  const material = new MeshBasicMaterial({ color })
  const cube = new Mesh(geometry, material)
  cube.position.x = x
  cube.position.y = y
  cube.position.z = z
  return cube
}

const cubeGreen = createCube('green')
const cubeBlue = createCube('blue', 1.5)
const cubeRed = createCube('red', 0, 1.5)
const cubeYellow = createCube('yellow', 0, -1.5, 0)
const cubeOrange = createCube('orange', -1.5, 0, 0)
const line = createLine('white')

scene.add(cubeGreen)
scene.add(cubeBlue)
scene.add(cubeRed)
scene.add(cubeYellow)
scene.add(cubeOrange)
scene.add(line)

camera.position.z = 5

let angle = 0

function rotate(item: Mesh, x: number, y: number) {
  item.rotation.x = x
  item.rotation.y = y
}

function render() {
  renderer.render(scene, camera)
}

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

function animate() {
  requestAnimationFrame(animate)
  render()

  angle += 0.01

  // rotate(cubeBlue, angle, angle)
  // rotate(cubeGreen, angle, angle)
  // rotate(cubeRed, angle, angle)
  // rotate(cubeYellow, angle, angle)
  // rotate(cubeOrange, angle, angle)

  controls.update()
}

animate()
