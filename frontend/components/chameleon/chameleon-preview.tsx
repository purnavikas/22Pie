'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createChameleonModel } from './create-chameleon-model';

function Character({ autoRotate }: { autoRotate: boolean }) {
  const model = useMemo(() => createChameleonModel(), []);
  const rootRef = useRef<THREE.Group>(null);
  useEffect(() => () => {
    model.root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.geometry.dispose();
      if (Array.isArray(child.material)) child.material.forEach((item) => item.dispose());
    });
  }, [model]);
  useFrame((state, delta) => {
    if (!rootRef.current) return;
    if (autoRotate) rootRef.current.rotation.y += delta * 0.18;
    rootRef.current.position.y = 0.08 + Math.sin(state.clock.elapsedTime * 0.8) * 0.015;
  });
  return <primitive object={model.root} ref={rootRef} />;
}

export function ChameleonPreview({ autoRotate = false }: { autoRotate?: boolean }) {
  return (
    <Canvas camera={{ position: [4.9, 3.05, 8.7], fov: 34 }} dpr={[1, 2]} gl={{ antialias: true }} shadows>
      <color attach="background" args={['#d7d8d5']} />
      <ambientLight intensity={0.9} />
      <directionalLight castShadow intensity={3.1} position={[-4, 7, 6]} shadow-mapSize={[2048, 2048]} />
      <directionalLight color="#b8d8d0" intensity={1.15} position={[5, 3, 2]} />
      <pointLight color="#c8dfae" intensity={0.8} position={[0, 5, -4]} />
      <Character autoRotate={autoRotate} />
      <ContactShadows blur={2.5} far={8} opacity={0.34} position={[0, -1.3, 0]} scale={9} />
      <Environment preset="studio" environmentIntensity={0.42} />
      <OrbitControls enableDamping maxDistance={13} minDistance={5.5} target={[0, 1.25, 0]} />
    </Canvas>
  );
}
