var isMoving = false;
var playerWidth = 2;
var gridDim = { x: 40, y: 40 };
var maxRange = gridDim.x / 2 - playerWidth;
var maxGrids = 8;
var playerVelocity = new THREE.Vector3(0, 0, 0.02);
var playerHearts = 0 ;  
var powerUpsList = [] ; 
var gridCells = [];
var furthestCellIndex = 0;
var score = 0;

const additiveSpeed = 0.00008;
const maxSpeed = 0.5;

function initNewWorld() {

  document.getElementById("grids-wrapper").innerHTML = "";
  document.getElementById("grids-wrapper").setAttribute("position", "0 0 0");
  document.getElementById("player").setAttribute("position", "0 3 -10");
  document.getElementById("gameover-wrapper").style = "display:none";
  
  initGrids();
  furthestCellIndex = maxGrids - 1;
}

function startGame() {
  isMoving = true;
  score = 0;
  playerVelocity = new THREE.Vector3(0, 0, 0.02);
  increasePlayerHearts(3,true);
  document.querySelector('.player-stats').style.display="block";
}

function endGame() {
  isMoving = false;
  var currentScore = parseInt(score);
  var highestScore = localStorage.getItem("highest-score");

  document.getElementById("gameover-wrapper").style = "display:flex";
  document.querySelector(".final-score").innerHTML = currentScore;

  if (
    !highestScore ||
    isNaN(parseInt(highestScore)) ||
    parseInt(highestScore) < currentScore
  )
    highestScore = currentScore;

  localStorage.setItem("highest-score", highestScore);
  document.querySelector(".highest-score").innerHTML = highestScore;
}

function initGrids() {
  gridCells = [];
  var gridsWrapper = document.getElementById("grids-wrapper");
  gridsWrapper.innerHTML = "";
  var offset = (gridDim.y / 2) * -1;
  for (var i = 0; i < maxGrids; i++) {
    var newGrid = document.createElement("a-entity");
    newGrid.id = "grid";
    newGrid.setAttribute(
      "grid",
      "position:0 0 " + offset + "; index: " + i + " ;"
    );
    gridsWrapper.appendChild(newGrid);
    offset -= gridDim.y;
    gridCells.push(newGrid);
  }
}


async function updateScore(increment) {
  score += increment;
  document.querySelector(".score-div").innerHTML = parseInt(score);
}

function decreasePlayerHeart() {
  playerHearts -- ; 
  document.querySelector(".player-hearts-value").innerHTML = playerHearts ;
  if (playerHearts == 0)
    endGame() ; 
}

function increasePlayerHearts(increment , force) {
  if (force )
    playerHearts = increment ; 
  else 
    playerHearts += increment ; 
  document.querySelector(".player-hearts-value").innerHTML = playerHearts ; 
}

function moveCellToBehind(){
  if(furthestCellIndex >= maxGrids)
    furthestCellIndex = 0 ;
  playerVelocity.z += additiveSpeed;
  playerVelocity.z = Math.min(maxSpeed, playerVelocity.z);
  return gridCells[furthestCellIndex++];
}

export {
  isMoving,
  maxRange,
  maxGrids,
  gridDim,
  startGame,
  endGame,
  initGrids,
  updateScore,
  playerVelocity,
  powerUpsList,
  playerHearts,
  decreasePlayerHeart, 
  increasePlayerHearts,
  moveCellToBehind,
  initNewWorld
};
