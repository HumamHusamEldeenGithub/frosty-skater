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
