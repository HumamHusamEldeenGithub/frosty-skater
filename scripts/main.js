import {hoverboardComp} from '../aframe-components/hoverboardComp';
import {timeComponent} from '../aframe-components/timeComponents';
import "../style.css"


var scene = document.querySelector('a-scene');


if (scene.hasLoaded) {
  registerComponents();
} else {
  scene.addEventListener('loaded', registerComponents);
}


function registerComponents(){
  AFRAME.registerComponent("hoverboard", hoverboardComp);
  document.getElementById('redBox').setAttribute('hoverboard', '');
  AFRAME.registerComponent("time-comps", timeComponent);
  scene.setAttribute('time-comps', '');
  console.log("Registered");
}
