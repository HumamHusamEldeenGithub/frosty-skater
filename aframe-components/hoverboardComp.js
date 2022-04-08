import * as posenet from "../scripts/posenet";

const hoverboardComp = {
    init(){
        this.model = this.el.sceneEl.sceneEl.querySelector("#redBox");
    },
    tick(){
       this.cubeMovementController();
    },
    async cubeMovementController() {
        this.model.position = this.model.getAttribute("position");
        var angle = await posenet.calculateAngle();
        this.model.position.x -= angle * 0.01;
        const a = new THREE.Euler( 0, 0, angle * 0.02, 'XYZ' );
        const b = new THREE.Vector3( 0, 0, 1 );
        b.applyEuler(a);
        this.model.object3D.rotation.copy(a);
    },
}

export {hoverboardComp};