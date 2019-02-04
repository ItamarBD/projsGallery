var gPacman = {};
var pacmanLocations = [];
// const PACMAN = '&#9786;';
// var pacmanImg = document.createElement("img");
// pacmanImg.src = "img/pacmanRight.png";
// var src = document.getElementById("x");
// src.appendChild(pacmanImg);

var PACMAN = '<img src="img/pacmanRight.png" height="30" width="30">';
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
    color: '#ffffff',
    currCellContent: ''

  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    updateScore(1);
    pacmanLocations.push(gPacman.location);
    if (gGame.score === 57) gameOver();   //gFoodCount - gWallBlocksCount - 1) gameOver();
  } else if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    } else {
      updateScore(1);
      gPacman.color = '#00f459';
      for (var i = 0; i < gGhosts.length; i++) {
        if (nextLocation.i === gGhosts[i].location.i && nextLocation.j === gGhosts[i].location.j) {
          gGhosts.splice(i, 1);
          //if (gGhosts.currCellContent === FOOD) updateScore(1);
          // if (gGhosts[i].location.i === gBoard[pacmanLocations[i].i] &&
          //   gGhosts[i].location.j === [pacmanLocations[i].j]) {
          //     updateScore(1);
          //   }

        }
      }
    }
  } else if (nextCell === POWER_FOOD) {
    if (!gPacman.isSuper) {
      gPacman.isSuper = true;
      console.log('Super!');
      gPacman.color = '#00f459';
      setTimeout(function () {
        gPacman.isSuper = false;
        gPacman.color = '#ffffff';
      }, 5000)
    } else {
      return;
      //   //nextCell = POWER_FOOD;
      //   var prevCell = gPacman.location;
      //     console.log('prev', nextCell);
      //       gBoard[gPacman.location.i][gPacman.location.j] = '✪';
      //       renderCell(prevCell, POWER_FOOD)
      //   console.log('Trying to pick superfood when already super')
    }
  }
  if (nextCell === CHERRY) {
    updateScore(10);
    gCherryCount++;
  }


  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  if (gPacman.currCellContent === POWER_FOOD && gPacman.isSuper) {
    console.log('power in power')
    gPacman.currCellContent = '';
    renderCell(gPacman.location, POWER_FOOD)
  }
  else renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, getPacmanHTML());

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      PACMAN = '<img src="img/pacmanUp.png" height="30" width="30">'
      nextLocation.i--;
      break;
    case 'ArrowDown':
      PACMAN = '<img src="img/pacmanDown.png" height="30" width="30">'
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      PACMAN = '<img src="img/pacmanLeft.png" height="30" width="30">'
      nextLocation.j--;
      break;
    case 'ArrowRight':
      PACMAN = '<img src="img/pacmanRight.png" height="30" width="30">'
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}

function getPacmanHTML() {
  return `<span style="color:${gPacman.color}">${PACMAN}</span>`
}
