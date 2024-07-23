import * as THREE from '../libs/three/three.module.js';
import { OrbitControls } from '../libs/three/OrbitControls.js';

class App2
{
   constructor()
   {
    const container = document.createElement('div');
    document.body.appendChild(container);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
    this.camera.position.set(0,0,4);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.renderer = new THREE.WebGL1Renderer({antialias:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio = window.devicePixelRatio;
    container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(this.render.bind(this));

   /* const earthGeometry = new THREE.SphereBufferGeometry(15,32,16,0,6.3,0,3.14);
    const earthMaterial = new THREE.MeshStandardMaterial({color:0xff0000});
    this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    this.earthMesh.position.set(0,0,-50);
    this.scene.add(this.earthMesh);

    /*const moonGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const moonMaterial = new THREE.MeshStandardMaterial({color:0x00ff00});
    this.moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    this.moonMesh.position.set(6,0,-6);
    this.scene.add(this.moonMesh);*/

   /*const heartShape = new THREE.Shape();
   heartShape.moveTo(25,25);
   heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
   heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
   heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
   heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
   heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
   heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
   const extrudeSettings = {
      depth: 8, 
	   bevelEnabled: true, 
	   bevelSegments: 2, 
	   steps: 2, 
	   bevelSize: 1, 
	   bevelThickness: 1
   }
   const heartGeometry = new THREE.ExtrudeBufferGeometry(heartShape,extrudeSettings);
   const heartMaterial = new THREE.MeshStandardMaterial({color:0xffbbcc});
   const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
   heartMesh.position.set(-25,-45,-100);
   this.scene.add(heartMesh);*/

   const starShape = new THREE.Shape();
   const outerRadius = 1;
   const innerRadius = 0.5;
   const PI2 = Math.PI *2;
   const inc = PI2/10;

   starShape.moveTo(outerRadius, 0);

   let inner = true;

   for(let theta = inc; theta<PI2; theta+=inc)
   {
      const radius = inner?innerRadius:outerRadius;
      starShape.lineTo(Math.cos(theta)*radius, Math.sin(theta)*radius);
      inner = !inner;
   }

   const extrudeSettings ={
      depth:0.1,
      steps:1,
      bevelEnabled:false
   }
   const starGeometry = new THREE.ExtrudeBufferGeometry(starShape,extrudeSettings);
   const starMaterial = new THREE.MeshPhongMaterial({color:0xffbbcc});
   this.starMesh = new THREE.Mesh(starGeometry, starMaterial);
   this.scene.add(this.starMesh);


    const light = new THREE.DirectionalLight(0xffffff, 1);
    this.scene.add(light);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    this.scene.add(ambient);

    window.addEventListener('resize', this.resize.bind(this));
    
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
   }

   resize()
   {
       this.camera.aspect = window.innerWidth/window.innerHeight;
       this.camera.updateProjectionMatrix();
       this.renderer.setSize(window.innerWidth, window.innerHeight);
   }

   render()
   {
      //this.earthMesh.rotateY(0.01);
     // this.moonMesh.rotateY(0.1);
      //this.heartMesh.rotateY(0.1);
      this.starMesh.rotateY(0.1);
      this.renderer.render(this.scene, this.camera);
   }
}

export {App2}