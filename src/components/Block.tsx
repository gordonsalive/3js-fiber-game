import { Color } from '@react-three/fiber';
import React from 'react';
import { XYZ } from '../boxes';
import { Coordinate } from '../types/Floor.types';
import BufferedBox from './BufferedBox';
import { cellHeight, cellWidth } from './Floor';

interface BlockProps {
    startPos: Coordinate,
    endPos: Coordinate,
    colour: Color
}

export default function Block({startPos, endPos, colour}: BlockProps) {
    const lengths = {
        x: endPos.x - startPos.x +1,
        y: -1,
        z: endPos.y - startPos.y +1
    };
    const dims: XYZ = [cellWidth * lengths.x, lengths.y, cellHeight * lengths.z];
    const position: XYZ = [cellWidth * (startPos.x -1 + lengths.x/2), lengths.y/2, cellHeight * (startPos.y -1 + lengths.z/2)];

    return (
        <BufferedBox position={position} dims={dims} rotation={[0, 0, 0]} colour={colour} />
    );
}