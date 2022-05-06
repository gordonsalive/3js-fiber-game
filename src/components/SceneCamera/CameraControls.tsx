import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';

interface CameraControlsProps {
    outerWindow: {
        height: number, 
        width: number
    },
    updateCameraX: (delta: number) => void,
    updateCameraY: (delta: number) => void,
    resetCameraPosition: () => void,
    update3DState: (is3DEnabled: boolean) => void,
    updateGridRotation: (deltaDegrees: number) => void
}

export const CameraControls = ({outerWindow, updateCameraX, updateCameraY, resetCameraPosition, update3DState, updateGridRotation}: CameraControlsProps) => {

    return (
        <div style={{
            position: "absolute", 
            top: outerWindow.height - 100, 
            left: outerWindow.width - 100,
            height: 92,
            width: 92,
            border: "2px solid #a2b9e7", 
            backgroundColor: "none",
            display: "inline-block"}} >
            <div style={{display: "grid", gridTemplateRows: "30px 30px 30px", gridTemplateColumns: "30px 30px 30px",
            justifyContent: "centre", verticalAlign: "middle", alignItems: "centre", textAlign: "center", border: "none", margin: "0px 0px"}}>
                <button onClick={() => update3DState(false)}><small>2D</small></button>
                <button onClick={() => updateCameraY(5)}>{"\u25B2"}</button>
                <button onClick={() => update3DState(true)}><small>3D</small></button>
                <button onClick={() => updateCameraX(-5)}>{"\u25C0"}</button>
                <button onClick={() => resetCameraPosition()}>{"\u229B"}</button>
                <button onClick={() => updateCameraX(5)}>{"\u25B6"}</button>
                <button onClick={() => updateGridRotation(90)}>{"\u21AA"}</button>
                <button onClick={() => updateCameraY(-5)}>{"\u25BC"}</button>
                <button onClick={() => updateGridRotation(-90)}>{"\u21A9"}</button>
            </div>
        </div>
    );
}