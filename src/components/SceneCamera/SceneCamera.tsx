import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import getNextStepTransition from '../../utils/getNextStepTransition';

interface SceneCameraProps {
    cameraX: number;
    cameraY: number;
    gridRotation: number; 
    threeDEnabled: boolean;  
    zoomLevel: number;
}

const degToRad = (degrees: number): number => degrees * (Math.PI / 180);
const deg270 = degToRad(270);

interface Coordinate3D {
    x: number;
    y: number;
    z: number;
}

const SceneCamera: React.FunctionComponent<SceneCameraProps> = ({
    cameraX,
    cameraY,
    gridRotation,
    threeDEnabled,
    zoomLevel
}: SceneCameraProps) => {
    const gridRotationRad = degToRad(gridRotation);
    const currentRotationRef = useRef<number>(0);
    useFrame(({ camera }) => {
        const animationRotation = getNextStepTransition(currentRotationRef.current, gridRotationRad);
        currentRotationRef.current = animationRotation;
        const cameraHeight2D = 10 / zoomLevel;
        const cameraPosition2D: Coordinate3D = {
            x: cameraX,
            y: -cameraHeight2D,
            z: cameraY
        };

        /*
            The camera has an offset of 270 degrees because our default view
            is behind the grid and that's located on the negative z axis
            (positive x = 0 degrees)
            (positive z = 90 degrees)
            (negative x = 180 degrees)
            (negative z = 270 degrees)

            Also our view is flipped, therefore our left rotation is actually a
            right rotation on the x/z axis. This is why we should subtract the rotation
            rather than add it.
         */
        const cameraPosition3D: Coordinate3D = {
            x: cameraX + Math.cos(deg270 - animationRotation) * cameraHeight2D,
            y: -cameraHeight2D / 2,
            z: cameraY + Math.sin(deg270 - animationRotation) * cameraHeight2D
        };

        const cameraPosition = threeDEnabled ? cameraPosition3D : cameraPosition2D;
        const cameraLookAt: Coordinate3D = {
            x: cameraX,
            y: 0,
            z: cameraY
        };

        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.up.set(0, -1, 0);
        camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
        if (!threeDEnabled) {
            camera.rotation.z = -animationRotation;
        }
    });

    return (
        <perspectiveCamera
            fov={60}
            near={1}
            far={500}
            onUpdate={(self) => self.updateProjectionMatrix()}
        />
    );
};

export default SceneCamera;
