"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface HeroProps {
  index: number;
  quote: string;
}

// TOTAL FOTO DIUBAH MENJADI 20
const TOTAL_PHOTOS = 20;

export default function HeroSection({ index, quote }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Memastikan index yang diterima selalu dalam rentang 1-20
  const photoIndex = (index % TOTAL_PHOTOS) + 1;

  return (
    <section ref={containerRef} className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col">
      {/* Noise grain overlay */}
      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      {/* Ambient glow behind photo */}
      <motion.div
        key={`glow-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(161,123,67,0.18) 0%, transparent 70%)" }}
      />

      {/* Top badge */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }} className="relative z-20 flex items-center justify-between px-6 pt-10">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-zinc-400">Class of 2026</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400">XII TKJ 2</span>
        </div>
      </motion.div>

      {/* Photo Section */}
      <div className="relative flex-1 w-full mt-4 z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 px-4"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer border border-white/5 shadow-2xl">
              <Image
                src={`/images/foto${photoIndex}.jpg`}
                alt={`Moment ${photoIndex}`}
                fill
                className="object-cover grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-1000 ease-in-out"
                priority
                sizes="100vw"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <motion.div className="absolute top-8 right-8 z-20 font-mono text-[9px] text-white tracking-widest bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
          {String(photoIndex).padStart(2, "0")}&nbsp;/&nbsp;20
        </motion.div>
      </div>

      {/* Bottom text block */}
      <div className="relative z-20 px-6 pb-10 pt-6 flex flex-col items-center text-center">
        {/* Progress Dots (SINKRON 20) */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 max-w-[280px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{
                width: i === index ? 16 : 4,
                backgroundColor: i === index ? "#eab308" : "rgba(255,255,255,0.15)",
              }}
              className="block h-[2px] rounded-full"
            />
          ))}
        </div>

        <motion.h1 className="font-serif italic text-[clamp(2.5rem,15vw,6rem)] leading-none text-white tracking-tight mb-8 select-none">
          Memo<span className="text-yellow-400">ries</span>
        </motion.h1>

        <div className="relative h-12 w-full flex items-center justify-center overflow-hidden mb-8 px-4">
          <AnimatePresence mode="wait">
            <motion.p 
              key={quote} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }} 
              className="text-[10px] md:text-sm text-zinc-400 italic font-light leading-relaxed"
            >
              "{quote}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}