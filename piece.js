class Piece {
  constructor(shape, color) {
    this.shape = shape;
    this.color = color;
    this.rotations = 0;
  }

  rotate() {
    // Rotate clockwise
    const newShape = [];
    for (let i = 0; i < this.shape[0].length; i++) {
      const newRow = [];
      for (let j = this.shape.length - 1; j >= 0; j--) {
        newRow.push(this.shape[j][i]);
      }
      newShape.push(newRow);
    }
    this.shape = newShape;
    this.rotations++;
    if (this.rotations === 4) {
      this.invert();
    }
  }

  invert() {
    this.shape = this.shape.map(row => row.reverse());
  }

  triedAllRotations() {
    return this.rotations > 8;
  }
}
