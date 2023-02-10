import { Suspense, useEffect, useState, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Plane, ScrollControls, Scroll, useScroll, useGLTF, GizmoViewport, Box, SoftShadows, Text, Html } from '@react-three/drei'
import { useControls } from 'leva'
import Overlay from '../components/Overlay.js'
import Underlay from '@/components/Underlay.js'


export default function Room() {
  const [active, setActive] = useState(false);
  // const light = useControls('', {
  //   position: [0, 3, 0],
  //   intensity: 5,
  //   color: '#84d9e8',
  //   rotation: [0, -1, 0],

  // })

  return (
    <>
      <div style={{
        backgroundColor: active ? "black" : "#99cad1",
        color: active ? 'white' : 'black',
      }} >

        <Underlay mode={active} />
        <Overlay mode={active} />
        <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}>
          {/* <color attach="background" args={active ? ["#101010"] : ["#c4e9ff"]} /> */}

          {/* #e0b7ff */}
          <ambientLight intensity={active ? 0.06 : 0.8} />
          {/* <pointLight position={[-0.1, -0.8, 2]} color={light.color} penumbra={1} intensity={0.1} /> */}
          <rectAreaLight position={[0, 2.05, 0.8]} width={1} height={2} rotation={[-Math.PI / 2, 0, 0]} intensity={5} color={'blue'} />
          <rectAreaLight position={[0, 1.3, 0]} width={1} height={2} rotation={[-Math.PI / 2, 0, 0]} intensity={5} color={'blue'} />
          {/* <rectAreaLight position={[-1.3, -2, 3.6]} width={3} height={2.5} rotation={[-Math.PI / 2, 0, 0]} intensity={1} castShadow color={'#be46ff'} /> */}
          <rectAreaLight position={[0.2, -1, 0]} width={3} height={0.5} rotation={[0, -Math.PI / 2, 0]} intensity={3} color={'#007589'} />

          {/* <Box scale={0.5} position={light.position} castShadow>
          <meshStandardMaterial color={light.color} />
        </Box> */}

          {/* <fog attach="fog" args={['#ff5020', 5, 18]} /> */}
          <Text
            position={[0, 0, 10]}
            scale={0.4}
            color={'white'}
            fontSize={10}
            maxWidth={200}
            lineHeight={1}
            fontFamily="'Antonio', sans-serif"
            letterSpacing={0.02}
            textAlign={'left'}
            anchorX="center"
            anchorY="middle"
          >
            RXM
          </Text>

          <spotLight angle={0.16} color={active ? "blue" : "white"} intensity={1} penumbra={0.3} position={[-5, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
          <Plane onClick={() => setActive(!active)} args={[50, 50]} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
            <meshStandardMaterial color={active ? "#101010" : "#84d9e8"} receiveShadow />
          </Plane>
          {/* <mesh onClick={() => setActive(!active)} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial attach="material" color={active ? "#101010" : "#c4e9ff"} receiveShadow />
        </mesh> */}

          <Suspense fallback={null}>
            {/* Wrap contents you want to scroll into <ScrollControls> */}
            <ScrollControls pages={8}>
              <RoomCube scale={1.5} position={[-2.7, -3.2, 1.7]} rotation={[0, 3.14, 0]} castShadow />
              <Scroll html>
                <div className='block' style={{
                  fontFamily: "'Antonio', sans-serif",
                  flex: "1 1 0%",
                  // fontSize: 15,
                  lineHeight: "30px", letterSpacing: 1, position: 'absolute', top: '900px', backgroundColor: active ? "black" : "white"
                }} >
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '3em', borderRadius: "0.2em" }}><i>HI, I'M RUCHITA</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>A FULL STACK DEVELOPER</h2>
                  <p style={{ color: active ? 'white' : 'black' }}>I am a creative web developer with a passion for creating beautiful
                    and functional web applications. I have a background in graphic design and a love for all things creative.
                    I am a self-taught developer who is always looking to learn new things and improve my skills. I am currently looking
                    for a full time position as a developer.</p>
                  <p style={{ color: active ? 'white' : 'black' }}>
                    I am constantly learning and evolving my skills to stay up-to-date with the latest trends and technologies,
                    and I am dedicated to delivering high-quality, user-friendly designs that not only meet, but exceed the needs
                    and expectations of my clients. My passion for this field drives me to constantly push the boundaries and create unique
                    and innovative solutions that stand out in the crowded online world.
                  </p>
                  {/* <p style={{ color: active ? 'white' : 'black', fontSize: '1.2em' }}>
                    <a href="" style={{ color: active ? 'white' : 'black', backgroundColor: active ? "#00066f" : "#99cad1", padding: "0.5em", fontSize: '1.2em', borderRadius: "0.2em" }}><i>VIEW MY RESUME</i></a>
                  </p> */}
                </div>


                <div className='block' style={{ position: 'absolute', height: '50em', top: '2000px', backgroundColor: active ? "black" : "white", }} >
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '3em', borderRadius: "0.2em" }}><i>SKILLS</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>WHAT I CAN DO</h2>
                  {/* <div className='block' style={{ position: 'absolute', height: '80em', top: '1500px', backgroundColor: active ? "black" : "white", }} > */}
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '2em', borderRadius: "0.2em" }}><i>FRONT END</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>HTML, CSS, JAVASCRIPT, REACT, REDUX, THREEJS</h2>
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '2em', borderRadius: "0.2em" }}><i>BACK END</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>NODE, EXPRESS, POSTGRESQL, SEQUELIZE, MONGODB, MONGOOSE</h2>
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '2em', borderRadius: "0.2em" }}><i>OTHER</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>GIT, GITHUB, HEROKU, NETLIFY, VSCODE, FIGMA, PHOTOSHOP</h2>
                  {/* </div> */}
                </div>

                <div className='block' style={{ position: 'absolute', height: '80em', top: '3000px', backgroundColor: active ? "black" : "white", }} >
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '3em', borderRadius: "0.2em" }}><i>PROJECTs</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>A FEW OF MY RECENT WORKS</h2>

                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '2em', borderRadius: "0.2em" }}><i>REACT THREE FIBER</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>A 3D MODEL OF A ROOM</h2>
                  <p style={{ color: active ? 'white' : 'black' }}>This is a 3D model of a room created using React Three Fiber. The model is interactive and can be rotated and zoomed in and out.</p>
                  <p style={{ color: active ? 'white' : 'black' }}> <a href="" style={{ color: active ? 'white' : 'black', backgroundColor: active ? "#00066f" : "#99cad1", padding: "0.5em", fontSize: '1.2em', borderRadius: "0.2em" }}><i>VIEW PROJECT</i></a></p>

                  {/* <div className='block' style={{ position: 'absolute', top: '2500px', backgroundColor: active ? "black" : "white", }} > */}
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '2em', borderRadius: "0.2em" }}><i>THREE.JS</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>A 3D MODEL OF A ROOM</h2>
                  <p style={{ color: active ? 'white' : 'black' }}>This is a 3D model of a room created using Three.js. The model is interactive and can be rotated and zoomed in and out.</p>
                  <p style={{ color: active ? 'white' : 'black' }}> <a href="" style={{ color: active ? 'white' : 'black', backgroundColor: active ? "#00066f" : "#99cad1", padding: "0.5em", fontSize: '1.2em', borderRadius: "0.2em" }}><i>VIEW PROJECT</i></a></p>
                  {/* </div> */}
                  {/* <div className='block' style={{ position: 'absolute', top: '2900px', backgroundColor: active ? "black" : "white", }} > */}
                  <h1 style={{ border: active ? "#00066f" : "#99cad1", paddingTop: "0.5em", fontSize: '2em', borderRadius: "0.2em" }}><i>REACT THREE FIBER</i></h1>
                  <h2 style={{ color: active ? "#00066f" : "#99cad1", paddingTop: "0.3em", fontSize: '1.5em' }}>A 3D MODEL OF A ROOM</h2>
                  <p style={{ color: active ? 'white' : 'black' }}>This is a 3D model of a room created using React Three Fiber. The model is interactive and can be rotated and zoomed in and out.</p>
                  <p style={{ color: active ? 'white' : 'black' }}> <a href="" style={{ color: active ? 'white' : 'black', backgroundColor: active ? "#00066f" : "#99cad1", padding: "0.5em", fontSize: '1.2em', borderRadius: "0.2em" }}><i>VIEW PROJECT</i></a></p>
                  {/* </div> */}


                  {/* <h1><i>SKILLs</i></h1>

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
                  </h2> */}
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
          {/* <GizmoViewport scale={0.8} axisColors={['red', 'green', 'blue']} labelColor="black" /> */}
        </Canvas>
      </div>
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

    state.camera.position.set(Math.sin(r1) * -12, Math.sin(r2) * 2, Math.sin(r3) * -8)
    state.camera.lookAt(0.01, 0, 0)
  })
  return <primitive object={scene} {...props} castShadow />
}
useGLTF.preload('/room.glb')

