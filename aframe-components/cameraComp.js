export const cameraComp = {
  init: function () {
    this.model = this.el;
    this.model.object3D.position.set(0, 15, 15);
    this.model.object3D.rotation.set(-Math.PI * 20 / 180, 0, 0);
  },
};
