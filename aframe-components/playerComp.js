import * as posenet from "../scripts/posenet";
import * as gameController from "../scripts/gameController";
import { checkCoinType } from "../scripts/powerUp-logic";

var mixer, clock;
var actions;

var centerAction, leftAction, rightAction;

var centerWeight = 1,
  leftWeight = 0,
  rightWeight = 0;

export const playerComp = {
  init() {
    // Collision detection
    this.el.addEventListener("collide", (e) => this.checkCollision(e));

    clock = new THREE.Clock();
    this.model = this.el;
    this.model.setAttribute("scale","0.5 0.5 0.5");
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
    this.acceleration = 1;
  },

  async tick(time, timeDelta) {
    if (!mixer) return;
    this.movementController(timeDelta / 1000);
    //this.gradualWeightUpdate(timeDelta / 1000);
    this.decreasePowerUpsDuration(timeDelta / 1000);
    gameController.updateScore(timeDelta / 1000);
    //mixer.update(timeDelta / 1000);
  },

  async checkCollision(e) {
    console.log(e.detail);
    console.log("Player has collided with ", e.detail.body.el);

    var isCoin = e.detail.body.el.getAttribute("coin_comp");

    if (isCoin) {
      document.getElementById("#coin_sound").components.sound.stopSound();
      document.getElementById("#coin_sound").components.sound.playSound();
      gameController.updateScore(
        parseFloat(e.detail.body.el.getAttribute("coinValue"))
      );
      checkCoinType(isCoin);
    } else {
      var shieldMode = gameController.powerUpsList.find(
        (element) => element.id == 1
      );
      if (shieldMode) {
        document.getElementById("#hit").components.sound.stopSound();
        document.getElementById("#hit").components.sound.playSound();
        gameController.updateScore(parseFloat(200));
        
      } else {
        document.getElementById("#crashed").components.sound.stopSound();
        document.getElementById("#crashed").components.sound.playSound();
        gameController.decreasePlayerHeart() ;
      }
    }
    e.detail.body.el.remove();
  },

  async decreasePowerUpsDuration(timeDelta) {
    for (var i = 0; i < gameController.powerUpsList.length; i++) {
      var powerUp = gameController.powerUpsList[i];
      powerUp.duration -= timeDelta;
      try {
        if (powerUp.duration <= 0)
          document.querySelector(".powerup-" + powerUp.id).remove();
        else
          document.querySelector(
            ".powerup-" + powerUp.id
          ).children[0].innerHTML = parseInt(powerUp.duration);
      } catch (e) {
        console.log(e);
      }
      if (powerUp.duration <= 0) gameController.powerUpsList.splice(i, 1);
    }
  },

  async movementController(timeDelta) {
    // This value is now updated asynchronously from posenet (No need to await)
    var angle = posenet.angle;
    var position = this.model.object3D.position;
    if (
      Math.abs(position.x - angle * timeDelta * this.acceleration) <
      gameController.maxRange
    )
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
    if (angle > 0) angle = Math.min(angle, 15);
    else angle = Math.max(angle, -15);

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
};

async function setWeight(action, weight) {
  action.enabled = true;
  action.setEffectiveWeight(weight);
}
