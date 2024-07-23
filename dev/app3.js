import * as THREE from '../libs/three/three.module.js';
import { OrbitControls } from '../libs/three/OrbitControls.js';

class App3
{
    constructor()
    {
        const container = document.createElement('div');
        document.body.appendChild(container);

        this.camera= new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1,100);
        this.camera.position.set(0,0,4);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xff00bb);

        this.renderer = new THREE.WebGL1Renderer({antialias:true, alpha:true});
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setAnimationLoop(this.render.bind(this));
        container.appendChild(this.renderer.domElement);

       /* const boxGeometry = new THREE.BoxBufferGeometry();
        const boxMaterial = new THREE.MeshBasicMaterial({color:0xc4c4c4});
        this.boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        this.scene.add(this.boxMesh);*/

        const light = new THREE.DirectionalLight(0xffffff, 10);
        this.scene.add(light);

        const ambient = new THREE.HemisphereLight(0xffffff, 0xffffff, 10);
        ambient.position.set(10,10,10);
        this.scene.add(ambient);

        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        window.addEventListener('resize', this.resize.bind(this));

        const torusGeometry = new THREE.TorusKnotBufferGeometry(10,3,100,16);
        //const torusMaterial = new THREE.MeshBasicMaterial({color:0x00BBCC});
        const torusMaterial = new THREE.MeshPhongMaterial({color:0x00BBCC});
        this.torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
        this.scene.add(this.torusMesh);

    }

    resize()
    {
       this.camera.aspect = window.innerWidth/window.innerHeight;
       this.camera.updateProjectionMatrix();
       this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render()
    {
       // this.boxMesh.rotateY(0.1);
        this.renderer.render(this.scene, this.camera);
    }
}

export {App3}