export const grid = {
  init: async function () {
    this.model = this.el;
    this.velocity = new THREE.Vector3(0, 0, 10 / 1000);
  },
  tick: async function (time, timeDelta) {
    var dist = new THREE.Vector3()
      .copy(this.velocity)
      .multiplyScalar(timeDelta);
    this.model.object3D.position.add(dist);
  },
};
