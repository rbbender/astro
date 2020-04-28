import * as _ from 'lodash';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
//@ts-ignore
import Sun from './assets/Sun.glb';

var scene: THREE.Scene;
var camera;
var renderer;

const createSimpleScene = () => {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 1000;
	camera.updateProjectionMatrix();

	const light = new THREE.DirectionalLight(0xffffff, 5);
	light.position.z = 10;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.physicallyCorrectLights = true;
	renderer.gammaFactor = 2.2;
	scene.add(light);
	document.body.appendChild(renderer.domElement);
}

const loadResources = () => {
	const loader = new GLTFLoader();
	loader.load(Sun, gltf => {
		console.log('Loaded Sun model');
		scene.add(gltf.scene);
	}, undefined, err => console.log(err));
}

createSimpleScene();
loadResources();