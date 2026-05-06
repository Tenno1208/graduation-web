"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { students } from "@/data/students"; // Import data custom tadi
import { Volume2, VolumeX } from "lucide-react"; 

export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-slide Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3); // Ganti 3 dengan jumlah foto hero-mu
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Toggle Musik
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
    <main className="bg-black text-white selection:bg-yellow-500 selection:text-black">
      {/* Audio Element */}
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      {/* Floating Music Toggle */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-yellow-500 transition-all duration-300 group"
      >
        {isPlaying ? (
          <Volume2 className="text-white group-hover:text-black" size={24} />
        ) : (
          <VolumeX className="text-white group-hover:text-black" size={24} />
        )}
      </button>

      {/* SECTION 1: HERO */}
      <section className="relative h-screen flex items- center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="relative w-full h-full"
            >
              <Image
                src={`/images/foto${index + 1}.jpg`}
                alt="Background"
                fill
                className="object-cover opacity-40 scale-110"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[10rem] font-serif italic text-white/90 leading-none"
          >
            Memories
          </motion.h1>
          <p className="mt-4 tracking-[0.8em] text-yellow-500 uppercase text-xs md:text-sm">SMK Class XII  of 2026</p>
        </div>
      </section>

      {/* SECTION: THE SQUAD (CUSTOMIZABLE) */}
      <section className="py-24 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif italic">The Squad</h2>
            <p className="text-zinc-500 mt-2">Keluarga besar yang pernah berjuang bersama.</p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-serif text-zinc-800">{students.length} Souls</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {students.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 rounded-sm">
                <Image
                  src={student.photo}
                  alt={student.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 border-[0.5px] border-white/10 group-hover:border-yellow-500/50 transition-colors" />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium tracking-wide group-hover:text-yellow-500 transition-colors">
                  {student.name}
                </h3>
                <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{student.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="h-screen flex flex-col items-center justify-center bg-zinc-950 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-yellow-500 tracking-[0.5em] mb-4 text-xs">EST. 2023 — 2026</p>
          <h2 className="text-5xl font-serif italic mb-8">See You On Top!</h2>
          <div className="w-12 h-[1px] bg-white/20 mx-auto" />
        </motion.div>
      </footer>
    </main>
  );
}