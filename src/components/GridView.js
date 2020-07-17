import React from 'react';
import ds from '../utils/diamondSquare';
import GridRender from './GridRender';

const side = 5;

function GridView(props) {
  let gridBase = Array(side).fill(Array(side).fill(0));
  let [grid, setGrid] = React.useState(gridBase);

  return (
    <div>
      <button type="button" onClick={() => setGrid(ds('testSeed', side))}>Grid me!</button>
      <GridRender sideLength={side - 1} />
    </div>
  )
}

export default GridView;