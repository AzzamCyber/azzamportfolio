'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ==========================================
// BAGIAN 1: LOGIKA GAME 3D (CYBER RUNNER)
// ==========================================

// --- PLAYER (PESAWAT) ---
function Player({ position, setGameOver, scoreRef }) {
  const mesh = useRef();
  const { viewport } = useThree();
  
  // State gerak kiri/kanan
  const [targetX, setTargetX] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setTargetX((prev) => Math.max(prev - 2, -2));
      if (e.key === 'ArrowRight') setTargetX((prev) => Math.min(prev + 2, 2));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Gerakan halus (Lerp)
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.1);
    
    // Efek miring saat belok
    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, -targetX * 0.2, 0.1);
    
    // Simpan posisi player global untuk deteksi tabrakan
    state.playerPos = mesh.current.position;
  });

  return (
    <group ref={mesh} position={position}>
      {/* Badan Pesawat */}
      <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh rotation={[0, Math.PI, 0]}>
          <coneGeometry args={[0.5, 1.5, 4]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        {/* Engine Glow */}
        <mesh position={[0, 0.5, 0]}>
           <sphereGeometry args={[0.3]} />
           <meshBasicMaterial color="white" />
        </mesh>
      </Float>
    </group>
  );
}

// --- RINTANGAN (OBSTACLES) ---
function ObstacleManager({ setGameOver, scoreRef }) {
  const obstacles = useRef([]);
  const group = useRef();
  const speedRef = useRef(10); // Kecepatan awal
  const lastSpawn = useRef(0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // 1. SPAWN OBSTACLES
    if (time - lastSpawn.current > 1.5 / (speedRef.current / 10)) { // Spawn rate
      lastSpawn.current = time;
      // Posisi acak: -2, 0, atau 2
      const lane = (Math.floor(Math.random() * 3) - 1) * 2; 
      
      // Tambahkan objek baru ke array ref
      obstacles.current.push({
        x: lane,
        z: -50, // Muncul dari jauh
        active: true,
        id: Math.random()
      });
      
      // Naikkan kecepatan perlahan
      if(speedRef.current < 30) speedRef.current += 0.1;
    }

    // 2. UPDATE POSISI & COLLISION
    // Kita lakukan manual update pada children group untuk performa
    // (Dalam implementasi sederhana ini, kita hanya update data logisnya)
  });

  // Render Loop khusus untuk obstacle logic & collision
  useFrame((state, delta) => {
     // Loop semua rintangan
     obstacles.current.forEach((obs, i) => {
        if (!obs.active) return;

        // Gerakkan mendekat ke kamera
        obs.z += speedRef.current * delta;

        // Cek Tabrakan dengan Player
        if (state.playerPos) {
            const dx = Math.abs(obs.x - state.playerPos.x);
            const dz = Math.abs(obs.z - state.playerPos.z);
            
            // Hitbox logic
            if (dx < 0.8 && dz < 0.8) {
                setGameOver(true);
            }
        }

        // Hapus jika sudah lewat kamera & Tambah Score
        if (obs.z > 5) {
            obs.active = false;
            scoreRef.current += 10;
        }
     });

     // Cleanup array (menghapus yang sudah lewat)
     obstacles.current = obstacles.current.filter(o => o.z <= 5);
  });

  return (
    <group ref={group}>
      {/* Mapping obstacles ke Mesh 3D */}
      {obstacles.current.map(obs => (
          <mesh key={obs.id} position={[obs.x, 0, obs.z]}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#ff0055" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
             {/* Wireframe effect */}
             <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial color="white" />
             </lineSegments>
          </mesh>
      ))}
    </group>
  );
}

// --- LANTAI BERGERAK (MOVING GRID) ---
function MovingFloor() {
    const textureRef = useRef();
    useFrame((state, delta) => {
        // Gerakkan texture offset jika menggunakan texture
        // Untuk gridHelper sederhana, kita bisa biarkan statis atau gerakkan group
    });

    // Trik visual lantai bergerak: Gerakkan gridHelper mendekat lalu reset
    const gridRef = useRef();
    useFrame((state, delta) => {
        if (gridRef.current) {
            gridRef.current.position.z += delta * 10;
            if (gridRef.current.position.z > 1) {
                gridRef.current.position.z = 0;
            }
        }
    });

    return (
        <group position={[0, -1, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <group ref={gridRef}>
                 <gridHelper args={[100, 100, 0xff00ff, 0x222222]} position={[0, 0.01, 0]} />
            </group>
        </group>
    )
}

// ==========================================
// BAGIAN 2: UI & LOGIKA PEMICU
// ==========================================

export default function MatrixEasterEgg() {
  const [active, setActive] = useState(false);
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
  const [inputHistory, setInputHistory] = useState([]);
  const scoreRef = useRef(0); // Ref score (diakses di 3D dan UI)

  // KODE RAHASIA: ↑ 1 0 8 1 0 8 ↑
  const secretCode = ["ArrowUp", "1", "0", "8", "1", "0", "8", "ArrowUp"];

  // 1. DETEKSI KODE
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newHistory = [...inputHistory, e.key];
      if (newHistory.length > secretCode.length) newHistory.shift();
      setInputHistory(newHistory);

      if (JSON.stringify(newHistory) === JSON.stringify(secretCode)) {
        setActive(true);
        setGameState('menu');
        setInputHistory([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputHistory]);

  // 2. FUNGSI GAME
  const startGame = () => {
      scoreRef.current = 0;
      setGameState('playing');
  };

  const handleClose = () => {
      setActive(false);
      setGameState('menu');
  };

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] bg-black font-mono"
        >
          {/* 3D GAME CANVAS */}
          <Canvas shadows>
             <PerspectiveCamera makeDefault position={[0, 3, 6]} rotation={[-0.3, 0, 0]} />
             
             {/* Lingkungan */}
             <color attach="background" args={['#050505']} />
             <fog attach="fog" args={['#050505', 5, 40]} />
             <ambientLight intensity={0.5} />
             <spotLight position={[10, 20, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />
             <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
             
             {/* Elemen Game */}
             <MovingFloor />
             
             {gameState === 'playing' && (
                 <>
                    <Player position={[0, 0, 0]} setGameOver={() => setGameState('gameover')} scoreRef={scoreRef} />
                    <ObstacleManager setGameOver={() => setGameState('gameover')} scoreRef={scoreRef} />
                 </>
             )}

             {/* Hiasan Menu (Jika tidak main) */}
             {gameState !== 'playing' && (
                 <Float speed={2}>
                    <mesh rotation={[0, 0, Math.PI / 4]}>
                        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                        <meshStandardMaterial color="#00f0ff" wireframe />
                    </mesh>
                 </Float>
             )}
          </Canvas>

          {/* UI OVERLAY (HTML) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            
            {/* SCORE COUNTER (POJOK KIRI ATAS) */}
            {gameState === 'playing' && (
                <div className="absolute top-10 left-10 text-cyan-400 text-2xl font-bold">
                    {/* FIX: ScoreDisplay menggunakan useEffect/setInterval, bukan useFrame */}
                    SCORE: <ScoreDisplay scoreRef={scoreRef} />
                </div>
            )}

            {/* MAIN MENU */}
            {gameState === 'menu' && (
                <div className="pointer-events-auto text-center bg-black/80 p-10 rounded-2xl border border-cyan-500/50 backdrop-blur-md">
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                        CYBER RUNNER
                    </h1>
                    <p className="text-gray-400 mb-8">Welcome to the hidden layer, Azzam.</p>
                    
                    <button onClick={startGame} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition shadow-[0_0_20px_#00f0ff] animate-pulse">
                        START GAME
                    </button>
                    
                    <p className="mt-6 text-sm text-gray-500">Controls: Arrow Left / Arrow Right</p>
                    
                    <button onClick={handleClose} className="mt-8 text-red-500 text-xs hover:underline">
                        EXIT TO REALITY
                    </button>
                </div>
            )}

            {/* GAME OVER SCREEN */}
            {gameState === 'gameover' && (
                <div className="pointer-events-auto text-center bg-red-950/80 p-10 rounded-2xl border border-red-500/50 backdrop-blur-md">
                    <h1 className="text-6xl font-black text-red-500 mb-4">CRASHED</h1>
                    <p className="text-white text-2xl mb-8">Final Score: {scoreRef.current}</p>
                    
                    <button onClick={startGame} className="px-8 py-3 bg-white text-red-900 font-bold rounded-full transition hover:scale-105">
                        RETRY
                    </button>
                    <div className="mt-4">
                        <button onClick={handleClose} className="text-gray-400 hover:text-white text-sm">
                            Quit Game
                        </button>
                    </div>
                </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// FIX: Komponen ScoreDisplay menggunakan setInterval karena berada di luar <Canvas>
function ScoreDisplay({ scoreRef }) {
    const [score, setScore] = useState(0);
    
    useEffect(() => {
        // Cek skor setiap 100ms
        const interval = setInterval(() => {
            setScore(current => {
                // Hanya update state jika nilai ref berbeda (hemat render)
                if (scoreRef.current !== current) {
                    return scoreRef.current;
                }
                return current;
            });
        }, 100);
        
        return () => clearInterval(interval);
    }, [scoreRef]);

    return <span>{score}</span>;
}