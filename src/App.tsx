/* no-eslint-disable */
// import * as THREE from 'three';
import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <Canvas>
      <color attach="background" args={['#a2b9e7']} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  )
}
