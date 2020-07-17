import React from 'react';
import ds from '../utils/diamondSquare';

const side = 5;

function GridView(props) {
  let gridBase = Array(side).fill(Array(side).fill(0));
  let [grid, setGrid] = React.useState(gridBase);

  return (
    <div>
        {grid.map(v => (
          <React.Fragment>
            <p>
              {v.reduce((prev, curr) => `${prev} ${curr}`)}
            </p>
            <br />
          </React.Fragment>
        ))}
      <button type="button" onClick={() => setGrid(ds('testSeed', side))}>Grid me!</button>
    </div>
  )
}

export default GridView;