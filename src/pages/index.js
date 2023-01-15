import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import { Canvas } from '@react-three/fiber'
import Room from '../components/Room.js'
import { OrbitControls } from '@react-three/drei'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* <h1>Hello World</h1> */}
      <Canvas frameloop='demand' camera={{ position: [-5, 8, -8] }} >
        <ambientLight intensity={0.7} />
        <directionalLight color="white" position={[0, 0, 5]} />
        {/* <mesh>
              <boxGeometry />
              <meshStandardMaterial />
            </mesh> */}
        <Room />
        <OrbitControls />
      </Canvas>


    </>
  )
}
