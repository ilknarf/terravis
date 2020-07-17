import hash from './hash';

function diamondSquare(seed, side) {
  // algorithm starts with 2^n + 1 array
  let grid = []
  for (let i = 0; i < side; i++) {
    grid.push(Array(side).fill(0));
  }

  // "length" is more like the final index, more like the # of edges
  let length = grid.length - 1;

  // initialize four corner seeds
  function arbitraryString(i) {
    let arb = ['awfewaf', 'AWEFG@$g', '@##EFAa', '###ERR'];
    return arb[i];
  }
  let [s1, s2, s3, s4] = Array(4)
    .fill(0)
    .map((_, i) => (hash(seed + arbitraryString(i)) % 100) - 40);

  grid[0][0] = s1;
  grid[length][0] = s2;
  grid[0][length] = s3;
  grid[length][length] = s4;

  let currLength = length;

  function randInc() {
    return (Math.random() * currLength * 10) / length;
  }

  function diamond() {
    for (let xInc = 0; xInc < length; xInc += currLength) {
      for (let yInc = 0; yInc < length; yInc += currLength) {
        let sum = [
          [xInc, yInc],
          [xInc + currLength, yInc],
          [xInc, yInc + currLength],
          [xInc + currLength, yInc + currLength],
        ]
          .map(([x, y]) => grid[x][y])
          .reduce((prev, curr) => prev + curr);

        grid[xInc + currLength / 2][yInc + currLength / 2] = sum / 4 + randInc(); // TODO add random number
      }
    }
  }

  // need to skip staggers every other row...
  function square() {
    let stagger = currLength / 2;
    for (let xInc = 0; xInc <= length; xInc += stagger) {
      for (let yInc = (stagger + xInc) % currLength; yInc <= length; yInc += currLength) {
        let sum = [
          [xInc, yInc + stagger],
          [xInc + stagger, yInc],
          [xInc, yInc - stagger],
          [xInc - stagger, yInc],
        ]
          .map(([x, y]) => {
            if (x < 0) {
              x += length;
            }
            if (x > length) {
              x -= length;
            }
            if (y < 0) {
              y += length;
            }
            if (y > length) {
              y -= length;
            }
            return grid[x][y];
          })
          .reduce((prev, curr) => prev + curr);

        grid[xInc][yInc] = sum / 4 + randInc() / 2; // smoothes out map
      }
    }
  }

  for (; currLength !== 1; currLength /= 2) {
    diamond();
    square();
  }

  return grid;
}

export default diamondSquare;