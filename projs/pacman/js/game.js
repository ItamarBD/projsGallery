'use strict';
const WALL = '▩';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '☢';
const CHERRY = '🍒';
const SIZE = 10;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};
var gWallBlocksCount = 0;
var gFoodCount = 0;
var gCherryCount = 0;
var gResetButton = document.querySelector(".resetBtn");

function init() {
  gResetButton.style.display = 'none';
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
        gWallBlocksCount++;
      }
    }
  }
  //power food locations
  board[1][1] = board[1][8] = board[8][1] = board[8][8] = POWER_FOOD;


  return board;
}
function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}
function resetGame() {
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = gGame.score;
  console.log('new game');
  init();
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function gameOver() {
  console.log('Game Over');
  gResetButton.style.display = 'block';
  gGame.isOn = false;
  var ghostColor = '#00f459';
  getGhostHTML(ghostColor);
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = 0;
}
function victory() {
  console.log('victory!');
  gResetButton.style.display = 'block';
  
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = 0;
  //var elVictory = document.querySelector(".victoryImg");
  //elVictory.style.display = 'block';
}

// place a cherry
setInterval(addCherry, 15000);
function addCherry() {
  // debugger
  if (pacmanLocations.length) {
    
    var idx = Math.floor(Math.random() * (pacmanLocations.length)) ;
    // console.log('idx' ,idx)
    // console.log('pacmanLocations[idx]' ,idx)
    var row = gPacman.location.i;
    var col = gPacman.location.j;
    if (!(pacmanLocations[idx].i === row && 
      pacmanLocations[idx].j === col)) 
      gBoard[pacmanLocations[idx].i][pacmanLocations[idx].j] = CHERRY
      renderCell(pacmanLocations[idx], CHERRY);
    }
  }
  
  