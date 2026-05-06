"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { students } from "@/data/students"; 
import LandingGate from "@/components/LandingGate";
import { Volume2, VolumeX, Quote, Heart, MapPin, Sparkles, ChevronDown, Music } from "lucide-react"; 

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
          
          {/* --- MUSIC CONTROLLER --- */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/60 backdrop-blur-xl p-2 pr-4 rounded-full border border-white/10 shadow-2xl overflow-hidden max-w-[280px]">
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="bg-yellow-500 p-2.5 rounded-full text-black flex-shrink-0"
            >
              <Music size={18} />
            </motion.div>
            
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest leading-none mb-1">Now Playing</span>
              <span className="text-[11px] text-white font-medium truncate leading-tight">Sampai Jumpa - Endang Soekamti</span>
            </div>

            <button onClick={toggleMusic} className="ml-1 p-2 hover:bg-white/10 rounded-full">
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} className="text-zinc-500" />}
            </button>
          </div>

          {/* --- SECTION 1: HERO --- */}
          <section className="relative h-[100svh] w-full flex flex-col bg-black overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-end pb-6 z-10 px-4">
              <div className="text-center">
                <Sparkles className="mx-auto text-yellow-500 mb-2" size={20} />
                <h1 className="text-6xl md:text-[9rem] font-serif italic leading-none text-white mb-3">Memories</h1>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={`quote-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[11px] md:text-base text-zinc-400 italic font-light max-w-xs md:max-w-xl mx-auto px-4"
                  >
                    "{graduationQuotes[index]}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative w-full h-[45vh] md:h-[60vh] z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2 }}
                  className="relative w-full h-full flex items-center justify-center p-4 group"
                >
                  <div className="relative w-full h-full filter grayscale hover:grayscale-0 transition-all duration-1000">
                    <Image src={`/images/foto${index + 1}.jpg`} alt="Moment" fill className="object-contain" priority />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start pt-6 z-10 px-4">
              <div className="text-center">
                <p className="tracking-[0.5em] text-yellow-500 uppercase text-[10px] md:text-sm font-bold border-t border-white/10 pt-4">
                  XII TKJ 2 — Class of 2026
                </p>
                <ChevronDown size={24} className="mt-8 opacity-20 animate-bounce mx-auto" />
              </div>
            </div>
          </section>

          {/* --- SECTION 2: THE SQUAD --- */}
          <section className="py-24 px-4 md:px-20 bg-zinc-950">
            <div className="max-w-6xl mx-auto">
              <div className="text-center md:text-left mb-20">
                <div className="inline-flex items-center gap-2 text-yellow-500 mb-4 px-3 py-1 bg-yellow-500/10 rounded-full">
                  <Heart size={14} fill="currentColor" />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold">The Brotherhood</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-none">The Squad</h2>
              </div>
              
              <div className="space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-10 lg:grid-cols-3">
                {students.map((student, i) => (
                  <motion.div 
                    key={student.id} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-colors"
                  >
                    {/* FOTO PORTRAIT BESAR */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
                      <Image 
                        src={student.photo} 
                        alt={student.name} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>

                    {/* KATA-KATA SISWA (CUSTOM) */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl md:text-2xl font-serif italic text-white mb-4 line-clamp-1 italic">{student.name}</h3>
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 text-yellow-500/20" size={32} />
                          <p className="text-zinc-400 text-sm leading-relaxed pl-4 italic">
                            {student.message || "Terima kasih untuk 3 tahun yang luar biasa ini teman-teman!"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <MapPin size={12} className="text-yellow-500" />
                          <span className="text-[10px] tracking-widest uppercase font-bold">TKJ 2 OF 2026</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FOOTER --- */}
          <footer className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-black relative border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
              <Sparkles className="text-yellow-500 mx-auto mb-6" size={40} />
              <h2 className="text-7xl md:text-[12rem] font-serif italic mb-10 leading-none text-white">See You <br /> <span className="text-yellow-500">On Top!</span></h2>
              <div className="flex flex-col gap-2 opacity-40 text-[10px] tracking-[0.5em] uppercase font-bold">
                <p>Masa Depan Menanti</p>
                <div className="h-px w-12 bg-white/20 mx-auto my-4" />
                <p>XII TKJ 2 — Forever</p>
              </div>
            </motion.div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}