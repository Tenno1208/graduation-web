"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function ClosingSection() {
  return (
    <section className="relative bg-black overflow-hidden py-40 px-6">
      {/* top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* glow */}
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-yellow-500/10 blur-[140px] rounded-full" />

        {/* logo bg */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.04, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            <Image
              src="/images/logo-kelas.png"
              alt="Logo Kelas"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4 + i,
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

      {/* content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        {/* quote symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-[9rem] leading-none text-yellow-500/10 select-none mb-[-4rem]"
        >
          ”
        </motion.div>

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-serif italic text-white leading-[1.3]"
          style={{
            fontSize: "clamp(1.7rem,6vw,3rem)",
          }}
        >
          Bukan tentang seberapa sering
          <br />
          kita bertemu,
          <br />
          tapi tentang seberapa dalam
          <br />
          kita{" "}
          <span className="text-yellow-400">
            saling mengenang.
          </span>
        </motion.h2>

        {/* divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="origin-center w-40 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent mx-auto my-10"
        />

        {/* sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-zinc-500 text-[11px] uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto"
        >
          Setiap tawa, drama,
          dan kegilaan kecil di kelas ini
          akan selalu hidup
          di kepala kita.
        </motion.p>

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-40" />

            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
          </span>

          <span className="text-[8px] tracking-[0.4em] uppercase font-black text-zinc-400">
            XII TKJ 2 · 2026
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}