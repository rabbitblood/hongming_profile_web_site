import * as THREE from './three.module.js';
import * as star from './star.js';

import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';



//data
let lastScrollPos = 0;
let stars = [];
let humanoid;
let gradHat;
let computer;
let bulb;
let book;
const colorTemplate = ["#ff6e27", "#fbf665", "#73fffe", "#6287f8", "#383e65"]

//elements
const bg = document.querySelector('#bg');
const profileText = document.querySelector('.profile-text');
const educationText = document.querySelector('.education-text');
const experienceText = document.querySelector('.experience-text');
const projectText = document.querySelector('.project-text');
const skillText = document.querySelector('.skill-text');

//scene
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

//fbs loader
//humanoid
const loader = new FBXLoader();


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
light1.position.set(20, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight("blue", 1, 50);
light2.intensity = 40;
light2.position.set(-20, 5, 5);
scene.add(light2);

const light3 = new THREE.PointLight("white", 1, 10);
light3.intensity = 20;
light3.position.set(0, 5, 5);
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

//functions 
init();

function init() {
    //load humanoid model
    loader.load('./../models/humanoid.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.004, 0.004, 0.004);
        object.position.set(0, -2, -50);

        humanoid = object;
        humanoid.show = false;
    });


    //grad hat
    loader.load('./../models/grad-hat.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, -1, -50);

        gradHat = object;
        gradHat.show = false;
    });

    //computer
    loader.load('./../models/computador.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, -1, -50);

        computer = object;
        computer.show = false;
    });

    //bulb
    loader.load('./../models/bulb.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.04, 0.04, 0.04);
        object.position.set(0, -1, -50);

        bulb = object;
        bulb.show = false;
    });

    //book
    loader.load('./../models/book.fbx', function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                child.material = materialStandard;
            }
        });

        scene.add(object);
        object.scale.set(0.001, 0.001, 0.001);
        object.position.set(0, -1, -50);

        book = object;
        book.show = false;
    });


    profileText.style.opacity = 0;
    profileText.style.transform = "translateX(-100px)";

    educationText.style.opacity = 0;
    educationText.style.transform = "translateX(100px)";

    experienceText.style.opacity = 0;
    experienceText.style.transform = "translateX(-100px)";

    projectText.style.opacity = 0;
    projectText.style.transform = "translateX(100px)";

    skillText.style.opacity = 0;
    skillText.style.transform = "translateX(-100px)";


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


    //profile text
    if (profileText.getClientRects()[0].top - window.innerHeight < -200 &&
        profileText.getClientRects()[0].bottom > 200) {
        profileText.style.opacity = 1;
        profileText.style.transform = "translateX(0)";
        humanoid.show = true;
    } else {
        profileText.style.opacity = 0;
        profileText.style.transform = "translateX(-100px)";
        humanoid.show = false;
    }

    //education text
    if (educationText.getClientRects()[0].top - window.innerHeight < -200 &&
        educationText.getClientRects()[0].bottom > 200) {
        educationText.style.opacity = 1;
        educationText.style.transform = "translateX(0)";
        gradHat.show = true;
    } else {
        educationText.style.opacity = 0;
        educationText.style.transform = "translateX(100px)";
        gradHat.show = false;
    }

    //experience text
    if (experienceText.getClientRects()[0].top - window.innerHeight < -200 &&
        experienceText.getClientRects()[0].bottom > 200) {
        experienceText.style.opacity = 1;
        experienceText.style.transform = "translateX(0)";
        computer.show = true;
    } else {
        experienceText.style.opacity = 0;
        experienceText.style.transform = "translateX(-100px)";
        computer.show = false;
    }

    //project text
    if (projectText.getClientRects()[0].top - window.innerHeight < -200 &&
        projectText.getClientRects()[0].bottom > 200) {
        projectText.style.opacity = 1;
        projectText.style.transform = "translateX(0)";
        bulb.show = true;
    } else {
        projectText.style.opacity = 0;
        projectText.style.transform = "translateX(100px)";
        bulb.show = false;
    }

    //skill text
    if (skillText.getClientRects()[0].top - window.innerHeight < -200 &&
        skillText.getClientRects()[0].bottom > 200) {
        skillText.style.opacity = 1;
        skillText.style.transform = "translateX(0)";
        book.show = true;
    } else {
        skillText.style.opacity = 0;
        skillText.style.transform = "translateX(-100px)";
        book.show = false;
    }

});

window.addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") {
        camera.position.z += 1;
    }
});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (humanoid != undefined) {
        humanoid.rotation.y += 0.01;

        if (humanoid.show) {
            if (humanoid.position.z < 0) {
                humanoid.position.z += 1;
            }
        } else {
            if (humanoid.position.z > -50) {
                humanoid.position.z -= 1;
            }
        }

    }

    if (gradHat != undefined) {
        gradHat.rotation.y += 0.01;

        if (gradHat.show) {
            if (gradHat.position.z < 0) {
                gradHat.position.z += 1;
            }
        } else {
            if (gradHat.position.z > -50) {
                gradHat.position.z -= 1;
            }
        }

    }

    if (computer != undefined) {
        computer.rotation.y += 0.01;

        if (computer.show) {
            if (computer.position.z < 0) {
                computer.position.z += 1;
            }
        } else {
            if (computer.position.z > -50) {
                computer.position.z -= 1;
            }
        }

    }

    if (bulb != undefined) {
        bulb.rotation.y += 0.01;

        if (bulb.show) {
            if (bulb.position.z < 0) {
                bulb.position.z += 1;
            }
        } else {
            if (bulb.position.z > -50) {
                bulb.position.z -= 1;
            }
        }

    }

    if (book != undefined) {
        book.rotation.y += 0.01;

        if (book.show) {
            if (book.position.z < 0) {
                book.position.z += 1;
            }
        } else {
            if (book.position.z > -50) {
                book.position.z -= 1;
            }
        }

    }

    sphere.rotation.y -= 0.01;

    for (const star of stars) {
        star.move();
    }

}
