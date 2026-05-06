"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface HeroProps {
  index: number;
  quote: string;
}

const TOTAL_PHOTOS = 13; // sesuaikan dengan jumlah foto kamu

export default function HeroSection({ index, quote }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const photoIndex = (index % TOTAL_PHOTOS) + 1;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col"
    >
      {/* ── Noise grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Ambient glow behind photo ── */}
      <motion.div
        key={`glow-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(161,123,67,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── Top badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 flex items-center justify-between px-6 pt-10"
      >
        {/* Left pill */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-zinc-400">
            Class of 2026
          </span>
        </div>

        {/* Right pill */}
        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400">
            XII TKJ 2
          </span>
        </div>
      </motion.div>

      {/* ── Photo — full bleed, center stage ── */}
      <div className="relative flex-1 w-full mt-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            {/* Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 40%, rgba(0,0,0,0.85) 100%)",
              }}
            />

            {/* Top + bottom scrim */}
            <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, black 0%, transparent 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, black 0%, transparent 100%)" }} />

            <Image
              src={`/images/foto${photoIndex}.jpg`}
              alt={`Moment ${photoIndex}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Photo counter (film strip aesthetic) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="absolute top-4 right-4 z-20 font-mono text-[9px] text-zinc-400 tracking-widest"
        >
          {String(photoIndex).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL_PHOTOS).padStart(2, "0")}
        </motion.div>

        {/* ── Dot progress row ── */}
        <div className="absolute bottom-14 left-0 right-0 z-20 flex justify-center gap-1.5">
          {Array.from({ length: Math.min(TOTAL_PHOTOS, 13) }).map((_, i) => (
            <motion.span
              key={i}
              animate={{
                width: i === index % TOTAL_PHOTOS ? 20 : 5,
                backgroundColor: i === index % TOTAL_PHOTOS ? "#eab308" : "rgba(255,255,255,0.25)",
              }}
              transition={{ duration: 0.4 }}
              className="block h-[3px] rounded-full"
            />
          ))}
        </div>
      </div>

      {/* ── Bottom text block ── */}
      <div className="relative z-20 px-6 pb-10 pt-2 flex flex-col items-center text-center">
        {/* Big serif title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif italic text-[clamp(3.5rem,22vw,8rem)] leading-[0.9] text-white tracking-tight mb-5"
        >
          Memo
          <br />
          <span className="text-yellow-400">ries</span>
        </motion.h1>

        {/* Animated quote */}
        <div className="relative h-14 w-full flex items-center justify-center overflow-hidden mb-6">
          {/* Decorative lines */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-r from-transparent to-yellow-500/40" />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-px bg-gradient-to-l from-transparent to-yellow-500/40" />

          <AnimatePresence mode="wait">
            <motion.p
              key={quote}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] text-zinc-400 italic font-light max-w-[280px] leading-relaxed px-10"
            >
              "{quote}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-500 font-bold">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-6 bg-gradient-to-b from-zinc-500 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}