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

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % 3); 
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

  return (
    <main className="bg-black text-white selection:bg-yellow-500 selection:text-black scroll-smooth">
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate key="gate" onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          <button onClick={() => {
            if (audioRef.current?.paused) audioRef.current.play();
            else audioRef.current?.pause();
            setIsPlaying(!isPlaying);
          }} className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl transition-all active:scale-90">
            {isPlaying ? <Volume2 size={20} className="text-yellow-500" /> : <VolumeX size={20} />}
          </button>

          {/* --- SECTION 1: HERO (FIX BACKGROUND HITAM) --- */}
          <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* 1. Background Layer: Foto yang di-blur untuk mengisi ruang hitam */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={`/images/foto${index + 1}.jpg`} 
                    alt="Background Blur" 
                    fill 
                    className="object-cover blur-3xl scale-110 opacity-50"
                  />
                </div>

                {/* 2. Main Photo Layer: Foto asli yang terlihat utuh */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <div className="relative w-full h-full max-w-5xl">
                    <Image 
                      src={`/images/foto${index + 1}.jpg`} 
                      alt="Main Photo" 
                      fill 
                      className="object-contain" // Menjaga foto agar tidak terpotong
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Gradient agar teks tetap terbaca */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-transparent to-black/40" />
            
            <div className="relative z-30 text-center px-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Sparkles className="mx-auto text-yellow-500 mb-2 md:mb-4" size={24} />
                <h1 className="text-6xl md:text-[10rem] font-serif italic leading-none opacity-90 drop-shadow-2xl">Memories</h1>
                <p className="mt-4 tracking-[0.5em] text-yellow-500 text-[10px] md:text-sm uppercase font-bold">XII TKJ 2 — Class of 2026</p>
              </motion.div>
            </div>
            
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 z-30">
              <ChevronDown className="text-white/30" />
            </motion.div>
          </section>

          {/* --- SECTION 2: THE SQUAD (HORIZONTAL LIST ON MOBILE) --- */}
          <section className="py-24 px-4 md:px-20 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4 text-center md:text-left">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-500 mb-2">
                    <Heart size={16} />
                    <span className="text-xs tracking-[0.3em] uppercase font-bold text-yellow-500/80">Family</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif italic">The Squad</h2>
                </div>
                <p className="text-zinc-500 italic text-sm">{students.length} Nyawa, Satu Cerita.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {students.map((student, i) => (
                  <motion.div 
                    key={student.id} 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex md:flex-col items-center md:items-start gap-4 p-4 bg-white/5 rounded-2xl md:bg-transparent border border-white/5 md:border-none"
                  >
                    <div className="relative w-16 h-16 md:w-full md:aspect-[4/5] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-900 shadow-xl border border-white/10">
                      <Image 
                        src={student.photo} 
                        alt={student.name} 
                        fill 
                        className="object-cover grayscale" 
                      />
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden text-left">
                      <h3 className="text-sm md:text-lg font-medium text-white truncate">{student.name}</h3>
                      <div className="flex items-center gap-1.5 text-zinc-500 mt-1">
                        <MapPin size={10} className="text-yellow-500" />
                        <p className="text-[9px] uppercase tracking-widest font-light">{student.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FOOTER --- */}
          <footer className="h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-black relative border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
              <h2 className="text-6xl md:text-[10rem] font-serif italic mb-8 leading-none">See You!</h2>
              <p className="text-yellow-500 tracking-[0.6em] text-[10px] md:text-xs uppercase font-bold">XII TKJ 2 — Class of 2026</p>
            </motion.div>
          </footer>

        </motion.div>
      )}
    </main>
  );
}