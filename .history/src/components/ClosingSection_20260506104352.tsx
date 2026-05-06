"use client";
import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <section className="relative bg-black overflow-hidden py-36 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Background Noise & Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(161,123,35,0.12) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-sm mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-serif text-[7rem] leading-none text-yellow-500/15 select-none mb-[-1.5rem]"
        >
          "
        </motion.div>

        <p className="font-serif italic text-[clamp(1.25rem,6vw,2rem)] text-zinc-200 leading-[1.5] mb-4">
          Bukan tentang seberapa sering kita bertemu, tapi tentang seberapa dalam kita{" "}
          <span className="text-yellow-400">saling mengenang.</span>
        </p>

        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-8 bg-yellow-500/30" />
          <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 font-black">XII TKJ 2 · 2026</span>
          <div className="h-px w-8 bg-yellow-500/30" />
        </div>
      </motion.div>
    </section>
  );
}