"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { students } from "@/data/students"; 
import LandingGate from "@/components/LandingGate";
import { Volume2, VolumeX, Quote, Heart, MapPin, Sparkles, ChevronDown } from "lucide-react"; 

// Daftar kata-kata mutiara yang akan berganti otomatis
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

  // Auto-slide Hero Images & Quotes (Ganti 13 sesuai jumlah foto kamu)
  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % 13); 
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
          
          {/* Tombol Musik */}
          <div className="fixed bottom-8 right-8 z-50">
            <button 
              onClick={toggleMusic}
              className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-yellow-500 transition-all duration-500 group shadow-2xl"
            >
              {isPlaying ? <Volume2 className="text-yellow-500" /> : <VolumeX className="text-white" />}
            </button>
          </div>

          {/* --- SECTION 1: HERO (CLEAN PHOTO WITH DYNAMIC TEXT) --- */}
          <section className="relative h-[100svh] w-full flex flex-col bg-black overflow-hidden">
            
            {/* Bagian Atas: Teks Memories & Quote Atas */}
            <div className="flex-1 flex flex-col items-center justify-end pb-4 z-10 px-4">
              <motion.div 
                key={`text-top-${index}`}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-center"
              >
                <Sparkles className="mx-auto text-yellow-500 mb-2" size={20} />
                <h1 className="text-4xl md:text-8xl font-serif italic leading-none opacity-90 drop-shadow-lg text-white mb-2">
                  Memories
                </h1>
                <p className="text-[10px] md:text-sm text-zinc-400 italic font-light max-w-xs md:max-w-md mx-auto">
                  "{graduationQuotes[index]}"
                </p>
              </motion.div>
            </div>

            {/* Bagian Tengah: Foto (Grayscale to Color on Interaction) */}
            <div className="relative w-full h-[50vh] md:h-[60vh] z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="relative w-full h-full flex items-center justify-center p-2 group cursor-pointer"
                >
                  <div className="relative w-full h-full transition-all duration-700 filter grayscale hover:grayscale-0 active:grayscale-0">
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
            </div>

            {/* Bagian Bawah: Info Kelas & Navigasi */}
            <div className="flex-1 flex flex-col items-center justify-start pt-4 z-10 px-4">
              <motion.div 
                key={`text-bottom-${index}`}
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-center"
              >
                <p className="tracking-[0.4em] md:tracking-[0.8em] text-yellow-500 uppercase text-[10px] md:text-sm font-bold">
                  XII TKJ 2 — Class of 2026
                </p>
                <div className="mt-8 flex flex-col items-center gap-2 opacity-30">
                  <ChevronDown size={20} className="animate-bounce" />
                </div>
              </motion.div>
            </div>

          </section>

          {/* --- SECTION 2: THE SQUAD --- */}
          <section className="py-24 px-4 md:px-20 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4 text-center md:text-left">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-500 mb-2">
                    <Heart size={16} />
                    <span className="text-xs tracking-[0.3em] uppercase font-bold text-yellow-500/80">Family</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif italic text-white">The Squad</h2>
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
                    className="flex md:flex-col items-center md:items-start gap-4 p-4 bg-white/5 rounded-2xl md:bg-transparent border border-white/5 md:border-none shadow-lg"
                  >
                    <div className="relative w-16 h-16 md:w-full md:aspect-[4/5] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-900 border border-white/10 shadow-xl">
                      <Image 
                        src={student.photo} 
                        alt={student.name} 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-500" 
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
          <footer className="h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-black relative border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
              <h2 className="text-6xl md:text-[10rem] font-serif italic mb-8 leading-none text-white">See You!</h2>
              <p className="text-yellow-500 tracking-[0.6em] text-[10px] md:text-xs uppercase font-bold">XII TKJ 2 — Class of 2026</p>
            </motion.div>
          </footer>

        </motion.div>
      )}
    </main>
  );
}