/* React and fiber */
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
/* plain ts modules */
import { boxes, updateRotations } from '../boxes';
import { GameData, GameLoop, GameSetup } from '../GameLoop';
/* Camera */
import SceneCamera from './SceneCamera/SceneCamera';
/* My React/Fiber components */
import Floor, { cellHeight, cellWidth, noOfCellsHigh, noOfCellsWide } from './Floor';
import BufferedBox from './BufferedBox';
import Block from './Block';
import Bot from './Bot';
import Ball from './Ball';
import { CameraControls } from './SceneCamera/CameraControls';

export default function Scene() {
    const containerRef = React.createRef<HTMLDivElement>();
    const scrollingRef = React.createRef<HTMLDivElement>();

    const cameraXStart = noOfCellsWide/2 * cellWidth;
    const cameraYStart = noOfCellsHigh/2 * cellHeight;
    const [cameraX, setCameraX] = useState(cameraXStart);
    const [cameraY, setCameraY] = useState(cameraYStart);
    const updateCameraX = (delta: number) => setCameraX(cameraX + delta);
    const updateCameraY = (delta: number) => setCameraY(cameraY + delta);
    const outerWindow = {width: 1200, height: 850};
    const innerWindow = {width: 2400, height: 1200};
    const resetScrollBars = () => scrollingRef.current?.scrollTo((innerWindow.width - outerWindow.width)/2, (innerWindow.height - outerWindow.height)/2);
    const resetCameraPosition = () => {
      setCameraX(cameraXStart);
      setCameraY(cameraYStart);
      resetScrollBars();
    };
    const [threeDEnabled, setThreeDEnabled] = useState(false);
    const [gridRotation, setGridRotation] = useState(0);
    const updateGridRotation = (deltaDegrees: number) => setGridRotation(gridRotation + deltaDegrees);

    const fps = 28;
    const [frameCount, setFrameCount] = useState(1);

    // ** LEARNING **
    // ** In React if I update 3 bits of state, they aren't grouped together! 
    // ** Scene will be invalidated 3 times, leading to 3 timeouts next time! |:-O
    // ** so I'm going to trip the useEffect only when frame count has changed
    // **
    // ** I am controlling the frame rate using a setTimeout to update state
    // ** update the frame count, the first invalidate after this will trigger the useEffect
    // ** but subsequent ones before the next timeout won't, so only once a frame duration are states updated
    // ** (Note: Camera is still using useFrame(), which is called every frame, e.g. if 3js is managing 60fps, then 60 time per second.)
    useEffect(() => {
      setTimeout(() => {
        setFrameCount(frameCount+1);

        /* -- THIS IS THE GAME LOOP -- */
        GameLoop(/*frameCount*/);

        /* update my rotating boxes, which proves this is 3D and are just helpful for development/debugging */
        boxes.forEach((box, i) => box.rotation = updateRotations(box.rotation, [-i/(100*boxes.length), 0, 0]));
      }, 1000/fps);
    }, [frameCount]);

    useEffect(() => {
      // centre the scroll bars, based on the difference in the sizes of the inner and outer divs
      resetScrollBars();
      GameSetup();
    }, [/*run only once*/])

    return (
        <div id="scrollingDiv" ref={scrollingRef} style={{width:outerWindow.width, height: outerWindow.height, overflow: "auto"}}>
          <div id="containerDiv" style={{width: innerWindow.width, height: innerWindow.height}}
                  ref={containerRef}
                  // onMouseDown={onCanvasMouseDown}
                  // onMouseUp={onCanvasMouseUp}
                  // onMouseMove={onCanvasMouseMove}
              >
            <Canvas linear >
              <color attach="background" args={['#a2b9e7']} />
              <SceneCamera
                          cameraX={cameraX}
                          cameraY={cameraY}
                          gridRotation={gridRotation}
                          threeDEnabled={threeDEnabled}
                          zoomLevel={0.6/* affected by the height of the window we are rendering into */}
                      />
              <ambientLight />
              <pointLight position={[noOfCellsWide * cellWidth * 0.1, -10, noOfCellsHigh * cellHeight * 0.8]} />
              {boxes.map(box => <BufferedBox position={box.position} dims={box.dims} rotation={box.rotation} colour={0x12fe78} chameleon={true}/> )}
              <Floor />
              <Block startPos={{x:1, y:1}} endPos={{x:1, y:30}} colour={0x12fe78} />
              <Block startPos={{x:2, y:1}} endPos={{x:29, y:1}} colour={0x12fe78} />
              <Block startPos={{x:30, y:1}} endPos={{x:30, y:30}} colour={0x12fe78} />
              <Block startPos={{x:2, y:30}} endPos={{x:29, y:30}} colour={0x12fe78} />
              <Bot coords={GameData.bot1Pos} colour={0xAAAAAA} />
              <Ball coords={GameData.ball1.pos} />
            </Canvas>
            {/* LEARNING - Anything inside fiber Canvas must be a fiber component */}
            <CameraControls 
              outerWindow={outerWindow} 
              updateCameraX={updateCameraX} 
              updateCameraY={updateCameraY}
              resetCameraPosition={resetCameraPosition} 
              update3DState={setThreeDEnabled}
              updateGridRotation={updateGridRotation}/>
          </div>
        </div>
      )
}
