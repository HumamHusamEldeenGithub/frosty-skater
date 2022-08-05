var isMoving = false;
var maxRange = 20;
var gridDim = { x: 500, y: 500 };
var maxGrids = 6;
var gridMargin = 20;

function startGame() {
  isMoving = true;
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
}

function initGrids() {
  var gridsWrapper = document.getElementById("grids-wrapper");
  gridsWrapper.innerHTML = "";
  var offset = (gridDim.y / 2) * -1;
  for (var i = 0; i < maxGrids; i++) {
    var newGrid = document.createElement("a-entity");
    newGrid.id = "grid";
    newGrid.setAttribute("grid", "position:0 0 " + offset + "; index: " + i +" ;");
    gridsWrapper.appendChild(newGrid);
    offset -= gridDim.y;
  }
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
};
