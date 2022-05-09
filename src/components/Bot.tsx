import { Color, useLoader } from '@react-three/fiber';
import React from 'react';
import { TextureLoader } from 'three';
import { XYZ } from '../boxes';
import { Coordinate } from '../types/Floor.types';
import BufferedBox from './BufferedBox';
import { cellHeight, cellWidth } from './Floor';

interface BotProps {
    coords: Coordinate,
    colour: Color,
    noTexture?: boolean
}


export default function Bot({coords, colour, noTexture}: BotProps) {
    const position: XYZ = [cellWidth * (coords.x -.5), -.5, cellHeight * (coords.y -.5)];
    const dims: XYZ = [cellWidth, -1, cellHeight];

    if (noTexture) {
        return <BufferedBox position={position} dims={dims} rotation={[0, 0, 0]} colour={colour} />;
    } else {
        // ** LEARNING - app will fail terminally if assets cannot be found.  We are meant to use <Suspense> with a fallback
        // **   component for error handling, but I couldn't get it to work  |:-(
        const textures = useLoader(TextureLoader, ['../../assets/botNarrowEdgeFace.jpg', '../../assets/botNarrowEdgeFace.jpg', '../../assets/botTopFace.jpg', '../../assets/botTopFace.jpg', '../../assets/botWideEdgeFace.jpg', '../../assets/botWideEdgeFace.jpg']);
        return <BufferedBox position={position} dims={dims} rotation={[0, 0, 0]} colour={colour} textures={textures} />;
    }
}