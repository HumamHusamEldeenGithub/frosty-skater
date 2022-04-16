import { playerComp } from "../aframe-components/playerComp";
import { timeComponent } from "../aframe-components/timeComponents";
import { cameraComp } from "../aframe-components/cameraComp";
import { worldComp } from "../aframe-components/worldComp";
import { webcam } from "../aframe-components/webcam";
import { grid } from "../aframe-components/gridComp";
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
  AFRAME.registerComponent("world_comp", worldComp);
  AFRAME.registerComponent("webcam", webcam);
  AFRAME.registerComponent("grid", grid);
  console.log("Registered");
}

function attachComoponents() {
  document.getElementById("camera_comp").setAttribute("camera_comp", "");
  document.getElementById("player").setAttribute("player_comp", "");
  document.getElementById("webcam_obj").setAttribute("webcam", "");
  document.getElementById("grid").setAttribute("grid", "");
  scene.setAttribute("time_comps", "");
}

async function initScene() {
  registerComponents();
  attachComoponents();
}
