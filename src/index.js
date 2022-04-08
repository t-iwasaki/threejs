import * as THREE from "three";
// オブジェクトをロードするための Loader をimportしておきます
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls(camera, document.body);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// オブジェクトを回転させるときに参照したいため、ここで変数を宣言します
var object_keyboard = null;

// オブジェクトを読み込む
const mtlLoader = new MTLLoader();
mtlLoader.setPath('models/');
mtlLoader.load('keyboard.vox.mtl', (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load('keyboard.vox.obj', (object) => {
    const mesh = object;
    object_keyboard = object;
    scene.add(mesh);
  });
})

camera.position.z = 6;

// オブジェクトを照らすために環境光源を追加する
const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
scene.add(light);

const animate = function () {
  requestAnimationFrame( animate );
  // そのまま書くとオブジェクトが読み込まれる前に動いてしまうので、ifで括っておく
  if (object_keyboard){
    object_keyboard.rotation.x = 1;
    object_keyboard.rotation.y += 0.01;
  }
  renderer.render( scene, camera );
};
animate();