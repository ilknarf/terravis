import React, {useState} from 'react';
import ds from '../utils/diamondSquare';
import GridRender from './GridRender';
import { Canvas } from 'react-three-fiber';
import { Box, Container, Button, Input } from '@material-ui/core';

const side = 33;

function GridView(props) {
  let [seed, setSeed] = useState('enter seed here')
  let gridBase = ds(seed, side);
  let [grid, setGrid] = React.useState(gridBase);
  const Grid = <GridRender sideLength={side - 1} grid={grid} />

  return (
    <Box>
      <Container style={{height: '80vh'}}>
        <Input type={'text'} placeholder={seed} onChange={(e) => setSeed(e.target.value)} />
        <Button type="button" onClick={() => setGrid(ds(seed, side))}>Grid me!</Button>
        <Canvas
          camera={{position: [0, -80, 40]}}
        >
          <ambientLight />
          <pointLight position={[10, 10, 50]} />
          {Grid}
        </Canvas>
      </Container>
    </Box>
  )
}

export default GridView;