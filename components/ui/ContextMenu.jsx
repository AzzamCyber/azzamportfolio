'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RefreshCw, ArrowUp, Share2, Download } from 'lucide-react';

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Matikan menu klik kanan bawaan browser
      setVisible(true);
      setPosition({ x: e.pageX, y: e.pageY });
    };

    const handleClick = () => setVisible(false);
    const handleScroll = () => setVisible(false);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Actions
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@azzamcodex.dev");
    alert("Email copied to clipboard!");
  };

  const handleRefresh = () => window.location.reload();
  const handleTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          className="absolute z-[99999] min-w-[180px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden"
          style={{ top: position.y, left: position.x }}
        >
          <div className="p-1 flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 mb-1">
              System Actions
            </div>
            
            <button onClick={handleCopyEmail} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-lg transition text-left">
              <Copy size={14} /> Copy Email
            </button>
            
            <button onClick={handleTop} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 rounded-lg transition text-left">
              <ArrowUp size={14} /> Back to Top
            </button>

            <button onClick={handleRefresh} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-purple-500/20 hover:text-purple-400 rounded-lg transition text-left">
              <RefreshCw size={14} /> System Refresh
            </button>
            
            <div className="border-t border-white/10 my-1"></div>
            
            <div className="px-3 py-1.5 text-[10px] text-gray-600 text-center font-mono">
              AZZAM CODEX v1.0
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}