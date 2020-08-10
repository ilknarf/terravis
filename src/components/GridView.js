import React, { useState } from 'react';
import ds from '../utils/diamondSquare';
import GridRender from './GridRender';
import { Canvas } from 'react-three-fiber';
import {
  Box,
  Container,
  Button,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  CircularProgress
} from '@material-ui/core';

import randomString from '../utils/randomString';

const side = 33;

function GridView(props) {
  let [seed, setSeed] = useState('enter seed here')
  let gridBase = ds(seed, side);
  let [grid, setGrid] = React.useState(gridBase);
  let [gridLoading, setGridLoading] = React.useState(false);

  function setGridVal() {
    setGrid(ds(seed, side));
  }

  function setRandom() {
    setSeed(randomString());
    setGrid(ds(seed, side));
  }

  return (
    <React.Fragment>
      <AppBar color={'inherit'}>
        <Toolbar>
          <Typography variant={'h5'} style={{flex: 1}}>
            Terravis
          </Typography>
          <TextField
            variant="outlined"
            value={seed} onChange={(e) => setSeed(e.target.value)} disabled={gridLoading} />
          <Button type={'button'} onClick={setGridVal}>
            {gridLoading? <CircularProgress />:'Grid Me!'}
          </Button>
          <Button type={'button'} onClick={setRandom}>
            {gridLoading? <CircularProgress />:'Random'}
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box>
        <Container style={{height: '80vh'}}>
          <p>
            Uses the diamond-square algorithm to generate heightmaps, and a single seed to generate each
            of the four corner seeds. You can click and drag to rotate the model, and scroll in-out to zoom.
          </p>
          <Canvas
            camera={{position: [0, -80, 40]}}
          >
            <ambientLight />
            <pointLight position={[10, 10, 50]} />
            <GridRender sideLength={side - 1} grid={grid} />
          </Canvas>
        </Container>
      </Box>
    </React.Fragment>
  )
}

export default GridView;