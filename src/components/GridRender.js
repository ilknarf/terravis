import React, { useRef } from 'react';
import { useUpdate } from 'react-three-fiber';
import { OrbitControls, MapControls } from 'drei';

// THREE.js
function GridRender(props) {
  const mesh = useRef();

  const ref = useUpdate((geometry) => {
    let v = geometry.vertices;

    let side = props.grid.length;
    for (let i = 0; i < side; i++) {
      for (let j = 0; j < side; j++) {
        v[i * side + j].z = props.grid[i][j];
      }
    }

    geometry.computeVertexNormals();

    geometry.verticesNeedUpdate = true;
  }, [props.grid]);


  return (
    <React.Fragment>
      <mesh ref={mesh}>
        <planeGeometry ref={ref} attach={'geometry'} args={[100, 100, props.sideLength, props.sideLength]} position={[0, 0]} />
        <meshPhongMaterial attach={'material'} color={'blue'} wireframe={true} />
      </mesh>
      <OrbitControls />
    </React.Fragment>
  )
}

export default GridRender;