"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Star, HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6">
      {/* top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-yellow-500/10 blur-[140px] rounded-full" />
      </div>

      {/* floating stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
            }}
            className="absolute text-yellow-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles size={10 + (i % 4) * 4} />
          </motion.div>
        ))}
      </div>

      {/* BACKGROUND LOGO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-[320px] h-[320px] md:w-[520px] md:h-[520px]">
          <Image
            src="/images/logo-kelas.png" // GANTI KE LOGO LU
            alt="Logo Kelas"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-500/40" />

          <div className="px-4 py-2 rounded-full border border-yellow-500/15 bg-yellow-500/5 backdrop-blur-xl flex items-center gap-2">
            <Star size={10} className="text-yellow-500" />

            <span className="text-[8px] tracking-[0.4em] uppercase font-black text-yellow-500/70">
              Until We Meet Again
            </span>
          </div>

          <div className="h-px w-10 bg-gradient-to-l from-transparent to-yellow-500/40" />
        </motion.div>

        {/* big title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif italic leading-[0.85] tracking-tight text-white"
          style={{
            fontSize: "clamp(4rem,18vw,10rem)",
          }}
        >
          See You
          <br />
          <span className="text-yellow-400">
            On Top.
          </span>
        </motion.h2>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-[300px] text-zinc-500 text-[11px] leading-relaxed tracking-[0.15em] uppercase"
        >
          Tiga tahun penuh tawa,
          drama, tugas dadakan,
          dan momen absurd yang
          entah kenapa jadi berharga.
        </motion.p>

        {/* divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="origin-center w-40 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent my-10"
        />

        {/* quote box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-8 py-6 max-w-sm"
        >
          {/* glow */}
          <div className="absolute -top-10 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full" />

          <HeartHandshake
            size={18}
            className="text-yellow-500/40 mx-auto mb-4"
          />

          <p className="relative z-10 text-zinc-400 italic text-[12px] leading-relaxed">
            “Mungkin nanti kita bakal sibuk
            dengan hidup masing-masing.
            Tapi bagian kecil dari masa ini
            bakal tetap tinggal.”
          </p>
        </motion.div>

        {/* status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-40" />

            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
          </span>

          <span className="text-[8px] tracking-[0.4em] uppercase font-black text-zinc-400">
            Class of 2026 Tribute
          </span>
        </motion.div>
      </div>

      {/* bottom */}
      <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-4">
        <div className="w-px h-12 bg-gradient-to-b from-yellow-500/30 to-transparent" />

        <div className="flex items-center gap-3 text-zinc-700">
          <div className="h-px w-8 bg-white/10" />

          <p className="text-[7px] tracking-[0.45em] uppercase font-black">
            Made With Chaos · XII TKJ 2
          </p>

          <div className="h-px w-8 bg-white/10" />
        </div>
      </div>
    </footer>
  );
}