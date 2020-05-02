import * as _ from 'lodash';
import * as THREE from 'three';
import * as list from './bodiesInfos';
import {CelestialBody} from './celestialBody';

const bodies: any = {};

var scene: THREE.Scene;
var camera: THREE.PerspectiveCamera;
var renderer: THREE.WebGLRenderer;

const createSimpleScene = () => {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
	camera.position.z = 1000;
	camera.updateProjectionMatrix();

	const light = new THREE.DirectionalLight(0xffffff, 5);
	light.position.z = 10;
	light.position.y = 0;

	console.log(light);
	console.log(camera);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.physicallyCorrectLights = true;
	renderer.gammaFactor = 2.2;
	document.body.appendChild(renderer.domElement);
	scene.add(camera);
	scene.add(light);
	renderer.domElement.addEventListener('wheel', handleMouseWheel);
}

const handleMouseWheel = (event: MouseWheelEvent) => {
	event.preventDefault();
	camera.position.z += event.deltaY;
	camera.updateProjectionMatrix();
}

const loadModels = async () => {
	for (const o of list.bodies) {
		bodies[o.name] = new CelestialBody(o);
		await bodies[o.name].load();
	}
}

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

const main = async () => {
	createSimpleScene();
	await loadModels();
	scene.add(bodies.sun.model);
	scene.add(bodies.mercury.model);
	animate();
}

main();
