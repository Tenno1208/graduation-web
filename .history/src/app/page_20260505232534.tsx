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

  // Auto-slide Hero Images
  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % 13); 
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  // Fungsi Masuk & Mulai Musik (Fade-in)
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
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate key="gate" onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          {/* Tombol Musik Melayang */}
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={toggleMusic}
              className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-yellow-500 transition-all duration-500 group shadow-2xl"
            >
              {isPlaying ? <Volume2 className="text-yellow-500" /> : <VolumeX className="text-white" />}
            </button>
          </div>

          {/* --- SECTION 1: HERO (OPTIMAL FOR MOBILE & LAPTOP) --- */}
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
                {/* 1. Background Blur Layer: Mengisi ruang hitam di HP dengan warna foto */}
                <Image 
                  src={`/images/foto${index + 1}.jpg`} 
                  alt="Blur BG" 
                  fill 
                  className="object-cover blur-3xl opacity-40 scale-110"
                />

                {/* 2. Main Photo Layer */}
                <div className="relative w-full h-full flex items-center justify-center p-4 md:p-0">
                  <Image 
                    src={`/images/foto${index + 1}.jpg`} 
                    alt="Memory" 
                    fill 
                    className="object-contain md:object-cover" 
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Gradient agar teks tetap tajam */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            
            <div className="relative z-10 text-center px-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Sparkles className="mx-auto text-yellow-500 mb-4" size={30} />
                <h1 className="text-6xl md:text-[10rem] font-serif italic leading-none opacity-90 drop-shadow-2xl">Memories</h1>
                <p className="mt-4 tracking-[0.6em] md:tracking-[0.8em] text-yellow-500 uppercase text-[10px] md:text-sm font-bold">XII TKJ 2 — Class of 2026</p>
              </motion.div>
            </div>
            
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10">
              <ChevronDown className="text-white/20" />
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
                  <h2 className="text-5xl md:text-7xl font-serif italic">The Squad</h2>
                </div>
                <p className="text-zinc-500 italic max-w-xs">{students.length} Nyawa, Satu Cerita.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {students.map((student, i) => (
                  <motion.div 
                    key={student.id} 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex md:flex-col items-center md:items-start gap-4 p-4 bg-white/5 rounded-2xl md:bg-transparent border border-white/5 md:border-none shadow-lg"
                  >
                    <div className="relative w-20 h-20 md:w-full md:aspect-[4/5] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-900 border border-white/10">
                      <Image 
                        src={student.photo} 
                        alt={student.name} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                      />
                    </div>

                    <div className="flex flex-col justify-center overflow-hidden">
                      <h3 className="text-base md:text-lg font-medium text-white truncate">{student.name}</h3>
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

          {/* --- SECTION 3: QUOTE --- */}
          <section className="py-32 px-6 flex justify-center text-center bg-black">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-2xl">
              <Quote className="text-yellow-500 mx-auto mb-6 opacity-30" size={32} />
              <p className="text-xl md:text-3xl font-serif italic text-zinc-300 leading-relaxed px-4">
                "Setiap pertemuan pasti ada perpisahan, namun kenangan XII TKJ 2 akan tetap tinggal dalam ingatan."
              </p>
            </motion.div>
          </section>

          {/* --- SECTION 4: FOOTER --- */}
          <footer className="h-screen flex flex-col items-center justify-center text-center p-6 bg-black relative border-t border-white/5">
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