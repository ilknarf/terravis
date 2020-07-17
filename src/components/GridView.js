import React, {useState} from 'react';
import ds from '../utils/diamondSquare';
import GridRender from './GridRender';
import { Canvas } from 'react-three-fiber';

const side = 33;

function GridView(props) {
  let [seed, setSeed] = useState('enter seed here')
  let gridBase = ds(seed, side);
  let [grid, setGrid] = React.useState(gridBase);
  const Grid = <GridRender sideLength={side - 1} grid={grid} />

  return (
    <div style={{height: '500px'}}>
      <input type={'text'} value={seed} onChange={(e) => setSeed(e.target.value)} />
      <button type="button" onClick={() => setGrid(ds(seed, side))}>Grid me!</button>
      <Canvas
        camera={{position: [0, -80, 40]}}
      >
        <ambientLight />
        <pointLight position={[10, 10, 50]} />
        {Grid}
      </Canvas>
    </div>
  )
}

export default GridView;