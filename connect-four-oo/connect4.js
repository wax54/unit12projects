const GAMEID = 'connect4';
document.getElementById('start')
  .addEventListener('click', startGame);

function startGame() {
  if (document.getElementById(GAMEID)) {
    document.getElementById(GAMEID).remove();
  }
  new Game(6, 7, GAMEID);
}