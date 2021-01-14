/**
 * Game class 
 * 
 * Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  /**
   * Creates a game of WIDTH x HEIGHT sets up initial variables and 
   *  appends a board to the element of id 'game'
   * 
   * @param {number} width The number of cells Wide the Game should be
   * @param {number} height The number of cells High the Game should be
   * @param {string or number} boardId the id of the board table that will be appended to the game div
   */
  constructor(width, height, p1, p2) {
    if (typeof width === 'number' && typeof height === 'number') {
      if (width > 0 && height > 0) {
        //initial properties
        this.WIDTH = width;
        this.HEIGHT = height;
        this.p1 = p1;
        this.p2 = p2;
        this.currPlayer = this.p1;
        this.board = [];
        //initial setup
        this.makeBoard();
        this.makeHtmlBoard();

      } else throw new Error('Width and Height must be greater than 0')
    } else throw new Error('Width and Height must be numbers');
  }

  /** makeBoard: create in-JS board structure:
   *   board = array of rows, each row is array of cells  (board[y][x])
   */
  makeBoard() {
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length: this.WIDTH }));
      this.board[y].fill(null);
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const board = document.getElementById('board');

    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.backgroundColor(this.currPlayer.color);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }


  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    //game already over, return
    if (this.checkForWin()) { return }
    // get x from ID of clicked cell
    const x = +evt.target.id;
    //not a valid click, return
    if (isNaN(x)) return;
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) return;

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
  }

  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
  /** endGame: announce game end  
   * ...I don't think I need this in the class...
   */
  endGame(msg) {
    alert(msg);
  }
}
