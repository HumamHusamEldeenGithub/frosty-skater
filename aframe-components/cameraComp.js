export const cameraComp = {
  init: function () {
    this.model = this.el;
    this.model.object3D.position.set(0, 18, 5);
    this.model.object3D.rotation.set(-0.5, 0, 0);
  },
};
