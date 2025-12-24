'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Posisi Mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Efek Pegas (Spring) agar gerakan halus (trail effect)
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16); // -16 agar tengah
      mouseY.set(e.clientY - 16);
    };

    // Deteksi Hover pada elemen interaktif
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Kursor Utama (Dot Kecil) - Langsung ikut mouse */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: mouseX, // Gerak instan (kita perlu adjust offset dikit manual di style kalau mau perfect center, tapi motion value lebih performant)
          y: mouseY,
          translateX: 12, // Koreksi posisi manual
          translateY: 12,
        }}
      />

      {/* Kursor Trail (Lingkaran Besar) - Gerak smooth pakai Spring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1, // Membesar saat hover link
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.1)" : "transparent",
          borderColor: isHovered ? "transparent" : "#00f0ff"
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}