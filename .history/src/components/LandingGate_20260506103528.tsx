"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LandingGateProps {
  onEnter: () => void;
}

const YEAR = "2026";
const CLASS = "XII TKJ 2";

// Toast messages yang muncul satu-satu sebelum confirm
const TISSUE_TOASTS = [
  { emoji: "🧻", text: "Siapkan tisu dulu ya..." },
  { emoji: "💧", text: "Ini mungkin bikin nangis..." },
  { emoji: "🫀", text: "Jangan bilang gak ketemu..." },
];

function TissueToast({ emoji, text, onDone }: { emoji: string; text: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
    >
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md"
        style={{
          background: "rgba(24,24,27,0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(234,179,8,0.08)",
        }}
      >
        <span className="text-xl">{emoji}</span>
        <span className="text-[11px] font-bold text-zinc-200 tracking-wide whitespace-nowrap">{text}</span>
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
      className="fixed inset-0 z-[10000] flex items-end justify-center pb-10 px-6"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.3, 0.64, 1] }}
        className="w-full max-w-sm rounded-3xl overflow-hidden"
        style={{
          background: "rgba(18,18,20,0.98)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-7 pb-5 text-center">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl mb-4"
          >
            🧻
          </motion.div>
          <h3 className="font-serif italic text-white text-xl mb-2 leading-tight">
            Udah siap belum?
          </h3>
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            Peringatan: konten ini mengandung kenangan indah yang dapat menyebabkan{" "}
            <span className="text-yellow-400">nostalgia akut</span> dan basahnya kelopak mata.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mx-6" />

        {/* Actions */}
        <div className="p-4 flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-4 rounded-2xl font-black text-[11px] tracking-[0.35em] uppercase transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
              color: "white",
              boxShadow: "0 4px 20px rgba(217,119,6,0.35)",
            }}
          >
            Siap! Tisu udah di tangan 🤧
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3.5 rounded-2xl font-bold text-[10px] tracking-widest uppercase text-zinc-500 hover:text-zinc-300 transition-colors active:scale-95"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            Tunggu, cari tisu dulu...
          </button>
        </div>

        {/* Bottom note */}
        <p className="text-center text-[8px] text-zinc-700 tracking-widest uppercase pb-5">
          Tidak ada refund setelah dibuka
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function LandingGate({ onEnter }: LandingGateProps) {
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [toastIndex, setToastIndex] = useState<number>(-1); // -1 = not started
  const [showConfirm, setShowConfirm] = useState(false);

  const handleButtonClick = () => {
    // Mulai toast sequence
    setToastIndex(0);
  };

  const handleToastDone = () => {
    if (toastIndex < TISSUE_TOASTS.length - 1) {
      setToastIndex((prev) => prev + 1);
    } else {
      setToastIndex(-1);
      setShowConfirm(true);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden touch-none select-none"
    >
      {/* ── Noise grain ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* ── Radial amber glow ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(161,123,35,0.22) 0%, transparent 70%)",
        }}
      />

      {/* ── Horizontal scan line that sweeps once ── */}
      <motion.div
        initial={{ top: "-2px", opacity: 0.6 }}
        animate={{ top: "102%", opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeIn" }}
        className="pointer-events-none absolute inset-x-0 h-px z-20"
        style={{ background: "linear-gradient(to right, transparent, rgba(234,179,8,0.7), transparent)" }}
      />

      {/* ── Corner brackets ── */}
      {[
        "top-6 left-6 border-t border-l",
        "top-6 right-6 border-t border-r",
        "bottom-6 left-6 border-b border-l",
        "bottom-6 right-6 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
          className={`absolute w-6 h-6 border-white/40 ${cls}`}
        />
      ))}

      {/* ── Loading phase ── */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center gap-4 z-10"
          >
            {/* Typewriter dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="block w-1 h-1 rounded-full bg-yellow-400"
                />
              ))}
            </div>
            <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 font-bold">
              Loading memories
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <AnimatePresence>
        {phase === "ready" && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center px-8 w-full max-w-sm text-center"
          >
            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-500/50" />
              <span className="text-[8px] tracking-[0.45em] uppercase font-black text-yellow-500/80">
                Class of {YEAR}
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-yellow-500/50" />
            </motion.div>

            {/* Big class name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif italic text-[clamp(3.8rem,20vw,7rem)] leading-[0.88] text-white tracking-tight mb-3"
            >
              {CLASS.split(" ").map((word, wi) => (
                <span key={wi} className="block">
                  {wi === 2 ? <span className="text-yellow-400">{word}</span> : word}
                </span>
              ))}
            </motion.h1>

            {/* Sub tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-bold mb-14"
            >
              Kenangan yang abadi
            </motion.p>

            {/* ── CTA Button ── */}
            <motion.button
              onClick={handleButtonClick}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              whileTap={{ scale: 0.96 }}
              className="relative group w-full py-5 rounded-full overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Hover fill */}
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(234,179,8,0.04) 100%)",
                }}
              />
              {/* Glow ring on hover */}
              <span className="absolute inset-0 rounded-full ring-0 group-hover:ring-1 ring-yellow-400/30 transition-all duration-500" />

              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white group-hover:text-yellow-300 transition-colors duration-300">
                  Buka Kenangan
                </span>
                {/* Arrow */}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-yellow-500 text-xs"
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {/* Sound note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 flex items-center gap-2 opacity-30"
            >
              {/* Mini waveform */}
              <div className="flex items-end gap-[2px] h-3">
                {[3, 5, 7, 5, 3].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15, ease: "easeInOut" }}
                    className="block w-[2px] bg-yellow-400 rounded-full origin-bottom"
                    style={{ height: h }}
                  />
                ))}
              </div>
              <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-500 font-bold">
                Best with sound on
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast sequence ── */}
      <AnimatePresence mode="wait">
        {toastIndex >= 0 && toastIndex < TISSUE_TOASTS.length && (
          <TissueToast
            key={toastIndex}
            emoji={TISSUE_TOASTS[toastIndex].emoji}
            text={TISSUE_TOASTS[toastIndex].text}
            onDone={handleToastDone}
          />
        )}
      </AnimatePresence>

      {/* ── Confirm sheet ── */}
      <AnimatePresence>
        {showConfirm && (
          <ConfirmSheet
            onConfirm={() => { setShowConfirm(false); onEnter(); }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Bottom year stamp ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-0 inset-x-0 text-center pointer-events-none overflow-hidden"
      >
        <span
          className="font-serif italic text-white leading-none select-none"
          style={{ fontSize: "clamp(5rem, 40vw, 14rem)" }}
        >
          {YEAR}
        </span>
      </motion.div>
    </motion.section>
  );
}