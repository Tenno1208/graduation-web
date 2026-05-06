"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, RefObject } from "react";

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
interface VideoRevealProps {
  onClose: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  setIsPlaying: (v: boolean) => void;
}

function VideoReveal({ onClose, audioRef, setIsPlaying }: VideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [showLines, setShowLines] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isVideoFinished, setIsVideoFinished] = useState(false); // State baru

  // Mute musik utama
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
  }, []);

  // Timer untuk baris kata-kata selama video diputar
  useEffect(() => {
    if (!videoReady) return;
    const t1 = setTimeout(() => setShowLines(true), 1200);
    let currentLine = 0;
    const t2 = setInterval(() => {
      currentLine++;
      if (currentLine < SAD_LINES.length) setLineIndex(currentLine);
      else clearInterval(t2);
    }, 3200);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [videoReady]);

  // Handle saat video selesai
  const handleVideoEnded = () => {
    setIsVideoFinished(true); // Munculkan layar kata-kata penutup
    // Setelah 5 detik menampilkan kata-kata motivasi, tutup video otomatis
    setTimeout(() => {
      onClose();
    }, 5000);
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
      {/* Layar Kata-kata Motivasi Penutup (Muncul OTOMATIS setelah video habis) */}
      <AnimatePresence>
        {isVideoFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[70] bg-black flex flex-col items-center justify-center px-10 text-center"
          >
             <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
             >
                <p className="font-serif italic text-xl md:text-2xl text-zinc-200 leading-relaxed mb-6">
                  "Terima kasih telah berjuang bersama selama 3 tahun ini. Sukses menanti kalian di luar sana."
                </p>
                <div className="h-px w-12 bg-yellow-500/50 mx-auto mb-6" />
                <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-500 font-black">
                  XII TKJ 2 — FLY HIGH
                </p>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading screen */}
      <AnimatePresence>
        {!videoReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center gap-6"
          >
            <div className="flex items-end gap-[3px] h-8">
              {[4, 10, 16, 22, 16, 10, 4].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
                  className="block w-[3px] bg-yellow-400 rounded-full origin-bottom"
                  style={{ height: h }}
                />
              ))}
            </div>
            <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 font-black">Memuat momen...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portrait video layout */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black py-10">
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/video/sad.mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110 opacity-30 blur-2xl"
          />
        </div>

        <div
          className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ width: "min(260px, 70vw)", aspectRatio: "9/16" }}
        >
          <video
            ref={videoRef}
            src="/video/sad.mp4"
            autoPlay
            playsInline
            onEnded={handleVideoEnded} // TRIGGER OTOMATIS SAAT VIDEO HABIS
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom text selama video diputar */}
      {!isVideoFinished && (
        <div className="relative z-20 w-full text-center px-8 pb-14 pt-4 flex flex-col items-center min-h-[180px] justify-center">
          {showLines && (
            <AnimatePresence mode="wait">
              <motion.div
                key={lineIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="text-center"
              >
                <p className="font-serif italic text-white text-2xl">
                   {SAD_LINES[lineIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}
    </motion.div>
  );
}

        <AnimatePresence>
          {showClose && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.3, 0.64, 1] }}
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
              className="mt-10 group px-8 py-4 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="text-[9px] tracking-[0.45em] uppercase font-black text-zinc-400 group-hover:text-yellow-300 transition-colors duration-300">
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [hasSeenAll, setHasSeenAll] = useState(false);
  const seenRef = useRef(new Set<number>());

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const photoNum = (index % TOTAL_PHOTOS) + 1;
    seenRef.current.add(photoNum);

    if (seenRef.current.size >= TOTAL_PHOTOS && !hasSeenAll) {
      const t = setTimeout(() => {
        setHasSeenAll(true);
        setShowVideo(true);
      }, 4000);
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

        <div className="absolute top-8 right-8 z-20 font-mono text-[9px] text-white tracking-widest bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded">
          {String(photoIndex).padStart(2, "0")}&nbsp;/&nbsp;20
        </div>
      </div>

      {/* Bottom block */}
      <div className="relative z-20 px-6 pb-10 pt-6 flex flex-col items-center text-center">
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