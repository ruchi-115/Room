import { Suspense, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, ScrollControls, Scroll, useScroll, useGLTF, Image, useVideoTexture, useTexture, useAspect, GizmoViewport, Box, SoftShadows, Text, Html } from '@react-three/drei'
import { useControls } from 'leva'
import Overlay from '../components/Overlay.js'
import Underlay from '@/components/Underlay.js'
import LoadingScreen from '@/components/Loading.js'
// import Frame from '@/components/Frame.js'


export default function Room() {
  const [active, setActive] = useState(false);
  // const light = useControls('', {
  //   position: [0, 0, 0],
  // intensity: 5,
  // color: '#84d9e8',
  // rotation: [0, -1, 0],

  // })

  return (
    <>
      <div style={{
        width: "100%",
        height: "100vh",
        backgroundColor: active ? "black" : "#99cad1",
        color: active ? 'white' : 'black',
      }} >

        <Underlay mode={active} />
        <Overlay mode={active} />
        {/* Dark mode switch */}
        <div style={{ position: "absolute", bottom: 40, right: 40, zIndex: 2 }}>
          {/* Circle Button  */}
          <button onClick={() => setActive(!active)} className="button"
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
            {/* Wrap contents you want to scroll into <ScrollControls> */}
            <ScrollControls pages={10}>
              <RoomCube scale={1.5} position={[-2.7, -3.2, 1.67]} rotation={[0, 3.14, 0]} castShadow />
              <Scroll html>
                {/* Letter R */}
                <div className='absolute letter-r' style={{
                  backgroundColor: active ? "black" : "white",
                  top: '1000px',
                }}>
                  <div className='letter-r-inside' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",

                  }}>
                    <p className='font-xlg margin-sm' style={{
                      color: active ? "white" : "black", paddingTop: "1.1em",
                    }}>HI, I'M RUCHITA SONAWALE</p>
                    <p className='font-lg margin-sm' style={{ color: active ? "white" : "black", paddingBottom: "0.8em", }}>FULL STACK DEVELOPER</p>
                  </div>
                </div>
                {/* Letter U */}
                {/* Skills section */}
                <div className='absolute letter-u' style={{ backgroundColor: active ? "black" : "white", }}>
                  <div className='letter-u-inside' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                  }}>
                    <p className="font-md margin-sm" style={{ color: active ? "white" : "black" }}>I am a creative web developer with a passion for creating beautiful
                      and functional web applications. I have a background in graphic design and a love for all things creative.
                      I am a self-taught developer who is always looking to learn new things and improve my skills. I am currently looking
                      for a full time position as a developer.</p>
                    <p className="font-md margin-sm" style={{ color: active ? "white" : "black" }}>
                      I am constantly learning and evolving my skills to stay up-to-date with the latest trends and technologies,
                      and I am dedicated to delivering high-quality, user-friendly designs.</p>

                    <div className='margin-sm' style={{ paddingTop: "7em" }}>
                      <h1 className='margin-sm font-xlg' style={{ color: active ? "white" : "black" }}>SKILLS</h1>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "1em" }}>
                        ● <b>Languages:</b> Python, C/C++, JavaScript, HTML5, CSS3.<br />
                        ● <b>Graphics:</b> Blender, Figma.<br />
                        ● <b>Frontend:</b> React, Vue.js.<br />
                        ● <b>Backend:</b> Next.js, Django, Node.js, Express.<br />
                        ● <b>Frameworks:</b> React, Vue.js, React three fiber, three.js.<br />
                        ● <b>Tools:</b>Git, GitHub.<br />
                      </p>
                    </div>
                  </div>
                </div>
                {/* Letter U bg */}
                <div className='letter-u-bg absolute' style={{ backgroundColor: active ? "black" : "white", }}>
                </div>
                {/* Letter C */}
                {/* Project section */}
                <div className='letter-c absolute' style={{
                  backgroundColor: active ? "black" : "white",
                }}
                >
                  <div className='letter-c-inside absolute' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                  }}>
                    <h1 className='margin-sm font-xlg' style={{ color: active ? "white" : "black", paddingTop: "0.1em" }}>PROJECTS</h1>
                    <div className='margin-sm' style={{ paddingTop: "0.1em" }}>
                      <h1 className='margin-sm font-lg' style={{ color: active ? "white" : "black" }}>Spotify Clone</h1>
                      <p className='margin-sm font-md' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                        ● <b>Technologies:</b> React.js, Firebase, Figma, CSS3, HTML5.<br />
                        ● <b>Link:</b> <a href="" style={{ color: active ? "white" : "black" }}>https://spotify-clone-6de9b.web.app/#</a><br />
                        ● <b>Description:</b>Spotify-clone with React.js + Firebase Used Material-UI.
                      </p>
                      <h1 className='margin-sm font-lg' style={{ color: active ? "white" : "black" }}>News-Events</h1>
                      <p className='margin-sm font-md' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                        ● <b>Technologies:</b> React, Next.js, Figma, CSS3, HTML5.<br />
                        ● <b>Link:</b> <a href="" style={{ color: active ? "white" : "black" }}>https://news-events.vercel.app/</a><br />
                        ● <b>Description:</b>Provides a platform to promote the events and conferences.
                      </p>
                      <h1 className='margin-sm font-lg' style={{ color: active ? "white" : "black" }}>Blog website - Medium</h1>
                      <p className='margin-sm font-md' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                        ● <b>Technologies:</b> React, Next.js, Figma, CSS3, HTML5.<br />
                        ● <b>Link:</b> <a href="" style={{ color: active ? "white" : "black" }}>https://next-sanity-blog-eta.vercel.app/</a><br />
                        ● <b>Description:</b> This is my personal portfolio website.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Letter H */}
                {/* Achievements section */}
                <div className='letter-h absolute' style={{ backgroundColor: active ? "black" : "white" }}>
                  <div className='letter-h-inside' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "6em 6em 8em 8em",
                    marginBottom: "0.8em"
                  }}>
                    <h1 className='font-xlg margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.1em" }}>ACHIEVEMENTS 🏆</h1>
                    <h3 className='font-lg margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>1st Place at SIH(Smart India Hackathon) 2022</h3>
                    <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                      ● <b>Problem statement:</b> 'Grade-wise iron-ore accounting from mines to end-points to prevent loss of revenue to the state'<br />
                      ● <b>Details:</b> <a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_sih2022-smartindiahackathon-smartindiahackathon2022-activity-6970796902627897345-XnTy?utm_source=share&utm_medium=member_desktop" style={{ color: active ? "white" : "black" }}>More info</a><br />
                    </p>
                  </div>
                  <div className='letter-h-inside' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "8em 8em 6em 6em",
                  }}>
                    {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2.5em' }}>CONTACT</h1> */}
                    <h3 className='font-lg margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>1st Place at PRISM 2022</h3>
                    <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                      ● <b>Problem statement:</b> 'Wildlife Detection and Evaluaion using camera-trap images using Deep Learning'<br />
                      ● <b>Details:</b> Research idea contest in collaboration with Indo Korea Science and Technology Centre (IKST)<a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_prism2022-machinelearning-prism2022-activity-7029450773381955584-i1qo?utm_source=share&utm_medium=member_desktop" style={{ color: active ? "white" : "black" }}> More Info.</a><br />
                    </p>
                  </div>
                </div>

                {/* Letter I */}
                {/* About me section */}
                <div className='letter-i absolute' style={{ backgroundColor: active ? "black" : "white" }}>
                  <h1 className='font-xlg' style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.8em 5em" }}>ABOUT ME</h1>
                  <div style={{
                    backgroundColor: active ? "black" : "white",
                    borderRadius: "10em 10em 10em 10em",
                    margin: "2em 0em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    zIndex: -1
                  }}
                  >
                    <div className='letter-i-inside' style={{
                      backgroundColor: active ? "#0f0f0f" : "#99cad1",
                      margin: "0em 3em 0em 0em"

                    }}>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● 3rd year student pursuing B.E in Computer Engineering (Batch 2024) </p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>● Member of CSI DMCE tech team (2021 - current)</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>● Member of GDSC web dev team (2021 - 2022)</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>● Web dev intern at LetsGrowMore Internship Program.</p>
                    </div>
                    <div className='letter-i-inside' style={{
                      backgroundColor: active ? "#0f0f0f" : "#99cad1",

                    }}>
                      {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2.5em' }}>CONTACT</h1> */}
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Interests Web dev and 3d graphic designing.</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Likes playing football and video games. </p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Participated in more than 10+ hackathons.</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Open Source project contributer and maintainer.</p>
                    </div>
                  </div>
                </div>
                {/* Letter T */}
                {/* About me section */}
                <div className='letter-t absolute' style={{ backgroundColor: active ? "black" : "white" }}>
                  <h1 className='font-xlg' style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.8em 5em" }}>ABOUT ME</h1>
                  <div style={{
                    backgroundColor: active ? "black" : "white",
                    borderRadius: "10em 10em 10em 10em",
                    margin: "2em 0em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    zIndex: -1
                  }}
                  >
                    <div className='letter-t-inside' style={{
                      backgroundColor: active ? "#0f0f0f" : "#99cad1",
                      margin: "0em 3em 0em 0em"

                    }}>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● 3rd year student pursuing B.E in Computer Engineering (Batch 2024) </p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>● Member of CSI DMCE tech team (2021 - current)</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>● Member of GDSC web dev team (2021 - 2022)</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>● Web dev intern at LetsGrowMore Internship Program.</p>
                    </div>
                    <div className='letter-t-inside' style={{
                      backgroundColor: active ? "#0f0f0f" : "#99cad1",

                    }}>
                      {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2.5em' }}>CONTACT</h1> */}
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Interests Web dev and 3d graphic designing.</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Likes playing football and video games. </p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Participated in more than 10+ hackathons.</p>
                      <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>● Open Source project contributer and maintainer.</p>
                    </div>
                  </div>
                </div>
                {/* Letter A */}
                {/* About me section */}
                <div className='letter-a absolute' style={{ backgroundColor: active ? "black" : "white" }}>
                  <div className='letter-a-inside' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "8em 8em 6em 6em",
                    marginBottom: "3em",
                    marginTop: "3em"
                  }}>
                    {/* <h1 className='font-xlg margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.1em" }}>ACHIEVEMENTS 🏆</h1> */}
                    <h3 className='font-lg margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>1st Place at SIH(Smart India Hackathon) 2022</h3>
                    <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                      ● <b>Problem statement:</b> 'Grade-wise iron-ore accounting from mines to end-points to prevent loss of revenue to the state'<br />
                      ● <b>Details:</b> <a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_sih2022-smartindiahackathon-smartindiahackathon2022-activity-6970796902627897345-XnTy?utm_source=share&utm_medium=member_desktop" style={{ color: active ? "white" : "black" }}>More info</a><br />
                    </p>
                  </div>
                  <div className='letter-a-inside' style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "8em 8em 4em 4em",
                  }}>
                    {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2.5em' }}>CONTACT</h1> */}
                    <h3 className='font-lg margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em", }}>1st Place at PRISM 2022</h3>
                    <p className='font-md margin-sm' style={{ color: active ? "white" : "black", paddingTop: "0.3em" }}>
                      ● <b>Problem statement:</b> 'Wildlife Detection and Evaluaion using camera-trap images using Deep Learning'<br />
                      ● <b>Details:</b> Research idea contest in collaboration with Indo Korea Science and Technology Centre (IKST)<a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_prism2022-machinelearning-prism2022-activity-7029450773381955584-i1qo?utm_source=share&utm_medium=member_desktop" style={{ color: active ? "white" : "black" }}> More Info.</a><br />
                    </p>
                  </div>
                </div>


              </Scroll>

            </ScrollControls>

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
      </div>
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
    vid.play();
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
  // This hook gives you offets, ranges and other useful things
  const scroll = useScroll()
  const { scene, nodes } = useGLTF('/room.glb')
  const [zoom, setZoom] = useState(false)
  // const {actions} = useAnimations(animations, scene)
  useLayoutEffect(() => Object.values(nodes).forEach((node) => (node.receiveShadow = node.castShadow = true)))
  // useEffect(() => void (actions['Take 001'].play().paused = true), [actions])
  useFrame((state) => {
    // The offset is between 0 and 1, you can apply it to your models any way you like
    const r1 = scroll.range(0 / 7, 0.9 / 7)
    const r2 = scroll.range(1 / 7, 1.5 / 7)
    const r3 = scroll.range(2 / 7, 2.5 / 7)
    const r4 = scroll.curve(3 / 7, 3.5 / 7)
    const r5 = scroll.curve(4 / 7, 4.5 / 7)
    const dummy = new THREE.Vector3()

    // zoom ? state.camera.position.lerp(dummy.set(zoom ? -2 : Math.sin(r1) * -12 ,zoom ?  2 : Math.sin(r2) * 2, zoom ? 2: Math.sin(r3) * -8), 0.05) : (state.camera.position.set(Math.sin(r1) * -12, Math.sin(r2) * 2, Math.sin(r3) * -8))
    // state.camera.position.lerp(dummy.set(zoom ? -2 : Math.sin(r1) * -12, zoom ? 2 : Math.sin(r2) * 2, zoom ? 2 : Math.sin(r3) * -8), 0.08)
    // zoom ? state.camera.lookAt(-2, 2, 5) : state.camera.lookAt(0.01, 0, 0)
    state.camera.position.set(Math.sin(r1) * -12, Math.sin(r2) * 2, Math.sin(r3) * -8)
    state.camera.lookAt(0.01, 0, 0)

    // state.camera.position.lerp(state.camera.position, 0.1)

    // state.camera.position.setX(Math.sin(r1) * -12)
    // state.camera.position.setY(Math.sin(r2) * 2)
    // state.camera.position.setZ(Math.sin(r3) * -8)
    // state.camera.position.setY(Math.sin(r4) * 2)
    // state.camera.position.setX(r3 * -12)
    // state.camera.position.setZ(r4 * -8)
    // state.camera.position.setY(Math.cos(r5) * 6)

    // state.camera.lookAt(0.01, 0, 0)
    state.camera.updateProjectionMatrix()
    // state.camera.position.setX(Math.sin(r4) * -12)
    // state.camera.rotateY(Math.cos(r4) * 8)
    // state.camera.lookAt(-1, 1, 25)


    // console.log(state.camera.position)

    // state.camera.rotation.set(Math.PI / 2, 0, 0)
  })
  // const position = useControls('center', {
  //   position: [-4, 3, 4.5],
  // }
  // )
  return (
    <>
      <primitive object={scene} {...props} castShadow onClick={() => setZoom(!zoom)} />
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