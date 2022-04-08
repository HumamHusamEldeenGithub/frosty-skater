import * as posenet from "./posenet";


function calculateAngle(data) {
  var leftShoudlerFound = false,
    rightShoulderFound = false;
  var leftShoulder = new Object(),
    rightShoulder = new Object();
  for (var i = 0; i < data.keypoints.length; i++) {
    var key = data.keypoints[i];
    if (key.name == "left_shoulder") {
      leftShoulder.x = key.x;
      leftShoulder.y = key.y;
      leftShoudlerFound = true;
    }
    if (key.name == "right_shoulder") {
      rightShoulder.x = key.x;
      rightShoulder.y = key.y;
      rightShoulderFound = true;
    }
    if (leftShoudlerFound && rightShoulderFound) break;
  }
  var angle =
    Math.atan2(
      leftShoulder.y - rightShoulder.y,
      leftShoulder.x - rightShoulder.x
    ) *
    (180 / Math.PI);
  return angle;
}

function cubeMovementController(keypoints) {
  var angle = calculateAngle(keypoints[0]);
  var sceneEl = document.querySelector("a-scene");
  var box = sceneEl.querySelector("#redBox");
  var position = box.getAttribute("position");
  //console.log(position);
  position.x += angle * 0.01;
  box.setAttribute("position", position);
}

//Renderer
var animate = async function () {
  // Render 60 fps
  var deltaTime = 1000 / 60;
  setTimeout(requestAnimationFrame(animate), deltaTime);
  var keypoints = await posenet.detectPose();
  if (keypoints && keypoints[0].keypoints ) {
    cubeMovementController(keypoints);
  }
};
animate();
