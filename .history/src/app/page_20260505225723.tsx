"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { students } from "@/data/students"; 
import { Volume2, VolumeX, Quote, Heart, MapPin, Sparkles } from "lucide-react"; 

export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-slide Hero Images
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3); 
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Smooth Audio Logic (Fade-in)
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0; // Mulai dari nol
        audioRef.current.play();
        setIsPlaying(true);
        
        // Interval untuk menaikkan volume perlahan
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            if (audioRef.current) audioRef.current.volume = Math.min(vol, 1);
          } else {
            clearInterval(fadeIn);
          }
        }, 100); // Naik setiap 100ms
      }
    }
  };

  return (
    <main className="bg-black text-white selection:bg-yellow-500 selection:text-black scroll-smooth">
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      {/* Floating Controller */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
        <p className={`text-[10px] tracking-[0.2em] transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>PLAY MUSIC</p>
        <button 
          onClick={toggleMusic}
          className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-yellow-500 transition-all duration-500 group shadow-2xl"
        >
          {isPlaying ? <Volume2 className="text-white group-hover:text-black" /> : <VolumeX className="text-white group-hover:text-black" />}
        </button>
      </div>

      {/* 1. HERO SECTION */}
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
              <Image src={`/images/foto${index + 1}.jpg`} alt="BG" fill className="object-cover opacity-40" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative z-10 text-center space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Sparkles className="mx-auto text-yellow-500 mb-4" size={30} />
            <h1 className="text-7xl md:text-[10rem] font-serif italic leading-none">Memories</h1>
            <p className="tracking-[0.8em] text-yellow-500 uppercase text-xs">SMK Class XII TKJ 2 of 2026</p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE BIG QUOTE (VARIASI BARU) */}
      <section className="py-32 px-6 bg-zinc-950 flex justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <Quote className="text-yellow-500 mx-auto mb-8 opacity-50" size={40} />
          <h2 className="text-2xl md:text-4xl font-light italic leading-relaxed text-zinc-300">
            "Kita datang sebagai orang asing, belajar sebagai teman, dan berpisah sebagai keluarga. Tiga tahun bukan waktu yang singkat untuk sekadar dilupakan."
          </h2>
          <div className="mt-8 h-px w-20 bg-yellow-500 mx-auto opacity-50" />
        </motion.div>
      </section>

      {/* 3. THE SQUAD SECTION */}
      <section className="py-24 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              <Heart size={16} />
              <span className="text-xs tracking-[0.3em] uppercase">Brotherhood</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic">The Squad</h2>
          </div>
          <p className="text-zinc-500 italic max-w-xs text-right">Mereka yang menemani di setiap suka, duka, dan tugas yang menumpuk.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {students.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 rounded-lg">
                <Image src={student.photo} alt={student.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
              </div>
              <div className="mt-4 space-y-1">
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

      {/* 4. MESSAGE WALL (VARIASI BARU) */}
      <section className="py-32 px-6 bg-white text-black text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h3 className="text-xs tracking-[0.5em] uppercase mb-8">Pesan Terakhir</h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left">
            <div className="p-8 border border-zinc-200">
              <p className="italic">"Terima kasih buat guru-guru yang sudah sabar membimbing kami yang sering telat masuk kelas ini."</p>
              <p className="mt-4 font-bold">— XII TKJ 2</p>
            </div>
            <div className="p-8 border border-zinc-200">
              <p className="italic">"Sukses terus buat kalian semua. Sampai jumpa di tangga kesuksesan masing-masing!"</p>
              <p className="mt-4 font-bold">— Ketua Kelas</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 5. FOOTER / CLOSING */}
      <footer className="h-screen flex flex-col items-center justify-center bg-black border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="text-center z-10">
          <p className="text-yellow-500 tracking-[0.5em] mb-4 text-xs font-bold">EST. 2023 — 2026</p>
          <h2 className="text-6xl md:text-9xl font-serif italic mb-8">See You On Top!</h2>
          <p className="text-zinc-500 tracking-widest uppercase text-[10px]">Tinggalkan kenangan, bawa pengalaman.</p>
        </motion.div>
      </footer>
    </main>
  );
}