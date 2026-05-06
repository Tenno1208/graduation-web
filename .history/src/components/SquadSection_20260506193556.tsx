"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Heart, GraduationCap, Quote, ChevronDown } from "lucide-react";

interface SquadProps {
  students: any[];
  teacher?: {
    name: string;
    photo: string;
    subject?: string;
    message?: string;
  };
}

// ─── Teacher Card ─────────────────────────────────────────────────────────────
function TeacherCard({ teacher }: { teacher: NonNullable<SquadProps["teacher"]> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mb-16"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6 justify-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/20" />
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/8 border border-yellow-500/15 rounded-full">
          <GraduationCap size={10} className="text-yellow-500" />
          <span className="text-[8px] tracking-[0.35em] uppercase font-black text-yellow-500/80">
            Wali Kelas
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/20" />
      </div>

      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(234,179,8,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(234,179,8,0.15)",
        }}
      >
        <div className="flex gap-5 p-5">
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ width: 90, height: 110 }}
            >
              <Image
                src={teacher.photo}
                alt={teacher.name}
                fill
                className="object-cover"
                sizes="90px"
              />
              {/* Golden overlay frame */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-400/20" />
            </div>
            {/* Crown badge */}
            <div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.9)", border: "1px solid rgba(234,179,8,0.4)" }}
            >
              <span className="text-[10px]">👑</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className="text-[7px] tracking-[0.35em] uppercase font-black text-yellow-500/60">
                Pembimbing Terbaik
              </span>
            </div>
            <h3 className="font-serif italic text-white text-[18px] leading-tight mb-1">
              {teacher.name}
            </h3>
            {teacher.subject && (
              <p className="text-[9px] tracking-widest uppercase text-zinc-500 font-bold mb-3">
                {teacher.subject}
              </p>
            )}
            {/* Divider */}
            <div className="w-8 h-px bg-yellow-500/30 mb-3" />
            {/* Message */}
            {teacher.message && (
              <div className="relative">
                <Quote size={10} className="text-yellow-500/30 mb-1" />
                <p className="text-zinc-400 text-[10px] italic leading-relaxed">
                  {teacher.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="px-5 py-2.5 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(234,179,8,0.08)", background: "rgba(0,0,0,0.3)" }}
        >
          <span className="text-[7px] tracking-[0.35em] uppercase text-zinc-700 font-black">
            XII TKJ 2 · 2023–2026
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-yellow-500/30" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Student Card ─────────────────────────────────────────────────────────────
function StudentCard({ student, i }: { student: any; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasLongMessage = (student.message || "").length > 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          background: "rgba(24,24,27,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Photo */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
          <Image
            src={student.photo}
            alt={student.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
            sizes="(max-width: 640px) 50vw, 33vw"
          />

          {/* Scrim */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.98) 0%, transparent 100%)" }}
          />

          {/* Hover ring */}
          <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-yellow-400/25 transition-all duration-500 z-20 pointer-events-none rounded-t-2xl" />

          {/* Number */}
          <div className="absolute top-3 left-3 z-20">
            <span className="font-mono text-[8px] text-zinc-600 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Name overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3">
            <h3 className="font-serif italic text-white text-[13px] leading-tight drop-shadow-lg">
              {student.name}
            </h3>
          </div>
        </div>

        {/* Message area — ALWAYS visible, expandable if long */}
        <div className="px-3 pt-3 pb-1 flex-1 flex flex-col">
          <div className="relative mb-1">
            <Quote size={8} className="text-yellow-500/25 mb-1" />
            <p
              className={`text-zinc-400 text-[9px] italic leading-relaxed transition-all duration-300 ${
                !expanded && hasLongMessage ? "line-clamp-3" : ""
              }`}
            >
              {student.message || "Tiga tahun yang tak terlupakan. Sampai jumpa di masa depan!"}
            </p>

            {/* Expand toggle */}
            {hasLongMessage && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 flex items-center gap-1 text-yellow-500/50 hover:text-yellow-400 transition-colors"
              >
                <span className="text-[7px] tracking-widest uppercase font-black">
                  {expanded ? "Tutup" : "Selengkapnya"}
                </span>
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={8} />
                </motion.div>
              </button>
            )}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="px-3 py-2 flex items-center justify-between mt-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span className="text-[7px] tracking-[0.2em] uppercase text-zinc-700 font-bold">
            Alumni 2026
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SquadSection({ students, teacher }: SquadProps) {
  // Default teacher data — ganti sesuai data asli
  const walikelas = teacher ?? {
    name: "Nama Wali Kelas",
    photo: "/images/walikelas.jpg",
    subject: "Guru Produktif TKJ",
    message:
      "Kalian adalah murid-murid terbaik yang pernah saya ajar. Teruslah berjuang, jangan berhenti bermimpi. Saya bangga menjadi bagian dari perjalanan kalian.",
  };

  return (
    <section className="relative bg-black pt-20 pb-32 overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 px-4 max-w-lg mx-auto md:max-w-3xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
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

        {/* ── Wali Kelas ── */}
        <TeacherCard teacher={walikelas} />

        {/* ── Students divider ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 font-black">
            {students.length} Siswa
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </motion.div>

        {/* ── Masonry grid ── */}
        <div className="grid grid-cols-2 gap-3">
          {students.map((student, i) => {
            const isTall = i % 4 === 1 || i % 4 === 2;
            return (
              <div key={student.id} className={isTall ? "mt-8" : ""}>
                <StudentCard student={student} i={i} />
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
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