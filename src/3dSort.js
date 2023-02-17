import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

console.log(THREE)

const sort = document.getElementById('3dSort')
const canvas = document.createElement("canvas")
canvas.classList.add("w-100")
canvas.classList.add("my-auto")
sort.appendChild(canvas)

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {
    count: 2000,
    radius: 1,
    size: 0.05,
    alphaMax: 2000,
    insideColor: '#d4091d',
    outsideColor: '#46276e',
}

let geometry, material, points
let spherePositions, sphereColors
let currentIndex = 0

const generateSpiral = () => {
    console.time('generate spiral')

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const index = new Float32Array(parameters.count)
    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    const alpha = parameters.alphaMax / parameters.count

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Index
        index[i] = i  

        // Position
        positions[i3] = parameters.radius * Math.cos(alpha * i) * Math.cos((-Math.PI/2) + ((alpha * i)/parameters.alphaMax) * Math.PI)
        positions[i3 + 1] = parameters.radius * Math.sin(alpha * i) * Math.cos((-Math.PI/2) + ((alpha * i)/parameters.alphaMax) * Math.PI)
        positions[i3 + 2] = - parameters.radius * Math.sin((-Math.PI/2) + ((alpha * i)/parameters.alphaMax) * Math.PI)

        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, i / parameters.count)
        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

    }

    geometry.setAttribute('index', new THREE.BufferAttribute(index, 1))
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    spherePositions = positions
    sphereColors = colors

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: true,
        vertexColors: true,
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)

    console.timeEnd('generate spiral')
}

function shuffleSpiral() {
    console.time('Shuffle spiral')

    const positions = points.geometry.attributes.position.array
    const colors = points.geometry.attributes.color.array

    // shuffle points positions
    for (let i = 0; i < positions.length; i += 3) {
        const i3 = i * 3

        // index
        const index = Math.floor(Math.random() * positions.length / 3) * 3

        // Position
        positions[i3] = spherePositions[i3] + (Math.random() - 0.5) * parameters.radius
        positions[i3 + 1] = spherePositions[i3 + 1] + (Math.random() - 0.5) * parameters.radius
        positions[i3 + 2] = spherePositions[i3 + 2] + (Math.random() - 0.5) * parameters.radius

        // Color
        colors[i3] = sphereColors[i3]
        colors[i3 + 1] = sphereColors[i3 + 1]
        colors[i3 + 2] = sphereColors[i3 + 2]
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    points.geometry.attributes.position.needsUpdate = true
    points.geometry.attributes.color.needsUpdate = true

    console.timeEnd('Shuffle spiral')
}

function sortSpiral() {
    console.time('Sort spiral')

    const positions = points.geometry.attributes.position.array
    const colors = points.geometry.attributes.color.array

    // sort points positions depending on the index
    for (let i = 0; i < positions.length; i += 3) {
        const i3 = i * 3

        // index
        const index = i

        // Position
        positions[i3] = spherePositions[i3]
        positions[i3 + 1] = spherePositions[i3 + 1]
        positions[i3 + 2] = spherePositions[i3 + 2]

        // Color
        colors[i3] = sphereColors[i3]
        colors[i3 + 1] = sphereColors[i3 + 1]
        colors[i3 + 2] = sphereColors[i3 + 2]

    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    points.geometry.attributes.position.needsUpdate = true
    points.geometry.attributes.color.needsUpdate = true

    console.timeEnd('Sort spiral')
}


// listen to shuffleButton3dSort and shuffle the buffer geometry of the points objects
const shuffleButton3dSort = document.getElementById('shuffleButton3dSort')
shuffleButton3dSort.addEventListener('click', () => {
    console.log('Shuffle done')

    console.log('Randomized position', points.geometry.attributes.position.array)
    console.log('Randomized ', points.geometry.attributes.color.array)

    shuffleButton3dSort.style.display = 'none'
    sortButton3dSort.style.display = 'block'
})

// listen to sortButton3dSort and sort the buffer geometry of the points objects
const sortButton3dSort = document.getElementById('sortButton3dSort')
sortButton3dSort.addEventListener('click', () => {
    console.log('Sort done')

    console.log(points.geometry.attributes.position.array)
    console.log(points.geometry.attributes.color.array)

    sortButton3dSort.style.display = 'none'
    shuffleButton3dSort.style.display = 'block'
})

/**
 * Sizes
 */
const sizes = {
    width: parent.innerWidth * 0.95,
    height: parent.innerWidth * 0.75
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = parent.innerWidth * 0.95
    sizes.height = parent.innerWidth * 0.75

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#ffffff')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    points.rotation.y = elapsedTime * 0.1
    points.rotation.x = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

generateSpiral()

tick()