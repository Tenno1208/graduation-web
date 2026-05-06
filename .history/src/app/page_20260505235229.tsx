"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { students } from "@/data/students"; 
import LandingGate from "@/components/LandingGate";
import { Volume2, VolumeX, Quote, Heart, MapPin, Sparkles, ChevronDown, Music, Disc } from "lucide-react"; 

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
          
          {/* --- MUSIC PLAYER --- */}
          <div className="fixed bottom-6 right-4 left-4 md:left-auto md:right-8 z-50 flex items-center gap-3 bg-white/5 backdrop-blur-2xl p-2 pr-5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-w-[320px] ml-auto">
            <div className="relative flex-shrink-0">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              >
                <Disc className={`text-yellow-500 ${isPlaying ? 'opacity-100' : 'opacity-40'}`} size={44} strokeWidth={1} />
              </motion.div>
              <Music size={12} className="absolute inset-0 m-auto text-white opacity-50" />
            </div>
            
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="text-[8px] text-yellow-500 font-black uppercase tracking-[0.2em] mb-1">On Rotation</span>
              <div className="overflow-hidden whitespace-nowrap">
                <motion.p 
                   animate={{ x: [0, -200] }}
                   transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                   className="text-[11px] text-white font-bold inline-block pr-10"
                >
                  Sampai Jumpa - Endang Soekamti • Class of 2026 Tribute • 
                </motion.p>
              </div>
            </div>

            <button onClick={toggleMusic} className="ml-auto p-2 bg-white/5 rounded-xl hover:bg-yellow-500 hover:text-black transition-all">
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>

          {/* --- HERO SECTION --- */}
          <section className="relative h-[100svh] w-full flex flex-col bg-black overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-end pb-8 z-10 px-4">
              <div className="text-center">
                <Sparkles className="mx-auto text-yellow-500 mb-4" size={24} />
                <h1 className="text-6xl md:text-[10rem] font-serif italic leading-none text-white mb-6">Memories</h1>
                <div className="h-12 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={`quote-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="text-[10px] md:text-sm text-zinc-400 italic font-light max-w-xs md:max-w-2xl mx-auto leading-relaxed"
                    >
                      "{graduationQuotes[index]}"
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="relative w-full h-[40vh] md:h-[55vh] z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="relative w-full h-full flex items-center justify-center p-6"
                >
                  <div className="relative w-full h-full transition-all duration-700 filter grayscale hover:grayscale-0">
                    <Image src={`/images/foto${index + 1}.jpg`} alt="Moment" fill className="object-contain" priority />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start pt-8 z-10 px-4">
              <div className="text-center">
                <p className="tracking-[0.8em] text-yellow-500 uppercase text-[9px] md:text-sm font-black opacity-80 mb-2">
                  XII TKJ 2
                </p>
                <ChevronDown size={20} className="mt-10 opacity-20 animate-bounce mx-auto" />
              </div>
            </div>
          </section>

          {/* --- THE SQUAD SECTION (FIXED TEXT TRUNCATION) --- */}
          <section className="py-24 px-4 md:px-20 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
              <div className="text-center md:text-left mb-20">
                <div className="inline-flex items-center gap-2 text-yellow-500 mb-4 px-3 py-1 bg-yellow-500/5 border border-yellow-500/10 rounded-full">
                  <Heart size={12} fill="currentColor" />
                  <span className="text-[9px] tracking-[0.3em] uppercase font-black">Unforgettable Souls</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-none">The Squad</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {students.map((student, i) => (
                  <motion.div 
                    key={student.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col bg-white/[0.02] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 hover:border-yellow-500/40 transition-all duration-500 shadow-2xl"
                  >
                    {/* FOTO */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                      <Image 
                        src={student.photo} 
                        alt={student.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                      />
                    </div>

                    {/* DETAIL (TEXT TIDAK TERPOTONG) */}
                    <div className="p-4 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-[12px] md:text-xl font-serif italic text-white mb-2 md:mb-4 italic uppercase md:normal-case tracking-wider md:tracking-normal">
                        {student.name}
                      </h3>
                      <div className="relative">
                        <Quote className="absolute -top-1 -left-2 text-yellow-500/20" size={16} />
                        <p className="text-zinc-400 text-[10px] md:text-sm leading-relaxed pl-3 italic break-words">
                          {student.message || "Tiga tahun yang tak terlupakan. Sampai jumpa di masa depan!"}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-zinc-600">
                        <MapPin size={8} className="text-yellow-500" />
                        <span className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase font-black">Alumni 2026</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FOOTER --- */}
          <footer className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}>
              <h2 className="text-7xl md:text-[14rem] font-serif italic mb-12 leading-none text-white select-none">
                See You <br /> <span className="text-yellow-500">On Top!</span>
              </h2>
            </motion.div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}