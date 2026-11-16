import { Suspense, useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, useGLTF, Image, useVideoTexture, useTexture, useAspect, GizmoViewport, Box, SoftShadows, Text, Html } from '@react-three/drei'
import Overlay from '../components/Overlay.js'
import Underlay from '@/components/Underlay.js'
import LoadingScreen from '@/components/Loading.js'
import Head from 'next/head'
import RoomNav from '@/components/room/RoomNav.js'
import CameraRig from '@/components/room/CameraRig.js'
import TerminalPanel from '@/components/room/TerminalPanel.js'
import ProjectsPanel from '@/components/room/ProjectsPanel.js'
import ContactPanel from '@/components/room/ContactPanel.js'
// import Frame from '@/components/Frame.js'


export default function Room() {
  const [active, setActive] = useState(false);
  const [view, setView] = useState('home')
  const [arrivedView, setArrivedView] = useState(null)
  const anchorsRef = useRef({})
  const registerAnchor = useCallback((key) => (el) => {
    if (el) anchorsRef.current[key] = el
    else delete anchorsRef.current[key]
  }, [])
  const goTo = useCallback((next) => {
    setArrivedView(null)
    setView(next)
  }, [])
  const zoomed = view !== 'home'

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e) => {
      if (e.key === 'Escape') goTo('home')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed, goTo])
  // const light = useControls('', {
  //   position: [0, 0, 0],
  // intensity: 5,
  // color: '#84d9e8',
  // rotation: [0, -1, 0],

  // })

  return (
    <>
      <Head>
        <title>Ruchita Sonawale — Full Stack Developer</title>
        <meta name="description" content="Interactive 3D room portfolio of Ruchita Sonawale, full stack developer. Explore projects, read about me, and get in touch." />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content={active ? '#000000' : '#99cad1'} />
      </Head>
      <div className="room-root" data-theme={active ? 'dark' : 'light'} data-zoomed={zoomed} style={{
        width: "100%",
        height: "100dvh",
        backgroundColor: active ? "black" : "#99cad1",
        color: active ? 'white' : 'black',
      }} >

        <div className="home-only" aria-hidden={zoomed}>
          <Underlay mode={active} />
        </div>
        <Overlay mode={active} />

        <RoomNav view={view} onChange={goTo} />

        {zoomed && (
          <button type="button" className="room-back" onClick={() => goTo('home')}>
            <span aria-hidden="true">{'←'}</span> Back to room
          </button>
        )}

        {view === 'about' && <TerminalPanel open={arrivedView === 'about'} registerAnchor={registerAnchor} onNavigate={goTo} />}
        {view === 'projects' && <ProjectsPanel open={arrivedView === 'projects'} registerAnchor={registerAnchor} />}
        {view === 'contact' && <ContactPanel open={arrivedView === 'contact'} registerAnchor={registerAnchor} />}

        {/* Dark mode switch */}
        <div className="theme-toggle" style={{ position: "absolute", bottom: 40, right: 40, zIndex: 2 }}>
          {/* Circle Button  */}
          <button onClick={() => setActive(!active)} className="button" aria-label={active ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              backgroundColor: active ? "#99cad1" : "#0f0f0f",
            }}>{active ? "𖤓" : "☽"}</button>
        </div>
        {/* Dark mode switch */}

        {/* Room + Scroll Content */}
        <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 0] }}>
          {/* <color attach="background" args={active ? ["#101010"] : ["#c4e9ff"]} /> */}

          {/* #e0b7ff */}
          <ambientLight intensity={active ? 0.06 : 0.8} />
          {/* <pointLight position={[-0.1, -0.8, 2]} color={light.color} penumbra={1} intensity={0.1} /> */}
          <rectAreaLight position={[0, 2.05, 0.8]} width={1} height={2} rotation={[-Math.PI / 2, 0, 0]} intensity={5} color={'blue'} />
          <rectAreaLight position={[0, 1.3, 0]} width={1} height={2} rotation={[-Math.PI / 2, 0, 0]} intensity={5} color={'blue'} />
          <rectAreaLight position={[-0.4, 0, 0]} width={1.5} height={1} rotation={[0, -Math.PI / 2, 0]} intensity={0.8} color={'white'} />
          {/* <rectAreaLight position={[-1.3, -2, 3.6]} width={3} height={2.5} rotation={[-Math.PI / 2, 0, 0]} intensity={1} castShadow color={'#be46ff'} /> */}
          <rectAreaLight position={[0.2, -1, 0]} width={3} height={0.5} rotation={[0, -Math.PI / 2, 0]} intensity={3} color={'#007589'} />
          <spotLight angle={0.16} color={active ? "blue" : "white"} intensity={1} penumbra={0.3} position={[-5, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
          <Plane args={[50, 50]} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow  >
            <meshStandardMaterial color={active ? "#101010" : "#84d9e8"} receiveShadow />
          </Plane>
          {/* <Image url="/wallpaper.png" position={[-2.25, 2.6, 4.95]} rotation={[0, -Math.PI, 0]} scale={[1.3, 0.8, 0.8]} /> */}
          {/* <mesh position={light.position}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshNormalMaterial attach="material" />
          </mesh> */}


          <Suspense fallback={null}>
            <CameraRig view={view} anchorsRef={anchorsRef} onArrive={setArrivedView} />
            <RoomCube scale={1.5} position={[-2.7, -3.2, 1.67]} rotation={[0, 3.14, 0]} castShadow />

            {/* <mesh scale={[10, 10]}>
              <planeGeometry />
            </mesh > */}
            <Video />
          </Suspense>
          {/* <Suspense fallback={<FallbackMaterial url="wallpaper.png" />}>
            <VideoMaterial url="https://youtu.be/a3aV3mKr6Vo" crossOrigin={"Anonymous"} />
          </Suspense> */}
          {/* <GizmoViewport scale={0.8} axisColors={['red', 'green', 'blue']} labelColor="black" /> */}
        </Canvas>
        {/* // ) : (
        //   <LoadingScreen />
        // )} */}
      </div >
    </>

  )
}

function Video() {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = './hello-world.mp4';
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.play().catch(() => {});
    return vid;
  }
  )

  return (
    <mesh rotation={[0, -Math.PI / 2, 0]} position={[0.386, 0, -0.02]} scale={[0.4, 0.4, 1]}>
      <planeGeometry args={[3.2, 1.9]} />
      <meshBasicMaterial >
        <videoTexture attach="map" args={[video]} />
        {/* <videoTexture attach="emissiveMap" args={[video]} /> */}
      </meshBasicMaterial>
    </mesh>
    // <mesh position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]}  >
    //   <planeGeometry />
    //   <meshBasicMaterial toneMapped={false}>
    //     <videoTexture attach="map" args={[video]} />
    //   </meshBasicMaterial>
    // </mesh>
  )
}

function RoomCube({ ...props }) {
  const { scene, nodes } = useGLTF('/room.glb')
  // const {actions} = useAnimations(animations, scene)
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)), [nodes])
  // useEffect(() => void (actions['Take 001'].play().paused = true), [actions])
  // Camera movement (scroll on the home view, zoom to monitor/frames/shelf) lives in CameraRig.
  // const position = useControls('center', {
  //   position: [-4, 3, 4.5],
  // }
  // )
  return (
    <>
      <primitive object={scene} {...props} castShadow />
      {/* {zoom ? <Image url="/wallpaper.png" position={[-2.25, 2.6, 4.95]} rotation={[0, -Math.PI, 0]} scale={[1.3, 0.8, 0.8]} /> : null} */}
      {/* <Frame position={[-2, 2.2, 4.5]} scale={[1, 1.3, 0.05]} url='/ideacon.png' />
      <Frame position={[-2.1, 1, 4.5]} scale={[0.8, 1, 0.05]} url='/wallpaper.png' />
      <Frame position={[-4.03, 2.45, 4.5]} scale={[0.8, 1, 0.05]} url='/wallpaper.png' />
      <Frame position={[-1.03, 2.65, 4.5]} scale={[0.8, 1, 0.05]} url='/wallpaper.png' />
      <Frame position={[-3.05, 2.6, 4.5]} scale={[1, 1.3, 0.05]} url='/wallpaper.png' />
      <Frame position={[-3.14, 1.37, 4.5]} scale={[1.2, 1, 0.05]} url='/Planets.jpg' />
      <Frame position={[-0.83, 1.6, 4.5]} scale={[1.2, 1, 0.05]} url='/wallpaper.png' /> */}
      {/* <Image onClick={() => setZoom(!zoom)} url="/wallpaper.png" position={[-2.25, 2.6, 4.95]} rotation={[0, -Math.PI, 0]} scale={[1.3, 0.8, 0.8]} /> */}
    </>
  )
}
useGLTF.preload('/room.glb')

// function Frame({ url, position, scale, ...props }) {
//   const image = useRef()

//   return (
//     <mesh
//       scale={scale}
//       position={position}>
//       <boxGeometry />
//       <meshStandardMaterial color="#090a43" metalness={0.5} roughness={0.5} envMapIntensity={2} />
//       <mesh scale={[0.9, 0.93, 0.9]} position={[0, 0, -0.2]}>
//         <boxGeometry />
//         <meshStandardMaterial toneMapped={false} fog={false} />
//       </mesh>
//       <Image position={[0, 0, -0.7]} ref={image} scale={[0.8, 0.6, 0.8]} rotation={[0, -Math.PI, 0]} url={url} />
//     </mesh>
//   )
// }
