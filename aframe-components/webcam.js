export const webcam = {
    init: async function(){
        var webCamElement = this.el;
        var planeGeometry = new THREE.PlaneGeometry();
        webCamElement.object3D.material = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({color: 0xFF0000}));
        webCamElement.object3D.material.flatShading = true;
        webCamElement.object3D.material.needsUpdate = true;
        webCamElement.object3D.position.x = -4.5;
        webCamElement.object3D.position.y = -2;
      }
  };
