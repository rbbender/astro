import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

export const loadModel = async (url: string): Promise<GLTF> => {
	const loader = new GLTFLoader();
	return new Promise((resolve, reject) => {
		loader.load(url, gltf => resolve(gltf), undefined, err => reject(err));
	})
}