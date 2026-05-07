"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  GraduationCap,
  Quote,
  ChevronDown,
} from "lucide-react";

interface SquadProps {
  students: any[];
  teacher?: {
    name: string;
    photo: string;
    subject?: string;
    message?: string;
  };
}

function TeacherCard({
  teacher,
}: {
  teacher: NonNullable<SquadProps["teacher"]>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="relative mb-24"
    >
      {/* vertical connector */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 w-px h-20 bg-gradient-to-b from-yellow-500/40 to-transparent" />

      {/* orbit glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[260px] h-[260px] rounded-full border border-yellow-500/10" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-white/[0.03]" />
      </div>

      {/* top label */}
      <div className="flex justify-center mb-6">
        <div className="px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-2">
          <GraduationCap size={11} className="text-yellow-500" />

          <span className="text-[8px] uppercase tracking-[0.35em] font-black text-yellow-500/80">
            Wali Kelas
          </span>
        </div>
      </div>

      {/* main */}
      <div className="relative flex flex-col items-center text-center">
        {/* photo wrapper */}
        <div className="relative mb-6">
          {/* glow */}
          <div className="absolute inset-0 bg-yellow-500/20 blur-3xl scale-150 rounded-full opacity-40" />

          {/* outer ring */}
          <div className="relative p-2 rounded-full border border-yellow-500/20 bg-white/[0.02] backdrop-blur-xl">
            <div className="relative w-36 h-44 rounded-[2rem] overflow-hidden border border-yellow-500/20 shadow-2xl">
              <Image
                src={teacher.photo}
                alt={teacher.name}
                fill
                className="object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* crown */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border border-yellow-500/30 flex items-center justify-center shadow-lg">
            <span className="text-sm">👑</span>
          </div>

          {/* floating dots */}
          <span className="absolute top-10 -left-4 w-2 h-2 rounded-full bg-yellow-500/40 animate-pulse" />
          <span className="absolute bottom-8 -right-4 w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
        </div>

        {/* name */}
        <div className="mb-3">
          <p className="text-[8px] tracking-[0.35em] uppercase text-yellow-500/60 font-black mb-2">
            Pembimbing Terbaik
          </p>

          <h3 className="text-white font-serif italic text-[28px] leading-none">
            {teacher.name}
          </h3>

          {teacher.subject && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
              {teacher.subject}
            </p>
          )}
        </div>

        {/* divider */}
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent mb-5" />

        {/* message */}
        {teacher.message && (
          <div
            className="relative max-w-md rounded-3xl px-5 py-5 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* quote glow */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 blur-2xl" />

            <Quote
              size={16}
              className="text-yellow-500/30 mx-auto mb-3"
            />

            <p className="text-zinc-400 italic text-[11px] leading-relaxed relative z-10">
              {teacher.message}
            </p>
          </div>
        )}

        {/* bottom metadata */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px w-10 bg-white/10" />

          <span className="text-[8px] tracking-[0.35em] uppercase text-zinc-700 font-black">
            XII TKJ 2 · 2023–2026
          </span>

          <div className="h-px w-10 bg-white/10" />
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
      transition={{
        duration: 0.7,
        delay: (i % 4) * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative group"
    >
      {/* connector line */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-transparent to-white/10" />

      {/* side connector */}
      {i % 2 === 0 && (
        <div className="absolute top-10 right-[-12px] w-6 h-px bg-white/10" />
      )}

      {i % 2 === 1 && (
        <div className="absolute top-10 left-[-12px] w-6 h-px bg-white/10" />
      )}

      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-xl"
        style={{
          background: "rgba(24,24,27,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* top glow */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none z-10" />

        {/* Photo */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
          <Image
            src={student.photo}
            alt={student.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
            sizes="(max-width: 640px) 50vw, 33vw"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

          {/* Hover ring */}
          <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-yellow-400/25 transition-all duration-500 z-20 pointer-events-none rounded-t-2xl" />

          {/* Number */}
          <div className="absolute top-3 left-3 z-20">
            <span className="font-mono text-[8px] text-zinc-600 tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* floating dot */}
          <div className="absolute top-3 right-3 z-20">
            <span className="block w-1.5 h-1.5 rounded-full bg-yellow-500/50 animate-pulse" />
          </div>

          {/* Name overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3">
            <h3 className="font-serif italic text-white text-[13px] leading-tight drop-shadow-lg">
              {student.name}
            </h3>
          </div>
        </div>

        {/* Message */}
        <div className="px-3 pt-3 pb-1 flex-1 flex flex-col relative z-10">
          <div className="relative mb-1">
            <Quote size={8} className="text-yellow-500/25 mb-1" />

            <p
              className={`text-zinc-400 text-[9px] italic leading-relaxed transition-all duration-300 ${
                !expanded && hasLongMessage ? "line-clamp-3" : ""
              }`}
            >
              {student.message ||
                "Tiga tahun yang tak terlupakan. Sampai jumpa di masa depan!"}
            </p>

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
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
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
export default function SquadSection({
  students,
  teacher,
}: SquadProps) {
  const walikelas = teacher ?? {
    name: "Nama Wali Kelas",
    photo: "/images/walikelas.jpg",
    subject: "Guru Produktif TKJ",
    message:
      "Kalian adalah murid-murid terbaik yang pernah saya ajar. Teruslah berjuang, jangan berhenti bermimpi. Saya bangga menjadi bagian dari perjalanan kalian.",
  };

  return (
    <section className="relative bg-black pt-20 pb-32 overflow-hidden">
      {/* bg radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.08),transparent_40%)]" />

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 text-yellow-500 mb-5 px-3 py-1.5 bg-yellow-500/5 border border-yellow-500/15 rounded-full">
            <Heart size={10} fill="currentColor" />

            <span className="text-[8px] tracking-[0.35em] uppercase font-black">
              Unforgettable Souls
            </span>
          </div>

          <h2 className="font-serif italic text-white leading-none text-[clamp(3.5rem,18vw,7rem)] tracking-tight">
            The <span className="text-yellow-400">Squad</span>
          </h2>

          <p className="mt-4 text-zinc-500 text-[11px] tracking-widest uppercase font-bold">
            {students.length} jiwa yang tak terlupakan
          </p>
        </motion.div>

        {/* teacher */}
        <TeacherCard teacher={walikelas} />

        {/* divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="h-px flex-1 bg-white/5" />

          <span className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 font-black">
            {students.length} Siswa
          </span>

          <div className="h-px flex-1 bg-white/5" />
        </motion.div>

        {/* center timeline */}
        <div className="absolute left-1/2 top-[520px] bottom-24 -translate-x-1/2 w-px bg-gradient-to-b from-white/10 via-yellow-500/10 to-transparent pointer-events-none" />

        {/* grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 relative">
          {students.map((student, i) => {
            const isTall = i % 4 === 1 || i % 4 === 2;

            return (
              <div key={student.id} className={isTall ? "mt-8" : ""}>
                <StudentCard student={student} i={i} />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 text-center"
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