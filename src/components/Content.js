import React from 'react'
import { Text, Html, Scroll } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function Content() {
    const { viewport } = useThree()
    const canvasSize = useThree((state) => state.size)
    return (
        <>
            <Text
                position={[-35, -10, 15]}
                scale={(viewport.width / 30) * 0.4}
                color={'white'}
                fontSize={1.8}
                maxWidth={20}
                lineHeight={1}
                letterSpacing={0.02}
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                textAlign={'left'}
                anchorX="center"
                anchorY="middle"
                outlineOffsetX={'10%'}
                outlineOffsetY={'10%'}
                outlineBlur={'30%'}
                outlineOpacity={0.3}
                outlineColor="goldenrod"
            >
                ABOUT

            </Text>
            <Text
                position={[-22, -20, 15]}
                scale={(viewport.width / 30) * 0.4}
                color={'white'}
                fontSize={1}
                maxWidth={22}
                lineHeight={1}
                letterSpacing={0.01}
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                textAlign={'left'}
                anchorX="center"
                anchorY="middle"
                outlineOffsetX={'10%'}
                outlineOffsetY={'10%'}
                outlineBlur={'30%'}
                outlineOpacity={0.3}
                outlineColor="goldenrod"
                fillOpacity={0}
                strokeWidth={'2.5%'}
                strokeColor="#ffffff"
            >
                HEY, I'M RUCHITA, FULL STACK DEVELOPER, DESIGNER AND WRITER.
                I LOVE TO CREATE THINGS THAT LIVE ON THE INTERNET, WHETHER THAT BE WEBSITES, APPLICATIONS,
                OR ANYTHING IN BETWEEN. MY GOAL IS TO ALWAYS BUILD PRODUCTS THAT PROVIDE PIXEL-PERFECT, PERFORMANT EXPERIENCES.

            </Text>
        </>
    )
}

export default Content