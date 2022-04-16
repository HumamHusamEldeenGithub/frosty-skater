export const webcam = {
  init: async function () {
    var webCamElement = this.el;
    webCamElement.object3D.material = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    webCamElement.object3D.material.flatShading = true;
    webCamElement.object3D.material.needsUpdate = true;
    webCamElement.object3D.position.set(-4.4, -2, -3);
  },
};
