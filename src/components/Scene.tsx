/* React and fiber */
import React, { Suspense, useEffect, useState } from 'react';
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

const scene = {
  cameraXStart: noOfCellsWide/2 * cellWidth,
  cameraYStart: noOfCellsHigh/2 * cellHeight,
  outerWindow: {width: 1200, height: 850},
  innerWindow: {width: 2400, height: 1200},
  fps: 28
};

export default function Scene() {
    const containerRef = React.createRef<HTMLDivElement>();
    const scrollingRef = React.createRef<HTMLDivElement>();

    const [cameraX, setCameraX] = useState(scene.cameraXStart);
    const [cameraY, setCameraY] = useState(scene.cameraYStart);
    const updateCameraX = (delta: number) => setCameraX(cameraX + delta);
    const updateCameraY = (delta: number) => setCameraY(cameraY + delta);
    const [threeDEnabled, setThreeDEnabled] = useState(false);
    const [gridRotation, setGridRotation] = useState(0);
    const updateGridRotation = (deltaDegrees: number) => setGridRotation(gridRotation + deltaDegrees);

    const resetScrollBars = () => scrollingRef.current?.scrollTo(
      (scene.innerWindow.width - scene.outerWindow.width)/2, 
      (scene.innerWindow.height - scene.outerWindow.height)/2);
    const resetCameraPosition = () => {
      setCameraX(scene.cameraXStart);
      setCameraY(scene.cameraYStart);
      resetScrollBars();
      const directionOffset = gridRotation % 360;
      if (directionOffset > 180) {
        updateGridRotation(90);
      } else {
        updateGridRotation(-directionOffset)
      }
      //setGridRotation();
      setThreeDEnabled(false);
    };

    const [frameCount, setFrameCount] = useState(1);

    // ** LEARNING **
    // ** In React if I update 3 bits of state, they aren't grouped together! 
    // ** Scene will be invalidated 3 times, leading to 3 timeouts next time! |:-O
    // ** so I'm going to trip the useEffect only when frame count has changed
    // **
    // ** I am controlling the frame rate using a setTimeout to update frame count state.
    // ** on update of the frame count, the first invalidate after this will trigger the useEffect
    // ** but subsequent ones before the next timeout won't, so only once a frame duration are states updated
    // ** (Note: Camera is still using useFrame(), which is called every frame, e.g. if 3js is managing 60fps, then 60 time per second.)
    useEffect(() => {
      setTimeout(() => {
        setFrameCount(frameCount+1);

        /* -- THIS IS THE GAME LOOP -- */
        GameLoop(/*frameCount*/);

        /* update my rotating boxes, which proves this is 3D and are just helpful for development/debugging */
        boxes.forEach((box, i) => box.rotation = updateRotations(box.rotation, [-i/(100*boxes.length), 0, 0]));
      }, 1000/scene.fps);
    }, [frameCount]);

    useEffect(() => {
      // centre the scroll bars, based on the difference in the sizes of the inner and outer divs
      resetScrollBars();
      GameSetup();
    }, [/*run only once*/])

    return (
        <div id="scrollingDiv" ref={scrollingRef} style={{
          width: scene.outerWindow.width,
          height: scene.outerWindow.height,
          overflow: "auto"
          }}>
          <div id="containerDiv" style={{
            width: scene.innerWindow.width, height: scene.innerWindow.height}}
                  ref={containerRef}
                  // onMouseDown={onCanvasMouseDown}
                  // onMouseUp={onCanvasMouseUp}
                  // onMouseMove={onCanvasMouseMove}
              >
            <Canvas linear >
              <color attach="background" args={['#a2b9e7']} />
              {/* LEARNING - if using useLoader (to load textures) must have a suspense handler for while awaiting load */}
              <Suspense fallback={null}> 
                <SceneCamera
                  cameraX={cameraX}
                  cameraY={cameraY}
                  gridRotation={gridRotation}
                  threeDEnabled={threeDEnabled}
                  zoomLevel={0.6/* affected by the height of the window we are rendering into */}
                />
                <ambientLight />
                <pointLight position={[noOfCellsWide * cellWidth * 0.1, -10, noOfCellsHigh * cellHeight * 0.8]} />
                {boxes.map((box,i) => <BufferedBox position={box.position} dims={box.dims} rotation={box.rotation} colour={0x12fe78} chameleon={true} key={'Scene_BufferedBox_'+i} /> )}
                <Floor />
                <Block startPos={{x:1, y:1}} endPos={{x:1, y:30}} colour={0x12fe78} />
                <Block startPos={{x:2, y:1}} endPos={{x:29, y:1}} colour={0x12fe78} />
                <Block startPos={{x:30, y:1}} endPos={{x:30, y:30}} colour={0x12fe78} />
                <Block startPos={{x:2, y:30}} endPos={{x:29, y:30}} colour={0x12fe78} />
                <Bot coords={GameData.bot1Pos} colour={0xAAAAAA} />
                <Ball coords={GameData.ball1.pos} />
              </Suspense>
            </Canvas>
            {/* LEARNING - Anything inside fiber Canvas must be a fiber component */}
            <CameraControls 
              outerWindow={scene.outerWindow} 
              updateCameraX={updateCameraX} 
              updateCameraY={updateCameraY}
              resetCameraPosition={resetCameraPosition} 
              update3DState={setThreeDEnabled}
              updateGridRotation={updateGridRotation}
              gridRotation={gridRotation} />
          </div>
        </div>
      )
}
