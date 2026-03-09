import { Suspense, useEffect, useState, useRef, useLayoutEffect, useMemo, useCallback, memo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, ScrollControls, Scroll, useScroll, useGLTF } from '@react-three/drei'
import dynamic from 'next/dynamic'
import Overlay from '../components/Overlay.js'
import Underlay from '../components/Underlay.js'
import LoadingScreen from '../components/Loading.js'

// Lazy load the Playground component for better initial load
const Playground = dynamic(() => import('../components/Playground.js'), {
  ssr: false,
  loading: () => null,
})

// Memoized Video component for performance
const Video = memo(function Video() {
  const [video] = useState(() => {
    if (typeof window === 'undefined') return null
    const vid = document.createElement("video")
    vid.src = './hello-world.mp4'
    vid.crossOrigin = "Anonymous"
    vid.loop = true
    vid.muted = true
    vid.playsInline = true
    vid.preload = 'metadata'
    vid.play().catch(() => {})
    return vid
  })

  if (!video) return null

  return (
    <mesh rotation={[0, -Math.PI / 2, 0]} position={[0.386, 0, -0.02]} scale={[0.4, 0.4, 1]}>
      <planeGeometry args={[3.2, 1.9]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  )
})

// Optimized RoomCube with memoization and throttled updates
const RoomCube = memo(function RoomCube({ ...props }) {
  const scroll = useScroll()
  const { scene, nodes } = useGLTF('/room.glb')
  const lastUpdate = useRef(0)
  const dummyVec = useMemo(() => new THREE.Vector3(), [])
  
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      node.receiveShadow = node.castShadow = true
      // Optimize materials
      if (node.material) {
        node.material.precision = 'mediump'
      }
    })
  }, [nodes])

  useFrame((state, delta) => {
    // Throttle updates to every 16ms (~60fps) for smoother performance
    lastUpdate.current += delta
    if (lastUpdate.current < 0.016) return
    lastUpdate.current = 0

    const r1 = scroll.range(0 / 7, 0.9 / 7)
    const r2 = scroll.range(1 / 7, 1.5 / 7)
    const r3 = scroll.range(2 / 7, 2.5 / 7)

    // Use lerp for smoother camera movement
    dummyVec.set(
      Math.sin(r1) * -12,
      Math.sin(r2) * 2,
      Math.sin(r3) * -8
    )
    state.camera.position.lerp(dummyVec, 0.1)
    state.camera.lookAt(0.01, 0, 0)
    state.camera.updateProjectionMatrix()
  })

  return <primitive object={scene} {...props} />
})

// Preload the GLB model
useGLTF.preload('/room.glb')

// Memoized scroll content sections
const ScrollContent = memo(function ScrollContent({ active }) {
  const textColor = active ? "white" : "black"
  const bgPrimary = active ? "black" : "white"
  const bgSecondary = active ? "#0f0f0f" : "#99cad1"

  return (
    <Scroll html>
      {/* Letter R - Intro */}
      <div className='absolute letter-r' style={{ backgroundColor: bgPrimary, top: '1000px' }}>
        <div className='letter-r-inside' style={{ backgroundColor: bgSecondary }}>
          <p className='font-xlg margin-sm' style={{ color: textColor, paddingTop: "1.1em" }}>
            HI, I&apos;M RUCHITA SONAWALE
          </p>
          <p className='font-lg margin-sm' style={{ color: textColor, paddingBottom: "0.8em" }}>
            FULL STACK DEVELOPER
          </p>
        </div>
      </div>

      {/* Letter U - About & Skills */}
      <div className='absolute letter-u' style={{ backgroundColor: bgPrimary }}>
        <div className='letter-u-inside' style={{ backgroundColor: bgSecondary }}>
          <p className="font-md margin-sm" style={{ color: textColor }}>
            I am a software developer with a passion for creating beautiful and functional web applications.
            With a background in graphic design and a love for all things creative, I bring a unique blend of technical and artistic skills to my work. 
            I hold a Bachelor&apos;s degree in Computer Engineering and currently pursuing my Master&apos;s in Computer Science at NYU.
          </p>
          <p className="font-md margin-sm" style={{ color: textColor }}>
            I am committed to staying up-to-date with the latest trends and technologies in software development and computer security, continually learning and evolving my skills. 
            My dedication to delivering high-quality, user-friendly designs ensures that each project I undertake meets both aesthetic and secure functional standards.
          </p>

          <div className='margin-sm' style={{ paddingTop: "7em" }}>
            <h1 className='margin-sm font-xlg' style={{ color: textColor }}>SKILLS</h1>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "1em" }}>
              <b>Languages:</b> Python, C/C++, JavaScript.<br />
              <b>Graphics:</b> Blender, Figma, Three.js.<br />
              <b>Frontend:</b> HTML5, CSS3, React, Vue.js.<br />
              <b>Backend:</b> Django, Flask, Next.js, Node.js, Express.<br />
              <b>Databases:</b> MongoDB, Firebase, PostgreSQL, Sanity, MySQL.<br />
              <b>Tools:</b> Git, VSCode, PyCharm, GitHub, MS Office.<br />
              <b>Security:</b> Splunk, Wireshark, Metasploit, Nessus, SEED Labs, Immersive Labs.
            </p>
          </div>
        </div>
      </div>

      {/* Letter U bg */}
      <div className='letter-u-bg absolute' style={{ backgroundColor: bgPrimary }} />

      {/* Letter C - Projects */}
      <div className='letter-c absolute' style={{ backgroundColor: bgPrimary }}>
        <div className='letter-c-inside absolute' style={{ backgroundColor: bgSecondary }}>
          <h1 className='margin-sm font-xlg' style={{ color: textColor, paddingTop: "0.1em" }}>PROJECTS</h1>
          <div className='margin-sm' style={{ paddingTop: "0.1em" }}>
            <h1 className='margin-sm font-lg' style={{ color: textColor }}>
              <a style={{ color: textColor }} href='https://tx-03.netlify.app/' target='_blank' rel="noreferrer">Wildlife Detection</a>
            </h1>
            <p className='margin-sm font-md' style={{ color: textColor, paddingTop: "0.3em" }}>
              <b>Technologies:</b> React, Next.js, Figma, CSS3, HTML5.<br />
              <b>Description:</b> Implementing object detection technique and training a model to detect and classify species found in an image.
            </p>
            
            <h1 className='margin-sm font-lg' style={{ color: textColor }}>
              <a style={{ color: textColor }} href='https://spotify-clone-6de9b.web.app/#' target='_blank' rel="noreferrer">Spotify Clone</a>
            </h1>
            <p className='margin-sm font-md' style={{ color: textColor, paddingTop: "0.3em" }}>
              <b>Technologies:</b> React.js, Firebase, Figma, CSS3, HTML5.<br />
              <b>Description:</b> Spotify-clone with React.js + Firebase Used Material-UI.
            </p>
            
            <h1 className='margin-sm font-lg' style={{ color: textColor }}>
              <a style={{ color: textColor }} href='https://news-events.vercel.app/' target='_blank' rel="noreferrer">News-Events</a>
            </h1>
            <p className='margin-sm font-md' style={{ color: textColor, paddingTop: "0.3em" }}>
              <b>Technologies:</b> React, Next.js, Figma, CSS3, HTML5.<br />
              <b>Description:</b> Provides a platform to promote the events and conferences.
            </p>
          </div>
        </div>
      </div>

      {/* Letter H - Achievements */}
      <div className='letter-h absolute' style={{ backgroundColor: bgPrimary }}>
        <div className='letter-h-inside' style={{
          backgroundColor: bgSecondary,
          borderRadius: "6em 6em 8em 8em",
          marginBottom: "0.8em"
        }}>
          <h1 className='font-xlg margin-sm' style={{ color: textColor, paddingTop: "0.1em" }}>ACHIEVEMENTS</h1>
          <h3 className='font-lg margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>1st Place at SIH(Smart India Hackathon) 2022</h3>
          <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
            <b>Problem statement:</b> &apos;Grade-wise iron-ore accounting from mines to end-points to prevent loss of revenue to the state&apos;<br />
            <b>Details:</b> <a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_sih2022-smartindiahackathon-smartindiahackathon2022-activity-6970796902627897345-XnTy" target="_blank" rel="noreferrer" style={{ color: textColor }}>More info</a>
          </p>
        </div>
        <div className='letter-h-inside' style={{
          backgroundColor: bgSecondary,
          borderRadius: "8em 8em 6em 6em",
        }}>
          <h3 className='font-lg margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>1st Place at PRISM 2022</h3>
          <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
            <b>Problem statement:</b> &apos;Wildlife Detection and Evaluation using camera-trap images using Deep Learning&apos;<br />
            <b>Details:</b> Research idea contest in collaboration with Indo Korea Science and Technology Centre (IKST)
            <a href="https://www.linkedin.com/posts/ruchita-sonawale-475063196_prism2022-machinelearning-prism2022-activity-7029450773381955584-i1qo" target="_blank" rel="noreferrer" style={{ color: textColor }}> More Info.</a>
          </p>
        </div>
      </div>

      {/* Letter I - About Me */}
      <div className='letter-i absolute' style={{ backgroundColor: bgPrimary }}>
        <h1 className='font-xlg' style={{ color: textColor, paddingTop: "0.3em", margin: "0.8em 4em", display: "flex", justifyContent: "center" }}>ABOUT ME</h1>
        <div style={{
          backgroundColor: bgPrimary,
          borderRadius: "10em",
          margin: "2em 0em",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          zIndex: -1
        }}>
          <div className='letter-i-inside' style={{ backgroundColor: bgSecondary, margin: "0em 3em 0em 0em" }}>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Pursuing MS in Computer Sciences (Fall 2024 - Present)</p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Member of CSI DMCE tech team (2021 - current)</p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Member of GDSC web dev team (2021 - 2022)</p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Web dev intern at LetsGrowMore, TechnoHacks Edutech Ltd. and Sparks Foundation.</p>
          </div>
          <div className='letter-i-inside' style={{ backgroundColor: bgSecondary }}>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Interests: Web dev, sys design and 3d graphic designing.</p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Likes playing football and video games.</p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Participated in more than 10+ hackathons.</p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>Open Source project contributor and maintainer.</p>
          </div>
        </div>
      </div>

      {/* Letter T - Projects++ */}
      <div className='letter-t absolute' style={{ backgroundColor: bgPrimary }}>
        <h1 className='font-xlg' style={{ color: textColor, paddingTop: "0.3em", margin: "0.8em 4em", display: "flex", justifyContent: "center" }}>PROJECTS++</h1>
        <div style={{
          backgroundColor: bgPrimary,
          borderRadius: "10em",
          margin: "2em 0em",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          zIndex: -1
        }}>
          <div className='letter-t-inside' style={{ backgroundColor: bgSecondary, margin: "0em 3em 0em 0em" }}>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
              <a href='https://planets-gilt.vercel.app/' style={{ color: textColor }} target='_blank' rel="noreferrer"><b>Planets</b></a> - Planet themed website with GSAP for graphical animation.
            </p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
              <a href='https://ruchi-115.github.io/Plantae-QR-Garden/' style={{ color: textColor }} target='_blank' rel="noreferrer"><b>QR-Plantae</b></a> - This website provides you with QR codes for your garden.
            </p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
              <a href='https://ruchi-115.github.io/Soundwave.github.io/index.html' style={{ color: textColor }} target='_blank' rel="noreferrer"><b>Soundwave</b></a> - Music service platform website frontend design.
            </p>
          </div>
          <div className='letter-t-inside' style={{ backgroundColor: bgSecondary }}>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
              <a href='https://next-sanity-blog-eta.vercel.app/' style={{ color: textColor }} target='_blank' rel="noreferrer"><b>Blog website Medium</b></a> - Next.js + Sanity.io blog platform.
            </p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
              <a href='https://doctor-chatbot-11.vercel.app/' style={{ color: textColor }} target='_blank' rel="noreferrer"><b>Doctorbot</b></a> - Chatbots as your doctor providing personalized care through text.
            </p>
            <p className='font-md margin-sm' style={{ color: textColor, paddingTop: "0.3em" }}>
              <a href='https://ideacon-gdsc.vercel.app/' style={{ color: textColor }} target='_blank' rel="noreferrer"><b>Ideacon</b></a> - Global Idea Sharing Platform, where great minds meet!
            </p>
          </div>
        </div>
      </div>

      {/* Letter A - Contact */}
      <div className='letter-a absolute' style={{ backgroundColor: bgPrimary }}>
        <div className='letter-a-inside' style={{
          backgroundColor: bgSecondary,
          borderRadius: "8em 8em 6em 6em",
          marginBottom: "3em",
          marginTop: "3em"
        }}>
          <h1 className='font-xlg margin-sm' style={{ color: textColor, paddingTop: "0.1em" }}>CONTACT ME</h1>
          <div style={{ borderRadius: "1em", border: "solid 2px black", padding: "1em 0em", margin: "2em 0em" }}>
            <p style={{ display: "flex", padding: "0em 1em", justifyContent: "space-evenly" }}>
              <a href="https://www.linkedin.com/in/ruchita-sonawale-475063196/" target='_blank' rel="noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384046.png" alt="linkedin" height={40} width={40} />
              </a>
              <a href="https://github.com/ruchi-115?tab=overview&from=2021-09-01&to=2021-09-30" target='_blank' rel="noreferrer" style={{ padding: "0em 0.5em" }}>
                <img src="https://cdn-icons-png.flaticon.com/512/38/38401.png" alt="github" height={40} width={40} />
              </a>
              <a href="https://www.instagram.com/ruchita_115/" target='_blank' rel="noreferrer">
                <img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" alt="instagram" height={40} width={40} />
              </a>
            </p>
          </div>
        </div>
        <div className='letter-a-inside' style={{
          backgroundColor: bgSecondary,
          borderRadius: "8em 8em 4em 4em",
        }}>
          <h3 className='font-lg margin-sm' style={{ color: textColor, paddingTop: "0.3em", margin: "0.3em" }}>
            Thank you for watching until the end. Check out the dark mode!
          </h3>
        </div>
      </div>
    </Scroll>
  )
})

export default function Room() {
  const [active, setActive] = useState(false)
  const [showPlayground, setShowPlayground] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Detect mobile for performance optimizations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handlePlaygroundOpen = useCallback(() => {
    setShowPlayground(true)
  }, [])

  const handlePlaygroundClose = useCallback(() => {
    setShowPlayground(false)
  }, [])

  const handleLoaded = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Playground mode
  if (showPlayground) {
    return <Playground darkMode={active} onClose={handlePlaygroundClose} />
  }

  return (
    <>
      <LoadingScreen onLoaded={handleLoaded} />
      
      <div style={{
        width: "100%",
        height: "100vh",
        backgroundColor: active ? "black" : "#99cad1",
        color: active ? 'white' : 'black',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in',
      }}>
        <Underlay mode={active} />
        <Overlay mode={active} onPlaygroundOpen={handlePlaygroundOpen} />

        {/* Dark mode switch */}
        <div style={{ position: "absolute", bottom: 40, right: 40, zIndex: 2 }}>
          <button 
            onClick={() => setActive(!active)} 
            className="button"
            aria-label={active ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              backgroundColor: active ? "#99cad1" : "#0f0f0f",
            }}
          >
            {active ? "sun" : "moon"}
          </button>
        </div>

        {/* Room + Scroll Content */}
        <Canvas 
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          shadows={!isMobile}
          camera={{ position: [0, 0, 0] }}
          gl={{ 
            antialias: !isMobile,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={active ? 0.06 : 0.8} />
          <rectAreaLight position={[0, 2.05, 0.8]} width={1} height={2} rotation={[-Math.PI / 2, 0, 0]} intensity={5} color={'blue'} />
          <rectAreaLight position={[0, 1.3, 0]} width={1} height={2} rotation={[-Math.PI / 2, 0, 0]} intensity={5} color={'blue'} />
          <rectAreaLight position={[-0.4, 0, 0]} width={1.5} height={1} rotation={[0, -Math.PI / 2, 0]} intensity={0.8} color={'white'} />
          <rectAreaLight position={[0.2, -1, 0]} width={3} height={0.5} rotation={[0, -Math.PI / 2, 0]} intensity={3} color={'#007589'} />
          
          {!isMobile && (
            <spotLight 
              angle={0.16} 
              color={active ? "blue" : "white"} 
              intensity={1} 
              penumbra={0.3} 
              position={[-5, 50, -20]} 
              shadow-mapSize={[1024, 1024]} 
              shadow-bias={-0.0001} 
              castShadow 
            />
          )}
          
          <Plane args={[50, 50]} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!isMobile}>
            <meshStandardMaterial color={active ? "#101010" : "#84d9e8"} />
          </Plane>

          <Suspense fallback={null}>
            <ScrollControls pages={10} damping={0.1}>
              <RoomCube scale={1.5} position={[-2.7, -3.2, 1.67]} rotation={[0, 3.14, 0]} />
              <ScrollContent active={active} />
            </ScrollControls>
            <Video />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
