'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, User, Layers, Mail, Github, Linkedin, FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  // Daftar Perintah
  const actions = [
    { id: 'home', name: 'Go to Home', icon: Home, action: () => router.push('/') },
    { id: 'projects', name: 'View Projects', icon: Layers, action: () => window.location.href = '/#showcase' },
    { id: 'about', name: 'About Me', icon: User, action: () => window.location.href = '/#about' },
    { id: 'contact', name: 'Contact Me', icon: Mail, action: () => window.location.href = '/#contact' },
    { id: 'github', name: 'Open GitHub', icon: Github, action: () => window.open('https://github.com/azzamcodex', '_blank') },
    { id: 'cv', name: 'Download CV', icon: FileText, action: () => alert('CV Download Triggered') },
  ];

  // Filter pencarian
  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(search.toLowerCase())
  );

  // Shortcut Keyboard (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      
      if (!open) return;

      if (e.key === 'Escape') setOpen(false);
      
      // Navigasi Panah Atas/Bawah
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(prev => (prev + 1) % filteredActions.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selected]) {
            filteredActions[selected].action();
            setOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredActions, selected]);

  // Reset selected saat search berubah
  useEffect(() => setSelected(0), [search]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[15vh] px-4">
          
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl shadow-cyan-900/30 overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input 
                autoFocus
                type="text" 
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-white placeholder:text-gray-600 outline-none text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="hidden md:flex gap-1">
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">ESC</span>
              </div>
            </div>

            {/* List Actions */}
            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              {filteredActions.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">No results found.</div>
              ) : (
                filteredActions.map((action, idx) => (
                  <button
                    key={action.id}
                    onClick={() => { action.action(); setOpen(false); }}
                    onMouseEnter={() => setSelected(idx)}
                    className={`
                      w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-all duration-100
                      ${selected === idx ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-400 hover:bg-white/5'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon size={18} className={selected === idx ? 'text-cyan-400' : 'text-gray-600'} />
                      <span className={selected === idx ? 'font-bold' : ''}>{action.name}</span>
                    </div>
                    {selected === idx && <ArrowRight size={14} className="animate-pulse" />}
                  </button>
                ))
              )}
            </div>

            {/* Footer Hint */}
            <div className="px-4 py-2 bg-white/5 border-t border-white/5 text-[10px] text-gray-500 flex justify-between">
               <span>Search Projects, Pages, or Actions</span>
               <div className="flex gap-2">
                 <span><kbd className="bg-white/10 px-1 rounded">↑</kbd> <kbd className="bg-white/10 px-1 rounded">↓</kbd> to navigate</span>
                 <span><kbd className="bg-white/10 px-1 rounded">↵</kbd> to select</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}