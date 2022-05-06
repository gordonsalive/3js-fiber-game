import * as THREE from 'three';
import React, { useRef } from 'react';
import { Color } from '@react-three/fiber';
import { XYZ } from '../boxes';

// ** LEARNING:
// ** Even using buffered boxes I cannot draw enough boxes (40,000 will be required!) - looking at an pure 3js demo here: https://codepen.io/tutsplus/pen/zLvZQy?editors=0010
// ** I can see that that seems to be more efficient than using fiber (because no React keeping track of components/useEffects?),
// ** BUT still starts to get slow at 20,000 - still not good enough.  Next step is using buffer geometry drawing triangles
// ** (exlcudes React completely and limits the dimensions we are drawing to)

interface BoxProps {
    position: XYZ,
    dims: XYZ,
    rotation: XYZ,
    colour: Color,
    chameleon?: boolean 
}

export default function BufferedBox({position, dims, rotation, colour, chameleon}: BoxProps) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);

    return (
        <mesh
            position={position}
            ref={ref}
            scale={dims}
            rotation={rotation}>
            <boxBufferGeometry attach='geometry' />
            {chameleon ? <meshNormalMaterial attach='material' /> : <meshLambertMaterial attach='material' color={colour}/>}
        </mesh>
    )
}