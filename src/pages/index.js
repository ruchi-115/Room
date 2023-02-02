import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import { Canvas, useThree } from '@react-three/fiber'
import Room from '@/components/Room.js'
import Title from '@/components/Title.js'
import { Html, OrbitControls, Scroll, ScrollControls, Billboard, SpotLightShadow, SpotLight, Box, RoundedBox, useTexture } from '@react-three/drei'
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
  //   position: [12, -20.5, -4.0],
  //   intensity: 0.5,
  // })

  return (
    <>
      <Link href='/home'>
        <Canvas frameloop='demand' shadows camera={{ position: [0, 10, 60], fov: 50 }}   >
          <color attach="background" args={['black']} />
          {/* <Canvas frameloop='demand' camera={{ position: [-5, 8, -8] }} > */}
          <pointLight position={[-10, 10, -30]} intensity={0.4} castShadow />
          {/* <rectAreaLight position={[12, -20.5, -4.0]} width={10} height={10} intensity={1} castShadow color={'#F4E99B'} /> */}
          {/* <SpotLight position={[12, -20.5, -4.0]}
              intensity={10}
              castShadow
              color={'#F4E99B'}
              penumbra={30}
              angle={Math.PI / 10}
              scale={25}
              distance={10}
            /> */}
          <pointLight position={[12, -20.5, -4.0]}
            intensity={0.3}
            castShadow
            color={'#F4E99B'}
          />
          <ambientLight intensity={0.1} castShadow />
          {/* <pointLight position={[-10, 10, -15]} intensity={0.5} castShadow /> */}
          <Title />
          {/* <Content /> */}
          <Mirrors />

          <group >

            <Physics gravity={[0, -20, 0]}>
              <PhyPlane color='#000000' rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
              {/* <Plane color='#000000' rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} /> */}
              <PyramidStack castShadow />

            </Physics>

          </group>

          {/* <Room position={[15, -30, 10]} scale={[5, 5, 5]} rotation={[0, -1, 0]} castShadow /> */}

          {/* <SpotLight position={[-1, -16, 1]} intensity={0.5} rotation={[0, 0, 100]} castShadow color={'yellow'} distance={80} scale={20} angle={2} penumbra={10} /> */}

          <OrbitControls enablePan={false} zoomSpeed={0.5} />
        </Canvas>
      </Link>

    </>
  )
}

const Tile = ({ url, title, ...props }) => {
  // const [ref] = usePlane(() => ({ ...props }));

  return (
    <>
      {/* <Plane attach="geometry" args={[100, 100]} /> */}
      <group>
        <RoundedBox smoothness={10} radius={0.015} {...props}>
          <meshBasicMaterial color={'black'} />
          {/* <Image position={[0, 0, 0.7]} url={url} scale={[0.9, 0.9]} /> */}
          {/* <Html transform position={[0, 0, -5]} style={{ fontSize: '1px' }}>
            <a href='#'>
              <div className='w-30 h-30 flex justify-center items-center'>
                <div className='p-2 opacity-0 hover:opacity-100 duration-200 text-sm text-white' style={{ fontSize: '3px' }} >{title}</div>
              </div>
            </a></Html> */}
        </RoundedBox>
      </group>
    </>
  );
};