import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onLoaded }) {
  const { progress, active } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (progress === 100 && !active) {
      const timer = setTimeout(() => {
        setShow(false)
        if (onLoaded) onLoaded()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [progress, active, onLoaded])

  if (!show) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        transition: 'opacity 0.5s ease-out',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: progress === 100 ? 'none' : 'all',
      }}
    >
      <div
        style={{
          fontFamily: "'Antonio', sans-serif",
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-2px',
          color: '#99cad1',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        RUCHITA&apos;S PORTFOLIO
      </div>

      <div
        style={{
          width: '280px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #99cad1, #007589)',
            borderRadius: '2px',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>

      <div
        style={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: "'Inter var', sans-serif",
        }}
      >
        Loading 3D Room... {Math.round(progress)}%
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '2rem',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#99cad1',
              animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
