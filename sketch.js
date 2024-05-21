const GRID = {
  x: 12,
  y: 5,
};

const rectSize = 50;
const canvasHeight = GRID.y * rectSize;
const canvasWidth = GRID.x * rectSize;

const LEVEL = {
  size: 3,
  pieces: levels[3][0],
};

const drawGrid = () => {
  background(color("bisque"));
  strokeWeight(3);
  // Draws a vertical line as the wooden divider
  line(LEVEL.size * rectSize, 0, LEVEL.size * rectSize, canvasHeight);
  strokeWeight(1);
  for (let y = 1; y < GRID.y; y++) {
    line(0, y * rectSize, canvasWidth, y * rectSize);
    for (let x = 1; x < GRID.x; x++) {
      line(x * rectSize, 0, x * rectSize, canvasHeight);
    }
  }
};

let board = new Board(LEVEL.size);
let piecesLeft = LEVEL.pieces;
let pieceToPlace = piecesLeft.pop();
let posToPlace = { x: 0, y: 0 };

const restart = () => {
  console.log("Restarting...");
  board.cleanBoard();
  piecesLeft = shuffle(LEVEL.pieces);
  pieceToPlace = piecesLeft.pop();
  posToPlace = { x: 0, y: 0 };
  console.log(board.board, piecesLeft, pieceToPlace);
  drawGrid();
};

const drawPieces = () => {
  drawGrid();
  for (let y = 0; y < board.boardHeight; y++) {
    for (let x = 0; x < board.boardWidth; x++) {
      if (board.board[y][x] !== 0) {
        fill(board.board[y][x]);
        rect(x * rectSize, y * rectSize, rectSize, rectSize);
      }
    }
  }
  for (let y = 0; y < pieceToPlace.shape.length; y++) {
    for (let x = 0; x < pieceToPlace.shape[0].length; x++) {
      if (pieceToPlace.shape[y][x] !== 0) {
        fill(255, 0, 0, 50);
        rect(
          x * rectSize + posToPlace.x * rectSize,
          y * rectSize + posToPlace.y * rectSize,
          rectSize,
          rectSize,
        );
      }
    }
  }
};

// ---
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(220);
  drawGrid();
  frameRate(20);
}

function mouseReleased() {
  noLoop();
}

function mousePressed() {
  loop();
}

// Game loop
function draw() {
  console.table(board.board);
  console.table(pieceToPlace.shape);
  console.log(
    `Trying piece "${pieceToPlace.color}" at x: ${posToPlace.x} y: ${posToPlace.y} rotations: ${pieceToPlace.rotations}`,
  );

  text(pieceToPlace.color, 0, -50);
  const placementResult = board.placePiece(pieceToPlace, posToPlace);
  if (placementResult === "placed") {
    console.log(`placed piece: ${pieceToPlace.color}`);
    hasPlacedPiece = true;
    pieceToPlace = piecesLeft.pop();
    if (!pieceToPlace) {
      console.log("Completed");
      noLoop();
    }
  } else if ("occupied" || "out-of-bounds") {
    if (pieceToPlace.triedAllRotations()) {
      if (
        posToPlace.y < board.boardHeight &&
        posToPlace.x === board.boardWidth
      ) {
        posToPlace.y++;
        posToPlace.x = 0;
      } else if (posToPlace.x < board.boardWidth) {
        posToPlace.x++;
      }
      pieceToPlace.rotations = 0;
    } else {
      if (
        posToPlace.y === board.boardHeight &&
        posToPlace.x === board.boardWidth
      ) {
        restart();
      }
      pieceToPlace.rotate();
    }
  }
  drawPieces();
}
