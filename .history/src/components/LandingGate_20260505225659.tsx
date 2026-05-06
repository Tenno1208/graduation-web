"use client";
import { motion } from "framer-motion";

interface LandingGateProps {
  onEnter: () => void;
}

export default function LandingGate({ onEnter }: LandingGateProps) {
  return (
    <motion.section 
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          {/* GANTI TEKS DI SINI */}
          <p className="tracking-[0.5em] text-yellow-500 text-xs uppercase font-light">
            Welcome to the Journey of
          </p>
          <h1 className="text-5xl md:text-7xl font-serif italic text-white/90">
            XII TKJ 2
          </h1>
        </div>
        
        <button 
          onClick={onEnter}
          className="group relative px-12 py-4 border border-white/20 overflow-hidden rounded-full transition-all hover:border-yellow-500"
        >
          <span className="relative z-10 text-sm tracking-[0.3em] group-hover:text-yellow-500 transition-colors">
            ENTER EXPERIENCE
          </span>
          <motion.div 
            className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
          />
        </button>
        
        <p className="text-[10px] text-zinc-600 tracking-widest uppercase">
          Best experienced with sound on
        </p>
      </motion.div>
    </motion.section>
  );
}