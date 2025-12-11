'use client';
import { use } from 'react'; // WAJIB: Import hook 'use' untuk Next.js 15
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { ArrowLeft, Github, ExternalLink, Code, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';

export default function ProjectDetail({ params }) {
  // FIX: Unwrap params menggunakan hook use() karena params sekarang adalah Promise
  const { slug } = use(params);

  // Cari project berdasarkan slug yang sudah di-unwrap
  const project = portfolioData.projects.find(p => p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-gray-400">Project Not Found</p>
          <Link href="/" className="text-cyan-400 mt-6 inline-block hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // URL GitHub/Project (Fallback)
  const projectLink = project.link || "https://github.com/azzamcodex"; 

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 bg-grid opacity-30 pointer-events-none"></div>
      
      <Navbar />

      <div className="container mx-auto px-6 md:px-20 py-32 relative z-10">
        {/* Back Button */}
        <Link href="/#showcase" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/20 group"
          >
            <div className="aspect-video w-full bg-gray-900 relative overflow-hidden">
               <img 
                 src={project.image} 
                 alt={project.title} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold flex items-center gap-1">
                  <Code size={12} /> {t}
                </span>
              ))}
            </div>

            <div className="glass p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Layers size={20} className="text-purple-500" /> Overview
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.desc}
              </p>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                Project ini dikembangkan untuk memecahkan masalah efisiensi dengan pendekatan teknologi modern. 
                Dirancang dengan arsitektur yang scalable dan fokus pada User Experience.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={projectLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 min-w-[150px] py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-center flex justify-center items-center gap-2 shadow-lg shadow-cyan-900/30 transition-all transform hover:-translate-y-1"
              >
                <Github size={20} /> View Source
              </a>
              <a 
                href="#"
                className="flex-1 min-w-[150px] py-4 rounded-xl glass border border-white/10 hover:bg-white/5 text-white font-bold text-center flex justify-center items-center gap-2 transition-all"
              >
                <ExternalLink size={20} /> Live Demo
              </a>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}