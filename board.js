class Board {
  constructor(boardSize) {
    this.boardWidth = boardSize;
    this.boardHeight = 5;
    this.cleanBoard();
  }

  createEmptyBoard() {
    return [...Array(this.boardHeight).keys()].map((_y) =>
      [...Array(this.boardWidth).keys()].map((_x) => 0),
    );
  }

  cleanBoard() {
    this.board = this.createEmptyBoard();
  }

  placePiece(piece, pos) {
    const pieceHeight = piece.shape.length;
    const pieceWidth = piece.shape[0].length;

    let isOutOfBounds = false;

    if (pos.y < 0 || pos.x < 0) isOutOfBounds = true;
    else if (pieceHeight + pos.y > this.boardHeight) isOutOfBounds = true;
    else if (pieceWidth + pos.x > this.boardWidth) isOutOfBounds = true;

    if (isOutOfBounds) {
      console.log("OUT OF BOUNDS!");
      return "out-of-bounds";
    }

    let isOccupied = false;

    let tempBoard = this.createEmptyBoard();

    for (let y = pos.y; y < pieceWidth; y++) {
      for (let x = pos.x; x < pieceHeight; x++) {
        if (this.board[y][x] === 0) {
          tempBoard[y][x] = piece.shape[y][x] > 0 ? piece.color : 0;
        } else {
          tempBoard[y][x] = this.board[y][x];
          isOccupied = true;
          break;
        }
      }
      if (isOccupied) break;
    }
    if (isOccupied) {
      console.log("OCCUPIED!");
      return "occupied";
    }
    this.board = tempBoard;
    return "placed";
  }
}
