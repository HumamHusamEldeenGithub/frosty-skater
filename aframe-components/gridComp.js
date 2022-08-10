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
    const uniforms = ["ff", "dd"];
    const shaderMaterial = new THREE.ShaderMaterial( {

      uniforms: uniforms,
      vertexShader: document.getElementById( 'vertexshader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentshader' ).textContent

    } );
    this.model = this.el;
    this.model.object3D.position.copy(this.data.position);

    var plane = document.createElement("a-entity");
    var fence = document.createElement("a-entity");
    var elements = document.createElement("a-entity");

    plane.setAttribute("gltf-model", "#ground");

    fence.setAttribute("grid-fence", "");

    elements.classList.add("elements");

    this.el.appendChild(plane);
    this.el.appendChild(elements);
    this.el.appendChild(fence);

    this.speed = 0.0005;

    this.generateObstacles();
    this.generateCoins();
  },
  tick: async function (time, timeDelta) {
    if (gameController.isMoving) {
      if (this.model.object3D.position.z >= gameController.gridDim.y / 1.5) {
        this.resetGrid();
      }
      var dist = new THREE.Vector3()
        .copy(gameController.playerVelocity)
        .multiplyScalar(timeDelta);
      this.model.object3D.position.add(dist);
      gameController.playerVelocity.z += (this.speed * timeDelta) / 10000;
    }
  },

  resetGrid() {
    var newPos = gameController.moveCellToBehind().getAttribute("position");
    console.log(newPos);
    this.model.object3D.position.set(
      0,
      0,
      newPos.z -
      gameController.gridDim.y
    );
    this.el.children[1].innerHTML = "";
    this.generateObstacles();
    this.generateCoins();
  },

  generateObstacles() {
    this.data.obstaclesIndexes = [];

    var z_offset;

    if (this.data.index == 0) return ;

    z_offset = (gameController.gridDim.y / 4) * -1;

    // Divide the plane into 3 sections
    var planSection = this.generateRandomIndex(0, 2, -1);
    var x_offset = gameController.gridDim.x / 3;

    for (
      ;
      z_offset < gameController.gridDim.y / 2;
      z_offset += (gameController.gridDim.y) / 2
    ) {
      var obstacle = document.createElement("a-entity");
      obstacle.setAttribute("gltf-model", "#obstacle_" +(Math.floor(Math.random() * 2)+1).toString());

      var x_pos = x_offset * (planSection - 1);
      var z_pos = z_offset;
      obstacle.setAttribute("static-body", "shape: sphere; sphereRadius: 5");
      obstacle.setAttribute("position", x_pos + " 0 " + z_pos);
      obstacle.setAttribute("material", "color:gray;");
      this.el.children[1].appendChild(obstacle);

      this.data.obstaclesIndexes.push(planSection);

      planSection = this.generateRandomIndex(0, 2, planSection);
    }
  },

  generateCoins() {
    var step = 1;
    var x_offset = -gameController.gridDim.x / 3;
    var z_offset = 0;

    for (
      var index = 0;
      z_offset < gameController.gridDim.y / 2;
      index++, z_offset += (gameController.gridDim.y) / 2
    ) {
      var coin = document.createElement("a-entity");
      coin.setAttribute("coin_comp", "");
      var currObtacleIndex = this.data.obstaclesIndexes[index];
      var nextObtacleIndex = this.data.obstaclesIndexes[index + 1];

      var selectedSection = this.getSectionIndex(
        Math.min(currObtacleIndex, nextObtacleIndex),
        Math.max(currObtacleIndex, nextObtacleIndex)
      ) - 1;
      var x_pos =
        (x_offset * selectedSection);
      var z_pos = z_offset;

      coin.setAttribute("static-body", "");
      coin.setAttribute("position", x_pos + " 2 " + z_pos);
      this.el.children[1].appendChild(coin);
    }
  },
  generateRandomIndex(min, max, prev) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return prev == num ? this.generateRandomIndex(min, max, prev) : num;
  },
  getSectionIndex(curr, next) {
    if (curr == 0 && (next == 1 || !next)) return 2;
    if (curr == 0 && (next == 2 || !next)) return 1;
    if (curr == 1 && (next == 2 || !next)) return 0;
  },
};
