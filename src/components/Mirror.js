import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Box } from "@react-three/drei";
import { useRef } from "react";
import { useCubeTexture } from "@react-three/drei";

const Mirror = ({ color, ...props }) => {
    const ref = useRef();
    const texture = useCubeTexture(
        ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
        { path: '/triangle/' }
    );
    useFrame(() => {
        ref.current.rotation.y += 0.001
        ref.current.rotation.z += 0.01
    });
    return (
        <>
            <Box ref={ref} {...props}>
                <meshBasicMaterial
                    envMap={texture}
                    color="#a9a9a9"
                    metalness={0.8}
                    roughness={0.2}
                    reflectivity={1}
                />
            </Box>
        </>
    );
};

function Mirrors() {
    return (
        <>
            <Mirror position={[-25, 8, 10]} rotation={[2.1, 2.12, 2]} scale={[10, 10, 0.1]} />
            <Mirror position={[-15, 20, 8]} rotation={[2.1, 8.12, 1]} scale={[9, 9, 0.1]} />
            <Mirror position={[0, 20, 8]} rotation={[2.1, 5.12, 1]} scale={[10, 10, 0.1]} />
            <Mirror position={[10, 18, 12]} rotation={[1.1, 2.12, 7]} scale={[10, 10, 0.2]} />
            <Mirror position={[22, 15, 12]} rotation={[1.19, 4.78, 1]} scale={[10, 10, 0.2]} />
            <Mirror position={[12, 6, 11]} rotation={[1.19, 3.78, 3]} scale={[8, 8, 0.2]} />
            <Mirror position={[-8, 6, 10]} rotation={[2.19, 3.78, 2]} scale={[8, 8, 0.2]} />
            <Mirror position={[5, 5, 10]} rotation={[2.19, 6.78, 5]} scale={[6, 6, 0.2]} />
        </>
    )
}

export default Mirrors;
