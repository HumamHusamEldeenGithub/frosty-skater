import * as posenet from "../scripts/posenet";
import * as gameController from "../scripts/gameController";

var mixer , clock;
var actions;

var centerAction, leftAction, rightAction;

var centerWeight = 1,
  leftWeight = 0,
  rightWeight = 0;

export const playerComp = {
  schema: {
    score: { type: "number" },
  },
  init() {
    // Collision detection
    this.el.addEventListener("collide", function (e) {
      console.log(e.detail);
      console.log("Player has collided with ", e.detail.body.el);
      document.getElementById('#crashed').components.sound.playSound();
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
    //this.gradualWeightUpdate(timeDelta / 1000);
    this.updateScore(timeDelta /1000); 
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
  async gradualWeightUpdate(timeDelta) {
    var angle = posenet.angle;

    // Clamping the angle
    if(angle > 0)
      angle = Math.min(angle,15);
    else
      angle = Math.max(angle,-15);

    var percent = Math.abs(angle) / 15;
    var centerPercent = 1 - percent;

    // Going to edge
    if (centerWeight > centerPercent) {
      centerWeight -= timeDelta;
      if (angle > 0) {
        leftWeight += timeDelta;
        rightWeight = 1 - centerWeight - leftWeight;
      } else {
        rightWeight += timeDelta;
        leftWeight = 1 - centerWeight - rightWeight;
      }
    // Recentering
    } else if (centerWeight < centerPercent) {
        centerWeight += timeDelta;
        leftWeight = Math.max(0, leftWeight - timeDelta);
        rightWeight = Math.max(0, rightWeight - timeDelta);
    }
    setWeight(centerAction, centerWeight);
    setWeight(leftAction, leftWeight);
    setWeight(rightAction, rightWeight);
  },

  async updateScore (timeDelta) {
    var score = parseFloat(document.querySelector('.score-div').innerHTML)
    this.data.score +=timeDelta ; 
    document.querySelector('.score-div').innerHTML = parseInt(this.data.score);
  }

};

async function setWeight(action, weight) {
  action.enabled = true;
  action.setEffectiveWeight(weight);
}
