'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ArrowRight, Send, Award, ChevronDown, ChevronUp, User, Mail, MessageSquare, Trash2, Code, Layers } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import HeroScene from '@/components/3d/HeroScene';
import ProjectCard from '@/components/ui/ProjectCard';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Preloader from '@/components/ui/Preloader';
import { portfolioData } from '@/data/portfolio';
import Link from 'next/link';
import HackerText from '@/components/ui/HackerText'; // <--- Import ini
import ActivityGraph from '@/components/ui/ActivityGraph';

// --- MAPPING ICON DARI DEVICON CDN (Icon Asli Berwarna) ---
const techIcons = {
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  "Laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  "Material UI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  "Ubuntu": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg",
  "Lua (FiveM)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg",
  "Electron.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
};

// --- AOS Animation Variant ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  // --- SETUP BACKGROUND ANIMATION (PARALLAX LIGHTS) ---
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]); 
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacityLight = useTransform(scrollY, [0, 800], [0.6, 0.2]); 
  
  // --- STATE UNTUK TAB SHOWCASE ---
  const [activeTab, setActiveTab] = useState('projects'); 
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  // --- STATE UNTUK KOMENTAR ---
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState({ name: '', text: '' });
  
  useEffect(() => {
    const savedComments = localStorage.getItem('azzam_portfolio_comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const handlePostComment = () => {
    if (!newComment.name.trim() || !newComment.text.trim()) return;
    
    const commentData = {
      id: Date.now(),
      name: newComment.name,
      text: newComment.text,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      avatar: newComment.name.charAt(0).toUpperCase()
    };

    const updatedComments = [commentData, ...comments];
    setComments(updatedComments);
    localStorage.setItem('azzam_portfolio_comments', JSON.stringify(updatedComments));
    setNewComment({ name: '', text: '' });
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter(c => c.id !== id);
    setComments(updatedComments);
    localStorage.setItem('azzam_portfolio_comments', JSON.stringify(updatedComments));
  };

  // --- STATE UNTUK CONTACT FORM ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  // Logika Project Display
  const displayedProjects = showAllProjects ? portfolioData.projects : portfolioData.projects.slice(0, 3);

  // Helper untuk Tech Stack Flat List
  const allSkills = portfolioData.skills.flatMap(category => 
    category.items.map(item => ({ name: item, category: category.category, icon: category.icon }))
  );

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        // PERBAIKAN PENTING: Menghapus 'bg-[#050505]' dari main agar Grid & Light di z-index -2 terlihat
        <main className="min-h-screen relative selection:bg-cyan-500/30 overflow-hidden">
          
          {/* STATIC GRID BACKGROUND */}
          <div className="fixed inset-0 z-[-2] bg-grid opacity-40 pointer-events-none"></div>

          {/* DYNAMIC MOVING LIGHTS BACKGROUND */}
          <motion.div
            style={{ y: y1, opacity: opacityLight }}
            className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-cyan-600/30 rounded-full blur-[100px] z-[-1] pointer-events-none mix-blend-screen will-change-transform"
          />
          
          <motion.div
            style={{ y: y2, opacity: opacityLight }}
            className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-700/25 rounded-full blur-[120px] z-[-1] pointer-events-none mix-blend-screen will-change-transform"
          />

          <Navbar />
          <ScrollToTop />

          {/* HERO SECTION */}
          <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="order-2 md:order-1 flex flex-col space-y-5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider w-fit">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  Available for Hire
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Hi, I'm <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                  {/* GANTI TEXT BIASA DENGAN INI */}
                 <HackerText text={portfolioData.personal.name} />
               </span>
                </h1>
                
                <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                  {portfolioData.personal.role}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#showcase" onClick={() => setActiveTab('projects')} className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-cyan-400 hover:text-black transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
                    View Work <ArrowRight size={18} />
                  </a>
                  <button className="px-8 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition flex items-center gap-2">
                    <Download size={18} /> Download CV
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="order-1 md:order-2 relative h-[400px] md:h-[600px] w-full"
              >
                 <HeroScene />
              </motion.div>
            </div>
          </section>

          {/* ABOUT ME SECTION */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            id="about" 
            className="py-24 px-6 md:px-12 relative z-10"
          >
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400">About Me</h2>
                <p className="text-gray-400">Crafting seamless digital experiences from bold ideas</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">Hi, I am <span className="text-white">{portfolioData.personal.name}</span></h3>
                  <p className="text-gray-300 leading-relaxed">
                    {portfolioData.personal.description}
                  </p>
                  
                  <div className="glass p-4 rounded-xl border-l-4 border-cyan-500 italic text-gray-400 bg-cyan-900/10">
                    “{portfolioData.personal.quote}”
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                     <button className="px-6 py-2.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-900/20">
                        <Download size={16} /> Download CV
                      </button>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-[0_0_50px_rgba(0,240,255,0.3)]">
                    <img 
                      src={portfolioData.personal.profileImage} 
                      alt={portfolioData.personal.name} 
                      className="w-full h-full object-cover rounded-full border-4 border-[#0a0a0a]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolioData.personal.stats.map((stat, idx) => (
                  <div key={idx} className="glass p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-cyan-500/10 group-hover:text-cyan-500/20 transition-all transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                      <stat.icon size={80} />
                    </div>
                    <h4 className="text-4xl font-bold text-white mb-1">{stat.value}</h4>
                    <p className="text-cyan-400 font-bold text-sm tracking-wider mb-2">{stat.label}</p>
                    <p className="text-gray-400 text-xs">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* SECTION ACTIVITY GRAPH */}
      <section className="py-8 px-6 md:px-12 relative z-10">
          <div className="container mx-auto max-w-6xl">
          <ActivityGraph />
        </div>
      </section>

          {/* --- PORTFOLIO SHOWCASE SECTION --- */}
          <section id="showcase" className="py-24 px-6 md:px-12 relative z-10">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Portfolio <span className="text-cyan-400">Showcase</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Discover my journey through projects, certifications, and technical expertise.
                </p>
              </div>

              {/* TAB NAVIGATION */}
              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center gap-3 bg-black/40 p-2 rounded-2xl md:rounded-full md:gap-4 md:p-1 glass w-full md:w-auto">
                  {[
                    { id: 'projects', label: 'Projects', icon: Layers },
                    { id: 'certificates', label: 'Certificates', icon: Award },
                    { id: 'tech', label: 'Tech Stack', icon: Code }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-xl md:rounded-full font-bold transition-all text-sm md:text-base whitespace-nowrap
                        ${activeTab === tab.id 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      <tab.icon size={18} /> {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TAB CONTENT AREA */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: PROJECTS */}
                  {activeTab === 'projects' && (
                    <motion.div 
                      key="projects" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
                      className="space-y-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedProjects.map((project, index) => (
                          <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                      </div>
                      
                      {portfolioData.projects.length > 3 && (
                        <div className="flex justify-center">
                          <button 
                            onClick={() => setShowAllProjects(!showAllProjects)}
                            className="glass px-8 py-3 rounded-full font-bold text-white flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group"
                          >
                            {showAllProjects ? (
                              <>See Less Projects <ChevronUp className="group-hover:-translate-y-1 transition-transform" /></>
                            ) : (
                              <>See More Projects <ChevronDown className="group-hover:translate-y-1 transition-transform" /></>
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 2: CERTIFICATES */}
                  {activeTab === 'certificates' && (
                    <motion.div 
                      key="certificates" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {portfolioData.certificates && portfolioData.certificates.map((cert) => (
                        <div key={cert.id} className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition group flex flex-col">
                          {/* Placeholder Image Sertifikat */}
                          <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Award size={48} className="text-gray-600 group-hover:text-cyan-400 transition-colors transform group-hover:scale-110 duration-500" />
                          </div>
                          <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">{cert.title}</h3>
                            <p className="text-cyan-500 text-sm font-bold mb-3">{cert.issuer}</p>
                            <p className="text-gray-400 text-sm mb-4 flex-grow">{cert.desc}</p>
                            <div className="pt-4 border-t border-white/5 text-xs text-gray-500 font-mono">
                               Issued: {cert.year}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* TAB 3: TECH STACK (ICONS FROM CDN) */}
                  {activeTab === 'tech' && (
                    <motion.div 
                      key="tech" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
                      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                    >
                      {allSkills.map((skill, idx) => {
                        const iconUrl = techIcons[skill.name];

                        return (
                          <div key={idx} className="glass p-5 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all flex flex-col items-center justify-center gap-3 group text-center hover:-translate-y-1 duration-300">
                            <div className="p-4 rounded-lg bg-[#1a1a1a] shadow-lg group-hover:bg-[#252525] transition-all duration-300">
                              {iconUrl ? (
                                <img src={iconUrl} alt={skill.name} className="w-8 h-8 object-contain" />
                              ) : (
                                <skill.icon size={32} className="text-gray-400 group-hover:text-cyan-400" />
                              )}
                            </div>
                            <span className="font-bold text-sm text-gray-200 group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 group-hover:text-white/60">{skill.category}</span>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            id="contact" 
            className="py-24 px-6 md:px-12 relative z-10"
          >
             <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-400">Contact Me</h2>
                  <p className="text-gray-400">Got a question? Send me a message and I'll reply as soon as possible.</p>
                </div>

                <div className="glass p-8 md:p-10 rounded-[2rem] border border-[#ffffff1a] bg-[#0a0a0a]/50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
                    {/* FORM */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-cyan-400">Contact</h3>
                      </div>
                      <p className="text-gray-400 mb-8">Something you'd like to discuss? Send me a message.</p>

                      <form onSubmit={handleFormSubmit} className="space-y-5 mb-10">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                          <input 
                            type="text" placeholder="Nama Anda" required 
                            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[#111111] border border-[#ffffff1a] rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-cyan-500 outline-none transition"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                          <input 
                            type="email" placeholder="Email Anda" required
                            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-[#111111] border border-[#ffffff1a] rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-cyan-500 outline-none transition"
                          />
                        </div>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-6 text-gray-500" size={20} />
                          <textarea 
                            rows="4" placeholder="Pesan Anda" required
                            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full bg-[#111111] border border-[#ffffff1a] rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-cyan-500 outline-none transition resize-none"
                          ></textarea>
                        </div>
                        <button 
                          disabled={formStatus === 'submitting'}
                          className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-70 shadow-lg shadow-cyan-900/30"
                        >
                          {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Sent!' : <>Send message <Send size={18} /></>}
                        </button>
                      </form>

                      <div>
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <span className="w-6 h-[2px] bg-cyan-500 inline-block"></span> Connect With Me
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {portfolioData.socialLinks.map((link, idx) => (
                            <Link href={link.url} key={idx} className={`glass p-4 rounded-xl border border-[#ffffff1a] flex items-center gap-4 hover:bg-[#111111] transition group ${link.main ? 'sm:col-span-2 bg-[#111111]/50' : ''}`}>
                               <div className={`p-3 rounded-lg ${link.main ? 'bg-indigo-600 text-white' : 'bg-[#ffffff1a] text-cyan-400 group-hover:text-white'}`}>
                                 <link.icon size={24} />
                               </div>
                               <div>
                                 <h5 className="font-bold text-white">{link.name}</h5>
                                 <p className="text-xs text-gray-400">{link.sub}</p>
                               </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* COMMENTS */}
                    <div className="glass rounded-[2rem] border border-[#ffffff1a] bg-[#0f0f0f]/50 p-6 md:p-8 flex flex-col h-full">
                       <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                         <MessageSquare size={20} className="text-cyan-500" /> Comments ({comments.length})
                       </h3>
                       
                       <div className="space-y-4 mb-8">
                          <input 
                            type="text" 
                            placeholder="Enter your name" 
                            value={newComment.name}
                            onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                            className="w-full bg-[#111111] border border-[#ffffff1a] rounded-xl p-4 text-white placeholder:text-gray-500 text-sm focus:border-cyan-500 outline-none" 
                          />
                          <textarea 
                            rows="3" 
                            placeholder="Write your comment here..." 
                            value={newComment.text}
                            onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                            className="w-full bg-[#111111] border border-[#ffffff1a] rounded-xl p-4 text-white placeholder:text-gray-500 text-sm focus:border-cyan-500 outline-none resize-none"
                          ></textarea>
                          
                          <button 
                            onClick={handlePostComment}
                            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition text-sm flex justify-center items-center gap-2"
                          >
                             Post Comment <Send size={16} />
                          </button>
                       </div>

                       <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                          {comments.length === 0 && (
                             <div className="text-center text-gray-500 py-10 flex flex-col items-center">
                                <MessageSquare size={40} className="mb-2 opacity-20" />
                                <p>No comments yet. Be the first!</p>
                             </div>
                          )}

                          {comments.map((comment) => (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               key={comment.id} 
                               className="glass p-4 rounded-xl border border-[#ffffff1a] hover:border-cyan-500/20 transition relative group"
                             >
                               <button 
                                 onClick={() => handleDeleteComment(comment.id)}
                                 className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                 title="Delete Comment"
                               >
                                 <Trash2 size={14} />
                               </button>

                               <div className="flex gap-3 mb-2">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-white shadow-md">
                                   {comment.avatar}
                                 </div>
                                 <div>
                                   <h5 className="font-bold text-white text-sm">{comment.name}</h5>
                                   <p className="text-xs text-gray-500">{comment.date}</p>
                                 </div>
                               </div>
                               <p className="text-sm text-gray-300 pl-13 leading-relaxed">{comment.text}</p>
                            </motion.div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </motion.section>                

          <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
            © {new Date().getFullYear()} {portfolioData.personal.name}. Built with Next.js & R3F.
          </footer>
        </main>
      )}
    </>
  );
}