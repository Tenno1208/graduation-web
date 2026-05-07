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
          {/* SECRET EASTER EGG */}
<div className="relative bg-black py-24 flex justify-center overflow-hidden">
  
  {/* hidden trigger */}
  <motion.button
    initial={{ opacity: 0.03 }}
    whileHover={{ opacity: 0.15 }}
    transition={{ duration: 0.4 }}
    onClick={() => setIsVaultOpen(true)}
    className="
      group relative
      text-zinc-800 hover:text-yellow-500/40
      transition-all duration-700
      select-none
    "
  >
    {/* tiny line */}
    <div className="flex items-center gap-3">
      <div className="w-6 h-px bg-zinc-900 group-hover:bg-yellow-500/20 transition-all duration-500" />

      <span className="text-[6px] tracking-[0.5em] uppercase font-black">
        archive
      </span>

      <div className="w-6 h-px bg-zinc-900 group-hover:bg-yellow-500/20 transition-all duration-500" />
    </div>

    {/* floating tooltip */}
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileHover={{ opacity: 1, y: 0 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap"
    >
      <p className="text-[8px] italic text-zinc-700">
        beberapa kenangan memang disembunyikan.
      </p>
    </motion.div>
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