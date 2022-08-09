var isMoving = false;
var playerWidth = 2;
var gridDim = { x: 40, y: 40 };
var maxRange = gridDim.x / 2 - playerWidth;
var maxGrids = 6;
var gridMargin = 20;
var playerVelocity = new THREE.Vector3(0, 0, 0.02);
var playerHearts = 0 ;  
var powerUpsList = [] ; 


var score = 0;

function startGame() {
  isMoving = true;
  score = 0;
  increasePlayerHearts(3);
  document.querySelector('.player-stats').style.display="block";
  document.getElementById("grids-wrapper").innerHTML = 0;
  document.getElementById("grids-wrapper").setAttribute("position", "0 0 0");
  document.getElementById("player").setAttribute("position", "-2 3 -10");
  document.getElementById("gameover-wrapper").style = "display:none";
  var startBtn = document.getElementById("startBtn");
  if (!onclick) startBtn.onclick = startGame;
  initGrids();
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

function increasePlayerHearts(increment) {
  playerHearts += increment ; 
  document.querySelector(".player-hearts-value").innerHTML = playerHearts ; 
}

export {
  isMoving,
  maxRange,
  maxGrids,
  gridDim,
  gridMargin,
  startGame,
  endGame,
  initGrids,
  updateScore,
  playerVelocity,
  powerUpsList,
  playerHearts,
  decreasePlayerHeart , 
  increasePlayerHearts
};
