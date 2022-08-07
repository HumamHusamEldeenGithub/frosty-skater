import { playerComp } from "../aframe-components/playerComp";
import { cameraComp } from "../aframe-components/cameraComp";
import { worldComp } from "../aframe-components/worldComp";
import { webcam } from "../aframe-components/webcam";
import { grid } from "../aframe-components/gridComp";
import { coinComp } from "../aframe-components/coinComp";
import * as gameController from "./gameController";
import "../style.css";
import * as posenet from "./posenet";
import { gridsFence } from "../aframe-components/gridFenceComp";


var scene = document.querySelector("a-scene");


// if (scene.hasLoaded) {
//   initScene();
// } else {
//   scene.addEventListener("loaded", initScene);
// }

function registerComponents() {
  AFRAME.registerComponent("player_comp", playerComp);
  AFRAME.registerComponent("camera_comp", cameraComp);
  AFRAME.registerComponent("world_comp", worldComp);
  AFRAME.registerComponent("webcam", webcam);
  AFRAME.registerComponent("grid", grid);
  AFRAME.registerComponent("gridsFence", gridsFence);
  AFRAME.registerComponent("coin_comp", coinComp);
  console.log("Registered");
}

function attachComoponents() {
  document.getElementById("camera_comp").setAttribute("camera_comp", "");
  document.getElementById("player").setAttribute("player_comp", "");
  //document.getElementById("webcam_obj").setAttribute("webcam", "");
}

async function initScene() {
  document.getElementById('main-menu').style.display = "none" ; 
  document.querySelector("#loading-wrapper").style.display="block";

  registerComponents();
  attachComoponents(); 

  gameController.startGame();
  document.querySelector("#loading-wrapper").style.display="none";
}

async function displayMainMenu () {
  document.getElementById('main-menu').style.display = "flex" ; 
  document.getElementById('start-btn').onclick = initScene ; 
  document.getElementById('credits-btn').onclick = ()=>console.log("ENTER CREDITS");
  await posenet.initAIModel() ;
  await posenet.calculateAngle();
}

displayMainMenu();
