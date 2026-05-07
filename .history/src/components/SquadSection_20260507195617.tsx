"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
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
      className="relative mb-20"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/20" />
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
          <GraduationCap size={10} className="text-yellow-500" />
          <span className="text-[8px] tracking-[0.35em] uppercase font-black text-yellow-500">
            Wali Kelas
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/20" />
      </div>

      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden z-20"
        style={{
          background: "linear-gradient(135deg, rgba(234,179,8,0.1) 0%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(234,179,8,0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="flex gap-5 p-6">
          <div className="relative flex-shrink-0">
            <div className="relative overflow-hidden rounded-2xl w-[100px] h-[120px]">
              <Image
                src={teacher.photo}
                alt={teacher.name}
                fill
                className="object-cover"
                sizes="100px"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-yellow-400/30 rounded-2xl" />
            </div>
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center bg-black border border-yellow-500/40 shadow-lg">
              <span className="text-[12px]">👑</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[7px] tracking-[0.35em] uppercase font-black text-yellow-500/70">
              The Mentor
            </span>
            <h3 className="font-serif italic text-white text-[20px] leading-tight mb-1">
              {teacher.name}
            </h3>
            {teacher.subject && (
              <p className="text-[9px] tracking-widest uppercase text-zinc-500 font-bold mb-3">
                {teacher.subject}
              </p>
            )}
            <div className="w-8 h-px bg-yellow-500/30 mb-3" />
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
      </div>

      {/* NEW: Vertical Connector from Teacher to Students */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-yellow-500/40 via-yellow-500/10 to-transparent z-0" />
    </motion.div>
  );
}

// ─── Student Card ─────────────────────────────────────────────────────────────
function StudentCard({ student, i }: { student: any; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasLongMessage = (student.message || "").length > 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
      className="relative group pb-6"
    >
      {/* NEW: Connecting Line to the side (Desktop/Grid) */}
      <div className={`absolute top-1/2 -translate-y-1/2 h-px w-4 bg-white/5 z-0 ${i % 2 === 0 ? '-right-4' : '-left-4'}`} />

      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          background: "rgba(18,18,18,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
          <Image
            src={student.photo}
            alt={student.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-2 left-2 z-20">
            <span className="font-mono text-[7px] text-zinc-500 bg-black/40 px-1.5 py-0.5 rounded">
              #{String(i + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-3">
            <h3 className="font-serif italic text-white text-[13px] leading-tight">
              {student.name}
            </h3>
          </div>
        </div>

        <div className="px-3 pt-3 pb-2 flex-1 flex flex-col">
          <p className={`text-zinc-400 text-[9px] italic leading-relaxed ${!expanded && hasLongMessage ? "line-clamp-2" : ""}`}>
            "{student.message || "Tiga tahun yang luar biasa!"}"
          </p>

          {hasLongMessage && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1 text-[7px] uppercase font-black text-yellow-500/60 hover:text-yellow-400 flex items-center gap-1"
            >
              {expanded ? "Tutup" : "Lainnya"} <ChevronDown size={6} className={expanded ? "rotate-180" : ""} />
            </button>
          )}
        </div>

        <div className="px-3 py-1.5 border-t border-white/5 flex justify-between items-center bg-black/20">
          <span className="text-[6px] tracking-widest uppercase text-zinc-600 font-bold">Class of '26</span>
          <div className="w-1 h-1 rounded-full bg-yellow-500/20" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SquadSection({ students, teacher }: SquadProps) {
  const walikelas = teacher ?? {
    name: "Drs. Budi Santoso",
    photo: "/images/teacher.jpg",
    subject: "Head of Networking Department",
    message: "Jadilah ahli yang rendah hati, teknologi akan berubah tapi integritas tetap abadi.",
  };

  return (
    <section className="relative bg-[#050505] pt-24 pb-32 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-yellow-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 px-6 max-w-lg mx-auto md:max-w-3xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-yellow-500 mb-6 px-4 py-1 border border-yellow-500/20 rounded-full bg-yellow-500/5">
            <Heart size={10} className="animate-pulse" fill="currentColor" />
            <span className="text-[8px] tracking-[0.4em] uppercase font-black">The Core Memories</span>
          </div>
          <h2 className="font-serif italic text-white text-[clamp(3rem,12vw,5.5rem)] leading-[0.9] mb-4">
            Our <span className="text-yellow-500">Squad.</span>
          </h2>
          <div className="h-0.5 w-12 bg-yellow-500/40 mx-auto" />
        </motion.div>

        {/* Wali Kelas */}
        <TeacherCard teacher={walikelas} />

        {/* Students Grid */}
        <div className="relative">
          {/* NEW: Central Vertical Line through Grid */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent z-0 hidden md:block" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {students.map((student, i) => {
              // Tampilan selang-seling (Masonry-like)
              const isTall = i % 2 === 1;
              return (
                <div key={student.id || i} className={isTall ? "mt-10" : ""}>
                  <StudentCard student={student} i={i} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center border-t border-white/5 pt-12"
        >
          <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-500 font-bold">
            Technical High School · XII TKJ 2 · 2026
          </p>
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-yellow-500/20" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}