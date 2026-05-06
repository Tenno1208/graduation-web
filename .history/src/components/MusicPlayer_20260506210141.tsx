"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Disc, Music2 } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

export default function MusicPlayer({ isPlaying, toggleMusic }: MusicPlayerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-6 z-[60] flex items-center gap-4 bg-zinc-900/40 backdrop-blur-xl p-2.5 pr-6 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[280px]"
    >
      {/* Vinyl/Disc Section */}
      <div className="relative flex-shrink-0 group cursor-pointer" onClick={toggleMusic}>
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="relative z-10"
        >
          {/* Outer Ring Glow */}
          <div className={`absolute inset-0 rounded-full blur-md bg-yellow-500/20 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
          
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center border border-white/10 shadow-lg">
            <Disc className={`text-yellow-500 transition-all duration-700 ${isPlaying ? 'scale-110' : 'scale-90 opacity-40'}`} size={28} strokeWidth={1.5} />
            
            {/* Center Hole Decoration */}
            <div className="absolute h-2 w-2 rounded-full bg-zinc-900 border border-white/20" />
          </div>
        </motion.div>

        {/* Floating Music Note Icon */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20, x: [0, 10, -10] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 right-0 text-yellow-500/60"
            >
              <Music2 size={10} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Section */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[7px] text-yellow-500/80 font-black uppercase tracking-[0.3em]">Now Playing</span>
          {/* Animated Sound Wave Bars */}
          <div className="flex items-end gap-[1.5px] h-2">
            {[1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                animate={{ height: isPlaying ? [2, 8, 4, 8, 2] : 2 }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                className="w-[1.5px] bg-yellow-500/60 rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden mask-fade-edges">
          <motion.p 
            animate={isPlaying ? { x: [0, -150] } : { x: 0 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="text-[10px] text-white/90 font-medium tracking-wide whitespace-nowrap pr-12"
          >
            Sampai Jumpa - Endang Soekamti • Tribute XII TKJ 2 •
          </motion.p>
        </div>
      </div>

      {/* Control Button */}
      <button 
        onClick={toggleMusic} 
        className="relative flex-shrink-0 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-yellow-500 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full opacity-10" />
        <div className={`p-2 rounded-full transition-all duration-300 ${isPlaying ? 'text-white' : 'text-zinc-500'}`}>
          {isPlaying ? (
            <Volume2 size={16} strokeWidth={2} />
          ) : (
            <VolumeX size={16} strokeWidth={2} />
          )}
        </div>
      </button>

      {/* Inline Styling for Edge Fade */}
      <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>
    </motion.div>
  );
}