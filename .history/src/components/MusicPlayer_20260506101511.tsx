"use client";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Music, Disc } from "lucide-react";

interface MusicPlayerProps {
  isPlaying: boolean;
  toggleMusic: () => void;
}

export default function MusicPlayer({ isPlaying, toggleMusic }: MusicPlayerProps) {
  return (
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
  );
}