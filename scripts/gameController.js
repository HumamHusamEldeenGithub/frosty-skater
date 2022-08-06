var isMoving = false;
var gridDim = { x: 150, y: 500 };
var maxRange = gridDim.x / 2;
var maxGrids = 6;
var gridMargin = 20;
var score = 0;

function startGame() {
  isMoving = true;
  score = 0;
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
  document.getElementById("gameover-wrapper").style = "display:flex";
  document.querySelector(".final-score").innerHTML = parseInt(score);
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
};
