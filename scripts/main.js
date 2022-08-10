import { playerComp } from "../aframe-components/playerComp";
import { cameraComp } from "../aframe-components/cameraComp";
import { worldComp } from "../aframe-components/worldComp";
import { webcam } from "../aframe-components/webcam";
import { grid } from "../aframe-components/gridComp";
import { coinComp } from "../aframe-components/coinComp";
import { gridsFence } from "../aframe-components/gridFenceComp";
import * as gameController from "./gameController";
import * as posenet from "./posenet";
import "../style.css";

var scene = document.querySelector("a-scene");
scene.addEventListener("loaded",async ()=> {
  document.querySelector("#loading-wrapper").style.display="flex";
  registerComponents();
  attachComoponents(); 
  gameController.initNewWorld();
  await posenet.initAIModel() ;
  await posenet.detectPose();
  document.querySelector("#loading-wrapper").classList.add("fade-in") ; 
  setTimeout(()=> document.querySelector("#loading-wrapper").style.display="none", 1500) ;
  document.getElementById("#snow_sound").components.sound.stopSound();
  document.getElementById("#snow_sound").components.sound.playSound(); 
});

function registerComponents() {
  AFRAME.registerComponent("player_comp", playerComp);
  AFRAME.registerComponent("camera_comp", cameraComp);
  AFRAME.registerComponent("world_comp", worldComp);
  AFRAME.registerComponent("webcam", webcam);
  AFRAME.registerComponent("grid", grid);
  AFRAME.registerComponent("grid-fence", gridsFence);
  AFRAME.registerComponent("coin_comp", coinComp);
  console.log("Registered");
}

function attachComoponents() {
  document.getElementById("camera_comp").setAttribute("camera_comp", "");
  document.getElementById("player").setAttribute("player_comp", "");
  //document.getElementById("webcam_obj").setAttribute("webcam", "");
}

async function startGame() {
  document.getElementById('main-menu').classList.add('fade-in') ; 
  setTimeout( () => {
    document.getElementById('main-menu').style.display = "none" ; 
    gameController.startGame();
  },2500);
}
function GameOverBtn(mainMenu){
  posenet.resetAngle();
  gameController.initNewWorld();
  if (mainMenu){
    document.getElementById('main-menu').classList.remove("fade-in");
    displayMainMenu() ; 
  }
  else 
    startGame();
}

async function displayMainMenu () {
  document.getElementById('main-menu').style.display = "flex" ; 
  document.getElementById('start-btn').onclick = startGame ; 
  document.getElementById("start-again-btn").onclick = ()=> GameOverBtn(false) ; 
  document.getElementById("back-to-menu-btn").onclick = ()=> GameOverBtn(true) ; 
  document.getElementById('how-to-play-btn').onclick = ()=> displayPanel('.how-to-play-panel') ; 
  document.getElementById('how-to-play-back-btn').onclick =()=> hidePanel('.how-to-play-panel');
  document.getElementById('credits-btn').onclick = ()=> displayPanel('.credits-panel') ;
  document.getElementById('credits-back-btn').onclick =()=> hidePanel('.credits-panel');
}

function displayPanel(selector) {
  document.querySelector(selector).style.display="flex";
}

function hidePanel(selector) {
  document.querySelector(selector).style.display="none";
}

displayMainMenu();
