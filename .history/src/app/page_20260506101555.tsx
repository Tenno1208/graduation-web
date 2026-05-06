"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { students } from "@/data/students"; 
import LandingGate from "@/components/LandingGate";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import SquadSection from "@/components/SquadSection";
import { Quote } from "lucide-react";

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
  "Kita akan bertemu lagi di puncak kesuksesan masing-masing."
];

export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % graduationQuotes.length); 
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
      if (isPlaying) { audioRef.current.pause(); } 
      else { audioRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="bg-black text-white scroll-smooth">
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />
          
          <HeroSection index={index} quote={graduationQuotes[index]} />

          <SquadSection students={students} />

          {/* Section Penutup Kecil */}
          <section className="py-40 px-6 bg-black relative text-center">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-3xl mx-auto">
              <Quote className="text-yellow-500/30 mx-auto mb-10" size={48} />
              <p className="text-2xl md:text-5xl font-serif italic text-zinc-200 leading-[1.4] mb-12">
                "Bukan tentang seberapa sering kita bertemu, tapi tentang seberapa dalam kita <span className="text-yellow-500">saling mengenang</span>."
              </p>
            </motion.div>
          </section>

          <footer className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-black relative overflow-hidden">
             <h2 className="text-7xl md:text-[14rem] font-serif italic mb-12 leading-none text-white">See You <br /> <span className="text-yellow-500">On Top!</span></h2>
             <p className="text-zinc-500 text-[10px] tracking-[1em] uppercase font-black opacity-50">Class of 2026</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}