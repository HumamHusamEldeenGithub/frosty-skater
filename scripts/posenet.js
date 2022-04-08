import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";

const detectorConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
};
const detector = await poseDetection.createDetector(
  poseDetection.SupportedModels.MoveNet,
  detectorConfig
);
document.querySelector("#loading-wrapper").remove();

export async function detectPose() {
  try {
    var cameraBox = document.querySelector("#webcam");
    const canvas = document.createElement("canvas");
    canvas.width = cameraBox.videoWidth;
    canvas.height = cameraBox.videoHeight;

    if (canvas.width == 0 || canvas.height == 0) throw "NOT LOADED YET";

    canvas
      .getContext("2d")
      .drawImage(cameraBox, 0, 0, canvas.width, canvas.height);
    const keypoints = await detector.estimatePoses(canvas);
    return keypoints;
  } catch (e) {
    console.log(e);
  }
}


export async function calculateAngle() {
  var data = await detectPose();
  if(!data || !data[0].keypoints || data[0].keypoints.length == 0)
    return 0;
  var leftShoudlerFound = false,
    rightShoulderFound = false;
  var leftShoulder = new Object(),
    rightShoulder = new Object();
  for (var i = 0; i < data[0].keypoints.length; i++) {
    var key = data[0].keypoints[i];
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
