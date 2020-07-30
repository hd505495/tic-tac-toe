// player factory
const player = (name, marker) => {
  return {name, marker};
};

// gameboard module
const gameBoard = (() => {
  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const getBoard = () => board;

  const getBoardCell = (cellID) => board[cellID];

  const updateBoard = (cell, mark) => {
    board[cell] = mark;
  };

  const clearBoard = () => board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const checkWin = (marker) => {
    let winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
      [0, 4, 8], [2, 4, 6] //diagonal
    ];

    let win;
    winCombos.forEach((combo) => {
      let mappedCombo = combo.map((index) => board[index]);
      if (mappedCombo.every((cell) => cell == marker)) {
        win = combo;
      };
    });
    return win || false;
  };

  const checkTie = () => {
    return board.every((cell) => cell == 'x' || cell == 'o');
  };

  return {getBoard, getBoardCell, updateBoard, clearBoard, checkWin, checkTie};
})();

// game module
const game = (() => {

  let gameBoardDiv = document.getElementById('board');
  let cells = Array.from(document.querySelectorAll('.cell'));
  let modal = document.getElementById('myModal');
  let form = document.querySelector('.modal-content');
  let playerNameLeft = document.getElementById('leftName');
  let playerNameRight = document.getElementById('rightName');
  let leftDot = document.getElementById('leftDot');
  let rightDot = document.getElementById('rightDot');
  let resetBtn = document.getElementById('reset');
  let turnCounter = 1;

  let player1 = player("", 'x');
  let player2 = player("", 'o');

  const render = () => {
    //gameBoard.clearBoard();
    console.log('start render');
    cells.forEach(cell => {
      cell.innerHTML = gameBoard.getBoardCell(cell.id - 1);
      console.log(`rendered cell ${cell.id} with marker ${gameBoard.getBoardCell(cell.id - 1)}`);
    });
  };

  const getCurrentPlayer = () => {
    return (turnCounter % 2 == 0)? player2 : player1;
  };

  const checkGame = (player) => {
    let winCombo = gameBoard.checkWin(player.marker);
    if (winCombo != false) {
      // player win alert
      alert(`${getCurrentPlayer().name} wins!`);
      return true;
    }
    else if (gameBoard.checkTie()) {
      // tie alert
      alert(`It's a tie!`);
      return true;
    }
    else {
      return false;
    }
  };

  const makeMove = (event) => {
    console.log(`begin makeMove with target ${event.target.getAttribute('class')} ${event.target.id}`);
    console.log(`turnCounter before move is ${turnCounter}`);
    let currentPlayer = getCurrentPlayer();
    if (event.target.innerHTML === " ") {
      if (currentPlayer === player1) {
        leftDot.style.color = "transparent";
        rightDot.style.color = "rgb(19, 230, 0)";
      }
      else {
        rightDot.style.color = "transparent";
        leftDot.style.color = "rgb(19, 230, 0)";
      }
      gameBoard.updateBoard(event.target.id - 1, currentPlayer.marker);
      render();
      if (checkGame(currentPlayer)) {
        newGame();
      }
      else {
        turnCounter++;
      }
    }
  };

  const newGame = () => {
    gameBoard.clearBoard();
    turnCounter = 1;
    render();
  };

  // event listeners
  cells.forEach(cell => {
    cell.addEventListener('click', makeMove);
  });

  resetBtn.addEventListener('click', newGame);

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    player1 = player(this.elements['p1-name'].value, 'x');
    playerNameLeft.innerHTML = this.elements['p1-name'].value;
    player2 = player(this.elements['p2-name'].value, 'o');
    playerNameRight.innerHTML = this.elements['p2-name'].value;
    modal.style.display = "none";
  });

  leftDot.style.color = "rgb(19, 230, 0)";
  rightDot.style.color = "transparent";

  return {render};
})();

game.render();