'use strict'

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var piece = ''
            if (i === 1) piece = PAWN_BLACK;
            if (i === 6) piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }

    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[4][3] = QUEEN_BLACK;
    board[0][4] = KING_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = QUEEN_WHITE;
    board[4][2 ] = KING_WHITE;

    board[3][3] = BISHOP_BLACK;

    // TODO: build the board 8 * 8
    console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // TODO: figure class name
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = `cell-${i}-${j}`;

            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${cell}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {

    // TODO: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        console.log('AHA');
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }


    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord);
            break;
        case QUEEN_BLACK:
        case     QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord);
            break;
    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);

    // update the MODEl
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    // update the DOM
    elFromCell.innerText = '';
    elToCell.innerText = piece;

}

function markCells(coords) {

    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
        elCell.classList.add('mark')
    }

    // TODO: query select them one by one and add mark 
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? -1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
    else return res;

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (isEmptyCell(nextCoord)) res.push(nextCoord);
    }
    return res;
}



function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    var row = pieceCoord.i;
    var column = pieceCoord.j;

    for (var i = row + 1; i < 8; i++) {
        var coord1 = { i: i, j: column }
        if (!isEmptyCell(coord1)) break;
        res.push(coord1);
    }
    for (var i = row - 1; i >= 0; i--) {
        var coord2 = { i: i, j: column }
        if (!isEmptyCell(coord2)) break;
        res.push(coord2);
    }
    for (var i = column + 1; i < 8; i++) {
        var coord3 = { i: row, j: i }
        if (!isEmptyCell(coord3)) break;
        res.push(coord3);
    }
    for (var i = column - 1; i >= 0; i--) {
        var coord4 = { i: row, j: i }
        if (!isEmptyCell(coord4)) break;
        res.push(coord4);
    }
    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i - 1;
    console.log(i);
    for (var idx = pieceCoord.j - 1; i >= 0 && idx < 8; idx--) {
        var coord2 = { i: i--, j: idx };
        if (!isEmptyCell(coord2)) break;
        res.push(coord2);
    }
    i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord3 = { i: i++, j: idx };
        if (!isEmptyCell(coord3)) break;
        res.push(coord3);
    }
    i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j - 1; i >= 0 && idx < 8; idx--) {
        var coord4 = { i: i++, j: idx };
        if (!isEmptyCell(coord4)) break;
        res.push(coord4);
    }
    return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];

    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];
    var i = pieceCoord.i;
    var j = pieceCoord.j - 1;
    var coord = { i: i++, j: j++ };
    if (isEmptyCell(coord)) res.push(coord);
    var coord2 = { i: i--, j: j++ };
    if (isEmptyCell(coord2)) res.push(coord2);
    var coord3 = { i: i--, j: j-- };
    if (isEmptyCell(coord3)) res.push(coord3);
    var coord4 = { i: i++, j: j-- };
    if (isEmptyCell(coord4)) res.push(coord4);
    var coord5 = { i: i+1, j: j+2 };
    if (isEmptyCell(coord5)) res.push(coord5);
    var coord6 = { i: i-1, j: j };
    if (isEmptyCell(coord6)) res.push(coord6);
    var coord7 = { i: i-1, j: j+2 };
    if (isEmptyCell(coord7)) res.push(coord7);
    var coord8 = { i: i+1, j: j };
    if (isEmptyCell(coord8)) res.push(coord8);

    return res;
}
function getAllPossibleCoordsQueen(pieceCoord) {
    var res = [];
    var rookMoves = getAllPossibleCoordsRook(pieceCoord);
    res.push(...rookMoves);
    var bishopMoves = getAllPossibleCoordsBishop(pieceCoord);
    res.push(...bishopMoves);
    return res;
}
