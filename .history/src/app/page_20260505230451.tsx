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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          
          {/* Audio Toggle */}
          <button onClick={() => {
            if (audioRef.current?.paused) audioRef.current.play();
            else audioRef.current?.pause();
            setIsPlaying(!isPlaying);
          }} className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* --- SECTION 1: HERO (FIX LANDSCAPE) --- */}
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
                {/* Background Blur (Biar gak kosong di atas-bawah) */}
                <Image 
                  src={`/images/foto${index + 1}.jpg`} 
                  alt="Blur BG" 
                  fill 
                  className="object-cover blur-2xl opacity-20"
                />
                {/* Foto Utama (Object Contain agar kelihatan semua) */}
                <div className="relative w-full h-full p-4 md:p-12">
                  <Image 
                    src={`/images/foto${index + 1}.jpg`} 
                    alt="Memory" 
                    fill 
                    className="object-contain" // Ini kuncinya agar landscape terlihat utuh
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            
            <div className="relative z-10 text-center pt-20">
              <motion.h1 className="text-6xl md:text-[10rem] font-serif italic opacity-90">Memories</h1 >
              <p className="tracking-[0.5em] text-yellow-500 text-[10px] md:text-sm uppercase">XII TKJ 2 — 2026</p>
            </div>
          </section>

          {/* --- SECTION 2: THE SQUAD (OPTIMASI MOBILE) --- */}
          <section className="py-20 px-4 md:px-20 bg-zinc-950">
            <h2 className="text-4xl md:text-6xl font-serif italic mb-12 px-2 text-center md:text-left">The Squad</h2>
            
            {/* Grid: di Mobile 1 baris isi foto + info, di Desktop 4 kolom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
              {students.map((student, i) => (
                <motion.div 
                  key={student.id} 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex md:flex-col items-center md:items-start gap-4 p-3 bg-white/5 rounded-2xl md:bg-transparent"
                >
                  {/* Container Foto */}
                  <div className="relative w-20 h-20 md:w-full md:aspect-[4/5] flex-shrink-0 overflow-hidden rounded-xl border border-white/10">
                    <Image 
                      src={student.photo} 
                      alt={student.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0" 
                    />
                  </div>

                  {/* Info Teman (Di samping foto kalau di mobile) */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-base md:text-lg font-medium text-white line-clamp-1">{student.name}</h3>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <MapPin size={10} className="text-yellow-500" />
                      <p className="text-[10px] uppercase tracking-widest font-light">{student.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* --- SECTION 3: FOOTER --- */}
          <footer className="h-screen flex flex-col items-center justify-center text-center p-6 border-t border-white/5">
            <Sparkles className="text-yellow-500 mb-6" />
            <h2 className="text-5xl md:text-8xl font-serif italic mb-6">Success Awaits!</h2>
            <p className="text-zinc-500 tracking-[0.3em] text-[10px] uppercase">Terima kasih XII TKJ 2</p>
          </footer>

        </motion.div>
      )}
    </main>
  );
}