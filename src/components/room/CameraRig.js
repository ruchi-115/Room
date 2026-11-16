import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { VIEWS } from './views'

const UP = new THREE.Vector3(0, 1, 0)
const HOME_LOOK = new THREE.Vector3(0.01, 0, 0)
export const COMPACT_BREAKPOINT = 640

export default function CameraRig({ view, anchorsRef, onArrive }) {
  const scroll = useScroll()
  const look = useRef(HOME_LOOK.clone())
  const returning = useRef(false)
  const arrived = useRef(false)
  const mounted = useRef(false)
  const v = useMemo(
    () => ({
      home: new THREE.Vector3(),
      pos: new THREE.Vector3(),
      look: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      right: new THREE.Vector3(),
      corner: new THREE.Vector3(),
      shift: new THREE.Vector3(),
    }),
    []
  )

  useEffect(() => {
    arrived.current = false
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (view !== 'home') return
    returning.current = true
    // Wait a frame so ScrollControls re-enables overflow before scrolling to the full-room view.
    const id = requestAnimationFrame(() => {
      const el = scroll.el
      el.scrollTo({ top: el.scrollHeight - el.clientHeight, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [view, scroll])

  useFrame((state, delta) => {
    const cam = state.camera
    const { width, height } = state.size
    const r1 = scroll.range(0, 0.36)
    const r2 = scroll.range(0.4, 0.2)
    const r3 = scroll.range(0.8, 0.2)
    v.home.set(Math.sin(r1) * -12, Math.sin(r2) * 2, Math.sin(r3) * -8)
    const ease = 1 - Math.exp(-delta * 3.5)

    if (view === 'home') {
      if (returning.current) {
        cam.position.lerp(v.home, ease)
        look.current.lerp(HOME_LOOK, ease)
        if (cam.position.distanceTo(v.home) < 0.01) returning.current = false
      } else {
        cam.position.copy(v.home)
        look.current.copy(HOME_LOOK)
      }
      cam.lookAt(look.current)
      return
    }

    const target = VIEWS[view]
    const compact = width < COMPACT_BREAKPOINT
    const aspect = width / height
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2))
    // On small screens the content sits in a bottom sheet, so frame the object in the top ~40%.
    const heightFraction = compact ? 0.36 : target.fill
    const widthFraction = compact ? 0.92 : target.fill
    const distance = Math.max(
      target.height / (2 * tanHalf * heightFraction),
      target.width / (2 * tanHalf * aspect * widthFraction)
    )

    v.normal.fromArray(target.normal).normalize()
    v.look.fromArray(target.center)
    v.pos.copy(v.look).addScaledVector(v.normal, distance)
    if (compact) {
      v.shift.copy(UP).multiplyScalar(-distance * tanHalf * 0.56)
      v.look.add(v.shift)
      v.pos.add(v.shift)
    }

    cam.position.lerp(v.pos, ease)
    look.current.lerp(v.look, ease)
    cam.lookAt(look.current)
    cam.updateMatrixWorld()

    if (!arrived.current && cam.position.distanceTo(v.pos) < 0.03) {
      arrived.current = true
      onArrive(view)
    }

    v.right.crossVectors(UP, v.normal).normalize()
    Object.entries(target.anchors).forEach(([key, anchor]) => {
      const el = anchorsRef.current[key]
      if (!el) return
      if (compact) {
        el.style.left = el.style.top = el.style.width = el.style.height = ''
        return
      }
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
      for (const sx of [-1, 1]) {
        for (const sy of [-1, 1]) {
          v.corner
            .fromArray(anchor.center)
            .addScaledVector(v.right, (sx * anchor.width) / 2)
            .addScaledVector(UP, (sy * anchor.height) / 2)
            .project(cam)
          const x = ((v.corner.x + 1) / 2) * width
          const y = ((1 - v.corner.y) / 2) * height
          minX = Math.min(minX, x); maxX = Math.max(maxX, x)
          minY = Math.min(minY, y); maxY = Math.max(maxY, y)
        }
      }
      el.style.left = `${minX}px`
      el.style.top = `${minY}px`
      el.style.width = `${maxX - minX}px`
      el.style.height = `${maxY - minY}px`
    })
  })

  return null
}
