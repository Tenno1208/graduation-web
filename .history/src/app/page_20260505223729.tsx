"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Volume2, VolumeX, Heart, Stars, GraduationCap } from "lucide-react";
import { students } from "@/data/students";

export default function GraduationPage() {
  const [currentSong, setCurrentSong] = useState("/audio/ceria.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Observer untuk ganti lagu tiap sesi
  const [ref1, inView1] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5 });

  // Logic Ganti Lagu Otomatis
  useEffect(() => {
    if (inView1) setCurrentSong("/audio/ceria.mp3");
    if (inView2) setCurrentSong("/audio/nostalgia.mp3");
    if (inView3) setCurrentSong("/audio/perpisahan.mp3");
  }, [inView1, inView2, inView3]);

  // Handle Play/Pause & Auto-swap src
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong, isPlaying]);

  return (
    <main className="bg-black text-white selection:bg-yellow-500">
      <audio ref={audioRef} loop />

      {/* Music Controller */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full hover:scale-110 transition-all shadow-2xl"
      >
        {isPlaying ? <Volume2 className="text-yellow-500" /> : <VolumeX />}
      </button>

      {/* --- SESI 1: OPENING (THE GOLDEN DAYS) --- */}
      <section ref={ref1} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <Image src="/images/foto1.jpg" alt="Hero" fill className="object-cover" />
        </div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center"
        >
          <Stars className="mx-auto mb-6 text-yellow-500 animate-pulse" size={40} />
          <h1 className="text-7xl md:text-9xl font-serif italic mb-4">Glorious.</h1>
          <p className="tracking-[0.5em] text-sm uppercase text-yellow-500">The Beginning of Everything</p>
        </motion.div>
      </section>

      {/* --- SESI 2: NOSTALGIA (THE SQUAD & STORIES) --- */}
      <section ref={ref2} className="min-h-screen py-32 px-6 md:px-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <Heart className="text-red-500" />
            <h2 className="text-4xl font-serif italic">Our Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {students.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-zinc-900">
                  <Image 
                    src={student.photo} 
                    alt={student.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">{student.name}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-tighter">{student.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SESI 3: CLOSING (SEE YOU ON TOP) --- */}
      <section ref={ref3} className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* Efek Partikel/Overlay Halus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-black to-black" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <GraduationCap className="mx-auto mb-8 text-yellow-500" size={60} />
          <h2 className="text-5xl md:text-8xl font-serif italic mb-12 italic">
            See You <br /> 
            <span className="text-yellow-500">On Top!</span>
          </h2>
          <div className="space-y-4 text-zinc-400 font-light tracking-widest text-sm uppercase">
            <p>Terima kasih untuk 3 tahunnya</p>
            <p>Semoga sukses di jalan masing-masing</p>
            <p className="pt-8 text-yellow-600/50 italic">Class of 2026 — End of Chapter</p>
          </div>
        </motion.div>

        {/* Decorative Lines */}
        <div className="absolute bottom-20 w-px h-32 bg-gradient-to-t from-yellow-500 to-transparent" />
      </section>
    </main>
  );
}