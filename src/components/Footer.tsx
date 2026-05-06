"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6">
      {/* Ghost Background Text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="font-serif italic text-white/[0.02] leading-none select-none whitespace-nowrap tracking-tighter" style={{ fontSize: "clamp(5rem, 25vw, 20rem)" }}>
          XII TKJ 2
        </span>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-yellow-500/40" />
          <span className="text-[8px] tracking-[0.5em] uppercase font-black text-yellow-500/60">Until We Meet Again</span>
          <div className="h-px w-8 bg-yellow-500/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-serif italic leading-[0.9] text-white tracking-tight"
          style={{ fontSize: "clamp(4rem, 18vw, 10rem)" }}
        >
          See You
          <br />
          <span className="text-yellow-400">On Top!</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent my-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-zinc-500 text-[11px] font-light italic leading-relaxed max-w-[240px] mb-12 uppercase tracking-widest"
        >
          Terima kasih sudah menjadi bagian dari cerita yang paling indah.
        </motion.p>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
          </span>
          <span className="text-[8px] tracking-[0.4em] uppercase font-black text-zinc-400">Class of 2026 Tribute</span>
        </motion.div>
      </div>

      {/* Watermark Section */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3">
        <div className="w-px h-10 bg-gradient-to-b from-yellow-500/20 to-transparent" />
        <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 font-black">Made with 🤍 · Class XII TKJ 2</p>
      </div>
    </footer>
  );
}