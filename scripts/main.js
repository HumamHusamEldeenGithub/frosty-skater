import { playerComp } from "../aframe-components/playerComp";
import { cameraComp } from "../aframe-components/cameraComp";
import { worldComp } from "../aframe-components/worldComp";
import { webcam } from "../aframe-components/webcam";
import { grid } from "../aframe-components/gridComp";
import { coinComp } from "../aframe-components/coinComp";
import * as gameController from "./gameController";
import "../style.css";

var scene = document.querySelector("a-scene");

if (scene.hasLoaded) {
  initScene();
} else {
  scene.addEventListener("loaded", initScene);
}

function registerComponents() {
  AFRAME.registerComponent("player_comp", playerComp);
  AFRAME.registerComponent("camera_comp", cameraComp);
  AFRAME.registerComponent("world_comp", worldComp);
  AFRAME.registerComponent("webcam", webcam);
  AFRAME.registerComponent("grid", grid);
  AFRAME.registerComponent("coin_comp", coinComp);
  console.log("Registered");
}

function attachComoponents() {
  document.getElementById("camera_comp").setAttribute("camera_comp", "");
  document.getElementById("player").setAttribute("player_comp", "");
  document.getElementById("webcam_obj").setAttribute("webcam", "");
}

async function initScene() {
  registerComponents();
  attachComoponents();
  gameController.startGame();
}
