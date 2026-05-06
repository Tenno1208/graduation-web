"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface LandingGateProps {
  onEnter: () => void;
}

export default function LandingGate({ onEnter }: LandingGateProps) {
  return (
    <motion.section 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] min-h-screen w-full bg-black flex flex-col items-center justify-center p-6 text-center touch-none"
    >
      {/* Efek Cahaya Halus di Background (Mobile Aesthetic) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-md mx-auto space-y-12"
      >
        {/* Header Sesi */}
        <div className="space-y-4">
          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex justify-center"
          >
            <Sparkles className="text-yellow-500" size={24} />
          </motion.div>
          
          <div className="space-y-2">
            <p className="tracking-[0.4em] text-yellow-500 text-[10px] md:text-xs uppercase font-medium">
              Welcome to the Journey of
            </p>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
              XII TKJ 2
            </h1>
          </div>
        </div>

        {/* Tombol Enter Utama */}
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={onEnter}
            className="group relative w-full max-w-[280px] py-5 border border-white/20 overflow-hidden rounded-full transition-all active:scale-95 hover:border-yellow-500"
          >
            <span className="relative z-10 text-xs md:text-sm tracking-[0.4em] text-white group-hover:text-yellow-500 transition-colors font-bold">
              OPEN MEMORIES
            </span>
            
            {/* Efek Hover/Fill */}
            <motion.div 
              className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
            />
          </button>
          
          <div className="flex flex-col items-center gap-2 opacity-40">
             <div className="w-px h-8 bg-gradient-to-b from-yellow-500 to-transparent" />
             <p className="text-[9px] md:text-[10px] text-zinc-400 tracking-[0.2em] uppercase">
               Best with sound on
             </p>
          </div>
        </div>
      </motion.div>

      {/* Ornamen Sudut (Hanya pemanis) */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/20" />
    </motion.section>
  );
}