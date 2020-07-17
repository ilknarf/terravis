import React, { useState } from 'react';
import ds from '../utils/diamondSquare';
import GridRender from './GridRender';
import { Canvas } from 'react-three-fiber';
import { Box, Container, Button, TextField, Typography, AppBar, Toolbar } from '@material-ui/core';
import {Text} from "drei";

const side = 33;

function GridView(props) {
  let [seed, setSeed] = useState('enter seed here')
  let gridBase = ds(seed, side);
  let [grid, setGrid] = React.useState(gridBase);

  return (
    <React.Fragment>
      <AppBar color={'inherit'}>
        <Toolbar>
          <Typography variant={'h5'} style={{flex: 1}}>
            Terravis
          </Typography>
          <TextField variant="outlined" placeholder={seed} onChange={(e) => setSeed(e.target.value)} />
          <Button type={'button'} color={'inherit'} onClick={() => setGrid(ds(seed, side))}>
            Grid Me!
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box>
        <Container style={{height: '80vh'}}>
            <p>
              Uses the diamond-square algorithm to generate heightmaps, and a single seed to generate each
              of the four corner seeds.
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