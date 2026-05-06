"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { students } from "@/data/students"; 
import LandingGate from "@/components/LandingGate";
import { Volume2, VolumeX, Quote, Heart, MapPin, Sparkles, ChevronDown } from "lucide-react"; 

export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-slide untuk background Hero
  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % 3); // Asumsi ada foto1, foto2, foto3
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  // Fungsi saat tombol ENTER di LandingGate diklik
  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      setIsPlaying(true);
      
      // Efek Fade-in Audio agar tidak kaget
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.02;
          if (audioRef.current) audioRef.current.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 50); 
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="bg-black text-white selection:bg-yellow-500 selection:text-black scroll-smooth">
      {/* File lagu diletakkan di public/audio/memories.mp3 */}
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      {/* 1. GATEWAY / LANDING PAGE */}
      <AnimatePresence>
        {!hasStarted && <LandingGate onEnter={startExperience} />}
      </AnimatePresence>

      {/* 2. MAIN CONTENT (Hanya muncul jika sudah Klik Enter) */}
      {hasStarted && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }}
        >
          {/* Tombol Musik Melayang */}
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={toggleMusic}
              className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-yellow-500 transition-all duration-500 group shadow-2xl"
            >
              {isPlaying ? <Volume2 className="text-white group-hover:text-black" /> : <VolumeX className="text-white group-hover:text-black" />}
            </button>
          </div>

          {/* --- SECTION: HERO --- */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={`/images/foto${index + 1}.jpg`} 
                    alt="Background" 
                    fill 
                    className="object-cover opacity-40" 
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative z-10 text-center space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Sparkles className="mx-auto text-yellow-500 mb-4" size={30} />
                <h1 className="text-7xl md:text-[10rem] font-serif italic leading-none">Memories</h1>
                <p className="tracking-[0.8em] text-yellow-500 uppercase text-xs">SMK Class XII TKJ 2 of 2026</p>
              </motion.div>
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-10"
            >
              <ChevronDown className="text-white/20" />
            </motion.div>
          </section>

          {/* --- SECTION: QUOTE --- */}
          <section className="py-40 px-6 bg-zinc-950 flex justify-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <Quote className="text-yellow-500 mx-auto mb-8 opacity-50" size={40} />
              <h2 className="text-2xl md:text-4xl font-light italic leading-relaxed text-zinc-300">
                "Bukan tentang seberapa lama kita bersama, tapi tentang seberapa berarti setiap detik yang kita lalui di kelas XII TKJ 2."
              </h2>
              <div className="mt-8 h-px w-20 bg-yellow-500 mx-auto opacity-30" />
            </motion.div>
          </section>

          {/* --- SECTION: THE SQUAD --- */}
          <section className="py-24 px-6 md:px-20 bg-black">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
              <div>
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <Heart size={16} />
                  <span className="text-xs tracking-[0.3em] uppercase font-bold">Family</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif italic">The Squad</h2>
              </div>
              <p className="text-zinc-500 italic max-w-xs text-right">32 Nyawa, 32 Cerita, 1 Tujuan.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {students.map((student, i) => (
                <motion.div 
                  key={student.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 rounded-lg border border-white/5">
                    <Image 
                      src={student.photo} 
                      alt={student.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" 
                    />
                  </div>
                  <div className="mt-6 space-y-1">
                    <h3 className="text-lg font-medium group-hover:text-yellow-500 transition-colors">{student.name}</h3>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <MapPin size={12} className="text-yellow-500" />
                      <p className="text-[10px] uppercase tracking-widest">{student.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- SECTION: FOOTER --- */}
          <footer className="h-screen flex flex-col items-center justify-center bg-black relative border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1 }}
              className="text-center z-10"
            >
              <p className="text-yellow-500 tracking-[0.5em] mb-6 text-xs font-bold uppercase">End of Chapter</p>
              <h2 className="text-6xl md:text-[10rem] font-serif italic mb-12">See You On Top!</h2>
              <div className="space-y-2 opacity-40 text-[10px] tracking-widest uppercase">
                <p>Terima kasih untuk kenangan yang tak ternilai</p>
                <p>XII TKJ 2 — Class of 2026</p>
              </div>
            </motion.div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}