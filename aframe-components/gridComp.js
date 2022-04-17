import * as gameController from "../scripts/gameController";

export const grid = {
  schema: {
    position: { type: "vec3" },
  },
  multiple: true,
  init: async function () {
    this.model = this.el;
    this.model.object3D.position.copy(this.data.position);
    var plane = document.createElement("a-plane");
    plane.setAttribute("rotation", "-90 0 0");
    plane.setAttribute(
      "material",
      "color: #FFFFFF;src:#snow;repeat:50 50; normal-map:#snow_map;normal-texture-repeat:50 50;"
    );
    plane.setAttribute(
      "scale",
      gameController.gridDim.x + " " + gameController.gridDim.y + " 1"
    );
    this.el.appendChild(plane);
    this.velocity = new THREE.Vector3(0, 0, 10 / 100);
    this.generateObstacles();
  },
  tick: async function (time, timeDelta) {
    if (gameController.isMoving) {
      if (this.model.object3D.position.z >= gameController.gridDim.y / 2) {
        console.log("refresh");
        return this.model.object3D.position.set(
          0,
          0,
          gameController.gridDim.y * gameController.maxGrids * -1 +
            gameController.gridDim.y / 2 +
            gameController.gridMargin
        );
      }
      var dist = new THREE.Vector3()
        .copy(this.velocity)
        .multiplyScalar(timeDelta);
      this.model.object3D.position.add(dist);
    }
  },
  generateObstacles() {
    var boxDepth = 10;
    var boxWidth = 20;
    var boxHeight = 10;
    var offset = (gameController.gridDim.y / 2) * -1 - 30;
    for (; offset < gameController.gridDim.y / 2; offset += boxDepth * 5) {
      var obstacle = document.createElement("a-box");
      var x_pos =
        Math.floor(Math.random() * gameController.gridDim.y) -
        gameController.gridDim.y / 2;
      var z_pos = offset;
      obstacle.setAttribute("width", boxWidth);
      obstacle.setAttribute("height", boxHeight);
      obstacle.setAttribute("depth", boxDepth);
      obstacle.setAttribute("static-body", "");
      obstacle.setAttribute("position", x_pos + " 5 " + z_pos);
      this.el.appendChild(obstacle);
    }
  },
};
