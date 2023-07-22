// import three js
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

// create a scene

const scene=new THREE.Scene();


//add new geometry
//SphereGeometry(radius,width,height)
const geometry=new THREE.SphereGeometry(3,64,64);


// define a material

const material =new THREE.MeshStandardMaterial({
 color:"#00ff83",
 roughness:0.2
})

// define a mesh

const mesh=new THREE.Mesh(geometry,material)


// add the meash to the scene
scene.add(mesh)


// Let add sizes
const size={
  width:innerWidth,
  height:innerHeight
}




// let add some light
const light=new THREE.PointLight("#0ffff",1,100)
light.position.set(10,-20,40)
light.intensity=1.32
scene.add(light)

// add the camera
const camera= new THREE.PerspectiveCamera(45,size.width/size.height,0.1,100)
camera.position.z=30;

// add the camera in the scene

scene.add(camera)


// Render the scene in the canvas

const canvas=document.querySelector(".webgl")

const renderer=new THREE.WebGLRenderer({canvas})
renderer.setPixelRatio(6)
renderer.setSize(size.width,size.height);
renderer.render(scene,camera);


// add controllers
const orbit=new OrbitControls(camera,canvas)
orbit.enableDamping=true;
orbit.enablePan=false;
orbit.enableZoom=false;
orbit.autoRotate=true;
orbit.autoRotateSpeed=5;


window.addEventListener("resize",()=>{
  size.width=window.innerWidth;
  size.height=window.innerHeight;
  camera.aspect=size.width/size.height;
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height)
})

const loop=()=>{
  orbit.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}

loop()


//timeline 
const tl=gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})