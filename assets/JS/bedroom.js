var scene, camera, renderer, mesh;
var roomFloor, ambientLight, light, controls;
 
var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;
 
function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
  bedTexture = new THREE.TextureLoader().load( 'assets/texture/seaTexture.jpg' );
  bed = new THREE.Mesh(
     new THREE.BoxGeometry(4,1,3),
     new THREE.MeshPhongMaterial({map:bedTexture, wireframe:USE_WIREFRAME})
  );
  bed.position.y += 0;
  bed.position.x += -3;
  bed.position.z += -2;
  bed.receiveShadow = true;
  bed.castShadow = true;
  scene.add(bed);

  //dresser
  cabinetTexture = new THREE.TextureLoader().load( 'assets/texture/cabinetTexture.jpg' );
  dresser = new THREE.Mesh(
    new THREE.BoxGeometry(2,3,0),
    new THREE.MeshPhongMaterial({map:cabinetTexture, wireframe:USE_WIREFRAME})
  );
  dresser.position.y += 1.3;
  dresser.position.x += -3;
  dresser.position.z += 4.3;
  dresser.receiveShadow = true;
  dresser.castShadow = true;
  scene.add(dresser);

//room
  roomTexture = new THREE.TextureLoader().load( 'assets/texture/bridgeTexture.jpg' );
  roomFloor = new THREE.Mesh(
     new THREE.PlaneGeometry(10,10, 10,10),
     new THREE.MeshPhongMaterial({map: roomTexture, wireframe:USE_WIREFRAME})
  );
  roomFloor.rotation.x -= Math.PI / 2;
  roomFloor.receiveShadow = true;
  scene.add(roomFloor);

  //windows
  firstWindow = new THREE.Mesh(
      new THREE.TorusBufferGeometry(0,0.1,0,0),
      new THREE.MeshPhongMaterial({color:0xfbff00, wireframe:USE_WIREFRAME})
  );
  firstWindow.position.y = 2;
  firstWindow.position.x= -4;
  firstWindow.position.z = -5;
  firstWindow.receiveShadow = true;
  firstWindow.castShadow = true;
  scene.add(firstWindow);

 // SecondWindow
  secondWindow = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0,0.1,0,0),
    new THREE.MeshPhongMaterial({color:0xfbff00, wireframe:USE_WIREFRAME})
);
    secondWindow.position.y = 2;
    secondWindow.position.x= 4;
    secondWindow.position.z = -5;
    secondWindow.receiveShadow = true;
    secondWindow.castShadow = true;
    scene.add(secondWindow);
  
  //door
  door = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10,4,2,2),
      new THREE.MeshPhongMaterial({color:0xf7d9aa, wireframe:USE_WIREFRAME})
  )
  door.position.x = 5;
  door.position.y = 2;
  door.position.z = 0;
  door.rotation.y = 4.7;
  door.receiveShadow = true;
  door.castShadow = true;
  scene.add(door);


  // LIGHTS
  ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
 
  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(6,3,-6);
  light.castShadow = true;


  light.shadow.camera.near = 1;
  light.shadow.camera.far = 25;
  scene.add(light);
 
 
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0,player.height,0));
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);
 
 
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls (camera, renderer.domElement);
  animate();
}
 
function animate(){
  controls.update();
  requestAnimationFrame(animate);
 
 
  if(keyboard[87]){ 
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ 
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ 
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ 
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ 
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){
     camera.rotation.y += player.turnSpeed;
  }
 
  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;
