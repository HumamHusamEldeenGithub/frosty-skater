import * as gameController from "../scripts/gameController";
export const gridsFence = {
    schema : {
        position : {type : "vec3"},
    } , 
    init: function () {
        this.model = this.el;
        this.model.object3D.position.copy(this.data.position);
        
        var t = gameController.gridDim.x/2 - 1;
        
        var cliff = document.createElement("a-entity");
        cliff.setAttribute("gltf-model", "#cliff");
        cliff.setAttribute("position", t + " 0 0");
        this.el.appendChild(cliff);
        
        t *= -1;

        var cliff2 = document.createElement("a-entity");
        cliff2.setAttribute("gltf-model", "#cliff");
        cliff2.setAttribute("position", t + " 0 0");
        cliff2.setAttribute("rotation", "0 180 0");
        this.el.appendChild(cliff2);
    },
  }
  