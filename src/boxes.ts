// ** LEARNING:
// ** Even using buffered boxes I cannot draw enough boxes (40,000 will be required!) - looking at an pure 3js demo here: https://codepen.io/tutsplus/pen/zLvZQy?editors=0010
// ** I can see that that seems to be more efficient than using fiber (because of no React keeping track of components?),
// ** BUT still starts to get slow at 20,000 (on my chrome with many windows open) - still not good enough.
// ** Using buffer geometry to draw triangles seems to work OK (exlcudes React completely and limits the 
// ** dimensions we are drawing to)

export type XYZ = [x: number, y: number, z: number];

export const updateRotations = (box: XYZ, delta: XYZ): XYZ => {
    const [x, y, z] = box;
    const [dx, dy, dz] = delta;
    return [x + dx, y + dy, z + dz];
  }
  
const returnXYZ = (x: number, y: number, z: number): XYZ => [x, y, z];
  
// ** LEARNING ** 500 boxes seems to be the limit performance wise (on chrome with many tabs open)
// ** - probably because I have a separate mesh for each box - so 500 meshes max, rule of thumb.
// ** using buffered box geometries is better, but not enough to be able to render 40,000 tiles (probably,
// ** because React is tracking them as components, in the fiber way of doing things, and slowing things down)
const noOfBoxes = 6;
export const boxes: {position: XYZ, dims: XYZ, rotation: XYZ}[] =
[...Array(noOfBoxes).keys()].map(i => {
    return {
    position: returnXYZ(-3*i/noOfBoxes, -3*i/noOfBoxes, 3*i/noOfBoxes), 
    dims: returnXYZ(2*i/noOfBoxes, 2*i/noOfBoxes, 2*i/noOfBoxes), 
    rotation: returnXYZ(1.5*i/noOfBoxes, 1.5*i/noOfBoxes, 1.5*i/noOfBoxes)
    };
});