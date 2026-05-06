"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles, ChevronDown } from "lucide-react";
import { useRef } from "react";

interface HeroProps {
  index: number;
  quote: string;
}

export default function HeroSection({ index, quote }: HeroProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Efek Parallax: Teks akan bergerak lebih lambat saat di-scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityImg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[110svh] w-full flex flex-col bg-black overflow-hidden"
    >
      {/* 1. BACKGROUND LAYER (WITH PARALLAX & BLUR) */}
      <motion.div style={{ opacity: opacityImg }} className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Background Glow senada dengan foto */}
            <Image 
              src={`/images/foto${index + 1}.jpg`} 
              alt="Glow" 
              fill 
              className="object-cover blur-[100px] opacity-30 scale-125"
            />
            
            {/* Main Image Container */}
            <div className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center p-6">
              <div className="relative w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <Image 
                  src={`/images/foto${index + 1}.jpg`} 
                  alt="Graduation Moment" 
                  fill 
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-1000" 
                  priority 
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 2. TEXT LAYER (FLOATING OVER THE IMAGE) */}
      <motion.div 
        style={{ y: textY }}
        className="relative z-10 flex-1 flex flex-col items-center justify-between py-20 px-4"
      >
        {/* Top Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="mx-auto text-yellow-500 mb-4 animate-pulse" size={28} />
            <h1 className="text-7xl md:text-[12rem] font-serif italic leading-none text-white tracking-tighter select-none">
              Memories
            </h1>
          </motion.div>
        </div>

        {/* Dynamic Quote with Animated Border */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <AnimatePresence mode="wait">
            <motion.p 
              key={quote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative text-[11px] md:text-lg text-zinc-300 italic font-light max-w-xs md:max-w-3xl mx-auto leading-relaxed text-center"
            >
              "{quote}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Footer Hero */}
        <div className="text-center space-y-6">
          <div className="flex flex-col items-center">
            <p className="tracking-[1em] text-yellow-500 uppercase text-[10px] md:text-sm font-black mb-2">
              XII TKJ 2
            </p>
            <div className="h-[1px] w-12 bg-yellow-500/30 mb-2" />
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Class of 2026</p>
          </div>
          <ChevronDown size={24} className="opacity-20 animate-bounce mx-auto text-white" />
        </div>
      </motion.div>

      {/* 3. GRADIENT OVERLAYS */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 z-[5] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
    </section>
  );
}