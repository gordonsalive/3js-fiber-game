import React from 'react';
import { XYZ } from '../boxes';
import { Coordinate } from '../types/Floor.types';
import { cellHeight, cellWidth } from './Floor';

interface BallProps {
    coords: Coordinate
}

export default function Ball({coords}: BallProps) {
    const position: XYZ = [cellWidth * (coords.x -.5), -.5, cellHeight * (coords.y -.5)];
    const dims: XYZ = [cellHeight/2, cellHeight/2, cellHeight/2]

    return (
        <mesh
            position={position}
            scale={dims}>
            <sphereBufferGeometry attach='geometry' />
            <meshPhongMaterial attach='material' color={0xff8844} />
        </mesh>
    );
}