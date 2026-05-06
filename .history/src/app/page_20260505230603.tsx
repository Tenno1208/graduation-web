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
        setIndex((prev) => (prev + 1) % 3); // Ganti 3 sesuai jumlah foto landscape-mu
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

  return (
    <main className="bg-black text-white selection:bg-yellow-500 selection:text-black scroll-smooth">
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate key="gate" onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          {/* Audio Toggle Button */}
          <button onClick={() => {
            if (audioRef.current?.paused) audioRef.current.play();
            else audioRef.current?.pause();
            setIsPlaying(!isPlaying);
          }} className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl transition-all active:scale-90">
            {isPlaying ? <Volume2 size={20} className="text-yellow-500" /> : <VolumeX size={20} />}
          </button>

          {/* --- SECTION 1: HERO (CINEMATIC SLIDESHOW) --- */}
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
                {/* Background Blur untuk mengisi layar */}
                <Image 
                  src={`/images/foto${index + 1}.jpg`} 
                  alt="Blur BG" 
                  fill 
                  className="object-cover blur-2xl opacity-20"
                />
                {/* Foto Utama - Tetap Landscape & Utuh */}
                <div className="relative w-full h-full p-4 md:p-20">
                  <Image 
                    src={`/images/foto${index + 1}.jpg`} 
                    alt="Memory" 
                    fill 
                    className="object-contain" 
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
            
            <div className="relative z-10 text-center px-4">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                className="text-6xl md:text-[10rem] font-serif italic opacity-90 leading-none"
              >
                Memories
              </motion.h1>
              <p className="mt-4 tracking-[0.5em] text-yellow-500 text-[10px] md:text-sm uppercase font-bold">XII TKJ 2 — Class of 2026</p>
            </div>
            
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10">
              <ChevronDown className="text-white/20" />
            </motion.div>
          </section>

          {/* --- SECTION 2: THE SQUAD (RESPONSIVE LIST) --- */}
          <section className="py-24 px-4 md:px-20 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-serif italic mb-16 text-center md:text-left">The Squad</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {students.map((student, i) => (
                  <motion.div 
                    key={student.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex md:flex-col items-center md:items-start gap-4 p-4 bg-white/5 rounded-2xl md:bg-transparent border border-white/5 md:border-none"
                  >
                    {/* Foto Siswa */}
                    <div className="relative w-20 h-20 md:w-full md:aspect-[4/5] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-900 shadow-xl">
                      <Image 
                        src={student.photo} 
                        alt={student.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      />
                    </div>

                    {/* Informasi Siswa */}
                    <div className="flex flex-col justify-center overflow-hidden text-left">
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
              <p className="text-xl md:text-3xl font-serif italic text-zinc-300 leading-relaxed">
                "Setiap pertemuan pasti ada perpisahan, namun kenangan XII TKJ 2 akan tetap tinggal dalam ingatan."
              </p>
            </motion.div>
          </section>

          {/* --- SECTION 4: FOOTER --- */}
          <footer className="h-screen flex flex-col items-center justify-center text-center p-6 bg-black relative border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
              <h2 className="text-6xl md:text-[10rem] font-serif italic mb-8">Success!</h2>
              <p className="text-yellow-500 tracking-[0.6em] text-[10px] md:text-xs uppercase font-bold">See you on the top, Family.</p>
            </motion.div>
          </footer>

        </motion.div>
      )}
    </main>
  );
}