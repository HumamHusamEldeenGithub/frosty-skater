import * as gameController from "../scripts/gameController";
import { gridsFence } from "../aframe-components/gridFenceComp";

export const grid = {
  schema: {
    position: { type: "vec3" },
    index: { type: "int" },
    obstaclesIndexes: { type: "array" },
  },
  multiple: true,
  init: async function () {
    this.model = this.el;
    this.model.object3D.position.copy(this.data.position);

    var plane = document.createElement("a-entity");
    var fence = document.createElement("a-entity");
    var elements = document.createElement('a-entity') ; 

    plane.setAttribute("gltf-model", "#ground");
    
    fence.setAttribute("grid-fence", "");

    elements.classList.add('elements') ; 

    this.el.appendChild(plane);
    this.el.appendChild(elements) ; 
    this.el.appendChild(fence);
    this.velocity = new THREE.Vector3(0, 0, 0.005);

    this.speed = 0.0005 ; 

    this.generateObstacles();
    this.generateCoins();
  },
  tick: async function (time, timeDelta) {
    if (gameController.isMoving) {
      if (this.model.object3D.position.z >= gameController.gridDim.y / 2) {
        this.resetGrid() ;
      }
      var dist = new THREE.Vector3()
        .copy(this.velocity)
        .multiplyScalar(timeDelta);
      this.model.object3D.position.add(dist);
    }
    this.velocity.z += this.speed * timeDelta /1000 ; 
  },

  resetGrid() {
    this.model.object3D.position.set(
      0,
      0,
      gameController.gridDim.y * gameController.maxGrids * -1 +
        gameController.gridDim.y / 2 +
        gameController.gridMargin
    );
    this.el.children[1].innerHTML = "" ; 
    this.generateObstacles() ; 
    this.generateCoins() ; 
  },

  generateObstacles() {
    this.data.obstaclesIndexes = [] ; 
    var boxDepth = 5;
    var boxWidth = gameController.gridDim.x / 3.5;
    var boxHeight = 5;

    var z_offset;

    if (this.data.index == 0) z_offset = gameController.gridDim.y;
    else z_offset = (gameController.gridDim.y / 2) * -1;

    // Divide the plane into 3 sections
    var planSection = this.generateRandomIndex(0, 2, -1);

    var x_offset = -gameController.gridDim.x / 2;

    for (; z_offset < gameController.gridDim.y / 2; z_offset += boxDepth * gameController.gridDim.y / 2) {
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
      obstacle.setAttribute("position", x_pos + " 2.5 " + z_pos);
      obstacle.setAttribute("material", "color:gray;");
      this.el.children[1].appendChild(obstacle);

      this.data.obstaclesIndexes.push(planSection);

      planSection = this.generateRandomIndex(0, 2, planSection);
    }
  },

  generateCoins() {
    var step = 1;
    var x_offset = -gameController.gridDim.x / 2;
    var z_offset = 0 ;

    for (
      var index = 0;
      z_offset < gameController.gridDim.y / 2;
      index++, z_offset += step * 10
    ) {
      var coin = document.createElement("a-entity");
      coin.setAttribute("coin_comp", "");
      var currObtacleIndex = this.data.obstaclesIndexes[index];
      var nextObtacleIndex = this.data.obstaclesIndexes[index + 1];


      console.log(this.data.obstaclesIndexes);
      var selectedSection = this.getSectionIndex(
        Math.min(currObtacleIndex, nextObtacleIndex),
        Math.max(currObtacleIndex, nextObtacleIndex)
      );
      var x_pos =
        (x_offset + (gameController.gridDim.x / 2) * selectedSection) / 2;
      var z_pos = z_offset;

      coin.setAttribute("static-body", "");
      coin.setAttribute("position", x_pos + " 5 " + z_pos);
      this.el.children[1].appendChild(coin);
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
    else return 1;
  },
};
