import React from 'react';

interface CameraControlsProps {
    outerWindow: {height: number, width: number},
    updateCameraX: (delta: number) => void,
    updateCameraY: (delta: number) => void,
    resetCameraPosition: () => void,
    update3DState: (is3DEnabled: boolean) => void,
    updateGridRotation: (deltaDegrees: number) => void,
    gridRotation: number
}

export const CameraControls = ({outerWindow, updateCameraX, updateCameraY, resetCameraPosition, update3DState, updateGridRotation, gridRotation}: CameraControlsProps) => {

    return (
        <div className="CameraControls_Panel" style={{top: outerWindow.height - 100, left: outerWindow.width - 100}} >
            <div className="CameraControls_Buttons">
                <button onClick={() => update3DState(false)}><small>2D</small></button>
                <button onClick={() => updateCameraY(5)}>{"\u25B2"}</button>
                <button onClick={() => update3DState(true)}><small>3D</small></button>
                <button onClick={() => updateCameraX(-5)}>{"\u25C0"}</button>
                <button 
                  className="CameraControl_ResetButton"
                  style={{transform: `rotate(${360 - gridRotation}deg)`, transition: 'transform 150ms ease'}} 
                  onClick={() => resetCameraPosition()}>{"\u221F"}</button>
                {/* <button onClick={() => resetCameraPosition()}>{"\u229B"}</button> */}
                <button onClick={() => updateCameraX(5)}>{"\u25B6"}</button>
                <button onClick={() => updateGridRotation(90)}>{"\u21AA"}</button>
                <button onClick={() => updateCameraY(-5)}>{"\u25BC"}</button>
                <button onClick={() => updateGridRotation(-90)}>{"\u21A9"}</button>
            </div>
        </div>
    );
}