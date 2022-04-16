import * as posenet from "../scripts/posenet";

export const playerComp = {
  init() {
    this.model = this.el;
  },
  async tick(time, timeDelta) {
    var angle = await posenet.calculateAngle();
    if (Math.abs(angle) < 1) return;
    this.movementController(angle, timeDelta);
  },
  async movementController(angle, timeDelta) {
    if (Math.abs(this.model.object3D.position.x - angle * 0.01) < 10)
      this.model.object3D.position.x -= angle * 0.01;
  },
};
