import * as THREE from './three.module.js';
import * as star from './star.js';

import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';




let lastScrollPos = 0;
let stars = [];

const colorTemplate = ["#ff6e27", "#fbf665", "#73fffe", "#6287f8", "#383e65"]


const bg = document.querySelector('#bg');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, bg.clientWidth / bg.clientHeight, 0.1, 1000);


//texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./../image/hw.png');

//material
const materialBasic = new THREE.MeshBasicMaterial({ color: "#fbf665", wireframe: true });
const materialStandard = new THREE.MeshStandardMaterial({ color: "#000000" });
materialStandard.roughness = 0.5;
materialStandard.normalMap = texture;



const renderer = new THREE.WebGLRenderer({ canvas: bg });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(bg.clientWidth, bg.clientHeight);
renderer.setClearColor("#000000", 0);
document.body.appendChild(renderer.domElement);

//cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, materialBasic);


//capsule geometry
const capsuleGeo = new THREE.CapsuleGeometry(0.5, 0.5, 15, 15);
const capsule = new THREE.Mesh(capsuleGeo, materialBasic);


//torus
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 16, 100);
const torus = new THREE.Mesh(torusGeometry, materialStandard);

//sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, materialStandard);
scene.add(sphere);


//light
const light1 = new THREE.PointLight("red", 1, 50);
light1.intensity = 40;
light1.position.set(20, 0, 5);
scene.add(light1);

const light2 = new THREE.PointLight("blue", 1, 50);
light2.intensity = 40;
light2.position.set(-20, 0, 5);
scene.add(light2);

const light3 = new THREE.PointLight("white", 1, 10);
light3.intensity = 20;
light3.position.set(0, 0, 5);
scene.add(light3);

//control

camera.position.z = 5;

cube.position.x = -3;
capsule.position.x = 3;



//canvas responsive when window resize
window.addEventListener('resize', function () {
    bg.style.width = window.innerWidth + 'px';
    bg.style.height = window.innerHeight + 'px';
    camera.aspect = bg.clientWidth / bg.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(bg.clientWidth, bg.clientHeight);
});

//functions \
init();

function init() {
    sphere.position.y += (window.scrollY - lastScrollPos) * 0.005;
    sphere.position.z += (window.scrollY - lastScrollPos) * 0.01;
    lastScrollPos = window.scrollY;
    animate();
    addStars();

}




function addStars() {
    for (let i = 0; i < 500; i++) {
        stars.push(new star.star(scene));
    }

}




//movement control
document.addEventListener("scroll", function (e) {
    for (const star of stars) {
        star.scrollY(window.scrollY - lastScrollPos);
    }

    sphere.position.y += (window.scrollY - lastScrollPos) * 0.005;
    sphere.position.z += (window.scrollY - lastScrollPos) * 0.01;

    lastScrollPos = window.scrollY;
});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    sphere.rotation.y -= 0.01;

    for (const star of stars) {
        star.move();
    }

}
