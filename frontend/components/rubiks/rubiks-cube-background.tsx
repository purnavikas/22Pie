'use client';

import { Canvas, type ThreeEvent, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import { createRef, Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { randomMove, type Axis, type CubeMove } from './cube-moves';

type CubeMode = 'shuffling' | 'solving' | 'solved' | 'paused';
type Coordinates = { x: number; y: number; z: number };
type FacePalette = Record<'right' | 'left' | 'top' | 'bottom' | 'front' | 'back', string>;
type CubieRecord = {
  coordinates: Coordinates;
  home: Coordinates;
  id: string;
  objectRef: RefObject<THREE.Group | null>;
};
type ActiveTurn = { elapsed: number; move: CubeMove; start: number };
type ResetStart = { position: THREE.Vector3; quaternion: THREE.Quaternion };

const CUBIE_GAP = 1.04;
const AXIS_VECTORS: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

const PALETTES: FacePalette[] = [
  { right: '#c82634', left: '#f27622', top: '#f5f3e7', bottom: '#ffd52c', front: '#23864b', back: '#2261bc' },
  { right: '#2261bc', left: '#c82634', top: '#f5f3e7', bottom: '#f27622', front: '#ffd52c', back: '#23864b' },
  { right: '#23864b', left: '#ffd52c', top: '#f27622', bottom: '#f5f3e7', front: '#c82634', back: '#2261bc' },
  { right: '#f27622', left: '#2261bc', top: '#23864b', bottom: '#ffd52c', front: '#f5f3e7', back: '#c82634' },
];

function stickerTexture(color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = color;
    context.fillRect(0, 0, 256, 256);
    for (let index = 0; index < 105; index += 1) {
      const x = (index * 73 + 19) % 251;
      const y = (index * 137 + 31) % 251;
      const brightness = 0.08 + (index % 5) * 0.025;
      context.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      context.fillRect(x, y, index % 7 === 0 ? 2 : 1, index % 7 === 0 ? 2 : 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Sticker({ color, position, rotation = [0, 0, 0] }: {
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const texture = useMemo(() => stickerTexture(color), [color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.93, 0.93]} />
      <meshPhysicalMaterial
        clearcoat={0.72}
        clearcoatRoughness={0.18}
        map={texture}
        metalness={0.08}
        roughness={0.27}
      />
    </mesh>
  );
}

function Cubie({ cubie, palette }: { cubie: CubieRecord; palette: FacePalette }) {
  const { x, y, z } = cubie.coordinates;
  return (
    <group
      position={[x * CUBIE_GAP, y * CUBIE_GAP, z * CUBIE_GAP]}
      ref={cubie.objectRef}
    >
      <RoundedBox args={[0.98, 0.98, 0.98]} bevelSegments={3} radius={0.055} smoothness={3}>
        <meshStandardMaterial color="#090b0f" metalness={0.2} roughness={0.32} />
      </RoundedBox>
      <Sticker color={palette.right} position={[0.496, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Sticker color={palette.left} position={[-0.496, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Sticker color={palette.top} position={[0, 0.496, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Sticker color={palette.bottom} position={[0, -0.496, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <Sticker color={palette.front} position={[0, 0, 0.496]} />
      <Sticker color={palette.back} position={[0, 0, -0.496]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

function easeMechanical(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function RubiksCube({ palette, reducedMotion, onModeChange, onResetColor }: {
  palette: FacePalette;
  reducedMotion: boolean;
  onModeChange: (mode: CubeMode) => void;
  onResetColor: () => void;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const turnRef = useRef<THREE.Group>(null);
  const cubies = useMemo<CubieRecord[]>(() => {
    const records: CubieRecord[] = [];
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          records.push({
            coordinates: { x, y, z },
            home: { x, y, z },
            id: `${x}-${y}-${z}`,
            objectRef: createRef<THREE.Group>(),
          });
        }
      }
    }
    return records;
  }, []);
  const modeRef = useRef<CubeMode>(reducedMotion ? 'solved' : 'shuffling');
  const activeRef = useRef<ActiveTurn | null>(null);
  const resetRef = useRef<number | null>(null);
  const resetStartsRef = useRef<Map<string, ResetStart>>(new Map());
  const resumeAfterResetRef = useRef(false);
  const pauseRef = useRef(0.65);
  const previousRef = useRef<CubeMove | undefined>(undefined);
  const visibleRef = useRef(true);

  const setMode = useCallback((mode: CubeMode) => {
    modeRef.current = mode;
    onModeChange(mode);
  }, [onModeChange]);

  useEffect(() => {
    const handleVisibility = () => {
      visibleRef.current = !document.hidden;
      if (document.hidden) onModeChange('paused');
      else onModeChange(modeRef.current);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [onModeChange]);

  useEffect(() => {
    if (reducedMotion) {
      setMode('solved');
    }
  }, [reducedMotion, setMode]);

  const requestSolve = useCallback(() => {
    if (reducedMotion) return;
    if (modeRef.current === 'solving' || modeRef.current === 'solved') return;
    resumeAfterResetRef.current = false;
    setMode('solving');
  }, [reducedMotion, setMode]);

  const requestShuffle = useCallback(() => {
    if (reducedMotion) return;
    if (modeRef.current === 'solving') {
      resumeAfterResetRef.current = true;
      return;
    }
    setMode('shuffling');
    resetRef.current = null;
    resetStartsRef.current.clear();
    pauseRef.current = 0.18;
  }, [reducedMotion, setMode]);

  const handlePointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (event.nativeEvent.pointerType === 'mouse') requestSolve();
  };
  const handlePointerLeave = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (event.nativeEvent.pointerType === 'mouse') requestShuffle();
  };
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (event.nativeEvent.pointerType === 'mouse') return;
    event.stopPropagation();
    if (modeRef.current === 'shuffling') requestSolve();
    else requestShuffle();
  };

  useFrame((state, delta) => {
    if (!visibleRef.current || !cubeRef.current || !turnRef.current || !rootRef.current) return;
    const elapsed = state.clock.elapsedTime;
    const compact = state.viewport.width < 7;
    rootRef.current.position.x = 0;
    rootRef.current.position.y = (compact ? -0.8 : 0.35)
      + (reducedMotion ? 0 : Math.sin(elapsed * 0.72) * 0.1);
    if (modeRef.current === 'shuffling') cubeRef.current.rotation.y += delta * 0.055;

    const active = activeRef.current;
    if (active) {
      active.elapsed += delta;
      const duration = 0.56;
      const progress = Math.min(active.elapsed / duration, 1);
      turnRef.current.rotation[active.move.axis] = active.start
        + easeMechanical(progress) * active.move.direction * Math.PI / 2;

      if (progress === 1) {
        const axis = AXIS_VECTORS[active.move.axis];
        const angle = active.move.direction * Math.PI / 2;
        const selected = cubies.filter((cubie) => cubie.coordinates[active.move.axis] === active.move.layer);
        selected.forEach((cubie) => {
          if (cubie.objectRef.current) cubeRef.current?.attach(cubie.objectRef.current);
          const rotated = new THREE.Vector3(
            cubie.coordinates.x,
            cubie.coordinates.y,
            cubie.coordinates.z,
          ).applyAxisAngle(axis, angle);
          cubie.coordinates = {
            x: Math.round(rotated.x),
            y: Math.round(rotated.y),
            z: Math.round(rotated.z),
          };
          if (cubie.objectRef.current) {
            cubie.objectRef.current.position.set(
              cubie.coordinates.x * CUBIE_GAP,
              cubie.coordinates.y * CUBIE_GAP,
              cubie.coordinates.z * CUBIE_GAP,
            );
          }
        });
        turnRef.current.rotation.set(0, 0, 0);
        activeRef.current = null;
        pauseRef.current = modeRef.current === 'solving' ? 0 : 0.42;
      }
      return;
    }

    if (modeRef.current === 'solving') {
      if (resetRef.current === null) {
        resetRef.current = 0;
        cubies.forEach((cubie) => {
          if (cubie.objectRef.current) cubeRef.current?.attach(cubie.objectRef.current);
        });
        turnRef.current.rotation.set(0, 0, 0);
        resetStartsRef.current = new Map(
          cubies.flatMap((cubie) => cubie.objectRef.current ? [[cubie.id, {
            position: cubie.objectRef.current.position.clone(),
            quaternion: cubie.objectRef.current.quaternion.clone(),
          }]] : []),
        );
        onResetColor();
      }
      resetRef.current += delta;
      const progress = Math.min(resetRef.current / 1.15, 1);
      const eased = easeMechanical(progress);
      const identity = new THREE.Quaternion();
      cubies.forEach((cubie) => {
        const object = cubie.objectRef.current;
        const start = resetStartsRef.current.get(cubie.id);
        if (!object || !start) return;
        const destination = new THREE.Vector3(
          cubie.home.x * CUBIE_GAP,
          cubie.home.y * CUBIE_GAP,
          cubie.home.z * CUBIE_GAP,
        );
        object.position.lerpVectors(start.position, destination, eased);
        object.quaternion.slerpQuaternions(start.quaternion, identity, eased);
      });
      cubeRef.current.scale.setScalar(0.76 + Math.sin(progress * Math.PI) * 0.025);
      cubeRef.current.rotation.y = THREE.MathUtils.lerp(cubeRef.current.rotation.y, 0.62, delta * 4.5);
      cubeRef.current.rotation.z = THREE.MathUtils.lerp(cubeRef.current.rotation.z, 0.18, delta * 4.5);

      if (progress === 1) {
        cubies.forEach((cubie) => { cubie.coordinates = { ...cubie.home }; });
        cubeRef.current.scale.setScalar(0.76);
        cubeRef.current.rotation.set(-0.48, 0.62, 0.18);
        resetRef.current = null;
        resetStartsRef.current.clear();
        if (resumeAfterResetRef.current) {
          resumeAfterResetRef.current = false;
          pauseRef.current = 0.28;
          setMode('shuffling');
        } else {
          setMode('solved');
        }
      }
      return;
    }

    pauseRef.current -= delta;
    if (pauseRef.current > 0) return;
    let move: CubeMove | undefined;
    if (modeRef.current === 'shuffling') {
      move = randomMove(previousRef.current);
      previousRef.current = move;
    }
    if (!move) return;

    const selected = cubies.filter((cubie) => cubie.coordinates[move.axis] === move.layer);
    selected.forEach((cubie) => {
      if (cubie.objectRef.current) turnRef.current?.attach(cubie.objectRef.current);
    });
    activeRef.current = { elapsed: 0, move, start: turnRef.current.rotation[move.axis] };
  });

  return (
    <group position={[1.55, 0, 0]} ref={rootRef}>
      <group
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        ref={cubeRef}
        rotation={[-0.48, 0.62, 0.18]}
        scale={0.76}
      >
        {cubies.map((cubie) => (
          <Cubie cubie={cubie} key={cubie.id} palette={palette} />
        ))}
        <group ref={turnRef} />
      </group>
    </group>
  );
}

function Scene({ palette, reducedMotion, onModeChange, onResetColor }: {
  palette: FacePalette;
  reducedMotion: boolean;
  onModeChange: (mode: CubeMode) => void;
  onResetColor: () => void;
}) {
  const shadowRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!shadowRef.current) return;
    const compact = state.viewport.width < 7;
    shadowRef.current.position.set(0, compact ? -2.15 : -1.55, 0);
  });
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight color="#fff8e7" intensity={3.4} position={[5, 7, 6]} />
      <directionalLight color="#afc9ff" intensity={1.15} position={[-4, 2, 3]} />
      <RubiksCube
        onModeChange={onModeChange}
        onResetColor={onResetColor}
        palette={palette}
        reducedMotion={reducedMotion}
      />
      <group ref={shadowRef}>
        <ContactShadows blur={3.8} far={8} opacity={0.42} scale={5.4} />
      </group>
    </>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function RubiksCubeBackground() {
  const [webGL, setWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mode, setMode] = useState<CubeMode>('shuffling');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const changePalette = useCallback(() => {
    setPaletteIndex((current) => (current + 1 + Math.floor(Math.random() * (PALETTES.length - 1))) % PALETTES.length);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(query.matches);
    const frame = window.requestAnimationFrame(() => {
      setWebGL(canUseWebGL());
      updateMotion();
    });
    query.addEventListener('change', updateMotion);
    return () => {
      window.cancelAnimationFrame(frame);
      query.removeEventListener('change', updateMotion);
    };
  }, []);

  return (
    <div className="rubiks-stage" data-mode={mode}>
      <div aria-hidden="true" className="rubiks-glow" />
      {webGL ? (
        <Canvas
          camera={{ fov: 32, position: [0, 0.25, 11.8] }}
          className="rubiks-canvas"
          dpr={[1, 1.75]}
          fallback={<div className="rubiks-static-cube" />}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.02;
          }}
          shadows
        >
          <Suspense fallback={null}>
            <Scene
              onModeChange={setMode}
              onResetColor={changePalette}
              palette={PALETTES[paletteIndex]}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      ) : <div aria-hidden="true" className="rubiks-static-cube" />}
      <div className="rubiks-status" aria-live="polite">
        <span className="rubiks-status-dot" />
        {reducedMotion ? 'Solved · reduced motion' : mode === 'solving' ? 'Resetting cube' : mode === 'solved' ? 'Cube solved' : 'Auto shuffling'}
      </div>
    </div>
  );
}
