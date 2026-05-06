"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Heart } from "lucide-react";

interface SquadProps {
  students: any[];
}

function StudentCard({ student, i }: { student: any; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/[0.06] shadow-2xl">
        
        {/* Photo */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
          <Image
            src={student.photo}
            alt={student.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
            sizes="(max-width: 640px) 50vw, 33vw"
          />

          {/* Bottom scrim */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)" }}
          />

          {/* Hover glow border */}
          <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-1 ring-yellow-400/30 transition-all duration-500 z-20 pointer-events-none" />

          {/* Number badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Name + message overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-4">
            <h3 className="font-serif italic text-white text-[15px] leading-tight mb-2 drop-shadow-lg">
              {student.name}
            </h3>
            <p className="text-zinc-400 text-[10px] italic leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              "{student.message || "Tiga tahun yang tak terlupakan."}"
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="px-4 py-3 flex items-center justify-between bg-zinc-900 border-t border-white/5">
          <span className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 font-bold">
            Alumni 2026
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
        </div>
      </div>
    </motion.div>
  );
}

export default function SquadSection({ students }: SquadProps) {
  return (
    <section className="relative bg-black pt-20 pb-32 overflow-hidden">

      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 px-4 max-w-lg mx-auto md:max-w-3xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-yellow-500 mb-5 px-3 py-1.5 bg-yellow-500/5 border border-yellow-500/15 rounded-full">
            <Heart size={10} fill="currentColor" />
            <span className="text-[8px] tracking-[0.35em] uppercase font-black">Unforgettable Souls</span>
          </div>

          <h2 className="font-serif italic text-white leading-none text-[clamp(3.5rem,18vw,7rem)] tracking-tight">
            The <span className="text-yellow-400">Squad</span>
          </h2>

          <p className="mt-4 text-zinc-500 text-[11px] tracking-widest uppercase font-bold">
            {students.length} jiwa yang tak terlupakan
          </p>
        </motion.div>

        {/* Masonry-style 2-col grid */}
        <div className="grid grid-cols-2 gap-3">
          {students.map((student, i) => {
            // Stagger heights: even rows get taller card (via padding trick on parent)
            const isTall = i % 4 === 1 || i % 4 === 2;
            return (
              <div key={student.id} className={isTall ? "mt-8" : ""}>
                <StudentCard student={student} i={i} />
              </div>
            );
          })}
        </div>

        {/* Footer caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="w-px h-12 bg-gradient-to-b from-yellow-500/40 to-transparent mx-auto mb-6" />
          <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase font-bold">
            XII TKJ 2 · 2023–2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}