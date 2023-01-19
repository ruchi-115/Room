import React from 'react'
import { Text, Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function Title() {
    const { viewport } = useThree()
    return (
        <>
            <Text
                position={[0, 10, 10]}
                scale={(viewport.width / 50) * 0.4}
                color={'white'}
                fontSize={10}
                maxWidth={200}
                lineHeight={1}
                // font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                letterSpacing={0.02}
                textAlign={'left'}
                anchorX="center"
                anchorY="middle"
            >
                RUCHITA

            </Text>


        </>
    )
}

export default Title