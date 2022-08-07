import { min } from "@tensorflow/tfjs-core";
import * as gameController from "../scripts/gameController";

export const grid = {
  schema: {
    position: { type: "vec3" },
    index: { type: "int" },
    obstalcesIndexes: { type: "array" },
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
    this.generateCoins();
  },
  tick: async function (time, timeDelta) {
    if (gameController.isMoving) {
      if (this.model.object3D.position.z >= gameController.gridDim.y / 2) {
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
    var boxWidth = 50;
    var boxHeight = 10;

    var z_offset;

    if (this.data.index == 0) z_offset = gameController.gridDim.y;
    else z_offset = (gameController.gridDim.y / 2) * -1;

    // Divide the plane into 3 sections
    var planSection = this.generateRandomIndex(0, 2, -1);

    var x_offset = -gameController.gridDim.x / 2;

    for (; z_offset < gameController.gridDim.y / 2; z_offset += boxDepth * 10) {
      var obstacle = document.createElement("a-box");

      var x_pos = x_offset + (planSection * gameController.gridDim.x) / 2;
      if (x_pos < 0) {
        x_pos += boxWidth / 2;
      } else if (x_pos > 0) {
        x_pos -= boxWidth / 2;
      }

      var z_pos = z_offset;

      obstacle.setAttribute("width", boxWidth);
      obstacle.setAttribute("height", boxHeight);
      obstacle.setAttribute("depth", boxDepth);
      obstacle.setAttribute("static-body", "");
      obstacle.setAttribute("position", x_pos + " 5 " + z_pos);
      obstacle.setAttribute("material", "color:gray;");
      this.el.appendChild(obstacle);

      this.data.obstalcesIndexes.push(planSection);

      planSection = this.generateRandomIndex(0, 2, planSection);
    }
    console.log(this.data.obstalcesIndexes);
  },

  generateCoins() {
    var step = 10;
    var x_offset = -gameController.gridDim.x / 2;
    var z_offset ;

    if (this.data.index == 0) z_offset = gameController.gridDim.y;
    else z_offset = (gameController.gridDim.y / 2) * -1;

    for (
      var index = 0;
      z_offset < gameController.gridDim.y / 2;
      index++, z_offset += step * 10
    ) {
      var coin = document.createElement("a-box");
      coin.setAttribute("coin_comp", "");

      var currObtacleIndex = this.data.obstalcesIndexes[index];
      var nextObtacleIndex = this.data.obstalcesIndexes[index + 1];

      var selectedSection = this.getSectionIndex(
        Math.min(currObtacleIndex, nextObtacleIndex),
        Math.max(currObtacleIndex, nextObtacleIndex)
      );

      var x_pos =
        (x_offset + (gameController.gridDim.x / 2) * selectedSection) / 2;
      var z_pos = z_offset;

      coin.setAttribute("static-body", "");
      coin.setAttribute("position", x_pos + " 5 " + z_pos);
      this.el.appendChild(coin);
    }
  },
  generateRandomIndex(min, max, prev) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return prev == num ? this.generateRandomIndex(min, max, prev) : num;
  },
  getSectionIndex(curr, next) {
    if (curr == 0 && next == 1) return 2;
    if (curr == 0 && next == 2) return 1;
    if (curr == 1 && next == 2) return 0;
  },
};
