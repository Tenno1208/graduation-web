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
          <ClosingSection />
          {/* Ganti bagian tombol lama dengan ini */}
          <div className="bg-black py-10 flex justify-center">
            <button 
              onClick={() => setIsVaultOpen(true)}
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-[7px] tracking-[0.5em] text-zinc-800 group-hover:text-yellow-500/40 uppercase transition-all">
                ✦ Area Terlarang
              </span>
              <div className="w-1 h-1 rounded-full bg-zinc-900 group-hover:bg-yellow-500/20 transition-all" />
            </button>
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