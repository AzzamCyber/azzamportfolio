'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, MessageCircle } from 'lucide-react';

// GANTI ID INI DENGAN DISCORD ID ASLI ANDA
const DISCORD_ID = "1007987682640658534"; // <-- Contoh ID, ganti ya!

export default function DiscordStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data dari Lanyard API (Real-time update setiap 10 detik)
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Gagal ambil status Discord", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Polling setiap 10 detik
    return () => clearInterval(interval);
  }, []);

  if (loading) return null; // Loading state invisible

  // Tentukan Warna Status
  const statusColor = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500"
  };

  const currentStatus = data?.discord_status || "offline";
  const spotify = data?.spotify;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-4"
    >
      {/* Kartu Status */}
      <div className="glass px-4 py-2 rounded-full flex items-center gap-3 border border-white/10 bg-black/60 backdrop-blur-md">
        
        {/* Avatar & Status Dot */}
        <div className="relative">
          {data?.discord_user?.avatar ? (
            <img 
              src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-full border-2 border-black"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-black" />
          )}
          
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-black ${statusColor[currentStatus]} animate-pulse`} />
        </div>

        {/* Info Text */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {currentStatus === 'dnd' ? 'Do Not Disturb' : currentStatus}
          </span>
          
          {/* Tampilkan Spotify jika sedang mendengarkan, jika tidak tampilkan Username */}
          {spotify ? (
            <div className="flex items-center gap-1.5 text-green-400 max-w-[150px]">
              <Music size={12} className="animate-spin-slow" />
              <span className="text-xs font-medium truncate w-full">
                {spotify.song}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-white">
              {data?.discord_user?.username || "Azzam Codex"}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}