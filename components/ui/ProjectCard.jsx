'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-xl glass overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/0 transition z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{project.desc}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-cyan-200 border border-white/10">
              {t}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/projects/${project.id}`} 
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition"
        >
          View Details <ExternalLink size={14} />
        </Link>
      </div>
    </motion.div>
  );
}