'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

// --- KOMPONEN PARTIKEL "DIGITAL BRAIN" ---
function ParticleBrain(props) {
  const ref = useRef();
  
  // Generate 5000 titik acak dalam bentuk bola secara manual (tanpa library berat)
  const sphere = useMemo(() => {
    const temp = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.2 * Math.cbrt(Math.random()); // Radius bola 1.2
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    // Rotasi konstan agar terlihat hidup seperti otak yang berpikir
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f0ff" // Warna partikel Cyan Neon
          size={0.003}    // Ukuran partikel kecil & elegan
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending untuk efek cahaya
        />
      </Points>
    </group>
  );
}

// Kata-kata yang akan ditampilkan bergantian
const words = ["AZZAM CODEX", "FULL STACK", "DEVELOPER", "CREATIVE"];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Jika sudah kata terakhir, tunggu sebentar lalu selesai
    if (index === words.length) {
       setTimeout(onComplete, 1000); 
       return;
    }

    // Ganti kata setiap 1.2 detik
    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1200); 

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* 1. LAYER BACKGROUND: PARTIKEL "DIGITAL BRAIN" (3D) */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ParticleBrain />
        </Canvas>
      </div>

      {/* 2. LAYER FOREGROUND: TEKS ANIMASI (2D Modern) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <AnimatePresence mode="wait">
          {index < words.length && (
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-black tracking-[0.2em] text-center px-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-500 drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                {words[index]}
              </span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Progress Bar Tipis & Minimalis */}
        <div className="absolute bottom-20 w-48 h-[2px] bg-gray-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: words.length * 1.2, ease: "linear" }}
            className="h-full bg-cyan-500 shadow-[0_0_15px_#00f0ff]"
          />
        </div>
      </div>
    </motion.div>
  );
}