import * as posenet from "../scripts/posenet";
import * as gameController from "../scripts/gameController";

var mixer, clock;
var actions;

var centerAction, leftAction, rightAction;

var centerWeight = 1,
  leftWeight = 0,
  rightWeight = 0;

export const playerComp = {
  init() {
    // Collision detection
    this.el.addEventListener("collide", function (e) {
      console.log(e.detail);
      console.log("Player has collided with ", e.detail.body.el);
      gameController.endGame();
    });
    clock = new THREE.Clock();
    this.model = this.el;
    this.model.setAttribute("gltf-model", "#hoverboard");
    this.el.addEventListener("model-loaded", () => {
      var mesh = this.model.getObject3D("mesh");

      // Skinned mesh needs culling to be off
      mesh.traverse((child) => {
        if (child.type == "SkinnedMesh") {
          child.frustumCulled = false;
        }
      });

      //Initialize Animation Mixer
      const animations = mesh.animations;
      mixer = new THREE.AnimationMixer(mesh);

      centerAction = mixer.clipAction(animations[0]);
      leftAction = mixer.clipAction(animations[1]);
      rightAction = mixer.clipAction(animations[2]);
      actions = [centerAction, rightAction, leftAction];

      //Start all actions
      this.activateAllActions();
    });
    this.acceleration = 1.5 ; 
  },
  async tick(time, timeDelta) {
    if (!mixer) return;
    this.movementController(timeDelta / 1000);
    this.gradualWeightUpdate();
    mixer.update(timeDelta / 1000);
  },
  async movementController(timeDelta) {
    // This value is now updated asynchronously from posenet (No need to await)
    var angle = posenet.angle;
    var position = this.model.object3D.position;
    if (Math.abs(position.x - angle * timeDelta * this.acceleration) < gameController.maxRange)
      this.model.object3D.position.x -= angle * timeDelta * this.acceleration;
    //this.acceleration+= timeDelta /10 ; 
  },
  async activateAllActions() {
    actions.forEach((action) => {
      action.play();
    });
  },
  async gradualWeightUpdate() {
    // Too lazy to improve for now
    // It's working for now
    // لا حدا يسألني شو هاد
    var angle = posenet.angle;
    var percent = Math.abs(angle) / 10;
    var centerPercent = 1 - percent;
    var timeDelta = 0.01;
    if (centerWeight > centerPercent + 0.1) {
      centerWeight -= timeDelta;
      if (angle > 0) {
        if (leftWeight < 1) leftWeight += timeDelta;
        if (rightWeight > 0) {
          rightWeight -= timeDelta;
          rightWeight = Math.max(0, rightWeight);
        }
      } else {
        if (rightWeight < 1) rightWeight += timeDelta;
        if (leftWeight > 0) {
          leftWeight -= timeDelta;
          leftWeight = Math.max(0, leftWeight);
        }
      }
    } else if (centerWeight < centerPercent - 0.1) {
      centerWeight += timeDelta;
      if (angle > 0) {
        if (leftWeight > 0) {
          leftWeight -= timeDelta;
          leftWeight = Math.max(0, leftWeight);
        }
      } else {
        if (rightWeight > 0) {
          rightWeight -= timeDelta;
          rightWeight = Math.max(0, rightWeight);
        }
      }
    }
    setWeight(centerAction, centerWeight);
    setWeight(leftAction, leftWeight);
    setWeight(rightAction, rightWeight);
  },
};

async function setWeight(action, weight) {
  action.enabled = true;
  action.setEffectiveWeight(weight);
}
