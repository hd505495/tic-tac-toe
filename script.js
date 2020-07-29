// player factory
const player = (name, marker) => {
  return {name, marker};
};

// gameboard module
const gameBoard = (() => {
  let board = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

  const getBoard = () => board;

  const getBoardCell = (cellID) => board[cellID];

  const updateBoard = (cell, mark) => {
    board[cell] = mark;
  };

  const clearBoard = () => board = ["", "", "", "", "", "", "", "", ""];

  return {getBoard, getBoardCell, updateBoard, clearBoard};
})();

// game module
const game = (() => {

  let gameBoardDiv = document.getElementById('board');
  let cells = Array.from(gameBoardDiv.children);
  let modal = document.getElementById('myModal');
  let form = document.querySelector('modal-content');
  let startBtn = document.querySelector('.modal-content');
  let playerNameLeft = document.getElementById('left');
  let playerNameRIght = document.getElementById('right');

  let player1 = player("", 'x')
  let player2 = player("", 'o');

  const render = () => {
    cells.forEach(cell => {
      cell.innerHTML = gameBoard.getBoardCell(cell.id - 1);
    });
  };

  const makeMove = () => {};

  // event listeners
  cells.forEach(cell => {
    cell.addEventListener('click', makeMove);
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    player1 = player(this.elements['p1-name'].value, 'x');
    // add player name to page by title
    playerNameLeft.innerHTML += this.elements['p1-name'].value;
    player2 = player(this.elements['p2-name'].value, 'o');
    playerNameRight.innerHTML += this.elements['p2-name'].value;
    modal.style.display = "none";
  });

  return {render};
})();

game.render();