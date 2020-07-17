import React, { useRef, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';

// THREE.js
function GridRender(props) {
  const mesh = useRef();
  return (
    <Canvas camera={{fov: 75, near: 0.1, far: 1000}} onCreated={({ camera }) => {
      camera.position.set(0, -60, 50);
      camera.lookAt(0, 0, 0);
    }}>
      <ambientLight />
      <pointLight position={[10, 10, 100]} />
      <mesh ref={mesh}>
        <planeBufferGeometry attach={'geometry'} args={[80, 80, props.sideLength, props.sideLength]} />
        <meshPhongMaterial attach={'material'} color={'blue'} wireframe={true} />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}

export default GridRender;