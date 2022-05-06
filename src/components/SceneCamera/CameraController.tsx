import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ** todo: this should be a custom hook instead of an empty component **
// ** also, it doesn't seem to work at all |:-(

export const CameraController = () => {
   const { camera, gl } = useThree();
   useEffect(
      () => {
         const controls = new OrbitControls(camera, gl.domElement);
         controls.minDistance = 3;
         controls.maxDistance = 20;
         return () => {
           controls.dispose();
         };
      },
      [camera, gl]
   );
   return null;
};