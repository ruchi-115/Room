import { Suspense, useEffect, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Plane, ScrollControls, Scroll, useScroll, useGLTF, GizmoViewport, Box } from '@react-three/drei'
import { useControls } from 'leva'
// import Plane from '@/components/Plane'
// import Overlay from './Overlay.js'

export default function Room() {
  return (
    <>
      {/* <Overlay /> */}
      <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}>
        <color attach="background" args={['white']} />
        <ambientLight intensity={0.3} castShadow />
        <pointLight position={[-3, 5, 0]} color={'#fff'} intensity={0.3} />
        {/* <Box scale={1} color={'black'} position={box.position} /> */}
        {/* <fog attach="fog" args={['#ff5020', 5, 18]} /> */}
        <spotLight angle={0.16} color="#fff" penumbra={1} position={[10, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />

        <Suspense fallback={null}>
          {/* Make a plane geometry */}
          <Plane args={[1000, 1000]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} receiveShadow >
            <meshBasicMaterial attach="material" color={'white'} receiveShadow />
          </Plane>
          {/* Wrap contents you want to scroll into <ScrollControls> */}
          <ScrollControls pages={5}>
            <RoomCube scale={1.5} position={[-2.7, -3.2, 1.7]} rotation={[0, 3.14, 0]} castShadow />
            <Scroll html>
              <div className='block' style={{ position: 'absolute', top: '900px', left: '50px' }} >
                <h1><i>ABOUT ME</i></h1>
                <h2>I am a full stack developer with a passion for creating beautiful
                  and functional web applications. I have a background in graphic design and a love for all things creative.
                  I am a self-taught developer who is always looking to learn new things and improve my skills. I am currently looking
                  for a full time position as a developer.</h2>
              </div>

              <div className='block' style={{ position: 'absolute', top: '2000px', left: '50px' }} >
                <h1><i>SKILLs</i></h1>
                <h2>
                  <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Javascript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>SQL</li>
                    <li>Git</li>
                    <li>GitHub</li>
                    <li>Adobe Photoshop</li>
                    <li>Three.js</li>
                    <li>React Three Fiber</li>
                    <li>Blender</li>
                  </ul>
                </h2>
              </div>
            </Scroll>
            {/* <Scroll html>
            </Scroll> */}
          </ScrollControls>
        </Suspense>
        {/* <GizmoViewport scale={0.8} axisColors={['red', 'green', 'blue']} labelColor="black" /> */}
      </Canvas>
    </>
  )
}

function RoomCube({ ...props }) {
  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll()
  const { scene, nodes } = useGLTF('/room.glb')
  // const { actions } = useAnimations(animations, scene)
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  // useEffect(() => void (actions['Take 001'].play().paused = true), [actions])
  useFrame((state) => {
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const r1 = scroll.range(0 / 7, 0.5 / 7)
    const r2 = scroll.range(1 / 7, 1.5 / 7)
    const r3 = scroll.range(2 / 7, 2.1 / 7)

    state.camera.position.set(Math.sin(r1) * -12, Math.sin(r2), Math.sin(r3) * -10)
    state.camera.lookAt(0.01, 0, 0)
  })
  return <primitive object={scene} {...props} castShadow />
}

/*
author: glenatron (https://sketchfab.com/glenatron)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/94b24a60dc1b48248de50bf087c0f042
title: Littlest Tokyo */
useGLTF.preload('/room.glb')

