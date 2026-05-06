"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface HeroProps {
  index: number;
  quote: string;
}

const TOTAL_PHOTOS = 2;

const SAD_LINES = [
  "Tiga tahun terasa sebentar...",
  "Tapi bekasnya akan selamanya.",
  "Sampai jumpa, keluarga.",
];

function VideoReveal({ onClose, audioRef, setIsPlaying }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [showLines, setShowLines] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false); // State baru untuk cek video selesai

  // Mute musik utama saat video reveal muncul
  useEffect(() => {
    const main = audioRef?.current;
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
  }, []);

  // Handle ketika video selesai diputar
  const handleVideoEnded = () => {
    setVideoEnded(true); // Video hilang
    setShowLines(true);  // Munculkan kata-kata

    // Animasi kata-kata berjalan
    let currentLine = 0;
    const interval = setInterval(() => {
      currentLine++;
      if (currentLine < SAD_LINES.length) {
        setLineIndex(currentLine);
      } else {
        clearInterval(interval);
        // Setelah kata-kata terakhir selesai (tunggu 3 detik), otomatis tutup
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    }, 3200);
  };

  // Track buffering
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setVideoReady(true);
    const onProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        const pct = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
        setLoadProgress(Math.min(Math.round(pct), 99));
      }
    };
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("progress", onProgress);
    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("progress", onProgress);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
      className="absolute inset-0 z-50 bg-black flex flex-col"
    >
      {/* Loading screen */}
      <AnimatePresence>
        {!videoReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-6"
          >
            <div className="w-40 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-yellow-500" 
                animate={{ width: `${loadProgress}%` }} 
              />
            </div>
            <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 font-black">Memuat momen...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black py-10">
        {/* Container Video - Akan Hilang jika videoEnded true */}
        <AnimatePresence>
          {!videoEnded && (
            <motion.div
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 1.5 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ width: "min(260px, 70vw)", aspectRatio: "9/16" }}
            >
              <video
                ref={videoRef}
                src="/video/sad.mp4"
                autoPlay
                playsInline
                onEnded={handleVideoEnded} // Pemicu ketika video habis
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(30%) brightness(0.8)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Kata-kata Sedih & Motivasi - Muncul di tengah setelah video hilang */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-10">
          {showLines && (
            <AnimatePresence mode="wait">
              <motion.div
                key={lineIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 1.2 }}
                className="text-center"
              >
                <p
                  className="font-serif italic leading-tight text-white"
                  style={{ fontSize: "clamp(1.2rem, 6vw, 2rem)" }}
                >
                  {SAD_LINES[lineIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection({ index, quote }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hasSeenAll, setHasSeenAll] = useState(false);
  const seenRef = useRef(new Set<number>());

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Track seen photos, trigger video after all 20 shown
  useEffect(() => {
    const photoNum = (index % TOTAL_PHOTOS) + 1;
    seenRef.current.add(photoNum);

    if (seenRef.current.size >= TOTAL_PHOTOS && !hasSeenAll) {
      const t = setTimeout(() => {
        setHasSeenAll(true);
        setShowVideo(true);
      }, 4000); // tunggu foto ke-20 keliatan dulu
      return () => clearTimeout(t);
    }
  }, [index, hasSeenAll]);

  const photoIndex = (index % TOTAL_PHOTOS) + 1;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full bg-black overflow-hidden flex flex-col"
    >
      {/* Noise grain */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Ambient glow */}
      <motion.div
        key={`glow-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(161,123,67,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Top badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        className="relative z-20 flex items-center justify-between px-6 pt-10"
      >
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-zinc-400">Class of 2026</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-zinc-400">XII TKJ 2</span>
        </div>
      </motion.div>

      {/* Photo */}
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
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
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
        <div className="absolute top-8 right-8 z-20 font-mono text-[9px] text-white tracking-widest bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
          {String(photoIndex).padStart(2, "0")}&nbsp;/&nbsp;20
        </div>
      </div>

      {/* Bottom block */}
      <div className="relative z-20 px-6 pb-10 pt-6 flex flex-col items-center text-center">

        {/* Progress dots — seen dots jadi kuning redup */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8 max-w-[280px]">
          {Array.from({ length: TOTAL_PHOTOS }).map((_, i) => (
            <motion.span
              key={i}
              animate={{
                width: i === index % TOTAL_PHOTOS ? 16 : 4,
                backgroundColor:
                  i === index % TOTAL_PHOTOS
                    ? "#eab308"
                    : seenRef.current.has(i + 1)
                    ? "rgba(234,179,8,0.3)"
                    : "rgba(255,255,255,0.1)",
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

        {/* Hint setelah semua foto dilihat, sebelum video muncul */}
        <AnimatePresence>
          {hasSeenAll && !showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, times: [0, 0.3, 0.6, 1] }}
              className="text-[8px] text-yellow-500/60 tracking-[0.35em] uppercase font-black"
            >
              ✦ ada yang spesial menunggu...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Reveal */}
      <AnimatePresence>
        {showVideo && (
          <VideoReveal onClose={() => setShowVideo(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}