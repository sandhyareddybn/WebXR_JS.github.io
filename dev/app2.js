import * as THREE from '../libs/three/three.module.js';

class App2
{
   constructor()
   {
    const container = document.createElement('div');
    document.body.appendChild(container);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
    this.camera.position.set(0,0,6);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.renderer = new THREE.WebGL1Renderer({antialias:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio = window.devicePixelRatio;
    container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(this.render.bind(this));

    const earthGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const earthMaterial = new THREE.MeshStandardMaterial({color:0xff0000});
    this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    this.scene.add(this.earthMesh);

    const moonGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const moonMaterial = new THREE.MeshStandardMaterial({color:0x00ff00});
    this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    this.moonMesh.position.set(6,0,-6);
    this.moonMesh.parent=this.earthMesh;
    this.scene.add(this.moonMesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(light);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    this.scene.add(ambient);

    window.addEventListener('resize', this.resize.bind(this));
   }

   resize()
   {
       this.camera.aspect = window.innerWidth/window.innerHeight;
       this.camera.updateProjectionMatrix();
       this.renderer.setSize(window.innerWidth, window.innerHeight);
   }

   render()
   {
      this.earthMesh.rotateY(0.01);
      this.renderer.render(this.scene, this.camera);
   }
}

export {App2}