"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, RefObject } from "react";
import { Sparkles } from "lucide-react";

interface HeroProps {
  index: number;
  quote: string;
  audioRef: RefObject<HTMLAudioElement | null>;
  setIsPlaying: (v: boolean) => void;
}

const TOTAL_PHOTOS = 20;

const SAD_LINES = [
  "Tiga tahun terasa sebentar...",
  "Tapi bekasnya akan selamanya.",
  "Sampai jumpa, keluarga.",
];

// ─── Fade audio helper ────────────────────────────────────────────────────────
function fadeAudio(audio: HTMLAudioElement, direction: "out" | "in", onDone?: () => void) {
  const step = direction === "out" ? -0.05 : 0.05;
  const target = direction === "out" ? 0 : 1;
  const interval = setInterval(() => {
    const next = Math.round((audio.volume + step) * 100) / 100;
    if (direction === "out" ? next <= target : next >= target) {
      audio.volume = target;
      clearInterval(interval);
      onDone?.();
    } else {
      audio.volume = next;
    }
  }, 40);
  return interval;
}

// ─── Video Reveal Overlay ─────────────────────────────────────────────────────
function VideoReveal({ onClose, audioRef, setIsPlaying }: { onClose: () => void, audioRef: RefObject<HTMLAudioElement | null>, setIsPlaying: (v: boolean) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [showLines, setShowLines] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const main = audioRef.current;
    if (!main) return;
    fadeAudio(main, "out", () => {
      main.pause();
      setIsPlaying(false);
    });

    return () => {
      if (!main) return;
      main.play().then(() => {
        fadeAudio(main, "in");
        setIsPlaying(true);
      }).catch(() => {});
    };
  }, [audioRef, setIsPlaying]);

  useEffect(() => {
    if (!videoReady) return;
    const t1 = setTimeout(() => setShowLines(true), 1200);
    let currentLine = 0;
    const t2 = setInterval(() => {
      currentLine++;
      if (currentLine < SAD_LINES.length) setLineIndex(currentLine);
      else clearInterval(t2);
    }, 3200);
    const t3 = setTimeout(() => setShowClose(true), 1200 + SAD_LINES.length * 3200 + 800);
    return () => { clearTimeout(t1); clearInterval(t2); clearTimeout(t3); };
  }, [videoReady]);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onClose();
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-0 z-[100] bg-black flex flex-col"
    >
      <AnimatePresence>
        {isTransitioning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center px-10 text-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
              <p className="font-serif italic text-xl md:text-2xl text-zinc-200 leading-relaxed mb-6">
                "Jarak mungkin memisahkan kita, namun kenangan XII TKJ 2 akan selalu menjadi rumah tempat kita kembali pulang."
              </p>
              <div className="h-px w-12 bg-yellow-500/50 mx-auto mb-6" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-500 font-black">Fly High, Class of 2026</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center">
        {/* Notif Special Moment Ala Live */}
        {!isTransitioning && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute top-10 z-[30] flex justify-center w-full">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase font-black text-white/80">Special Moment</span>
             </div>
          </motion.div>
        )}

        {/* Video dengan object-contain agar tidak terpotong dan sampingnya hitam */}
        <video 
          ref={videoRef} 
          src="/video/sad.mp4" 
          autoPlay 
          loop 
          playsInline 
          onCanPlay={() => setVideoReady(true)} 
          className="w-full h-full object-contain" 
          style={{ filter: "grayscale(20%) brightness(0.9)" }} 
        />
      </div>

      <div className="relative z-20 w-full text-center px-8 pb-14 pt-4 flex flex-col items-center min-h-[180px] justify-center bg-black">
        {showLines && !isTransitioning && (
          <AnimatePresence mode="wait">
            <motion.p key={lineIndex} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="font-serif italic text-white text-2xl leading-snug">
                {SAD_LINES[lineIndex]}
            </motion.p>
          </AnimatePresence>
        )}
        <AnimatePresence>
          {showClose && !isTransitioning && (
            <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} onClick={handleContinue} className="mt-10 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-[9px] tracking-[0.45em] uppercase font-black text-zinc-400 hover:text-yellow-400 transition-colors">
                Lanjutkan Kenangan&nbsp;→
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection({ index, quote, audioRef, setIsPlaying }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hasSeenAll, setHasSeenAll] = useState(false);
  const [videoFinishedPermanently, setVideoFinishedPermanently] = useState(false);
  const seenRef = useRef(new Set<number>());

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    const photoNum = (index % TOTAL_PHOTOS) + 1;
    seenRef.current.add(photoNum);

    if (seenRef.current.size >= TOTAL_PHOTOS && !hasSeenAll && !videoFinishedPermanently) {
      const t = setTimeout(() => {
        setHasSeenAll(true);
        setShowVideo(true);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [index, hasSeenAll, videoFinishedPermanently]);

  const photoIndex = (index % TOTAL_PHOTOS) + 1;

  return (
    <section className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col">
      {/* Background Texture & Glow tetap sama */}
      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <motion.div key={`glow-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(161,123,67,0.18) 0%, transparent 70%)" }} />

      {/* ─── ENHANCED HEADER WITH LOGO ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -25 }} 
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -25 }} 
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-40 flex items-center justify-between px-6 pt-12 pb-4"
      >
        {/* Left Side: Logo & Batch Info */}
        <div className="group flex items-center gap-3 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-full pl-1.5 pr-4 py-1.5 transition-all hover:bg-white/[0.06] hover:border-white/20">
          {/* Container Logo Kelas */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Image 
              src="/images/logo-kelas.png" // Ganti dengan path logo kamu
              alt="Logo Kelas"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] leading-none tracking-[0.2em] uppercase font-black text-yellow-400/80 mb-0.5">Official Batch</span>
            <span className="text-[10px] leading-none tracking-widest uppercase font-bold text-white">Class of 2026</span>
          </div>
        </div>

        {/* Right Side: Major Info tetap sama */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] tracking-[0.3em] uppercase font-black text-white/90">XII TKJ 2</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-1 w-1 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-[6px] tracking-[0.4em] uppercase font-bold text-zinc-500">Network Engineering</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Photo Area */}
      <div className="relative flex-1 w-full mt-2 z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={photoIndex} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }} className="absolute inset-0 px-4">
            <div className="relative w-full h-full rounded-3xl overflow-hidden group border border-white/5 shadow-2xl">
              <Image src={`/images/foto${photoIndex}.jpg`} alt="Moment" fill className="object-cover grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-1000" priority sizes="100vw" />
              
              {/* Subtle Photo Overlay Inner Shadow */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Modern Photo Counter */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl">
          <span className="font-mono text-[10px] text-yellow-400 font-bold tracking-tighter italic">
            {String(photoIndex).padStart(2, "0")}
          </span>
          <div className="h-3 w-[1px] bg-white/20" />
          <span className="font-mono text-[10px] text-white/40 font-bold tracking-tighter">
            {TOTAL_PHOTOS}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-20 px-6 pb-12 pt-8 flex flex-col items-center text-center">
        <div className="flex justify-center gap-1.5 mb-10">
          {Array.from({ length: TOTAL_PHOTOS }).map((_, i) => (
            <motion.span 
              key={i} 
              animate={{ 
                width: i === index % TOTAL_PHOTOS ? 32 : 6, 
                backgroundColor: i === index % TOTAL_PHOTOS ? "#eab308" : seenRef.current.has(i + 1) ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.1)" 
              }} 
              className="block h-[2px] rounded-full transition-all duration-500" 
            />
          ))}
        </div>

        <motion.h1 className="font-serif italic text-[clamp(2.8rem,16vw,7rem)] leading-none text-white tracking-tighter mb-8 select-none">
          Memo<span className="text-yellow-400">ries</span>
        </motion.h1>

        <div className="relative h-20 w-full flex flex-col items-center justify-center overflow-hidden mb-6 px-4">
          <AnimatePresence mode="wait">
            <motion.p key={quote} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-[11px] md:text-sm text-zinc-400 italic font-light tracking-wide leading-relaxed max-w-[280px]">
              "{quote}"
            </motion.p>
          </AnimatePresence>
          
          {!videoFinishedPermanently && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0.3, 0.6] }} transition={{ repeat: Infinity, duration: 3 }} className="mt-4 flex items-center gap-2">
              <div className="h-px w-4 bg-yellow-500/30" />
              <span className="text-[7px] text-yellow-500/60 tracking-[0.4em] uppercase font-black">Spesial Menanti</span>
              <div className="h-px w-4 bg-yellow-500/30" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Video Overlay Logic */}
      <AnimatePresence>
        {showVideo && (
          <VideoReveal 
            audioRef={audioRef} 
            setIsPlaying={setIsPlaying} 
            onClose={() => {
              setShowVideo(false);
              setVideoFinishedPermanently(true);
            }} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}