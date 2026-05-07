"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LandingGateProps {
  onEnter: () => void;
}

const YEAR = "2026";
const CLASS = "XII TKJ 2";

const TISSUE_TOASTS = [
  { emoji: "🧻", text: "Siapkan tisu dulu ya..." },
  { emoji: "💧", text: "Ini mungkin bikin nangis..." },
  { emoji: "🫀", text: "Siapkan hatimu..." },
];

function TissueToast({ emoji, text, onDone }: { emoji: string; text: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none px-4 w-full max-w-xs"
    >
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl"
        style={{
          background: "rgba(20, 20, 23, 0.85)",
          border: "1px solid rgba(234, 179, 8, 0.2)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.7)",
        }}
      >
        <span className="text-2xl">{emoji}</span>
        <span className="text-[12px] font-medium text-zinc-100 tracking-wide uppercase italic">{text}</span>
      </div>
    </motion.div>
  );
}

function ConfirmSheet({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)]"
        style={{
          background: "rgba(15,15,18,0.95)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="px-8 pt-10 pb-8 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-5xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            🧻
          </motion.div>
          <h3 className="font-serif italic text-white text-3xl mb-4 leading-tight">
            Sudah siap?
          </h3>
          <p className="text-zinc-400 text-[11px] leading-relaxed uppercase tracking-[0.2em] font-medium">
            Konten ini mengandung <span className="text-yellow-500">Kenangan Emosional</span>. 
            Pastikan kamu sedang tidak di tempat umum.
          </p>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-5 rounded-2xl font-black text-[10px] tracking-[0.4em] uppercase transition-all active:scale-95 shadow-lg shadow-yellow-900/20"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
              color: "black",
            }}
          >
            Masuk Sekarang
          </button>
          <button
            onClick={onCancel}
            className="w-full py-4 rounded-2xl font-bold text-[9px] tracking-[0.3em] uppercase text-zinc-500 hover:text-white transition-colors"
          >
            Nanti saja
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LandingGate({ onEnter }: LandingGateProps) {
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [toastIndex, setToastIndex] = useState<number>(-1);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleButtonClick = () => setToastIndex(0);

  const handleToastDone = () => {
    if (toastIndex < TISSUE_TOASTS.length - 1) {
      setToastIndex((prev) => prev + 1);
    } else {
      setToastIndex(-1);
      setShowConfirm(true);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Noise Overlay ── */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none contrast-150 grayscale" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />

      {/* ── Cinematic Ambient Glow ── */}
      <motion.div
        animate={{ 
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.15) 0%, transparent 60%)",
        }}
      />

      {/* ── Corner Accents ── */}
      <div className="absolute inset-10 border border-white/[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500/20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500/20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/20" />
      </div>

      {/* ── Center Content ── */}
      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 bg-yellow-500/50"
              />
            </div>
            <span className="text-[8px] tracking-[0.6em] text-zinc-500 uppercase font-black">
              Retrieving Memories
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center text-center px-6 w-full"
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 mb-10"
            >
              <span className="text-[9px] tracking-[0.4em] text-yellow-500 font-black uppercase">
                Est. {YEAR}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif italic text-white text-[clamp(4rem,22vw,8rem)] leading-none mb-4 tracking-tighter"
            >
              {CLASS.split(" ").map((t, i) => (
                <span key={i} className={`block ${i === 2 ? 'text-yellow-500' : ''}`}>{t}</span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6 }}
              className="text-white text-[10px] tracking-[0.5em] uppercase font-bold mb-16"
            >
              Sebuah Perjalanan Abadi
            </motion.p>

            <motion.button
              onClick={handleButtonClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <span className="text-[10px] tracking-[0.5em] font-black uppercase text-white group-hover:text-yellow-400 transition-colors">
                  Buka Pintu
                </span>
                <span className="text-yellow-500 text-lg group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </motion.button>

            {/* Micro Waveform */}
            <div className="mt-12 flex items-end gap-1 opacity-20">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ repeat: Infinity, duration: 1 + i * 0.2, ease: "easeInOut" }}
                  className="w-[2px] bg-white rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast & Confirm ── */}
      <AnimatePresence mode="wait">
        {toastIndex >= 0 && (
          <TissueToast
            key={toastIndex}
            emoji={TISSUE_TOASTS[toastIndex].emoji}
            text={TISSUE_TOASTS[toastIndex].text}
            onDone={handleToastDone}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <ConfirmSheet
            onConfirm={() => { setShowConfirm(false); onEnter(); }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Background Year Stamp ── */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <span className="text-[25vw] font-serif italic text-white/[0.02] leading-none">
          {YEAR}
        </span>
      </div>
    </motion.section>
  );
}