
document.getElementById('start')
  .addEventListener('click', (e) => {
    e.preventDefault();
    startGame();
  });

function startGame() {
  //reset the board
  document.getElementById('board').innerHTML = '';
  const players = [];
  const nameInputs = document.querySelectorAll('input[type="text"]');
  for (playerInput of Array.from(nameInputs)) {
    if (playerInput.value !== '') {
      const player = new Player(playerInput.value);
      players.push(player);
    }
  }
  if (players.length) new Game(6, 7, ...players);
}