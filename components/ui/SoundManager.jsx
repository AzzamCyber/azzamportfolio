'use client';
import { useEffect, useRef } from 'react';

export default function SoundManager() {
  const hoverAudio = useRef(null);
  const clickAudio = useRef(null);

  useEffect(() => {
    // Inisialisasi Audio dalam try-catch agar aman
    try {
      hoverAudio.current = new Audio('/sounds/hover.mp3');
      clickAudio.current = new Audio('/sounds/click.mp3');
      
      // Volume setting
      hoverAudio.current.volume = 0.2; 
      clickAudio.current.volume = 0.4;
    } catch (err) {
      console.warn("SoundManager: Audio init failed (ignore if running on server)");
    }

    const playHover = () => {
      if (hoverAudio.current) {
        hoverAudio.current.currentTime = 0;
        hoverAudio.current.play().catch(() => {}); // Abaikan error autoplay browser
      }
    };

    const playClick = () => {
      if (clickAudio.current) {
        clickAudio.current.currentTime = 0;
        clickAudio.current.play().catch(() => {});
      }
    };

    const handleInteraction = (e) => {
      // --- SAFETY CHECK (PENTING) ---
      // 1. Jika target null/undefined, berhenti.
      // 2. Jika target adalah 'document' atau 'window' (yang tidak punya .closest), berhenti.
      if (!e.target || typeof e.target.closest !== 'function') return;

      // Cari elemen 'a' atau 'button' terdekat dari yang diklik/dihover
      const target = e.target.closest('a, button');
      
      if (target) {
        if (e.type === 'mouseenter') playHover();
        if (e.type === 'click') playClick();
      }
    };

    // Pasang listener di document level
    document.addEventListener('mouseenter', handleInteraction, true); // true = capture phase
    document.addEventListener('click', handleInteraction, true);

    // Cleanup saat pindah halaman
    return () => {
      document.removeEventListener('mouseenter', handleInteraction, true);
      document.removeEventListener('click', handleInteraction, true);
    };
  }, []);

  return null;
}