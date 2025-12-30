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
    { name: "Discord Server", sub: "Join Community", icon: DiscordIcon, url: "azzamcdx.com", main: true },
    { name: "Instagram", sub: "@azzam.codex", icon: Instagram, url: "https://www.instagram.com/azzamcodex/" },
    { name: "GitHub", sub: "@azzamcodex", icon: Github, url: "https://github.com/AzzamCyber" },
    { name: "Youtube", sub: "Azzam Codex", icon: Youtube, url: "-" },
  ],

  skills: [
    { category: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "TailwindCSS", "Framer Motion"], icon: Layout },
    { category: "Backend", items: ["Node.js", "Express", "PHP", "Python" , "Laravel"], icon: Server },
    { category: "Database", items: ["MySQL", "PostgreSQL", "MongoDB"], icon: Database },
    { category: "Game Dev", items: ["Lua (FiveM)", "Electron.js", "C#"], icon: Cpu },
    { category: "Tools", items: ["Git", "Docker", "Figma", "VS Code"], icon: Terminal },
  ],

  certificates: [
    {
      id: 1,
      title: "Software Engineer Intern Certificate",
      issuer: "HackerRank",
      year: "2024",
      desc: "It covers topics like Problem solving and SQL.",
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
    },
    {
      id: 4,
      title: "SQL (Advanced) Certificate",
      issuer: "HackerRank",
      year: "2024",
      desc: "It covers topics like query optimization, data modeling, Indexing, window functions, and pivots in SQL.",
    },
    {
      id: 5,
      title: "SQL Intermediate",
      issuer: "HackerRank",
      year: "2024",
      desc: "It includes complex joins, unions, and sub-queries.",
    },
    {
      id: 6,
      title: "Problem Solving",
      issuer: "HackerRank",
      year: "2024",
      desc: "It covers basic topics of Data Structures (such as Arrays, Strings) and Algorithms (such as Sorting and Searching).",
    },
  ],

  projects: [
    {
      id: "natafilm",
      title: "Website NataFilm",
      tech: ["PHP", "JS","Mysql"],
      desc: "Website Nonton Film Gratis Inspirasi UI/UX By Netflix.",
      image: "https://emshopeindo.codexhosting.my.id/assets/natafilm.png"
    },
    {
      id: "nataai",
      title: "Website Nata-Ai",
      tech: ["ReactJS", "ThreeJS","Mysql","NextJS","TailwindCss"],
      desc: "Website Ai Free No Limit Up To 15 Models AI.",
      image: "/project/nata-ai.png"
    },
    {
      id: "sentracomp",
      title: "Website Sentra Computer",
      tech: ["PHP", "Mysql", "Tailwind"],
      desc: "Marketplace Laptop Simple With PHP.",
      image: "https://emshopeindo.codexhosting.my.id/assets/sentra.png"
    },
    {
      id: "natatols",
      title: "Website Natatools Online",
      tech: ["PHP", "NodeJs","Python","Git"],
      desc: "Sebuah Tools Online Up To 50+ Tools Developer.",
      image: "https://emshopeindo.codexhosting.my.id/assets/natatols.png"
    },
    {
      id: "Nataspeedtest",
      title: "Website SpeedTest",
      tech: ["Next.js", "Git"],
      desc: "Website Untuk SpeedTest Internet Secara Realtime Inpirasi By Speedtest By Ookla.",
      image: "https://emshopeindo.codexhosting.my.id/assets/nataspeed.png"
    },
    {
      id: "NataCafe",
      title: "NataCafe",
      tech: ["PHP", "Mysql","Tailwind"],
      desc: "Kasir System Untuk Mencatat , Mencetak Pembelian.",
      image: "https://emshopeindo.codexhosting.my.id/assets/natacafe.png"
    },
  ]
};