import React from 'react'
import { useRef } from 'react'

function Frame({ url, position, scale, ...props }) {
    const image = useRef()
    return (
        <mesh
            scale={scale}
            position={position}>
            <boxGeometry />
            <meshStandardMaterial color="" roughness={0.5} envMapIntensity={2} />
            <mesh scale={[0.9, 0.93, 0.9]} position={[0, 0, -0.2]}>
                <boxGeometry />
                <meshStandardMaterial toneMapped={false} fog={false} />
            </mesh>
            <Image position={[0, 0, -0.7]} ref={image} scale={[0.8, 0.5, 0.8]} rotation={[0, -Math.PI, 0]} url={url} />
        </mesh>
    )
}

export default Frame