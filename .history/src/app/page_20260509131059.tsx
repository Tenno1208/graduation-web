"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { students, waliKelas } from "@/data/students";
import LandingGate from "@/components/LandingGate";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import SquadSection from "@/components/SquadSection";
import ClosingSection from "@/components/ClosingSection";
import SecretVault from "@/components/SecretVault";
import FutureLetter from "@/components/FutureLetter";
import Footer from "@/components/Footer";

const graduationQuotes = [
  "Masa depan milik mereka yang percaya pada keindahan mimpi.",
  "Perpisahan bukan akhir, tapi awal dari petualangan baru.",
  "Tiga tahun penuh cerita, selamanya dalam ingatan.",
  "Terima kasih telah menjadi bagian dari perjalanan hebat ini.",
  "Sukses bukan tentang kunci, tapi tentang keberanian untuk melangkah.",
  "Jarak mungkin memisahkan, tapi kenangan tetap menyatukan.",
  "Gapailah cita-citamu setinggi langit, namun tetaplah membumi.",
  "XII TKJ 2: Datang sebagai asing, berpisah sebagai keluarga.",
  "Ilmu adalah harta yang akan selalu mengikuti pemiliknya.",
  "Setiap detik di kelas ini adalah investasi untuk masa depan.",
  "Jangan takut melangkah, dunia sedang menunggumu.",
  "Teruslah bersinar kemanapun takdir membawamu.",
  "Kita akan bertemu lagi di puncak kesuksesan masing-masing.",
];

export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  
  // --- TAMBAHKAN STATE INI ---
  const [currentTrack, setCurrentTrack] = useState(0); 
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Efek untuk mengganti lagu secara otomatis saat currentTrack berubah
  useEffect(() => {
    if (hasStarted && audioRef.current) {
      audioRef.current.load(); // Memuat ulang sumber audio baru
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.log("Audio play blocked"));
      }
    }
  }, [currentTrack, hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % 20);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      setIsPlaying(true);
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="bg-black text-white scroll-smooth selection:bg-yellow-500 selection:text-black">
      {/* UPDATE SRC AUDIO DISINI */}
      <audio 
        ref={audioRef} 
        src={currentTrack === 0 ? "/audio/memories.mp3" : "/audio/kemesraan.mp3"} 
        loop 
      />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate key="gate" onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <MusicPlayer 
            isPlaying={isPlaying} 
            toggleMusic={toggleMusic} 
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />

          <HeroSection
            index={index}
            quote={graduationQuotes[index % graduationQuotes.length]}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
          />

          <SquadSection students={students} teacher={waliKelas} />
          <FutureLetter />
          <ClosingSection />

          <div className="relative bg-black py-20 flex justify-center">
            <motion.button
              initial={{ opacity: 0.4 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={() => setIsVaultOpen(true)}
              className="group relative flex flex-col items-center gap-3 transition-all duration-500"
            >
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/5 transition-all duration-500">
                <svg 
                  width="18" height="18" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" 
                  className="text-zinc-500 group-hover:text-yellow-500 transition-colors"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-zinc-800 group-hover:bg-yellow-500/30 transition-all" />
                <span className="text-[9px] tracking-[0.4em] uppercase font-black text-zinc-500 group-hover:text-yellow-500 transition-colors">
                  Arsip Rahasia
                </span>
                <div className="w-8 h-px bg-zinc-800 group-hover:bg-yellow-500/30 transition-all" />
              </div>

              <p className="text-[8px] italic text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-wider">
                Khusus warga XII TKJ 2
              </p>
            </motion.button>
          </div>
          
          <Footer />
          <SecretVault 
            isOpen={isVaultOpen} 
            onClose={() => setIsVaultOpen(false)} 
          />
        </motion.div>
      )}
    </main>
  );
}