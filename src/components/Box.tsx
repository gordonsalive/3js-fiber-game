import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { Color } from 'three';
import { XYZ } from '../boxes';

interface BoxProps {
    position: XYZ,
    dims: XYZ,
    rotation: XYZ,
    cubeColour: Color,
    chameleon?: boolean 
}
export default function Box({position, dims, rotation, cubeColour, chameleon}: BoxProps) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.MeshLambertMaterial>(null!);

    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    
    useEffect(() => {
        if (hovered) {
            cubeColour.setColorName('orange');
        } else if (chameleon) {
            const [x, y, z] = rotation;
            cubeColour.setRGB(x % 1, y % 1, z % 1);
        }
        materialRef.current.color = cubeColour;
    }, /* runs on every render render */);

    // LEARNINGS
    // ---------
    // delta inside useFrame is the milliseconds since the last frame draw - the frame rate
    // This is being controlled by fiber. Box is being invalidated 60 times a second
    //   so React knows it needs to rerender all the Boxes (it only runs this once, even though
    //   there are three boxes).  useFrame gets called 3 times.
    // I'm holiding the state of hover and click via useState(), which would tell React this comment
    // needs rerendering, but this hardly seems relevant, since fiber is invalidating the Mesh (say)
    // 60 times a second!
    // If I comment out useFrame, then the Box is not invalidated, except when the state changed
    // (from the house hover or click)

    return (
        <mesh
            position={position}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            rotation={rotation}>
            <boxGeometry args={dims} />
            
            {/* Standard: desgined to give a surface that works for all lighting conditions */}
            {/* <meshStandardMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
            {/* Lambert: Simple shading based on angle of surface to light source */}
            <meshLambertMaterial ref={materialRef} />
            {/* <meshLambertMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
            {/* Normal: as in RGB colour based on normal vectors of surface */}
            {/* <meshNormalMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
            {/* Basic: no consideration of light source direction - leads to flat blocks of colour, good for 'wireframe' style projects */}
            {/* <meshBasicMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
        </mesh>
    )
}