"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX, Heart, Stars, GraduationCap } from "lucide-react";
import { students } from "@/data/students";

export default function GraduationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fungsi Play/Pause Musik
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
    <main className="bg-black text-white selection:bg-yellow-500">
      {/* Ganti /audio/memories.mp3 dengan lagu pilihan terbaikmu */}
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      {/* Music Controller (Floating) */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:scale-110 transition-all shadow-2xl group"
      >
        {isPlaying ? (
          <Volume2 className="text-yellow-500" size={24} />
        ) : (
          <VolumeX className="text-zinc-400 group-hover:text-white" size={24} />
        )}
      </button>

      {/* --- BAGIAN 1: HERO (PEMBUKA) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <Image src="/images/foto1.jpg" alt="Hero" fill className="object-cover" priority />
        </div>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <Stars className="mx-auto mb-6 text-yellow-500 animate-pulse" size={40} />
          <h1 className="text-7xl md:text-9xl font-serif italic mb-4">Glorious.</h1>
          <p className="tracking-[0.5em] text-sm uppercase text-yellow-500 font-light">Class of 2026 — Memories</p>
        </motion.div>
      </section>

      {/* --- BAGIAN 2: GALLERY (TEMAN-TEMAN) --- */}
      <section className="min-h-screen py-32 px-6 md:px-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16 border-b border-white/10 pb-6">
            <Heart className="text-red-500" />
            <h2 className="text-4xl font-serif italic">Our Stories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {students.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900 relative border border-white/5">
                  <Image 
                    src={student.photo} 
                    alt={student.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium group-hover:text-yellow-500 transition-colors">{student.name}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">{student.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BAGIAN 3: CLOSING (PENUTUP) --- */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center z-10 px-6"
        >
          <GraduationCap className="mx-auto mb-8 text-yellow-500" size={60} />
          <h2 className="text-5xl md:text-7xl font-serif italic mb-8">
            See You On <span className="text-yellow-500 text-6xl md:text-8xl">Top!</span>
          </h2>
          <div className="space-y-4 text-zinc-400 font-light tracking-[0.2em] text-xs md:text-sm uppercase">
            <p>Terima kasih untuk setiap tawa dan perjuangan</p>
            <p>Ini bukan akhir, tapi awal yang baru</p>
            <p className="pt-12 text-yellow-600/40 italic">#SMK2026 #GraduationDay</p>
          </div>
        </motion.div>

        {/* Garis Dekoratif Bawah */}
        <div className="absolute bottom-0 w-px h-24 bg-gradient-to-t from-yellow-500 to-transparent" />
      </section>

      {/* Footer Sederhana */}
      <footer className="py-10 text-center text-[10px] text-zinc-600 tracking-widest uppercase bg-black">
        Created with heart for Class of 2026
      </footer>
    </main>
  );
}