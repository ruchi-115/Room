import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import { Canvas, useThree } from '@react-three/fiber'
import Room from '../components/Room.js'
import Title from '@/components/Title.js'
import { Html, OrbitControls, Scroll, ScrollControls } from '@react-three/drei'
import { Physics, useBox, usePlane } from "@react-three/cannon";
import Mirrors from '@/components/Mirror.js'
import Plane from '@/components/Plane.js'
import PhyPlane from '@/components/PhyPlane.js'
import PyramidStack from '@/components/Pyramid.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // const viewport = useThree((state) => state.viewport)
  // const canvasSize = useThree((state) => state.size)
  return (
    <>
      <Canvas frameloop='demand' camera={{ position: [0, 10, 60], fov: 50 }}  >
        {/* <Canvas frameloop='demand' camera={{ position: [-5, 8, -8] }} > */}
        <ambientLight intensity={0.5} />
        <pointLight position={[-10, 5, -15]} intensity={0.5} castShadow />

        <ScrollControls pages={2} // Each page takes 100% of the height of the canvas
          distance={1} // A factor that increases scroll bar travel (default: 1)
          damping={2} // Friction, higher is faster (default: 4)
          horizontal={false} // Can also scroll horizontally (default: false)
          infinite={false} // Can also scroll infinitely (default: false)
        >
          <Scroll >
            <Title />
            <Mirrors />

            <group >
              <mesh position={[0, -2, 0]} >
                {/* <Plane color="#30303f" scale={[50, 50, 0.2]} /> */}
                {/* <Plane color="#30303f" rotation-x={-Math.PI / 2} position-y={-2.2} position-z={0} scale={[50, 50, 0.2]} /> */}
                <Physics gravity={[0, -20, 0]}>
                  <PhyPlane color='#000000' rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
                  {/* <PhyPlane color='#000000' rotation={[0, 0, 0]} position={[0, -2, 0]} /> */}
                  {/* <Sphere position={[-2, 1, 7]} /> */}
                  <PyramidStack />
                </Physics>
              </mesh>
            </group>


          </Scroll>
          <Scroll >
            <Room position={[0, -30, 10]} scale={[3, 3, 3]} rotation={[0, 90, 0]} />

          </Scroll>
        </ScrollControls>
        {/* <OrbitControls /> */}
      </Canvas>


    </>
  )
}
