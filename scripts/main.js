import { playerComp } from "../aframe-components/playerComp";
import { timeComponent } from "../aframe-components/timeComponents";
import { cameraComp } from "../aframe-components/cameraComp";
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
  AFRAME.registerComponent("time_comps", timeComponent);
  console.log("Registered");
}

function attachComoponents() {
  document.getElementById("camera_comp").setAttribute("camera_comp", "target:#player;");
  document.getElementById("player").setAttribute("player_comp",'');
  scene.setAttribute("time_comps", "");
}

async function initScene() {
  registerComponents();
  attachComoponents();
}
