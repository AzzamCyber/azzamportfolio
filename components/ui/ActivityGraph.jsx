'use client';
import { motion, AnimatePresence } from 'framer-motion'; // <-- REVISI: Tambahkan AnimatePresence di sini
import { useState, useEffect } from 'react';

// Simulasi Data Kontribusi (365 hari ke belakang)
const generateData = () => {
  const data = [];
  const levels = [2, 3, 4, 3, 4]; // 0: Kosong, 4: Sangat Aktif
  
  for (let i = 0; i < 52 * 7; i++) {
    // Randomize level dengan bias agar terlihat "rajin" (lebih banyak isi daripada kosong)
    const random = Math.random();
    let level = 0;
    if (random > 0.8) level = 4;
    else if (random > 0.6) level = 3;
    else if (random > 0.4) level = 10;
    else if (random > 0.2) level = 5;
    
    data.push({
      date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000).toDateString(),
      count: level === 0 ? 0 : Math.floor(Math.random() * 10) + 1,
      level: level
    });
  }
  return data;
};

export default function ActivityGraph() {
  const [contributions, setContributions] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setContributions(generateData());
  }, []);

  // Warna berdasarkan Level (Tema Cyan/Blue)
  const getColor = (level) => {
    switch(level) {
      case 0: return 'bg-[#1a1a1a]'; // Kosong
      case 1: return 'bg-cyan-900/40';
      case 2: return 'bg-cyan-700/60';
      case 3: return 'bg-cyan-500/80';
      case 4: return 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]'; // Paling aktif (Glowing)
      default: return 'bg-[#1a1a1a]';
    }
  };

  return (
    <div className="w-full glass p-6 rounded-2xl border border-white/10 mb-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Coding Activity</h3>
          <p className="text-sm text-gray-400">1,440 contributions in the last year</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="w-3 h-3 bg-[#1a1a1a] rounded-sm" />
          <div className="w-3 h-3 bg-cyan-900/40 rounded-sm" />
          <div className="w-3 h-3 bg-cyan-500/80 rounded-sm" />
          <div className="w-3 h-3 bg-[#00f0ff] rounded-sm shadow-[0_0_5px_#00f0ff]" />
          <span>More</span>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex gap-1 min-w-max">
          {/* Grid 7 baris (Hari) x 52 kolom (Minggu) */}
          {Array.from({ length: 52 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const index = weekIndex * 7 + dayIndex;
                const data = contributions[index];
                
                if (!data) return null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.002 }} // Efek domino saat load
                    onMouseEnter={() => setHovered({ ...data })} // Hover logic simple
                    onMouseLeave={() => setHovered(null)}
                    className={`w-3 h-3 rounded-sm ${getColor(data.level)} cursor-pointer transition-colors duration-200 hover:border hover:border-white/50`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 bg-black/90 text-xs px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap pointer-events-none"
              style={{ 
                 // Posisikan tooltip di tengah atas container (sederhana)
                 left: "50%", 
                 top: "50%",
                 transform: "translate(-50%, -50%)"
              }}
            >
              <span className="font-bold text-cyan-400 block text-center">{hovered.count} contributions</span>
              <div className="text-gray-400 text-center">{hovered.date}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}