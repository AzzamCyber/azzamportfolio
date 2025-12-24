'use client';
import { motion } from 'framer-motion';

export default function CodeShowcase() {
  return (
    <div className="w-full max-w-3xl mx-auto my-16">
      {/* Window Frame */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/10"
      >
        {/* Header / Tab Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-white/5">
          <div className="flex items-center gap-2">
            {/* Window Controls */}
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* File Name Tab */}
            <div className="bg-[#0f0f0f] px-3 py-1 rounded-t-md text-xs text-cyan-400 font-mono border-t-2 border-cyan-500 flex items-center gap-2">
              <span className="text-blue-400">TS</span> azzam.config.ts
            </div>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto custom-scrollbar">
          <pre>
            <code>
              <span className="text-purple-400">const</span> <span className="text-yellow-300">Developer</span> <span className="text-white">=</span> <span className="text-purple-400">{`{`}</span>{'\n'}
              
              {/* Name */}
              <span className="text-gray-500 select-none">  1</span>   <span className="text-blue-300">name</span>: <span className="text-green-400">"Azzam Codex"</span>,{'\n'}
              
              {/* Role */}
              <span className="text-gray-500 select-none">  2</span>   <span className="text-blue-300">role</span>: <span className="text-green-400">"Fullstack Engineer"</span>,{'\n'}
              
              {/* Stack Array */}
              <span className="text-gray-500 select-none">  3</span>   <span className="text-blue-300">stack</span>: <span className="text-yellow-300">[</span>{'\n'}
              <span className="text-gray-500 select-none">  4</span>     <span className="text-green-400">"Next.js"</span>, <span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"Three.js"</span>{'\n'}
              <span className="text-gray-500 select-none">  5</span>   <span className="text-yellow-300">]</span>,{'\n'}

              {/* Status Object */}
              <span className="text-gray-500 select-none">  6</span>   <span className="text-blue-300">status</span>: <span className="text-purple-400">{`{`}</span>{'\n'}
              <span className="text-gray-500 select-none">  7</span>     <span className="text-blue-300">available</span>: <span className="text-purple-400">true</span>,{'\n'}
              <span className="text-gray-500 select-none">  8</span>     <span className="text-blue-300">coffee</span>: <span className="text-purple-400">true</span>{'\n'}
              <span className="text-gray-500 select-none">  9</span>   <span className="text-purple-400">{`}`}</span>,{'\n'}

              {/* Function */}
              <span className="text-gray-500 select-none"> 10</span>{'\n'}
              <span className="text-gray-500 select-none"> 11</span>   <span className="text-blue-300">code</span>: <span className="text-purple-400">()</span> <span className="text-purple-400">=&gt;</span> <span className="text-purple-400">{`{`}</span>{'\n'}
              <span className="text-gray-500 select-none"> 12</span>     <span className="text-cyan-400">while</span>(<span className="text-white">alive</span>) <span className="text-purple-400">{`{`}</span>{'\n'}
              <span className="text-gray-500 select-none"> 13</span>       <span className="text-yellow-300">buildAwesomeThings</span>();{'\n'}
              <span className="text-gray-500 select-none"> 14</span>     <span className="text-purple-400">{`}`}</span>{'\n'}
              <span className="text-gray-500 select-none"> 15</span>   <span className="text-purple-400">{`}`}</span>{'\n'}
              <span className="text-purple-400">{`}`}</span>;
            </code>
          </pre>
        </div>
      </motion.div>
    </div>
  );
}