import React from 'react';
import { Plane } from '@react-three/drei';
import { usePlane } from '@react-three/cannon';

function PhyPlane({ color, ...props }) {
    const [ref] = usePlane(() => ({ ...props }));

    return (
        <Plane args={[100, 100]} ref={ref} receiveShadow>
            <meshStandardMaterial color={color} reflectivity={1} />
        </Plane>
    );
}

export default PhyPlane;