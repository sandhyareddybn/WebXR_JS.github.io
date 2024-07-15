import { OrbitControls } from '../libs/three/OrbitControls.js';
import * as THREE from '../libs/three/three.module.js';


class App
{
    constructor()
    {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
        this.camera.position.set(0,0,4);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffaa00);

        this.renderer = new THREE.WebGL1Renderer({antialias:true, alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(this.render.bind(this));

        const geometry = new THREE.BoxBufferGeometry();
        const material = new THREE.MeshStandardMaterial({color:0X00ff00});
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        const light = new THREE.DirectionalLight(0xffffff, 10);
        light.position.set(10,10,10);
        this.scene.add(light);

        const ambient = new THREE.HemisphereLight(0xffffff, 0xffffff, 10);
        this.scene.add(ambient);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    render()
    {
        this.mesh.rotateY(0.05);
        this.renderer.render(this.scene, this.camera);
    }
}

export{App}