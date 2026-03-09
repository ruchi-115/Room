import { Suspense, useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, Plane } from '@react-three/drei'
import * as THREE from 'three'

// Interactive objects info
const INTERACTIVE_OBJECTS = {
  'monitor': { name: 'Monitor', description: 'Main workspace display for coding and design' },
  'keyboard': { name: 'Keyboard', description: 'Mechanical keyboard for productivity' },
  'chair': { name: 'Gaming Chair', description: 'Ergonomic chair for long coding sessions' },
  'desk': { name: 'Desk', description: 'Minimalist workspace setup' },
  'pc': { name: 'PC Case', description: 'Custom built workstation' },
  'lamp': { name: 'Desk Lamp', description: 'Ambient lighting for late night coding' },
  'plant': { name: 'Plant', description: 'A touch of nature in the workspace' },
  'shelf': { name: 'Shelf', description: 'Storage for books and collectibles' },
  'poster': { name: 'Wall Art', description: 'Inspiration on the walls' },
}

function InteractiveRoom({ onObjectClick, selectedObject, darkMode }) {
  const { scene, nodes } = useGLTF('/room.glb')
  const groupRef = useRef()
  const [hovered, setHovered] = useState(null)
  
  useLayoutEffect(() => {
    Object.values(nodes).forEach((node) => {
      node.receiveShadow = node.castShadow = true
    })
  }, [nodes])

  // Handle object hover
  const handlePointerOver = useCallback((e) => {
    e.stopPropagation()
    const name = e.object.name?.toLowerCase() || ''
    for (const key of Object.keys(INTERACTIVE_OBJECTS)) {
      if (name.includes(key)) {
        setHovered(key)
        document.body.style.cursor = 'pointer'
        return
      }
    }
  }, [])

  const handlePointerOut = useCallback(() => {
    setHovered(null)
    document.body.style.cursor = 'auto'
  }, [])

  const handleClick = useCallback((e) => {
    e.stopPropagation()
    const name = e.object.name?.toLowerCase() || ''
    for (const key of Object.keys(INTERACTIVE_OBJECTS)) {
      if (name.includes(key)) {
        onObjectClick(key)
        return
      }
    }
  }, [onObjectClick])

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={1.5} 
        position={[-2.7, -3.2, 1.67]} 
        rotation={[0, Math.PI, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
      
      {/* Hover tooltip */}
      {hovered && INTERACTIVE_OBJECTS[hovered] && (
        <Html position={[0, 1, 0]} center>
          <div style={{
            background: darkMode ? 'rgba(15,15,15,0.95)' : 'rgba(255,255,255,0.95)',
            color: darkMode ? '#99cad1' : '#007589',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            border: `1px solid ${darkMode ? '#99cad1' : '#007589'}`,
            pointerEvents: 'none',
          }}>
            Click to zoom: {INTERACTIVE_OBJECTS[hovered].name}
          </div>
        </Html>
      )}
    </group>
  )
}

// End-of-scroll camera position derived from RoomCube useFrame:
// r1=r2=r3=1 → pos = [sin(1)*-12, sin(1)*2, sin(1)*-8] = [-10.09, 1.68, -6.73], lookAt = [0.01,0,0]
const END_CAM_POS = new THREE.Vector3(-10.09, 1.68, -6.73)
const END_CAM_LOOKAT = new THREE.Vector3(0.01, 0, 0)

function CameraController({ selectedObject, resetCamera }) {
  const { camera } = useThree()
  const targetPosition = useRef(END_CAM_POS.clone())
  const targetLookAt = useRef(END_CAM_LOOKAT.clone())

  // Set camera to end-scroll position immediately on mount
  useEffect(() => {
    camera.position.copy(END_CAM_POS)
    camera.lookAt(END_CAM_LOOKAT)
  }, [camera])

  useEffect(() => {
    if (resetCamera) {
      targetPosition.current.copy(END_CAM_POS)
      targetLookAt.current.copy(END_CAM_LOOKAT)
    } else if (selectedObject) {
      // Zoom positions for different objects
      const zoomPositions = {
        'monitor': { pos: [-1, 0.5, 2], lookAt: [-2.5, 0, 0] },
        'keyboard': { pos: [-1, -0.5, 2], lookAt: [-2.5, -1, 0] },
        'chair': { pos: [0, 0, 3], lookAt: [-2, -1, 0] },
        'desk': { pos: [-2, 1, 3], lookAt: [-2.5, -1, 0] },
        'pc': { pos: [-4, 0, 2], lookAt: [-3, -1, 0] },
        'lamp': { pos: [-1, 1, 1], lookAt: [-2, 1, 0] },
        'plant': { pos: [-3, 1, 2], lookAt: [-3, 0, 0] },
        'shelf': { pos: [-2, 2, 3], lookAt: [-2, 1, 0] },
        'poster': { pos: [-2, 2, 2], lookAt: [-2, 2, 0] },
      }
      
      const config = zoomPositions[selectedObject] || zoomPositions['desk']
      targetPosition.current.set(...config.pos)
      targetLookAt.current.set(...config.lookAt)
    }
  }, [selectedObject, resetCamera])

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.05)
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    camera.lookAt(targetLookAt.current)
    camera.updateProjectionMatrix()
  })

  return null
}

export default function Playground({ darkMode, onClose }) {
  const [selectedObject, setSelectedObject] = useState(null)
  const [resetCamera, setResetCamera] = useState(false)

  const handleObjectClick = useCallback((objectKey) => {
    setResetCamera(false)
    setSelectedObject(objectKey)
  }, [])

  const handleReset = useCallback(() => {
    setSelectedObject(null)
    setResetCamera(true)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 100,
      background: darkMode ? '#0f0f0f' : '#99cad1',
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 101,
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontFamily: "'Antonio', sans-serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: darkMode ? '#99cad1' : '#0f0f0f',
            letterSpacing: '-1px',
          }}>
            3D Room Playground
          </h2>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '0.9rem',
            color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
          }}>
            Click on objects to zoom in | Drag to orbit | Scroll to zoom
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              background: darkMode ? 'rgba(153,202,209,0.2)' : 'rgba(0,0,0,0.1)',
              border: `1px solid ${darkMode ? '#99cad1' : '#0f0f0f'}`,
              borderRadius: '8px',
              color: darkMode ? '#99cad1' : '#0f0f0f',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.target.style.background = darkMode ? 'rgba(153,202,209,0.4)' : 'rgba(0,0,0,0.2)'}
            onMouseOut={(e) => e.target.style.background = darkMode ? 'rgba(153,202,209,0.2)' : 'rgba(0,0,0,0.1)'}
          >
            Reset View
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: darkMode ? '#99cad1' : '#0f0f0f',
              border: 'none',
              borderRadius: '8px',
              color: darkMode ? '#0f0f0f' : '#fff',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Exit Playground
          </button>
        </div>
      </div>

      {/* Object Info Panel */}
      {selectedObject && INTERACTIVE_OBJECTS[selectedObject] && (
        <div style={{
          position: 'absolute',
          bottom: 30,
          left: 30,
          background: darkMode ? 'rgba(15,15,15,0.95)' : 'rgba(255,255,255,0.95)',
          padding: '20px 30px',
          borderRadius: '12px',
          zIndex: 101,
          maxWidth: '350px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: `1px solid ${darkMode ? 'rgba(153,202,209,0.3)' : 'rgba(0,0,0,0.1)'}`,
        }}>
          <h3 style={{
            margin: '0 0 8px 0',
            color: darkMode ? '#99cad1' : '#007589',
            fontSize: '1.3rem',
            fontWeight: 700,
          }}>
            {INTERACTIVE_OBJECTS[selectedObject].name}
          </h3>
          <p style={{
            margin: 0,
            color: darkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
            fontSize: '0.95rem',
            lineHeight: 1.5,
          }}>
            {INTERACTIVE_OBJECTS[selectedObject].description}
          </p>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [-10.09, 1.68, -6.73], fov: 50 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[darkMode ? '#0f0f0f' : '#99cad1']} />
        
        <ambientLight intensity={darkMode ? 0.3 : 0.8} />
        <spotLight
          position={[-5, 10, 5]}
          angle={0.3}
          penumbra={0.5}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <rectAreaLight position={[0, 2, 0]} width={2} height={2} intensity={2} color="#99cad1" />
        
        <Plane args={[50, 50]} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <meshStandardMaterial color={darkMode ? '#101010' : '#84d9e8'} />
        </Plane>

        <Suspense fallback={null}>
          <InteractiveRoom 
            onObjectClick={handleObjectClick} 
            selectedObject={selectedObject}
            darkMode={darkMode}
          />
        </Suspense>

        <CameraController selectedObject={selectedObject} resetCamera={resetCamera} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[0.01, 0, 0]}
          minDistance={2}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
