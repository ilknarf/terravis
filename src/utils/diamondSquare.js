import hash from './hash';

function diamondSquare(seed) {
  // unlike Python list comps, doesn't copy reference!
  // algorithm starts with 2^n + 1 array
  let grid = Array(129).fill(Array(129).fill(129));

  let length = grid.length - 1;

  // initialize four corner seeds
  let [s1, s2, s3, s4] = Array(4).map(_, i => hash(seed + i) % 1024);

  grid[0][0] = s1;
  grid[length][0] = s2;
  grid[0][length] = s3;
  grid[length][length] = s4;

  let currLength = length;

  function diamond() {
    for (let xInc = 0; xInc < length; xInc += currLength) {
      for (let yInc = 0; yInc < length; yInc += currLength) {
        let sum = [
          [xInc, yInc],
          [xInc + currLength, yInc],
          [xInc, yInc + currLength],
          [xInc + currLength, yInc + currLength],
        ]
          .map(([x, y], _) => grid[x][y])
          .reduce((prev, curr) => prev + curr);

        grid[xInc + currLength >> 1][yInc + currLength >> 1] = sum / 4; // TODO add random number
      }
    }
  }

  function square() {
    let stagger = currLength >> 1;
    for (let xInc = stagger; xInc < length; xInc += currLength) {
      for (let yInc = stagger; yInc < length; yInc += currLength) {
        let sum = [
          [xInc, yInc + stagger],
          [xInc + stagger, yInc],
          [xInc, yInc - stagger],
          [xInc - stagger, yInc],
        ]
          .map(([x, y], _) => {
            if (x < 0) {
              x = length - x;
            }
            if (x > length) {
              x -= length;
            }
            if (y < 0) {
              y = length - y;
            }
            if (y > length) {
              y -= length;
            }
            return grid[x][y];
          })
          .reduce((prev, curr) => prev + curr);

        grid[xInc + currLength >> 1][yInc + currLength >> 1] = sum / 4; // TODO add random number
      }
    }
  }

  for (; currLength !== 0; currLength >>= 1) {
    diamond();
    square();
  }

  return grid;
}

export default diamondSquare;