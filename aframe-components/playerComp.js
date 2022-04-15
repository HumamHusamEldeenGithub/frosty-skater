import * as posenet from "../scripts/posenet";

const playerComp = {
  init() {
    this.model = this.el.sceneEl.sceneEl.querySelector("#player");
    this.velocity = new THREE.Vector3(0, 0, -0.1);
  },
  async tick(time, timeDelta) {
    var angle = await posenet.calculateAngle();
    //this.movementController(angle, timeDelta);
    this.rotationController(angle);
  },
  async movementController(angle,timeDelta) {
    this.model.position = this.model.getAttribute("position");
    // Adding Velocity
    var dist = new THREE.Vector3()
      .copy(this.velocity)
      .multiplyScalar(timeDelta);
    this.model.position.add(dist);

    if (Math.abs(angle) < 1) return;
    this.model.position.x -= angle * 0.01;
  },
  async rotationController(angle) {
    if (Math.abs(angle) < 1) return;
    const a = new THREE.Euler(0, 0, angle * 0.02, "XYZ");
    const b = new THREE.Vector3(0, 0, 1);
    b.applyEuler(a);
    this.model.object3D.rotation.copy(a);
  },
};

export { playerComp };
