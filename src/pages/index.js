import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import { Canvas, useThree } from '@react-three/fiber'
import Room from '@/components/Room.js'
import Title from '@/components/Title.js'
import { Html, OrbitControls, Scroll, ScrollControls, SpotLightShadow, SpotLight, Box } from '@react-three/drei'
import { Physics, useBox, usePlane } from "@react-three/cannon";
import Mirrors from '@/components/Mirror.js'
import Plane from '@/components/Plane.js'
import PhyPlane from '@/components/PhyPlane.js'
import PyramidStack from '@/components/Pyramid.js'
import Content from '@/components/Content.js'
import { useControls } from 'leva'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const light = useControls('pink', {
  //   position: [-5, -25, 10],
  //   intensity: 0.5,
  // })

  return (
    <>
      <Canvas frameloop='demand' shadows camera={{ position: [0, 10, 60], fov: 50 }}  >
        {/* <Canvas frameloop='demand' camera={{ position: [-5, 8, -8] }} > */}

        <ScrollControls pages={2} // Each page takes 100% of the height of the canvas
          distance={1} // A factor that increases scroll bar travel (default: 1)
          damping={2} // Friction, higher is faster (default: 4)
          horizontal={false} // Can also scroll horizontally (default: false)
          infinite={false} // Can also scroll infinitely (default: false)
        >
          <Scroll >
            <SpotLight position={[12, -20.5, -4.0]}
              intensity={10}
              castShadow
              color={'#F4E99B'}
              penumbra={30}
              angle={Math.PI / 10}
              scale={25}
              distance={10}
            />
            <pointLight position={[12, -20.5, -4.0]}
              intensity={1}
              castShadow
              color={'#F4E99B'}
            />
            <ambientLight intensity={0.1} />
            {/* <pointLight position={[-10, 10, -15]} intensity={0.5} castShadow /> */}
            <Title />
            <Content />
            <Mirrors />

            <group >

              <Physics gravity={[0, -20, 0]}>
                <PhyPlane color='#000000' rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
                {/* <Plane color='#000000' rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} /> */}
                <PyramidStack castShadow />
              </Physics>

            </group>
          </Scroll>


          <Scroll >
            <Room position={[15, -30, 10]} scale={[5, 5, 5]} rotation={[0, -1, 0]} castShadow receiveShadow />
          </Scroll>
        </ScrollControls>
        {/* <SpotLight position={[-1, -16, 1]} intensity={0.5} rotation={[0, 0, 100]} castShadow color={'yellow'} distance={80} scale={20} angle={2} penumbra={10} /> */}

        {/* <OrbitControls /> */}
      </Canvas>


    </>
  )
}
