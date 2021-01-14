const GAMEID = 'connect4';
document.getElementById('start')
  .addEventListener('click', startGame);

function startGame() {
  const oldBoard = document.getElementById(GAMEID);
  if (oldBoard) {
    oldBoard.remove();
  }
  const p1 = new Player(1, document.getElementById('player1').value);
  const p2 = new Player(2, document.getElementById('player2').value);

  new Game(6, 7, p1, p2, GAMEID);
}