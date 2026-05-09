"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Volume2,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface LandingGateProps {
  onEnter: () => void;
}

const YEAR = "2026";
const CLASS = "XII TKJ 2";

const TISSUE_TOASTS = [
  { emoji: "🧻", text: "Siapkan tisu dulu ya..." },
  { emoji: "💧", text: "Ini mungkin bikin nangis..." },
  { emoji: "🫀", text: "Beberapa kenangan gak bisa diulang..." },
];

function TissueToast({ emoji, text, onDone }: { emoji: string; text: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[99999]"
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl">
        <span className="text-xl">{emoji}</span>
        <p className="text-[11px] font-bold tracking-wide text-zinc-200 whitespace-nowrap">{text}</p>
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
      className="fixed inset-0 z-[99999] flex items-end justify-center p-6"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)" }}
    >
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        exit={{ y: 80 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden w-full max-w-sm rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-52 h-52 bg-yellow-500/10 blur-[90px] rounded-full" />
        <div className="relative z-10 p-7">
          <motion.div
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-6"
          >
            <ShieldAlert className="text-yellow-500" size={26} />
          </motion.div>
          <h3 className="text-center font-serif italic text-2xl text-white leading-tight">Udah siap belum?</h3>
          <p className="mt-4 text-center text-zinc-500 text-[11px] leading-relaxed">
            Website ini mengandung nostalgia, kenangan absurd, dan kemungkinan senyum-senyum sendiri jam 2 pagi.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={onConfirm}
              className="group relative overflow-hidden py-4 rounded-2xl font-black text-[10px] tracking-[0.35em] uppercase text-white shadow-lg"
              style={{ background: "linear-gradient(135deg,#eab308 0%,#ca8a04 100%)" }}
            >
              <span className="relative z-10">Masuk Sekarang</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
            </button>
            <button
              onClick={onCancel}
              className="py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-zinc-500 hover:text-zinc-300 transition-all text-[10px] uppercase tracking-[0.3em] font-bold"
            >
              Cari Mental Dulu
            </button>
          </div>
          <p className="mt-6 text-center text-[8px] tracking-[0.35em] uppercase text-zinc-700 font-bold">no turning back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LandingGate({ onEnter }: LandingGateProps) {
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [toastIndex, setToastIndex] = useState(-1);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleButtonClick = () => setToastIndex(0);

  const handleToastDone = () => {
    if (toastIndex < TISSUE_TOASTS.length - 1) {
      setToastIndex((p) => p + 1);
    } else {
      setToastIndex(-1);
      setShowConfirm(true);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
    >
      {/* ─── FULLSCREEN LANDSCAPE BACKGROUND ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/foto_bareng_kelas.jpg" // PASTIKAN NAMA FILE DAN PATH BENAR
          alt="Foto Bersama XII TKJ 2"
          fill
          className="object-cover transition-transform duration-[10s] ease-linear"
          style={{ 
            filter: "brightness(0.4) saturate(0.8) blur(1px)",
            transform: phase === "ready" ? "scale(1.1)" : "scale(1)" 
          }}
          priority
        />
        {/* Overlay Scrim: Membuat teks lebih mudah dibaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Decorative Glows */}
      <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-yellow-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Stars/Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -15, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
            className="absolute text-yellow-500/20"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          >
            <Sparkles size={8 + (i % 4) * 4} />
          </motion.div>
        ))}
      </div>

      {/* ─── CONTENT ─── */}
      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div key="loading" exit={{ opacity: 0 }} className="relative z-10 flex flex-col items-center">
            <div className="flex gap-[5px] items-end h-6">
              {[10, 18, 26, 18, 10].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-[3px] rounded-full bg-yellow-400 origin-bottom shadow-[0_0_8px_#eab308]"
                  style={{ height: h }}
                />
              ))}
            </div>
            <p className="mt-5 text-[8px] uppercase tracking-[0.45em] text-zinc-400 font-black">loading memories</p>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 px-8 w-full max-w-md text-center"
          >
            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-500/40" />
              <span className="text-[8px] tracking-[0.5em] uppercase font-black text-yellow-500/90 drop-shadow-md">class of {YEAR}</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-yellow-500/40" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="font-serif italic text-white leading-[0.85] tracking-tighter drop-shadow-2xl"
              style={{ fontSize: "clamp(4.5rem,22vw,8rem)" }}
            >
              XII <br />
              <span className="text-yellow-400">TKJ 2</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-zinc-100/80 text-[11px] uppercase tracking-[0.4em] leading-relaxed font-medium drop-shadow-md"
            >
              Sebuah tempat kecil <br /> yang penuh cerita besar.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              onClick={handleButtonClick}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group relative mt-12 w-full overflow-hidden rounded-full border border-white/20 bg-black/40 py-5 backdrop-blur-xl shadow-2xl transition-all hover:border-yellow-500/50"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-yellow-500/20 via-transparent to-yellow-500/20" />
              <span className="relative z-10 flex items-center justify-center gap-4">
                <span className="text-[10px] tracking-[0.5em] uppercase font-black text-white group-hover:text-yellow-400 transition-colors">buka kenangan</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ChevronRight size={14} className="text-yellow-500" />
                </motion.div>
              </span>
            </motion.button>

            {/* Audio Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <Volume2 size={12} className="text-yellow-500 animate-pulse" />
              <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-300 font-bold">best experienced with sound</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts & Modals */}
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

      {/* Massive Year Background Stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="absolute bottom-[-2rem] inset-x-0 text-center pointer-events-none z-0"
      >
        <span className="font-serif italic text-white leading-none select-none" style={{ fontSize: "clamp(8rem,40vw,20rem)" }}>
          {YEAR}
        </span>
      </motion.div>
    </motion.section>
  );
}