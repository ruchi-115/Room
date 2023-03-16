import { Suspense, useEffect, useState, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, ScrollControls, Scroll, useScroll, useGLTF, useVideoTexture, useTexture, useAspect, GizmoViewport, Box, SoftShadows, Text, Html } from '@react-three/drei'
import { useControls } from 'leva'
import Overlay from '../components/Overlay.js'
import Underlay from '@/components/Underlay.js'
import LoadingScreen from '@/components/Loading.js'


export default function Room() {
  const [active, setActive] = useState(false);
  // const light = useControls('', {
  //   position: [0, 0, 0],
  //   intensity: 5,
  //   color: '#84d9e8',
  //   rotation: [0, -1, 0],

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
          <Plane args={[50, 50]} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
            <meshStandardMaterial color={active ? "#101010" : "#84d9e8"} receiveShadow />
          </Plane>


          <Suspense fallback={null}>
            {/* Wrap contents you want to scroll into <ScrollControls> */}
            <ScrollControls pages={8}>
              <RoomCube scale={1.5} position={[-2.7, -3.2, 1.67]} rotation={[0, 3.14, 0]} castShadow />
              <Scroll html>
                {/* Letter R */}
                <div style={{
                  fontFamily: "'Antonio', sans-serif",
                  position: "absolute",
                  width: "38em",
                  height: "18em",
                  backgroundColor: active ? "black" : "white",
                  top: '1000px',
                  borderRadius: "0em 15em 15em 0em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <div style={{
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "5em 15em 15em 5em",
                    width: "33em",
                    height: "12em",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}>
                    <p style={{
                      color: active ? "white" : "black", paddingTop: "0.5em", margin: "0.3em", fontFamily: "'Antonio', sans-serif",
                      fontSize: 40,
                      fontWeight: "600",
                      letterSpacing: -3,
                    }}>HI, I'M RUCHITA SONAWALE</p>
                    <p style={{
                      color: active ? "white" : "black", margin: "0.3em",
                      fontSize: 30,
                      fontWeight: "500",
                      paddingBottom: "0.8em",
                      letterSpacing: -3,
                    }}>FULL STACK DEVELOPER</p>
                  </div>
                </div>
                {/* Letter U */}
                {/* Skills section */}
                <div style={{
                  fontFamily: "'Antonio', sans-serif",
                  position: "absolute",
                  width: "36em",
                  height: "40em",
                  backgroundColor: active ? "black" : "white",
                  top: '1265px',
                  borderRadius: "0em 10em 10em 10em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                }}>
                  <div style={{
                    fontFamily: "'Antonio', sans-serif",
                    position: "absolute",
                    width: "30em",
                    height: "75em",
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "5em 10em 10em 10em",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "4em 2em",
                    letterSpacing: -2,
                    marginTop: "40em"
                  }}>
                    {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.5em", margin: "0.3em", fontSize: '2.5em', borderRadius: "0.2em" }}>ABOUT ME</h1> */}
                    <p style={{ color: active ? "white" : "black", fontSize: '1.7em', margin: "0.3em" }}>I am a creative web developer with a passion for creating beautiful
                      and functional web applications. I have a background in graphic design and a love for all things creative.
                      I am a self-taught developer who is always looking to learn new things and improve my skills. I am currently looking
                      for a full time position as a developer.</p>
                    <p style={{ color: active ? "white" : "black", fontSize: '1.7em', margin: "0.3em" }}>
                      I am constantly learning and evolving my skills to stay up-to-date with the latest trends and technologies,
                      and I am dedicated to delivering high-quality, user-friendly designs.</p>
                    <div style={{ paddingTop: "5.5em", margin: "0.3em" }}>
                      <h1 style={{ color: active ? "white" : "black", paddingTop: "1em", margin: "0.3em", fontSize: '2.5em', borderRadius: "0.2em" }}>SKILLS</h1>
                      <p style={{ color: active ? "white" : "black", fontSize: '1.5em', margin: "0.3em", paddingTop: "2em" }}>
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
                <div style={{
                  fontFamily: "'Antonio', sans-serif",
                  position: "absolute",
                  width: "36em",
                  height: "50em",
                  backgroundColor: active ? "black" : "white",
                  top: '1750px',
                  borderRadius: "10em 10em 10em 10em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: -1

                }}>
                </div>
                {/* Letter H */}
                {/* Project section */}
                <div style={{
                  fontFamily: "'Antonio', sans-serif",
                  position: "absolute",
                  width: "36em",
                  height: "50em",
                  backgroundColor: active ? "black" : "white",
                  top: '2545px',
                  borderRadius: "10em 10em 10em 10em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: -1
                }}
                >

                  <div style={{
                    fontFamily: "'Antonio', sans-serif",
                    position: "absolute",
                    width: "33em",
                    height: "45em",
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "10em 10em 10em 10em",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "4em 2em",
                    letterSpacing: -2,
                    marginLeft: "3em"
                  }}>
                    <h1 style={{ color: active ? "white" : "black", paddingTop: "0.1em", margin: "0.3em", fontSize: '2.5em' }}>PROJECTS</h1>
                    <div style={{ paddingTop: "0.1em", margin: "0.3em" }}>
                      <h1 style={{ color: active ? "white" : "black", margin: "0.3em", fontSize: '2em', borderRadius: "0.2em" }}>Spotify Clone</h1>
                      <p style={{ color: active ? "white" : "black", fontSize: '1.3em', margin: "0.3em", paddingTop: "0.3em" }}>
                        ● <b>Technologies:</b> React.js, Firebase, Figma, CSS3, HTML5.<br />
                        ● <b>Link:</b> <a href="" style={{ color: active ? "white" : "black" }}>https://spotify-clone-6de9b.web.app/#</a><br />
                        ● <b>Description:</b>Spotify-clone with React.js + Firebase Used Material-UI, Reach Hooks, User Authentication and Spotify API.
                      </p>
                      <h1 style={{ color: active ? "white" : "black", paddingTop: "0.5em", margin: "0.3em", fontSize: '2em', borderRadius: "0.2em" }}>News-Events</h1>
                      <p style={{ color: active ? "white" : "black", fontSize: '1.3em', margin: "0.3em", paddingTop: "0.3em" }}>
                        ● <b>Technologies:</b> React, Next.js, Figma, CSS3, HTML5.<br />
                        ● <b>Link:</b> <a href="" style={{ color: active ? "white" : "black" }}>https://news-events.vercel.app/</a><br />
                        ● <b>Description:</b> Full stack application - Next.js + MongoDb. Provides a platform to promote the events and conferences.
                      </p>
                      <h1 style={{ color: active ? "white" : "black", paddingTop: "0.5em", margin: "0.3em", fontSize: '2em', borderRadius: "0.2em" }}>Blog website - Medium</h1>
                      <p style={{ color: active ? "white" : "black", fontSize: '1.3em', margin: "0.3em", paddingTop: "0.3em" }}>
                        ● <b>Technologies:</b> React, Next.js, Figma, CSS3, HTML5.<br />
                        ● <b>Link:</b> <a href="" style={{ color: active ? "white" : "black" }}>https://next-sanity-blog-eta.vercel.app/</a><br />
                        ● <b>Description:</b> This is my personal portfolio website.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Letter H */}
                {/* Achievements section */}
                <div style={{
                  fontFamily: "'Antonio', sans-serif",
                  position: "absolute",
                  width: "36em",
                  height: "50em",
                  backgroundColor: active ? "black" : "white",
                  top: '3340px',
                  borderRadius: "10em 10em 10em 10em",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  zIndex: -1
                }}>
                  <div style={{
                    fontFamily: "'Antonio', sans-serif",
                    position: "relative",
                    width: "30em",
                    height: "24em",
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "6em 6em 8em 8em",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "4em 2em",
                    letterSpacing: -2,
                    marginBottom: "0.8em"

                  }}>
                    <h1 style={{ color: active ? "white" : "black", paddingTop: "0.1em", margin: "0.2em", fontSize: '2.5em' }}>ACHIEVEMENTS 🏆</h1>
                    <h3 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2em' }}>1st Place at SIH(Smart India Hackathon) 2022</h3>
                    <p style={{ color: active ? "white" : "black", fontSize: '1.3em', margin: "0.3em", paddingTop: "0.3em" }}>
                      ● <b>Problem statement:</b> 'Grade-wise iron-ore accounting from mines to end-points to prevent loss of revenue to the state'<br />
                      ● <b>Details:</b> <a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_sih2022-smartindiahackathon-smartindiahackathon2022-activity-6970796902627897345-XnTy?utm_source=share&utm_medium=member_desktop" style={{ color: active ? "white" : "black" }}>More info</a><br />
                    </p>

                  </div>
                  <div style={{
                    fontFamily: "'Antonio', sans-serif",
                    position: "relative",
                    width: "30em",
                    height: "25em",
                    backgroundColor: active ? "#0f0f0f" : "#99cad1",
                    borderRadius: "8em 8em 6em 6em",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "4em 2em",
                    letterSpacing: -2,

                  }}>
                    {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2.5em' }}>CONTACT</h1> */}
                    <h3 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2em' }}>1st Place at PRISM 2022</h3>
                    <p style={{ color: active ? "white" : "black", fontSize: '1.3em', margin: "0.3em", paddingTop: "0.3em" }}>
                      ● <b>Problem statement:</b> 'Wildlife Detection and Evaluaion using camera-trap images using Deep Learning'<br />
                      ● <b>Details:</b> Research idea contest in collaboration with Indo Korea Science and Technology Centre (IKST)<a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_prism2022-machinelearning-prism2022-activity-7029450773381955584-i1qo?utm_source=share&utm_medium=member_desktop" style={{ color: active ? "white" : "black" }}> More Info.</a><br />
                    </p>
                  </div>
                </div>

                {/* Letter I */}
                {/* About me section */}
                <div style={{
                  fontFamily: "'Antonio', sans-serif",
                  position: "absolute",
                  width: "36em",
                  height: "50em",
                  backgroundColor: active ? "black" : "white",
                  top: '4135px',
                  borderRadius: "10em 10em 10em 10em",
                  zIndex: -1
                }}
                >
                  <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.8em 4em", fontSize: '2.5em' }}>ABOUT ME</h1>
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
                    <div style={{
                      fontFamily: "'Antonio', sans-serif",
                      position: "relative",
                      width: "20em",
                      height: "35em",
                      backgroundColor: active ? "#0f0f0f" : "#99cad1",
                      borderRadius: "4em 4em 4em 4em",
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "column",
                      padding: "0em 2em",
                      letterSpacing: -2,
                      margin: "0em 3em 0em 0em"

                    }}>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● 3rd year student pursuing B.E in Computer Engineering (Batch 2024) </p>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Member of CSI DMCE tech team (2021 - current)</p>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Member of GDSC web dev team (2021 - 2022)</p>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Web dev intern at LetsGrowMore Internship Program.</p>
                    </div>
                    <div style={{
                      fontFamily: "'Antonio', sans-serif",
                      position: "relative",
                      width: "20em",
                      height: "35em",
                      backgroundColor: active ? "#0f0f0f" : "#99cad1",
                      borderRadius: "4em 4em 4em 4em",
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "column",
                      padding: "0em 2em",
                      letterSpacing: -2,
                      margin: "0em 0em 0em 0em"

                    }}>
                      {/* <h1 style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '2.5em' }}>CONTACT</h1> */}
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Interests Web dev and 3d graphic designing.</p>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Likes playing football and video games. </p>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Participated in more than 10+ hackathons.</p>
                      <p style={{ color: active ? "white" : "black", paddingTop: "0.3em", margin: "0.3em", fontSize: '1.6em' }}>● Open Source project contributer and maintainer.</p>
                    </div>
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

    state.camera.position.set(Math.sin(r1) * -12, Math.sin(r2) * 2, Math.sin(r3) * -8)
    state.camera.position.lerp(state.camera.position, 0.1)
    // state.camera.position.setX(Math.sin(r1) * -12)
    // state.camera.position.setY(Math.sin(r2) * 2)
    // state.camera.position.setZ(Math.sin(r3) * -8)
    // state.camera.position.setY(Math.sin(r4) * 2)
    // state.camera.position.setX(r3 * -12)
    // state.camera.position.setZ(r4 * -8)
    // state.camera.position.setY(Math.cos(r5) * 6)
    state.camera.lookAt(0.01, 0, 0)
    // state.camera.position.setX(Math.sin(r4) * -12)
    // state.camera.rotateY(Math.cos(r4) * 8)
    // state.camera.lookAt(-1, 1, 25)


    // console.log(state.camera.position)

    // state.camera.rotation.set(Math.PI / 2, 0, 0)
  })
  return <primitive object={scene} {...props} castShadow />
}
useGLTF.preload('/room.glb')

