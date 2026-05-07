"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Heart, GraduationCap, Quote, ChevronDown, Share2 } from "lucide-react";

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
      className="relative mb-24 z-20"
    >
      <div className="flex items-center gap-3 mb-6 justify-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/20" />
        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/8 border border-yellow-500/15 rounded-full backdrop-blur-sm">
          <GraduationCap size={10} className="text-yellow-500" />
          <span className="text-[8px] tracking-[0.35em] uppercase font-black text-yellow-500/80">Wali Kelas</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/20" />
      </div>

      <div className="relative rounded-3xl overflow-hidden group shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)]"
        style={{
          background: "rgba(18, 18, 18, 0.8)",
          border: "1px solid rgba(234,179,8,0.2)",
        }}
      >
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="relative mx-auto md:mx-0">
            <div className="relative overflow-hidden rounded-2xl w-[120px] h-[150px] shadow-2xl">
              <Image src={teacher.photo} alt={teacher.name} fill className="object-cover" sizes="120px" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-yellow-500/40 shadow-xl">
              <span className="text-sm">👑</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="text-[7px] tracking-[0.4em] uppercase font-black text-yellow-500/60 mb-2 block">The Navigator</span>
            <h3 className="font-serif italic text-white text-2xl mb-1">{teacher.name}</h3>
            <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold mb-4">{teacher.subject}</p>
            <div className="relative inline-block text-left">
              <Quote size={12} className="text-yellow-500/20 absolute -left-4 -top-2" />
              <p className="text-zinc-400 text-[11px] italic leading-relaxed pl-2">{teacher.message}</p>
            </div>
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
      className="relative z-10 group"
    >
      {/* Node Dot (Garis penyambung akan mengarah ke sini) */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border border-yellow-500/40 rounded-full z-20 group-hover:bg-yellow-500 transition-colors duration-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]" />

      <div className="relative rounded-2xl overflow-hidden flex flex-col bg-zinc-900/90 border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-yellow-500/30 group-hover:-translate-y-1">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-800">
          <Image src={student.photo} alt={student.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <h3 className="font-serif italic text-white text-[12px] leading-tight group-hover:text-yellow-400 transition-colors">{student.name}</h3>
          </div>
        </div>

        <div className="p-3 flex-1 bg-black/40 backdrop-blur-sm">
          <p className={`text-zinc-400 text-[9px] italic leading-relaxed ${!expanded && hasLongMessage ? "line-clamp-2" : ""}`}>
            {student.message || "Tiga tahun yang berharga..."}
          </p>
          {hasLongMessage && (
            <button onClick={() => setExpanded(!expanded)} className="mt-1 flex items-center gap-1 text-yellow-500/50 hover:text-yellow-400">
              <span className="text-[7px] font-black uppercase tracking-widest">{expanded ? "Less" : "More"}</span>
              <ChevronDown size={8} className={`${expanded ? 'rotate-180' : ''} transition-transform`} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SquadSection({ students, teacher }: SquadProps) {
  const walikelas = teacher ?? {
    name: "Wali Kelas",
    photo: "/images/walikelas.jpg",
    subject: "Guru Produktif",
    message: "Teruslah berkarya dan jadilah ahli teknologi yang membanggakan.",
  };

  return (
    <section className="relative bg-black pt-20 pb-32 overflow-hidden">
      {/* ── Background Connected Lines (Identitas TKJ) ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="rgba(234,179,8,0.3)" />
            <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="rgba(234,179,8,0.1)" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Animated Path Line */}
          <motion.path
            d="M 50,0 Q 150,500 50,1000 T 50,2000"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 px-4 max-w-lg mx-auto md:max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 text-yellow-500 mb-5 px-3 py-1.5 bg-yellow-500/5 border border-yellow-500/10 rounded-full">
            <Share2 size={10} />
            <span className="text-[8px] tracking-[0.4em] uppercase font-black">Connected Generation</span>
          </div>
          <h2 className="font-serif italic text-white text-[clamp(3rem,15vw,6rem)] leading-none tracking-tight">
            The <span className="text-yellow-400">Squad</span>
          </h2>
          <p className="mt-4 text-zinc-500 text-[10px] tracking-[0.5em] uppercase font-bold">{students.length} Nodes in One Network</p>
        </motion.div>

        <TeacherCard teacher={walikelas} />

        {/* Masonry Grid with Zig-zag spacing */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12">
          {students.map((student, i) => (
            <div key={student.id} className={`${i % 2 === 1 ? "mt-16" : ""}`}>
              {/* Connector Line between pairs */}
              {i % 2 === 0 && (
                <div className="absolute left-1/2 w-px h-full bg-gradient-to-b from-yellow-500/20 to-transparent -z-10 hidden md:block" />
              )}
              <StudentCard student={student} i={i} />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-32 text-center border-t border-white/5 pt-16">
          <div className="inline-block relative">
             <div className="absolute inset-0 blur-2xl bg-yellow-500/10 rounded-full" />
             <p className="relative text-zinc-600 text-[9px] tracking-[0.5em] uppercase font-black">
               XII TKJ 2 • Brotherhood System
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}