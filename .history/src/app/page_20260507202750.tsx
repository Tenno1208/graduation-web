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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate key="gate" onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />

          {/* ↓ audioRef dikirim ke HeroSection biar bisa pause/resume saat video */}
          <HeroSection
            index={index}
            quote={graduationQuotes[index % graduationQuotes.length]}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
          />

          <SquadSection students={students} teacher={waliKelas} />
          <FutureLetter />
          <ClosingSection />
          {/* Ganti bagian tombol lama dengan ini */}
          {/* Secret Vault Trigger */}
<div className="relative bg-black py-20 flex justify-center overflow-hidden">
  
  {/* glow */}
  <div className="absolute w-60 h-60 bg-yellow-500/10 blur-[100px] rounded-full" />

  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => setIsVaultOpen(true)}
    className="group relative z-10"
  >
    {/* outer ring */}
    <div className="absolute inset-0 rounded-full border border-yellow-500/20 animate-pulse" />

    <div className="relative px-10 py-6 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden">
      
      {/* shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full" />

      <div className="relative flex flex-col items-center gap-3">
        {/* dot */}
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-yellow-500 blur-md opacity-60 animate-pulse" />

          <div className="relative w-3 h-3 rounded-full bg-yellow-400" />
        </div>

        <div className="text-center">
          <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-500 group-hover:text-yellow-500 transition-colors duration-500 font-black">
            Secret Archive
          </p>

          <p className="mt-2 text-[10px] italic text-zinc-700 group-hover:text-zinc-500 transition-colors">
            Jangan dibuka kalau mental lemah.
          </p>
        </div>
      </div>
    </div>
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