import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface UpdateableBufferAttributeProps {
    attachObject: [target: string, name: string];
    array: Float32Array;
    count: number;
    itemSize: number;
}

/* a bufferAttribute react/fiber component for the bufferGeometry used for the floor tiles,
** but with a useEffect to update needsUpdate to true if the array of this bufferAttribute has changed.
** useEffect will compare the ref of the array, so if we pass in a new array, even if it is identical
** this will tell the buffer prop that it needs to be updated. 
** I'm not sure I understand why we need to do this, instead of using bufferAttribute directly. */
const UpdateableBufferAttribute: React.FunctionComponent<UpdateableBufferAttributeProps> = ({
    attachObject,
    array,
    count,
    itemSize
}: UpdateableBufferAttributeProps) => {
    const ref = useRef<THREE.BufferAttribute>();

    useEffect(() => {
        if (ref.current) {
            ref.current.needsUpdate = true;
        }
    }, [array]);

    return (
        <bufferAttribute
            attachObject={attachObject}
            array={array}
            itemSize={itemSize}
            count={count}
            usage={THREE.DynamicDrawUsage}
            ref={ref}
        />
    );
};

export default UpdateableBufferAttribute;
