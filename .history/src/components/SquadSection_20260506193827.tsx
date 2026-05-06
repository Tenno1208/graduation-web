"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Heart, Crown, GraduationCap, Quote, User } from "lucide-react";

// --- Types ---

interface Student {
  id: number | string;
  name: string;
  photo: string;
  message: string;
}

interface Teacher extends Student {
  role: "walikelas";
  nip?: string;
}

interface SquadProps {
  students: Student[];
  teacher?: Teacher; // Data Walikelas Opsional
}

// --- Components ---

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-8 relative group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000" />
      
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-yellow-500/30 shadow-2xl">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={teacher.photo}
            alt={teacher.name}
            fill
            className="object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 ease-out"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-yellow-500 rounded-full">
                <Crown size={12} className="text-black fill-current" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-yellow-500">
                Wali Kelas
              </span>
            </div>

            {/* Name */}
            <h3 className="font-serif text-3xl text-white font-bold leading-tight mb-4">
              {teacher.name}
            </h3>

            {/* Message - Full Length */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 text-yellow-500/20 w-8 h-8" />
              <p className="text-zinc-300 text-xs leading-relaxed font-sans border-l-2 border-yellow-500/50 pl-3">
                "{teacher.message}"
              </p>
            </div>

            {teacher.nip && (
              <p className="mt-4 text-zinc-500 text-[9px] font-mono tracking-wider">
                NIP. {teacher.nip}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StudentCard({ student, i }: { student: Student; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group break-inside-avoid mb-4" // Tailwind untuk CSS Columns
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/[0.08] hover:border-white/20 transition-all duration-500 shadow-lg hover:-translate-y-1">
        
        {/* Photo Container - Height adjusts to content */}
        <div className="relative w-full bg-zinc-800">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={student.photo}
              alt={student.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </div>

          {/* Overlay Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent transition-all duration-500 group-hover:via-zinc-950/80" />

          {/* Number Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="font-mono text-[9px] text-zinc-500 bg-black/40 backdrop-blur px-2 py-1 rounded-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-4 transition-all duration-500">
            <h3 className="font-serif italic text-white text-base leading-tight mb-2 drop-shadow-lg group-hover:text-yellow-100 transition-colors">
              {student.name}
            </h3>
            
            {/* Pesan - Auto Expand Logic */}
            <div 
              className={`overflow-hidden transition-all duration-700 ease-in-out ${
                isHovered ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-2 border-t border-white/10">
                <p className="text-zinc-300 text-[10px] leading-relaxed font-sans whitespace-pre-wrap">
                  "{student.message || "Tiga tahun yang tak terlupakan."}"
                </p>
              </div>
            </div>

            {!isHovered && (
               <div className="flex items-center gap-1 text-[9px] text-zinc-500 group-hover:text-yellow-500/80 transition-colors">
                 <span className="uppercase tracking-widest">Baca Pesan</span>
                 <div className="w-4 h-[1px] bg-current"></div>
               </div>
            )}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="px-4 py-2 flex items-center justify-between bg-zinc-900 border-t border-white/5">
          <span className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 font-bold">
            Alumni 2026
          </span>
          <User size={8} className="text-zinc-700" />
        </div>
      </div>
    </motion.div>
  );
}

export default function SquadSection({ students, teacher }: SquadProps) {
  return (
    <section className="relative bg-black text-white pt-24 pb-32 overflow-hidden selection:bg-yellow-500 selection:text-black">

      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-yellow-500 mb-6 px-3 py-1.5 bg-yellow-500/5 border border-yellow-500/15 rounded-full backdrop-blur-sm">
            <Heart size={10} fill="currentColor" />
            <span className="text-[8px] tracking-[0.35em] uppercase font-black">Unforgettable Souls</span>
          </div>

          <h2 className="font-serif italic text-white leading-none text-[clamp(3.5rem,10vw,7rem)] tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600">Squad</span>
          </h2>

          <p className="mt-6 text-zinc-500 text-[11px] tracking-widest uppercase font-bold">
            {students.length} Jiwa · {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* Layout: Left (Teacher/Sticky), Right (Students/Masonry) */}
        <div className="flex flex-col xl:flex-row gap-12">
          
          {/* Kolom Kiri: Wali Kelas (Fixed/Sticky di Desktop) */}
          {teacher && (
            <div className="w-full xl:w-1/4 xl:sticky xl:top-28 h-fit">
               <div className="flex items-center gap-2 mb-4">
                  <div className="h-px bg-zinc-800 flex-1"></div>
                  <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase font-bold">Mentor</span>
                  <div className="h-px bg-zinc-800 flex-1"></div>
               </div>
               <TeacherCard teacher={teacher} />
            </div>
          )}

          {/* Kolom Kanan: Grid Siswa (Masonry Columns) */}
          <div className="w-full xl:w-3/4">
             <div className="flex items-center gap-2 mb-6">
                <div className="h-px bg-zinc-800 flex-1"></div>
                <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase font-bold">Students</span>
                <div className="h-px bg-zinc-800 flex-1"></div>
             </div>

             {/* Masonry Logic: Menggunakan CSS Columns untuk auto-height cards */}
             <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {students.map((student, i) => (
                <StudentCard key={student.id} student={student} i={i} />
              ))}
             </div>
          </div>

        </div>

        {/* Footer caption */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-32 text-center"
        >
          <div className="inline-block relative mb-4">
             <GraduationCap className="w-8 h-8 text-zinc-800 mx-auto" />
             <div className="absolute inset-0 blur-xl bg-yellow-500/10"></div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-500/40 to-transparent mx-auto mb-6" />
          <p className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase font-bold">
            XII TKJ 2 · 2023–2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}