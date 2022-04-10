export const cameraComp = {
    schema: {
      target: {type: 'selector'},
    },
    tick: function () {
      // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
      var targetPosition = this.data.target.object3D.position;
      // Translate the entity in the direction towards the target.
      this.el.sceneEl.camera.el.setAttribute('position', {
        x: targetPosition.x,
        y: targetPosition.y + 5,
        z: targetPosition.z + 10
      });
    }
  };
