import React, { useRef } from "react";
import { Coordinate } from "../types/Floor.types";
import UpdateableBufferAttribute from "./UpdateableBufferAttribute/UpdateableBufferAttribute";

export const cellWidth = 0.761;
export const cellHeight = 0.561;

export const noOfCellsWide = 30;
export const noOfCellsHigh = 30;

interface FloorTileData {
    coord: Coordinate,
    colour: {r: number, g: number, b: number}
}

interface FloorTilesData {
    floorTiles: FloorTileData[]
}

const createFloorData = (): FloorTilesData => {
    // ** LEARNING: at 200 x 2000 (40,000 cell) it shows identical performance issue to real gridmap
    // ** (on my laptop, slow on chrome where I have a million tabs open, fine on Safari)
    const randomTopQuintile = () => Math.random()/5 + 0.8;
    const randomPastel = () => {return {r: randomTopQuintile(), g: randomTopQuintile(), b: randomTopQuintile()}};
    return {
        floorTiles: [...Array(noOfCellsHigh).keys()].flatMap(x => {
            return [...Array(noOfCellsWide).keys()].map(y => {
                return {
                    coord: {x: x, y: y},
                    colour: randomPastel()
                }
            })
        })
    };
};

const getFloorTilePositionsForSingleTile = (coord: Coordinate, cellWidth: number, cellHeight: number): number[] => {
    /*  This returns 6 points defining 2 triangles that compose a rectangle which represents the cell:
     _________________________     endZ
    |                      .  |
    |                 .       |
    | hypotenuse .            |    height
    |       .                 |
    |  .                      |
     _________________________     startZ

    startX       width        endX */
    const { x: gridX, y: gridZ } = coord;
    const gridStandardBorderThickness = 0.01;
    const gridStandardGapSize = 0.01;
    const additionalGap = gridStandardBorderThickness;
    const startX = gridX * cellWidth + gridStandardGapSize + additionalGap;
    const startZ = gridZ * cellHeight + gridStandardGapSize + additionalGap;
    const endX = (gridX + 1) * cellWidth - gridStandardGapSize - additionalGap;
    const endZ = (gridZ + 1) * cellHeight - gridStandardGapSize - additionalGap;

    return [
        startX, 0, startZ,
        endX, 0, startZ,
        endX, 0, endZ,

        startX, 0, startZ,
        endX, 0, endZ,
        startX, 0, endZ
    ];
};

const normalsPointingDown = [
    0, -1, 0,
    0, -1, 0,
    0, -1, 0
];

const getFloorTileNormalsForSingleCell = (): number[] => [...normalsPointingDown, ...normalsPointingDown];

export const doubleColor = (color: number[]): number[] => [...color, ...color];

// Floor holds a collection of tiles
const floorTiles: FloorTilesData = createFloorData();
const positions: number[] = [];
const normals: number[] = [];
const colors: number[] = [];
floorTiles.floorTiles.forEach((tile) => {
    const {r, g, b} = tile.colour;
    positions.push(...getFloorTilePositionsForSingleTile(tile.coord, cellWidth, cellHeight));
    normals.push(...getFloorTileNormalsForSingleCell());
    colors.push(...doubleColor([r, g, b, r, g, b, r, g, b]));
});

const positionArray = new Float32Array(positions);
const normalArray = new Float32Array(normals);
const colorArray = new Float32Array(colors);
const positionsCount = positions.length / 3;
const normalsCount = normals.length / 3;
const colorsCount = colors.length / 3;

export default function Floor() { 
    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef<THREE.Mesh>(null!);
    const materialRef = useRef<THREE.MeshLambertMaterial>(null!);

    return (
        <mesh
            ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attachObject={['attributes', 'position']}
                    array={positionArray}
                    itemSize={3}
                    count={positionsCount}
                />
                <bufferAttribute
                    attachObject={['attributes', 'normal']}
                    array={normalArray}
                    itemSize={3}
                    count={normalsCount}
                />
                <UpdateableBufferAttribute
                    attachObject={['attributes', 'color']}
                    array={colorArray}
                    itemSize={3}
                    count={colorsCount}
                />
            </bufferGeometry>
            {/* Basic: no consideration of light source direction - leads to flat blocks of colour, good for 'wireframe' style projects */}
            <meshBasicMaterial ref={materialRef} vertexColors toneMapped={false} />
        </mesh>
    )
}