let scene, camera, renderer, mesh;
let roomFloor, ambientLight, sunlight, infraredLight, ultraVioletLight, controls;
let SPEED = 0.01;

let keyboard = {};
let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;
 
function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(98, 1280/720, 0.1, 1000);
  bedTexture = new THREE.TextureLoader().load( 'assets/texture/blanketTexture.jpg' );

  //bed
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

   //blanket
   blanket = new THREE.Mesh(
    new THREE.BoxGeometry(3,1,3),
    new THREE.MeshPhongMaterial({map:bedTexture, wireframe:USE_WIREFRAME})
 );
 blanket.position.y += 0;
 blanket.position.x += -3;
 blanket.position.z += -2;
 blanket.receiveShadow = true;
 blanket.castShadow = true;
 scene.add(blanket);

  //pillow
  pillowsTexture = new THREE.TextureLoader().load( 'assets/texture/seaTexture.jpg' );
  pillow = new THREE.Mesh(
    new THREE.BoxGeometry(0,0,0),
    new THREE.MeshPhongMaterial({map: pillowsTexture, wireframe:USE_WIREFRAME})
 );
 pillow.position.y += 0.1;
 pillow.position.x += -4.2;
 pillow.position.z += -2.9;
 pillow.receiveShadow = true;
 pillow.castShadow = true;
 scene.add(pillow);

  //pillow2
  pillow2 = new THREE.Mesh(
    new THREE.BoxGeometry(0,0,0),
    new THREE.MeshPhongMaterial({map: pillowsTexture, wireframe:USE_WIREFRAME})
 );
 pillow2.position.y += 0.1;
 pillow2.position.x += -4.2;
 pillow2.position.z += -1.1;
 pillow2.receiveShadow = true;
 pillow2.castShadow = true;
 scene.add(pillow2);

  //dresser
  cabinetTexture = new THREE.TextureLoader().load( 'assets/texture/cabinetTexture.jpg' );
  dresser = new THREE.Mesh(
    new THREE.BoxGeometry(3,3.7,0),
    new THREE.MeshPhongMaterial({map:cabinetTexture, wireframe:USE_WIREFRAME})
  );
  dresser.position.y += 1.6;
  dresser.position.x += -2.6;
  dresser.position.z += 4.3;
  dresser.receiveShadow = true;
  dresser.castShadow = true;
  scene.add(dresser);

//roomFloor
  roomTexture = new THREE.TextureLoader().load( 'assets/texture/seaTexture.jpg' );
  roomFloor = new THREE.Mesh(
     new THREE.BoxGeometry(10,10,0),
     new THREE.MeshPhongMaterial({map: roomTexture, wireframe:USE_WIREFRAME})
  );
  roomFloor.position.set(0,-0.45,0);
  roomFloor.rotation.x -= Math.PI / 2;
  roomFloor.receiveShadow = true;
  scene.add(roomFloor);

  //roof
  roofTexture = new THREE.TextureLoader().load( 'assets/texture/sky.jpg');
  roof = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(10,10,10),
   new THREE.MeshPhongMaterial({map:roofTexture, wireframe:USE_WIREFRAME})
   );
   roof.position.set(0,3.99,0);
   roof.rotation.x = -4.718;
   roof.receiveShadow = true;
   roof.castShadow = true;
   scene.add(roof);

  //mattressFloor
  mattressFloorTexture = new THREE.TextureLoader().load( 'assets/texture/floorMattressTexture.jpg' );
  mattressFloor = new THREE.Mesh(
     new THREE.PlaneGeometry(5,6, 5,5),
     new THREE.MeshPhongMaterial({map: mattressFloorTexture, wireframe:USE_WIREFRAME})
  );
  mattressFloor.rotation.x -= Math.PI / 2;
  mattressFloor.position.y = 0.1;
  mattressFloor.position.x = -2.5;
  mattressFloor.position.z = -2;
  mattressFloor.receiveShadow = true;
  scene.add(mattressFloor);

  //doorMatt
  doorMattTexture = new THREE.TextureLoader().load( 'assets/texture/doormatTexture.jpg' );
  doorMatt = new THREE.Mesh(
     new THREE.PlaneGeometry(2,1.4, 2,2),
     new THREE.MeshPhongMaterial({map: doorMattTexture, wireframe:USE_WIREFRAME})
  );
  doorMatt.rotation.x -= Math.PI / 2;
  doorMatt.position.set(2.9,0.2,4);
  doorMatt.receiveShadow = true;
  scene.add(doorMatt);

  //windows
  firstWindow = new THREE.Mesh(
      new THREE.TorusBufferGeometry(0,0.1,0,0),
      new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
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
    new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
);
    secondWindow.position.y = 2;
    secondWindow.position.x= 4;
    secondWindow.position.z = -5;
    secondWindow.receiveShadow = true;
    secondWindow.castShadow = true;
    scene.add(secondWindow);
  
  //leftWall
  wallTexture = new THREE.TextureLoader().load( 'assets/texture/bedSheet.jpg' );
  leftWall = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10,4,2,2),
      new THREE.MeshPhongMaterial({map:wallTexture, wireframe:USE_WIREFRAME})
  )
  leftWall.position.x = 5;
  leftWall.position.y = 2;
  leftWall.position.z = 0;
  leftWall.rotation.y = 4.7;
  leftWall.receiveShadow = true;
  leftWall.castShadow = true;
  scene.add(leftWall);

   //rightWall
   rightWall = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10,4,2,2),
      new THREE.MeshPhongMaterial({map:wallTexture, wireframe:USE_WIREFRAME})
   )
   rightWall.position.x = -5;
   rightWall.position.y = 2;
   rightWall.position.z = 0.1;
   rightWall.rotation.y = -4.7;
   rightWall.receiveShadow = true;
   rightWall.castShadow = true;
   scene.add(rightWall);

   //frontWall
   frontWall = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10,4,2,2),
      new THREE.MeshPhongMaterial({map:wallTexture, wireframe:USE_WIREFRAME})
   )
   frontWall.position.x = 0;
   frontWall.position.y = 2;
   frontWall.position.z = 5;
   frontWall.rotation.y = -9.4;
   frontWall.receiveShadow = true;
   frontWall.castShadow = true;
   scene.add(frontWall);

   //poster
   posterTexture = new THREE.TextureLoader().load( 'assets/texture/posterTexture.jpg' );
   poster = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2,3,2,2),
      new THREE.MeshPhongMaterial({map:posterTexture, wireframe:USE_WIREFRAME})
   )
   poster.position.x = -5;
   poster.position.y = 2.3;
   poster.position.z = -2;
   poster.rotation.y = -4.7;
   poster.rotation.x = 0;
   poster.receiveShadow = true;
   poster.castShadow = true;
   scene.add(poster);


   //door
   doorTexture = new THREE.TextureLoader().load( 'assets/texture/doorTexture.jpeg' );
   door = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1.6,3.4,2,2),
      new THREE.MeshPhongMaterial({map:doorTexture, wireframe:USE_WIREFRAME})
   )
   door.position.x = 3;
   door.position.y = 1.6;
   door.position.z = 4.9;
   door.rotation.y = -9.4;
   door.rotation.x = 0;
   door.receiveShadow = true;
   door.castShadow = true;
   scene.add(door);


// sunlight,infrared,ultraviolet
  radiation = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(radiation);
 
  sunlight = new THREE.PointLight(0xffffff, 0.9, 18);
  sunlight.position.set(6,3,-6);
  sunlight.castShadow = true;
  sunlight.shadow.camera.near = 1;
  sunlight.shadow.camera.far = 25;
  scene.add(sunlight);

  infraredLight = new THREE.PointLight(0xe9993e, 0.3, 18);
  infraredLight.position.set(6,3,-6);
  infraredLight.castShadow = true;
  infraredLight.shadow.camera.near = 1;
  infraredLight.shadow.camera.far = 25;
  scene.add(infraredLight);

  ultraVioletLight = new THREE.PointLight(0x9f26c4, 0.9, 18);
  ultraVioletLight.position.set(6,3,-6);
  ultraVioletLight.castShadow = true;
  ultraVioletLight.shadow.camera.near = 1;
  ultraVioletLight.shadow.camera.far = 25;
  scene.add(ultraVioletLight);
 
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
 
window.onload = init;4

