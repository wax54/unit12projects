
document.getElementById('start')
  .addEventListener('click', (e) => {
    e.preventDefault();
    startGame();
  });

function startGame() {
  //reset the board
  document.getElementById('board').innerHTML = '';

  const p1 = new Player(1, document.getElementById('player1').value);
  const p2 = new Player(2, document.getElementById('player2').value);

  new Game(6, 7, p1, p2);
}