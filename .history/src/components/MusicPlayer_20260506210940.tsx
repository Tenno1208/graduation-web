"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Disc, Music2, ChevronRight } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

export default function MusicPlayer({ isPlaying, toggleMusic }: MusicPlayerProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        width: isMinimized ? "64px" : "280px" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-8 right-6 z-[60] flex items-center bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden h-[64px]"
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

        {/* Konten yang bisa disembunyikan */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }} // Perbaikan: Ganti 'w' menjadi 'width'
              animate={{ opacity: 1, width: "auto" }} // Perbaikan: Ganti 'w' menjadi 'width'
              exit={{ opacity: 0, width: 0 }} // Perbaikan: Ganti 'w' menjadi 'width'
              className="flex items-center flex-1 min-w-0 gap-3"
            >
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[7px] text-yellow-500/80 font-black uppercase tracking-[0.3em]">Now Playing</span>
                </div>
                <div className="overflow-hidden whitespace-nowrap">
                  <motion.p 
                    animate={isPlaying ? { x: [0, -150] } : { x: 0 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="text-[9px] text-white/90 font-medium tracking-wide pr-12"
                  >
                    Sampai Jumpa - Endang Soekamti • Tribute XII TKJ 2 •
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-1">
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