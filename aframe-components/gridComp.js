import * as gameController from "../scripts/gameController";
import { gridsFence } from "../aframe-components/gridFenceComp";
var objectsCombination = ["o", "c", "n"];

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

    this.generateObstacles();
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
  },
  generateObstacles() {
    if (!gameController.isMoving && this.data.index == 0) return ;

    //Shuffle order of spawnable objects
    var lastComb = objectsCombination;
    var tryCount = 5;
    while(lastComb[0] == objectsCombination[0]  &&
      lastComb[1] == objectsCombination[1] &&
       tryCount > 0){
      objectsCombination = this.shuffle(objectsCombination);
      tryCount--;
    }

    var x_offset = gameController.gridDim.x / 3;
    for (var i = 0;i < 3; i++) {
      console.log(objectsCombination[i]);
      if(objectsCombination[i] == "n")
        continue;

      var position = x_offset * (i-1) + " 0 0";

      if(objectsCombination[i] == "o"){

        var position = x_offset * (i-1) + " 0 0";
        this.generateObstacle(position);
      }

      else{

        var position = x_offset * (i-1) + " 3 0";
        this.generateCoin(position);
      }
    }
    console.log("______________");
  },

  generateCoin(position) {
    var coin = document.createElement("a-entity");
    coin.setAttribute("coin_comp", "");
    coin.setAttribute("static-body", "shape: sphere; sphereRadius: 2; offset: 0 2 0;");
    coin.setAttribute("position", position);
    this.el.children[1].appendChild(coin);
  },
  generateObstacle(position) {
    var obstacle = document.createElement("a-entity");
    obstacle.setAttribute("gltf-model", "#obstacle_" +(Math.floor(Math.random() * 2)+1).toString());
    obstacle.setAttribute("static-body", "shape: sphere; sphereRadius: 5");
    obstacle.setAttribute("position", position);
    this.el.children[1].appendChild(obstacle);
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
  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
};
