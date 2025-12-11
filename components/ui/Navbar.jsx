'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // DEFINISI MENU & LINK TUJUAN
  // Karena 'Skills' & 'Projects' sekarang ada di dalam section #showcase, kita arahkan ke sana.
  const navItems = [
    { name: 'About', targetId: 'about' },
    { name: 'Skills', targetId: 'showcase' },   // Diarahkan ke Showcase
    { name: 'Projects', targetId: 'showcase' }, // Diarahkan ke Showcase
    { name: 'Contact', targetId: 'contact' },
  ];

  // Fungsi scroll smooth dengan offset agar tidak tertutup navbar
  const handleScroll = (e, id) => {
    e.preventDefault(); 
    setIsOpen(false); 
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset kompensasi tinggi navbar fixed
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth' 
      });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 md:px-10 glass border-b border-white/5 bg-black/60 backdrop-blur-md"
      >
        {/* LOGO */}
        <Link 
          href="/" 
          className="text-lg md:text-xl font-bold tracking-tighter hover:text-cyan-400 transition" 
          onClick={() => {
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
        >
          AZZAM<span className="text-cyan-400">.CODEX</span>
        </Link>
        
        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={`#${item.targetId}`} 
                onClick={(e) => handleScroll(e, item.targetId)}
                className="hover:text-cyan-400 transition-colors relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
        
        {/* HIRE ME BUTTON (DESKTOP) */}
        <div className="hidden md:block">
           <a 
             href="#contact" 
             onClick={(e) => handleScroll(e, 'contact')}
             className="px-5 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition text-xs md:text-sm font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
           >
             Hire Me
           </a>
        </div>

        {/* MOBILE TOGGLE BUTTON DENGAN ANIMASI */}
        <button 
          className="md:hidden text-white p-1 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} />}
          </motion.div>
        </button>
      </motion.nav>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[60px] left-0 w-full glass z-40 overflow-hidden md:hidden border-b border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="flex flex-col p-6 gap-6 items-center justify-center">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <a 
                    href={`#${item.targetId}`} 
                    onClick={(e) => handleScroll(e, item.targetId)}
                    className="text-xl font-bold text-gray-300 hover:text-cyan-400 transition tracking-wide cursor-pointer"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full pt-4 border-t border-white/10 mt-2"
              >
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, 'contact')}
                  className="block w-full text-center py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-lg shadow-cyan-900/20"
                >
                  Hire Me Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}