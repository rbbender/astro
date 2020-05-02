import {Vector3, Object3D} from 'three';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import {ObjectLoadProps} from './ObjectLoadProps';
import {loadModel} from './loader';

const SCALE_FACTOR = 696.396;

export class Position {
	x: number = 0;
	y: number = 0;
	z: number = 0;	
}

export class CelestialBody {
	name: string;
	pos: Position = new Position();
	model: Object3D;
	model_path: string;
	radius: number = 1;
	major_semiaxis: number;
	minor_semiaxis: number;
	velocity: number;
	year: number;
	scale_c: number = 1;

	constructor(props: ObjectLoadProps)
	{
		this.name = props.name;
		this.pos.y = 0;
		this.pos.z = 0;
		this.major_semiaxis = props.orb_maj;
		this.minor_semiaxis = props.orb_min;
		this.pos.x = this.major_semiaxis;
		this.radius = props.radius;
		this.scale_c = this.radius / SCALE_FACTOR;
		this.velocity = props.velocity;
		this.year = props.year;
		this.model_path = props.model_path;
	}

	print(...msg: any) {
		console.log(`CelestialBody:${this.name}:`, ...msg);
	}

	printError(...msg: any) {
		console.error(`CelestialBody:${this.name}:`, ...msg);
	}

	scale() {
		if (this.model) {
			this.model.scale.multiplyScalar(this.scale_c);
			this.model.position.setZ(this.major_semiaxis/100);
		}
	}

	async load() {
		try {
			//TODO: make it resolvable through webpack asset management?
			const gltfObj = await loadModel(`./celestial_bodies/${this.model_path}`);
			const scene = gltfObj.scene || gltfObj.scenes[0];
			this.model = scene.children[0];
			this.scale();
			this.print('loaded');
		}
		catch (e)
		{
			this.printError('failed to load', e);
		}
	}
}