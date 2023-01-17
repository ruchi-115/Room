import React from 'react';
import { RoundedBox } from '@react-three/drei';


const Plane = ({ color, ...props }) => {
    // const [ref] = usePlane(() => ({ ...props }));
    return (
        <>
            {/* <Plane attach="geometry" args={[100, 100]} /> */}
            <RoundedBox smoothness={10} radius={0.015} {...props}>
                <meshStandardMaterial color={color} envMapIntensity={1} roughness={1} metalness={1} />
            </RoundedBox>
        </>
    );
};

export default Plane;