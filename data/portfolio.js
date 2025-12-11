// data/portfolio.js
import { 
  Code, Server, Database, PenTool, Cpu, Layout, Globe, Award, 
  BadgeCheck, Terminal, Instagram, Youtube, Github, Linkedin, MessageCircle, MapPin
} from 'lucide-react';

// Icon Custom
const TiktokIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M7.5 7.5c3.5-1 5.5-1 9 0"/><path d="M7 16.5c3.5 1 6.5 1 10 0"/><path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.333 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"/><path d="M8.5 17c0 1-1.5 3-2 3-1.5 0-2.833-1.333-3.5-3-.667-1.667-.5-5.833 1.5-11.5 1.457-1.015 3-1.34 4.5-1.5l1 2.5"/></svg>
);

export const portfolioData = {
  personal: {
    name: "Azzam Codex Dev",
    role: "Fullstack Developer & Creative Technologist",
    description: "Membangun pengalaman digital imersif dengan kode bersih, antarmuka modern, dan solusi teknis berkinerja tinggi. Spesialis dalam Web Development & Game Tools.",
    quote: "Code is poetry, built for functionality.",
    email: "contact@azzamcodex.dev",
    location: "Indonesia",
    // Ganti URL ini dengan foto profil asli Anda
    profileImage: "https://emshopeindo.codexhosting.my.id/assets/homepageprofile.jpg", 
    stats: [
      { value: "3+", label: "YEARS EXP", sub: "Professional Development", icon: Globe },
      { value: "15+", label: "PROJECTS", sub: "Delivered Successfully", icon: Code },
      { value: "4", label: "CERTIFICATES", sub: "Recognized Skills", icon: Award },
    ]
  },

  socialLinks: [
    { name: "Discord Server", sub: "Join Community", icon: DiscordIcon, url: "#", main: true },
    { name: "Instagram", sub: "@azzam.codex", icon: Instagram, url: "#" },
    { name: "GitHub", sub: "@azzamcodex", icon: Github, url: "#" },
    { name: "Youtube", sub: "Azzam Codex", icon: Youtube, url: "#" },
  ],

  skills: [
    { category: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "TailwindCSS", "Framer Motion"], icon: Layout },
    { category: "Backend", items: ["Node.js", "Express", "PHP", "Laravel"], icon: Server },
    { category: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"], icon: Database },
    { category: "Game Dev", items: ["Lua (FiveM)", "Electron.js", "C#"], icon: Cpu },
    { category: "Tools", items: ["Git", "Docker", "Figma", "VS Code"], icon: Terminal },
  ],

  certificates: [
    {
      id: 1,
      title: "Google UX Design Professional",
      issuer: "Google",
      year: "2023",
      desc: "Fondasi desain UX, wireframing, dan prototyping modern.",
    },
    {
      id: 2,
      title: "C# (Basic) Certificate",
      issuer: "HackerRank",
      year: "2024",
      desc: "This competency area includes understanding the structure of C# programs, types, and Variables, basic OOP, Properties and Indexers, Collections, Exception handling, among others.",
    },
    {
      id: 3,
      title: "Dicoding Frontend Expert",
      issuer: "Dicoding",
      year: "2022",
      desc: "Standar industri frontend development.",
    }
  ],

  projects: [
    {
      id: "nata-windows-pack",
      title: "Nata Windows Pack",
      tech: ["Electron", "Node.js"],
      desc: "Installer otomatis untuk optimasi Windows gaming.",
      image: "https://emshopeindo.codexhosting.my.id/assets/natawindows.png"
    },
    {
      id: "anticheat-gta-rp",
      title: "Sistem Anticheat GTA",
      tech: ["Lua", "FiveM ESX"],
      desc: "Proteksi server real-time dari injeksi program ilegal.",
      image: "https://placehold.co/800x450/050505/7000ff?text=Anticheat"
    },
    {
      id: "parkour-exs",
      title: "Sistem Parkour EXS",
      tech: ["Lua", "Game Logic"],
      desc: "Sistem event parkour dengan leaderboard otomatis.",
      image: "https://placehold.co/800x450/050505/00f0ff?text=Parkour+System"
    },
    {
      id: "billing-hosting",
      title: "Website Billing Hosting",
      tech: ["Next.js", "PostgreSQL"],
      desc: "Manajemen hosting dan invoice otomatis.",
      image: "https://placehold.co/800x450/050505/7000ff?text=Billing+App"
    },
    {
      id: "redeem-panel",
      title: "Redeem Code System",
      tech: ["PHP", "JS"],
      desc: "Panel manajemen kode hadiah eksklusif.",
      image: "https://placehold.co/800x450/050505/00f0ff?text=Redeem+Panel"
    },
  ]
};