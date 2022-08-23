import * as THREE from 'three';

import Stats from './stats.module.js';
import { DDSLoader } from './DDSLoader.js';
import { TrackballControls } from './TrackballControls.js';
import * as BufferGeometryUtils from './BufferGeometryUtils.js';

let container, stats;
let camera, controls, scene, renderer;
let pickingTexture, pickingScene;
let highlightBox;

const pickingData = [];

const pointer = new THREE.Vector2();
const offset = new THREE.Vector3(10, 10, 10);

init();
async function getJSON() {
    return fetch('/data')
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}
const Fdata = 'storing Users Data'
async function init() {
    const json = await getJSON();  
    console.log(json.pillars);   
    console.log(json.pillars.length);
    // animate();
    container = document.getElementById('container');
    const texture = new THREE.TextureLoader().load("/public/images/g102.png");
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    pickingScene = new THREE.Scene();
    pickingTexture = new THREE.WebGLRenderTarget(1, 1);

    scene.add(new THREE.AmbientLight(0x555555));

    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    scene.add(light);

    const pickingMaterial = new THREE.MeshBasicMaterial({ vertexColors: true, map: texture });
    const defaultMaterial = new THREE.MeshPhongMaterial({ map: texture, color: 0xffffff, flatShading: true, vertexColors: true, shininess: 0 });

    function applyVertexColors(geometry, color) {

        const position = geometry.attributes.position;
        const colors = [];

        for (let i = 0; i < position.count; i++) {

            colors.push(color.r, color.g, color.b);

        }

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    }
    const geometriesDrawn = [];
    const geometriesPicking = [];
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const color = new THREE.Color();

    for (let i = 0; i < 5000; i++) {

        let geometry = new THREE.BoxGeometry();

        const position = new THREE.Vector3();
        position.x = Math.random() * 10000 - 5000;
        position.y = Math.random() * 6000 - 3000;
        position.z = Math.random() * 8000 - 4000;

        const rotation = new THREE.Euler();
        rotation.x = Math.random() * 2 * Math.PI;
        rotation.y = Math.random() * 2 * Math.PI;
        rotation.z = Math.random() * 2 * Math.PI;

        const scale = new THREE.Vector3();
        // scale.x = Math.random() * 200 + 100;
        // scale.y = Math.random() * 200 + 100;
        // scale.z = Math.random() * 200 + 100;
        scale.x = 1;
        scale.y = 100;
        scale.z = 100;
        quaternion.setFromEuler(rotation);
        matrix.compose(position, quaternion, scale);

        geometry.applyMatrix4(matrix);


        applyVertexColors(geometry, color.setHex(0x00FFFFFF));

        geometriesDrawn.push(geometry);

        geometry = geometry.clone();


        applyVertexColors(geometry, color.setHex(i));

        geometriesPicking.push(geometry);

        pickingData[i] = {

            position: position,
            rotation: rotation,
            scale: scale

        };

    }

    const objects = new THREE.Mesh(BufferGeometryUtils.mergeBufferGeometries(geometriesDrawn), defaultMaterial);
    scene.add(objects);

    pickingScene.add(new THREE.Mesh(BufferGeometryUtils.mergeBufferGeometries(geometriesPicking), pickingMaterial));

    highlightBox = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshLambertMaterial({ color: 0xffff00 }
        ));
    scene.add(highlightBox);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    // stats = new Stats();
    // container.appendChild(stats.dom);
    window.addEventListener('resize', onWindowResize, false);

    renderer.domElement.addEventListener('pointermove', onPointerMove);
  
    
}


function onPointerMove(e) {

    pointer.x = e.clientX;
    pointer.y = e.clientY;

}

function animate() {

    requestAnimationFrame(animate);
    render();
    stats.update();

}
function render() {

    controls.update();

    // pick();

    renderer.setRenderTarget(null);
    renderer.render(scene, camera);

}

// function pick() {

//     //render the picking scene off-screen

//     // set the view offset to represent just a single pixel under the mouse

//     camera.setViewOffset(renderer.domElement.width, renderer.domElement.height, pointer.x * window.devicePixelRatio | 0, pointer.y * window.devicePixelRatio | 0, 1, 1);

//     // render the scene

//     renderer.setRenderTarget(pickingTexture);
//     renderer.render(pickingScene, camera);

//     // clear the view offset so rendering returns to normal

//     camera.clearViewOffset();

//     //create buffer for reading single pixel

//     const pixelBuffer = new Uint8Array(4);

//     //read the pixel

//     renderer.readRenderTargetPixels(pickingTexture, 0, 0, 1, 1, pixelBuffer);

//     //interpret the pixel as an ID

//     const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
//     const data = pickingData[id];

//     if (data) {
//         //move our highlightBox so that it surrounds the picked object
//         if (data.position && data.rotation && data.scale) {
//             console.log(data.pointion);
//             highlightBox.position.copy(data.position);
//             highlightBox.rotation.copy(data.rotation);
//             highlightBox.scale.copy(data.scale).add(offset);
//             highlightBox.visible = true;

//         }

//     } else {

//         highlightBox.visible = false;

//     }

// }

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
