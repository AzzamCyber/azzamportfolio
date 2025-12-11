'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, TorusKnot, Stars, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useState } from 'react';

// --- OBJEK UTAMA (TORUS KNOT) ---
function TechObject() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Rotasi objek utama
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <TorusKnot 
        ref={meshRef} 
        args={[1, 0.3, 128, 16]} 
        scale={hovered ? 1.4 : 1.3}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#00f0ff" : "#7000ff"} 
          attach="material"
          distort={0.4} 
          speed={2}
          roughness={0.1}
          metalness={1}
        />
      </TorusKnot>
      
      {/* Wireframe Overlay */}
      <TorusKnot args={[1, 0.3, 128, 16]} scale={1.4} rotation={[0,0,0]}>
         <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </TorusKnot>
    </Float>
  );
}

// --- PARTIKEL BINTANG BERGERAK (UPDATED: LEBIH LUAS) ---
function MovingStars() {
  const starsRef = useRef();

  useFrame((state, delta) => {
    // Memutar grup bintang secara perlahan agar terlihat hidup
    if (starsRef.current) {
      starsRef.current.rotation.y -= delta * 0.05; // Gerak horizontal
      starsRef.current.rotation.x -= delta * 0.02; // Gerak vertikal dikit
    }
  });

  return (
    <group ref={starsRef}>
      <Stars 
        radius={300} // REVISI: Diperbesar agar tidak terlihat mengkotak di desktop
        depth={100}  // REVISI: Kedalaman ditambah
        count={10000} // REVISI: Jumlah partikel ditambah agar tetap padat
        factor={4}   // Ukuran partikel
        saturation={0} 
        fade 
        speed={2}    // Kecepatan kelap-kelip
      />
    </group>
  );
}

// --- SCENE UTAMA ---
export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[500px] absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
        <directionalLight position={[-5, -5, -5]} intensity={2} color="#7000ff" />
        
        {/* Objek Tech di Tengah */}
        <TechObject />
        
        {/* Background Partikel Bergerak */}
        <MovingStars />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}