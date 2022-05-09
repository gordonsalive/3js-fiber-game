// import * as THREE from 'three';
// import React, { useEffect, useRef, useState } from 'react';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { extend, useFrame, useThree } from '@react-three/fiber';

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
// extend({ OrbitControls });

// **
// ** This example, if used, allows the user to tilt and rotate the scene by draging/scrolling
// ** this is not compatible with a scrolling window.
// ** 

export default function OrbitalControls() {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    // const {
    //   camera,
    //   gl: { domElement },
    // } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    // const controls = useRef();
    // useFrame((state) => controls.current.update());
    // return <orbitControls ref={controls} args={[camera, domElement]} />;
    // return (
    //   <orbitControls
    //     ref={controls}
    //     args={[camera, domElement]}
    //     enableZoom={true}
    //     // maxAzimuthAngle={Math.PI / 4}
    //     // maxPolarAngle={Math.PI}
    //     // minAzimuthAngle={-Math.PI / 4}
    //     // minPolarAngle={0}
    //   />
    // );
  };
