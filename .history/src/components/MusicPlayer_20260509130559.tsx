"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Disc, Music2, ChevronRight, SkipForward } from "lucide-react";

// ─── Daftar Lagu ──────────────────────────────────────────────────────────────
const PLAYLIST = [
  {
    title: "Sampai Jumpa",
    artist: "Endang Soekamti",
    src: "/audio/memories.mp3"
  },
  {
    title: "Masa Sma",
    artist: "",
    src: "/audio/kemesraan.mp3"
  }
];

interface MusicPlayerProps {
  isPlaying: boolean;
  toggleMusic: () => void;
  // Tambahkan props di bawah ini di page.tsx kamu nanti
  currentTrack: number;
  setCurrentTrack: (index: number) => void;
}

export default function MusicPlayer({ isPlaying, toggleMusic, currentTrack, setCurrentTrack }: MusicPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation(); // Agar tidak mentrigger toggle minimized
    const nextIndex = (currentTrack + 1) % PLAYLIST.length;
    setCurrentTrack(nextIndex);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        width: isMinimized ? "64px" : "300px" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-8 right-6 z-[60] flex items-center bg-zinc-900/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden h-[64px]"
    >
      <div className="flex items-center w-full px-2 gap-3">
        
        {/* Piringan Hitam */}
        <div 
          className="relative flex-shrink-0 cursor-pointer"
          onClick={() => isMinimized ? setIsMinimized(false) : toggleMusic()}
        >
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="relative z-10"
          >
            <div className={`absolute inset-0 rounded-full blur-md bg-yellow-500/20 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className="relative h-11 w-11 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center border border-white/10 shadow-lg">
              <Disc className={`text-yellow-500 transition-all duration-700 ${isPlaying ? 'scale-110' : 'scale-90 opacity-40'}`} size={24} strokeWidth={1.5} />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-zinc-900 border border-white/20" />
            </div>
          </motion.div>

          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -20, x: [0, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-0 right-0 text-yellow-500/60"
              >
                <Music2 size={10} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Konten */}
        <AnimatePresence mode="wait">
          {!isMinimized && (
            <motion.div 
              key="expanded-content"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center flex-1 min-w-0 gap-3"
            >
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[7px] text-yellow-500/80 font-black uppercase tracking-[0.3em]">Now Playing</span>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1 h-1 rounded-full bg-yellow-500" 
                  />
                </div>
                
                <div className="overflow-hidden whitespace-nowrap">
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={currentTrack}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-[9px] text-white/90 font-medium tracking-wide pr-4"
                    >
                      {PLAYLIST[currentTrack].title} - {PLAYLIST[currentTrack].artist}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-1 pr-1">
                {/* Tombol Ganti Lagu */}
                <button 
                  onClick={handleNextTrack}
                  className="p-1.5 text-zinc-400 hover:text-yellow-500 transition-colors"
                  title="Ganti Lagu"
                >
                  <SkipForward size={14} />
                </button>

                <button onClick={toggleMusic} className="p-1.5 text-zinc-400 hover:text-white transition-colors">
                  {isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
                
                <button onClick={() => setIsMinimized(true)} className="p-1.5 bg-white/5 rounded-lg text-zinc-500 hover:text-yellow-500 transition-all">
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}