import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Color } from 'three';

interface BoxProps {
    position: Vector3,
    dims: [x: number, y: number, z: number],
    chameleon?: boolean 
}
// export default function Box(props: JSX.IntrinsicElements['mesh'], dims: [number, number, number]) {
export default function Box({position, dims, chameleon}: BoxProps) {
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.MeshLambertMaterial>(null!);

    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    let cubeColour = new Color('orange');// {red: 0, green: 0.3, blue:0.6};
    let inc = [0.001, 0.0015, 0.0025];

    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    useFrame(() => {
        (ref.current.rotation.x += 0.01);
        if (chameleon) {
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.02;
            ref.current.rotation.z += 0.02;
            const incMap = [{val: cubeColour.r, inc: inc[0]}, {val: cubeColour.g, inc: inc[1]}, {val: cubeColour.b, inc: inc[2]}];
            inc = incMap.map(({val, inc})=>(((inc >= 0) && (val + inc > 1)) || ((inc < 0) && (val + inc < 0))) ? -inc : inc );
            cubeColour.setRGB(cubeColour.r+inc[0], cubeColour.g+inc[1], cubeColour.b+inc[2]);
            materialRef.current.color = cubeColour;
        }
    });

    return (
        <mesh
            // {...props}
            position={position}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            // onClick={(event) => click(!clicked)}
            // onPointerOver={(event) => hover(true)}
            // onPointerOut={(event) => hover(false)}>
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}>
            <boxGeometry args={[dims[0], dims[1], dims[2]]} />
            {/* Standard: desgined to give a surface that works for all lighting conditions */}
            {/* <meshStandardMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
            {/* Lambert: Simple shading based on angle of surface to light source */}
            <meshLambertMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} />
            {/* Normal: as in RGB colour based on normal vectors of surface */}
            {/* <meshNormalMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
            {/* Basic: no consideration of light source direction - leads to flat blocks of colour, good for 'wireframe' style projects */}
            {/* <meshBasicMaterial color={hovered ? 'hotpink' : cubeColour} ref={materialRef} /> */}
        </mesh>
    )
}