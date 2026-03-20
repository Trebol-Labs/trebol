'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const N = 800

// ─────────────────────────────────────────────────────────────────────────────
// Shared animation state (one ref, zero React re-renders during animation)
// ─────────────────────────────────────────────────────────────────────────────
interface AnimState {
  fromIdx:      number
  toIdx:        number
  progress:     number
  opacity:      number
  leafScales:   [number, number, number]
  leafRotation: number
  pulseInt:     number
  driftOp:      number
  idleStrength: number
}

function initState(): AnimState {
  return {
    fromIdx: 0, toIdx: 0, progress: 0,
    opacity: 0, leafScales: [0, 0, 0],
    leafRotation: 0, pulseInt: 0, driftOp: 0, idleStrength: 0,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GLSL — main particle shader (soft glowing discs, additive, HDR for bloom)
// ─────────────────────────────────────────────────────────────────────────────
const PART_VERT = /* glsl */`
  attribute float aSize;
  attribute float aAlpha;
  uniform  float uOpacity;
  varying  float vAlpha;
  void main() {
    vAlpha = aAlpha * uOpacity;
    vec4 mv  = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize  = aSize * (90.0 / -mv.z);
    gl_Position   = projectionMatrix * mv;
  }
`
const PART_FRAG = /* glsl */`
  varying float vAlpha;
  void main() {
    vec2  c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    float a = (1.0 - smoothstep(0.3, 1.0, d)) * vAlpha;
    if (a < 0.005) discard;
    vec3 col = mix(vec3(0.35, 0.62, 0.30), vec3(0.55, 0.85, 0.48), 1.0 - d);
    gl_FragColor = vec4(col, a);
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// GLSL — ambient drift particles (micro fireflies)
// ─────────────────────────────────────────────────────────────────────────────
const DRIFT_VERT = /* glsl */`
  attribute float aIdx;
  attribute float aSpd;
  uniform  float uTime;
  uniform  float uOp;
  varying  float vOp;
  void main() {
    vOp = uOp;
    vec3 p = position;
    p.x += sin(uTime * aSpd * 0.55 + aIdx * 2.1) * 0.20;
    p.y += cos(uTime * aSpd * 0.45 + aIdx * 1.8) * 0.15;
    p.z += sin(uTime * aSpd * 0.70 + aIdx * 3.2) * 0.10;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float sz = 1.0 + sin(uTime * 1.2 + aIdx) * 0.45;
    gl_PointSize = sz * (50.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`
const DRIFT_FRAG = /* glsl */`
  varying float vOp;
  void main() {
    vec2  c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    float a = (1.0 - smoothstep(0.2, 1.0, d)) * vOp * 0.18;
    if (a < 0.003) discard;
    gl_FragColor = vec4(0.35, 0.62, 0.30, a);
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// Easing
// ─────────────────────────────────────────────────────────────────────────────
function eio(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ─────────────────────────────────────────────────────────────────────────────
// Formation builders  (all return exactly N * 3 Float32Array)
// ─────────────────────────────────────────────────────────────────────────────
function mkGrid(): Float32Array {
  const p = new Float32Array(N * 3)
  const cols = 32, rows = 25, sx = 0.197, sy = 0.197
  let i = 0
  outer: for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (i >= N) break outer
      p[i * 3]     = (c - cols / 2 + 0.5) * sx
      p[i * 3 + 1] = (r - rows / 2 + 0.5) * sy
      p[i * 3 + 2] = (Math.random() - 0.5) * 0.018
      i++
    }
  }
  return p
}

function mkRobot(): Float32Array {
  const buf: number[] = []
  const px = (x: number, y: number, z = 0) => buf.push(x, y, z)

  // ── Head silhouette (bevelled rectangle) — double row for thickness ──
  const HW = 1.32, HH = 1.62, BEV = 0.18
  for (let row = 0; row < 2; row++) {
    const off = row * 0.06
    const hw = HW + off, hh = HH + off
    for (let i = 0; i < 88; i++) {
      const t = i / 88
      let x: number, y: number
      if      (t < .25)  { const u = t / .25;        x = -hw + BEV + u * (2*hw - 2*BEV); y =  hh }
      else if (t < .50)  { const u = (t-.25)/.25;    x =  hw;  y = hh - BEV - u*(2*hh-2*BEV) }
      else if (t < .75)  { const u = (t-.50)/.25;    x = hw-BEV - u*(2*hw-2*BEV); y = -hh }
      else               { const u = (t-.75)/.25;    x = -hw;  y = -hh+BEV + u*(2*hh-2*BEV) }
      px(x, y)
    }
  }

  // ── Eyes (filled 6×4 grids) ──
  for (let ex = 0; ex < 6; ex++) for (let ey = 0; ey < 4; ey++) px(-0.90+ex*.155, 0.40+ey*.13)
  for (let ex = 0; ex < 6; ex++) for (let ey = 0; ey < 4; ey++) px( 0.17+ex*.155, 0.40+ey*.13)

  // ── Forehead scanlines (3 × 22) ──
  for (let r = 0; r < 3; r++) for (let c = 0; c < 22; c++) px(-1.16+c*.109, 1.08+r*.13)

  // ── Cheek arcs ──
  for (let i = 0; i < 11; i++) { const a = Math.PI*.5+(i/11)*Math.PI*.55; px(-1.02+Math.cos(a)*.30, -0.22+Math.sin(a)*.30) }
  for (let i = 0; i < 11; i++) { const a = -(i/11)*Math.PI*.55;           px( 1.02+Math.cos(a)*.30, -0.22+Math.sin(a)*.30) }

  // ── Jaw line (16) ──
  for (let i = 0; i < 16; i++) px(-0.90+i*.12, -1.28)

  // ── Mouth (12) + teeth (5) ──
  for (let i = 0; i < 12; i++) px(-0.66+i*.12, -0.53)
  for (let i = 0; i < 5; i++)  px(-0.48+i*.24, -0.68)

  // ── Antenna rod (15) + cap (8) ──
  for (let i = 0; i < 15; i++) px(0, 1.66+i*.088)
  for (let i = 0; i < 8; i++) { const a = (i/8)*Math.PI*2; px(Math.cos(a)*.14, 2.98+Math.sin(a)*.14) }

  // ── Neck (6×4) ──
  for (let x = 0; x < 6; x++) for (let y = 0; y < 4; y++) px(-0.37+x*.148, -1.66+y*.11)

  // ── Fill remainder scattered in a wide aura ──
  while (buf.length / 3 < N) {
    const a = Math.random() * Math.PI * 2
    const r = 1.8 + Math.random() * 1.2
    buf.push(Math.cos(a)*r*.86, Math.sin(a)*r, (Math.random()-.5)*.14)
  }

  const pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i*3] = buf[i*3] ?? 0; pos[i*3+1] = buf[i*3+1] ?? 0; pos[i*3+2] = buf[i*3+2] ?? 0
  }
  return pos
}

// Lobe geometry constants — shared between mkClover() and NeonCloverTube
const LOBE_R = 1.06
const LOBE_OFFSET = 0.72

function mkClover(): Float32Array {
  const buf: number[] = []
  const px = (x: number, y: number, z = 0) => buf.push(x, y, z)

  for (let petal = 0; petal < 3; petal++) {
    const ang = (petal * Math.PI * 2) / 3 - Math.PI / 2
    const cx = Math.cos(ang) * LOBE_OFFSET
    const cy = Math.sin(ang) * LOBE_OFFSET

    // Outline only — 160 pts per lobe (dense contour, no fill)
    for (let i = 0; i < 160; i++) {
      const a = (i / 160) * Math.PI * 2
      const r = LOBE_R * (1 - 0.065 * Math.cos(3 * a + petal * 2.09))
      px(cx + Math.cos(a)*r, cy + Math.sin(a)*r, (Math.random()-.5)*.04)
    }
  }

  // Stem (40 pts)
  for (let i = 0; i < 40; i++) px((Math.random()-.5)*.06, -0.42-i*.08)

  // Center cluster (12 pts)
  for (let i = 0; i < 12; i++) {
    const a = Math.random() * Math.PI * 2
    px(Math.cos(a)*Math.random()*.15, Math.sin(a)*Math.random()*.15)
  }

  // Fill remainder — sparse ambient halo at large radius
  while (buf.length / 3 < N) {
    const a = Math.random() * Math.PI * 2
    const r = 2.0 + Math.random() * 1.6
    buf.push(Math.cos(a)*r, Math.sin(a)*r, (Math.random()-.5)*.10)
  }

  const pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i*3] = buf[i*3] ?? 0; pos[i*3+1] = buf[i*3+1] ?? 0; pos[i*3+2] = buf[i*3+2] ?? 0
  }
  return pos
}

// ─────────────────────────────────────────────────────────────────────────────
// Particle system component
// ─────────────────────────────────────────────────────────────────────────────
function Particles({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const uRef   = useRef({ uOpacity: { value: 0 } })

  const { formations, stagger, sizes, alphas } = useMemo(() => {
    const formations = [mkGrid(), mkRobot(), mkClover()]
    const stagger = new Float32Array(N)
    const sizes   = new Float32Array(N)
    const alphas  = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      stagger[i] = Math.random() * 0.38
      sizes[i]   = 1.4 + Math.random() * 2.0
      alphas[i]  = 0.25 + Math.random() * 0.55  // normal blending — individual dots visible
    }
    return { formations, stagger, sizes, alphas }
  }, [])

  const working = useMemo(() => new Float32Array(N * 3), [])

  useFrame(() => {
    if (!geoRef.current) return
    const { fromIdx, toIdx, progress, opacity } = stateRef.current
    const from = formations[fromIdx] ?? formations[0]
    const to   = formations[toIdx]   ?? formations[0]

    for (let i = 0; i < N; i++) {
      const delay = stagger[i]
      const local = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)))
      const t = eio(local)
      working[i*3]   = from[i*3]   + (to[i*3]   - from[i*3])   * t
      working[i*3+1] = from[i*3+1] + (to[i*3+1] - from[i*3+1]) * t
      working[i*3+2] = from[i*3+2] + (to[i*3+2] - from[i*3+2]) * t
    }

    const attr = geoRef.current.attributes.position as THREE.BufferAttribute
    attr.array.set(working)
    attr.needsUpdate = true
    uRef.current.uOpacity.value = opacity
  })

  const uniforms = useMemo(() => ({ uOpacity: { value: 0 } }), [])
  uRef.current = uniforms

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[formations[0].slice(), 3]} count={N} itemSize={3} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes,   1]} />
        <bufferAttribute attach="attributes-aAlpha"   args={[alphas,  1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={PART_VERT}
        fragmentShader={PART_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Ambient drift micro-particles
// ─────────────────────────────────────────────────────────────────────────────
function AmbientDrift({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uOp: { value: 0 } }), [])
  const D = 400
  const { positions, aIdx, aSpd } = useMemo(() => {
    const positions = new Float32Array(D * 3)
    const aIdx      = new Float32Array(D)
    const aSpd      = new Float32Array(D)
    for (let i = 0; i < D; i++) {
      positions[i*3]   = (Math.random()-.5) * 8
      positions[i*3+1] = (Math.random()-.5) * 8
      positions[i*3+2] = (Math.random()-.5) * 4
      aIdx[i] = i
      aSpd[i] = 0.4 + Math.random() * 1.6
    }
    return { positions, aIdx, aSpd }
  }, [])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
    uniforms.uOp.value = stateRef.current.driftOp
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aIdx"     args={[aIdx,      1]} />
        <bufferAttribute attach="attributes-aSpd"     args={[aSpd,      1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={DRIFT_VERT}
        fragmentShader={DRIFT_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Neon clover tube (replaces GlassLeaf — three instances)
// ─────────────────────────────────────────────────────────────────────────────
function NeonCloverTube({
  petalIndex,
  stateRef,
}: {
  petalIndex: number
  stateRef: React.MutableRefObject<AnimState>
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const angle = (petalIndex * Math.PI * 2) / 3 - Math.PI / 2
    const cx = Math.cos(angle) * LOBE_OFFSET
    const cy = Math.sin(angle) * LOBE_OFFSET
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      const r = LOBE_R * (1 - 0.065 * Math.cos(3 * a + petalIndex * 2.09))
      points.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0))
    }
    const curve = new THREE.CatmullRomCurve3(points, true)
    return new THREE.TubeGeometry(curve, 96, 0.025, 6, true)
  }, [petalIndex])

  useFrame(() => {
    if (!meshRef.current) return
    const sc = stateRef.current.leafScales[petalIndex]
    meshRef.current.scale.setScalar(sc)
    meshRef.current.rotation.z = stateRef.current.leafRotation
  })

  return (
    <mesh ref={meshRef} geometry={geometry} scale={0}>
      <meshBasicMaterial
        color={new THREE.Color(0.25, 0.7, 0.2)}
        transparent
        opacity={0.7}
        toneMapped={false}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Neon stem tube
// ─────────────────────────────────────────────────────────────────────────────
function NeonStemTube({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      const y = -0.42 - t * 3.18
      const x = Math.sin(t * Math.PI * 0.6) * 0.06
      points.push(new THREE.Vector3(x, y, 0))
    }
    const curve = new THREE.CatmullRomCurve3(points, false)
    return new THREE.TubeGeometry(curve, 32, 0.02, 6, false)
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    // Scale with the average of all leaf scales
    const ls = stateRef.current.leafScales
    const avg = (ls[0] + ls[1] + ls[2]) / 3
    meshRef.current.scale.setScalar(avg)
    meshRef.current.rotation.z = stateRef.current.leafRotation
  })

  return (
    <mesh ref={meshRef} geometry={geometry} scale={0}>
      <meshBasicMaterial
        color={new THREE.Color(0.2, 0.55, 0.15)}
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pulse light (olive flash at robot→clover transition)
// ─────────────────────────────────────────────────────────────────────────────
function PulseLight({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(() => { if (ref.current) ref.current.intensity = stateRef.current.pulseInt })
  return <pointLight ref={ref} position={[0, 0.3, 2.5]} color="#ACC8A2" intensity={0} distance={9} />
}

// ─────────────────────────────────────────────────────────────────────────────
// Camera — gentle idle bob during hold phases
// ─────────────────────────────────────────────────────────────────────────────
function CameraController({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  const { camera } = useThree()
  const t = useRef(0)
  useEffect(() => { camera.position.set(0, 0, 6.5); camera.lookAt(0, 0, 0) }, [camera])
  useFrame((_, delta) => {
    t.current += delta
    const k = stateRef.current.idleStrength
    camera.position.x = Math.sin(t.current * 0.38) * 0.13 * k
    camera.position.y = Math.cos(t.current * 0.27) * 0.09 * k + 0
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────────────────────────────────────
function Scene({ stateRef }: { stateRef: React.MutableRefObject<AnimState> }) {
  return (
    <>
      <CameraController stateRef={stateRef} />
      <color attach="background" args={['#070c06']} />
      <ambientLight     color="#ACC8A2" intensity={0.06} />
      <hemisphereLight  args={[new THREE.Color('#ACC8A2'), new THREE.Color('#070c06'), 0.12]} />
      <directionalLight position={[2, 3, 3]} color="#d4eacf" intensity={0.2} />
      <PulseLight  stateRef={stateRef} />
      <AmbientDrift stateRef={stateRef} />
      <Particles   stateRef={stateRef} />
      <NeonCloverTube petalIndex={0} stateRef={stateRef} />
      <NeonCloverTube petalIndex={1} stateRef={stateRef} />
      <NeonCloverTube petalIndex={2} stateRef={stateRef} />
      <NeonStemTube stateRef={stateRef} />
      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={1.2}
          luminanceSmoothing={0.015}
          intensity={0.15}
        />
      </EffectComposer>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation timeline  (Anime.js proxy pattern — no internal array access)
// ─────────────────────────────────────────────────────────────────────────────
async function runTimeline(stateRef: React.MutableRefObject<AnimState>, signal: AbortSignal) {
  const { default: anime } = await import('animejs')
  if (signal.aborted) return

  function loop() {
    if (signal.aborted) return

    stateRef.current = initState()

    const p = {
      opacity: 0, progress: 0, pulse: 0,
      leaf0: 0, leaf1: 0, leaf2: 0,
      rotation: 0, idle: 0, drift: 0,
    }

    const tl = anime.timeline({ autoplay: true })

    // ── Phase 0: fade in (0–900ms) ──
    tl.add({
      targets: p,
      opacity: [0, 0.88],
      drift:   [0, 1],
      duration: 900,
      easing: 'easeOutCubic',
      update() {
        stateRef.current.opacity  = p.opacity
        stateRef.current.driftOp  = p.drift
      },
    })

    // ── Phase 1: grid holds (900–2500ms) ──
    tl.add({
      targets: p, duration: 1600, easing: 'linear',
      update() {
        stateRef.current.fromIdx = 0; stateRef.current.toIdx = 0
        stateRef.current.progress = 0
      },
    })

    // ── Phase 2: grid → robot (2500–5800ms) ──
    tl.add({
      targets: p,
      progress: [0, 1],
      duration: 3300,
      easing: 'easeInOutQuart',
      update() {
        stateRef.current.fromIdx  = 0
        stateRef.current.toIdx    = 1
        stateRef.current.progress = p.progress
      },
    })

    // ── Phase 3: robot holds (5800–7000ms) ──
    tl.add({ targets: p, duration: 1200, easing: 'linear' })

    // ── Phase 4: olive pulse (6200–6700ms, overlapping hold) ──
    tl.add({
      targets: p,
      pulse: [0, 1, 0],
      duration: 600,
      easing: 'easeOutExpo',
      update() { stateRef.current.pulseInt = p.pulse * 3 },
    }, 6200)

    // ── Phase 5: robot → clover (7000–10300ms) ──
    tl.add({
      targets: p,
      progress: [0, 1],
      duration: 3300,
      easing: 'easeInOutQuart',
      update() {
        stateRef.current.fromIdx  = 1
        stateRef.current.toIdx    = 2
        stateRef.current.progress = p.progress
      },
    }, 7000)

    // ── Phase 6: neon tubes bloom (staggered, 10000–13400ms) ──
    tl.add({ targets: p, leaf0: [0, 1], duration: 1400, easing: 'easeOutBack',
      update() { stateRef.current.leafScales[0] = p.leaf0 } }, 10000)
    tl.add({ targets: p, leaf1: [0, 1], duration: 1400, easing: 'easeOutBack',
      update() { stateRef.current.leafScales[1] = p.leaf1 } }, 10550)
    tl.add({ targets: p, leaf2: [0, 1], duration: 1400, easing: 'easeOutBack',
      update() { stateRef.current.leafScales[2] = p.leaf2 } }, 11100)

    // ── Phase 7: idle — camera bob + gentle rotation (12000ms+) ──
    tl.add({
      targets: p,
      idle:     [0, 1],
      rotation: [0, Math.PI * 2],
      duration: 6500,
      easing: 'easeInOutSine',
      update() {
        stateRef.current.idleStrength = p.idle
        stateRef.current.leafRotation = p.rotation * 0.055
      },
    }, 12000)

    // ── Phase 8: fade out (18200–20200ms) ──
    tl.add({
      targets: p,
      opacity:  [0.88, 0],
      drift:    [1, 0],
      idle:     [1, 0],
      duration: 2000,
      easing: 'easeInCubic',
      update() {
        stateRef.current.opacity      = p.opacity
        stateRef.current.driftOp      = p.drift
        stateRef.current.idleStrength = p.idle
      },
      complete() { if (!signal.aborted) setTimeout(loop, 300) },
    }, 18200)
  }

  loop()
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const stateRef = useRef<AnimState>(initState())

  useEffect(() => {
    const ctrl = new AbortController()
    runTimeline(stateRef, ctrl.signal)
    return () => ctrl.abort()
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 6.5], fov: 38 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Scene stateRef={stateRef} />
      </Canvas>
    </div>
  )
}
