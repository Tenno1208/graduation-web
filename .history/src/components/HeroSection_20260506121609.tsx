"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, RefObject } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroProps {
  index: number;
  quote: string;
  audioRef: RefObject<HTMLAudioElement | null>;
  setIsPlaying: (v: boolean) => void;
}

const TOTAL_PHOTOS = 2;

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
interface VideoRevealProps {
  onClose: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  setIsPlaying: (v: boolean) => void;
}

function VideoReveal({ onClose, audioRef, setIsPlaying }: VideoRevealProps) {
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
      transition={{ duration: 1 }}
      className="absolute inset-0 z-[100] bg-black flex flex-col"
    >
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center px-10 text-center"
          >
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
        <video
          ref={videoRef}
          src="/video/sad.mp4"
          autoPlay
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(50%) brightness(0.65)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-20 w-full text-center px-8 pb-14 pt-4 flex flex-col items-center min-h-[180px] justify-center bg-black">
        {showLines && !isTransitioning && (
          <AnimatePresence mode="wait">
            <motion.div
              key={lineIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center"
            >
              <p className="font-serif italic text-white text-2xl">
                {lineIndex === SAD_LINES.length - 1 ? (
                  <>Sampai jumpa, <span className="text-yellow-400">keluarga.</span></>
                ) : (
                  SAD_LINES[lineIndex]
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        <AnimatePresence>
          {showClose && !isTransitioning && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={handleContinue}
              className="mt-10 px-8 py-4 rounded-full border border-white/10 bg-white/5"
            >
              <span className="text-[9px] tracking-[0.45em] uppercase font-black text-zinc-400">
                Lanjutkan Kenangan&nbsp;→
              </span>
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
  const [isWaitingForVideo, setIsWaitingForVideo] = useState(false);
  const [hasSeenAll, setHasSeenAll] = useState(false);
  const seenRef = useRef(new Set<number>());

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    const photoNum = (index % TOTAL_PHOTOS) + 1;
    seenRef.current.add(photoNum);

    // Jika sudah lihat semua foto (20 foto)
    if (seenRef.current.size >= TOTAL_PHOTOS && !hasSeenAll) {
      setHasSeenAll(true);
      setIsWaitingForVideo(true); // Mulai munculkan kata hint
      
      // Tunggu 4 detik (durasi hint) baru munculkan video
      const t = setTimeout(() => {
        setIsWaitingForVideo(false); // Hilangkan hint
        setShowVideo(true); // Munculkan video
      }, 4500);
      return () => clearTimeout(t);
    }
  }, [index, hasSeenAll]);

  const photoIndex = (index % TOTAL_PHOTOS) + 1;

  return (
    <section className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col">
      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

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

      {/* Main Photo Area */}
      <div className="relative flex-1 w-full mt-4 z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 px-4"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group border border-white/5 shadow-2xl">
              <Image src={`/images/foto${photoIndex}.jpg`} alt="Moment" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" priority sizes="100vw" />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-8 right-8 z-20 font-mono text-[9px] text-white tracking-widest bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
          {String(photoIndex).padStart(2, "0")}&nbsp;/&nbsp;20
        </div>
      </div>

      {/* Bottom Text & Progress */}
      <div className="relative z-20 px-6 pb-10 pt-6 flex flex-col items-center text-center">
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 max-w-[280px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{
                width: i === index % 20 ? 24 : 6,
                backgroundColor: i === index % 20 ? "#eab308" : seenRef.current.has(i+1) ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.15)",
              }}
              className="block h-[2px] rounded-full"
            />
          ))}
        </div>

        <motion.h1 className="font-serif italic text-[clamp(2.5rem,15vw,6rem)] leading-none text-white tracking-tight mb-8 select-none">
          Memo<span className="text-yellow-400">ries</span>
        </motion.h1>

        <div className="relative h-12 w-full flex items-center justify-center overflow-hidden mb-6 px-4">
          <AnimatePresence mode="wait">
            {isWaitingForVideo ? (
              <motion.p
                key="hint-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[9px] text-yellow-500/90 tracking-[0.3em] uppercase font-black"
              >
                ✦ ada yang spesial menunggu...
              </motion.p>
            ) : !showVideo ? (
              <motion.p 
                key={quote} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                className="text-[10px] md:text-sm text-zinc-400 italic font-light leading-relaxed"
              >
                "{quote}"
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Overlay Video */}
      <AnimatePresence>
        {showVideo && (
          <VideoReveal
            onClose={() => setShowVideo(false)}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
          />
        )}
      </AnimatePresence>
    </section>
  );
}