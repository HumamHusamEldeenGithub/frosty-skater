export const cameraComp = {
  init: function () {
    this.model = this.el;
    this.model.object3D.position.set(0, 15, -10);
    this.model.object3D.rotation.set(Math.PI * 40 / 180, Math.PI, 0);
  },
};
