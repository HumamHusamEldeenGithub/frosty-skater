var isMoving = false;
var playerWidth = 2;
var gridDim = { x: 150, y: 500 };
var maxRange = gridDim.x / 2 - playerWidth;
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
  initGridFence();
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

function initGridFence() {
  var gridsFence = document.getElementById("grids-fence");
  gridsFence.innerHTML = "";

  var gridLength = gridDim.y * maxGrids;

  var x_offset = -gridDim.x / 2;
  var y_center = gridLength / 2;

  // Left fence
  var leftFence = createFence(x_offset, y_center, gridLength);

  // Right Fence
  var rightFence = createFence(-x_offset, y_center, gridLength);

  gridsFence.appendChild(leftFence);
  gridsFence.appendChild(rightFence);
}

function createFence(x, y, length) {
  var fence = document.createElement("a-box");
  fence.setAttribute("gridFence", "");
  fence.setAttribute("position", x + " 0 " + -y);
  fence.setAttribute("height", 25);
  fence.setAttribute("depth", length + 10);
  return fence;
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
  initGridFence,
  updateScore,
};
