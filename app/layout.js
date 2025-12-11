import { Inter, Space_Grotesk } from "next/font/google"; // <--- JANGAN LUPA BARIS INI
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}