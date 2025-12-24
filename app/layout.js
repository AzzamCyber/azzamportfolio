import { Inter, Space_Grotesk } from "next/font/google"; // <--- JANGAN LUPA BARIS INI
import "./globals.css";
import Cursor from "@/components/ui/Cursor"; // <--- 1. IMPORT INI
import SoundManager from "@/components/ui/SoundManager"; // <--- Import ini
import DiscordStatus from "@/components/ui/DiscordStatus"; // <--- Import
import ContextMenu from "@/components/ui/ContextMenu"; // <--- Import
import MatrixEasterEgg from "@/components/ui/MatrixEasterEgg"; // <--- Import ini
import CommandPalette from "@/components/ui/CommandPalette";
import { icons } from "lucide-react";

// Konfigurasi Font
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: '--font-space' 
});

export const metadata = {
  title: "Azzam Codex Dev | Fullstack Developer",
  description: "Portfolio profesional Azzam Codex Dev.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning di sini mencegah error dari ekstensi browser
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} ${spaceGrotesk.variable} antialiased bg-[#050505] text-white`}
        suppressHydrationWarning
      >
        <SoundManager /> {/* <--- Pasang di sini (di atas children) */}
        <ContextMenu /> {/* <--- Pasang di sini */}
        <Cursor /> {/* <--- 2. PASANG DI SINI */}
        <MatrixEasterEgg /> {/* <--- Pasang di sini */}
        <CommandPalette />
        {children}
        <DiscordStatus /> {/* <--- Pasang di paling bawah body */}
      </body>
    </html>
  );
}