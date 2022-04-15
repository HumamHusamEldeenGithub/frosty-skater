
export const worldComp = {
    schema: {
    },
    init: function() {
        this.model = this.el.sceneEl.sceneEl.querySelector("#world");
        this.velocity = 1;
    },
    tick: function (time,timeDelta) {
        this.velocity+=0.01/timeDelta;
        this.model.rotation = this.model.object3D.rotation;
        this.model.object3D.rotateOnAxis( new THREE.Vector3(1,0,0),this.velocity/timeDelta);
    }
  };
