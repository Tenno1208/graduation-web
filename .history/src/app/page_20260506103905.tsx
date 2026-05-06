"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { students } from "@/data/students";
import LandingGate from "@/components/LandingGate";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import SquadSection from "@/components/SquadSection";

const graduationQuotes = [
  "Masa depan milik mereka yang percaya pada keindahan mimpi.",
  "Perpisahan bukan akhir, tapi awal dari petualangan baru.",
  "Tiga tahun penuh cerita, selamanya dalam ingatan.",
  "Terima kasih telah menjadi bagian dari perjalanan hebat ini.",
  "Sukses bukan tentang kunci, tapi tentang keberanian untuk melangkah.",
  "Jarak mungkin memisahkan, tapi kenangan tetap menyatukan.",
  "Gapailah cita-citamu setinggi langit, namun tetaplah membumi.",
  "XII TKJ 2: Datang sebagai asing, berpisah sebagai keluarga.",
  "Ilmu adalah harta yang akan selalu mengikuti pemiliknya.",
  "Setiap detik di kelas ini adalah investasi untuk masa depan.",
  "Jangan takut melangkah, dunia sedang menunggumu.",
  "Teruslah bersinar kemanapun takdir membawamu.",
  "Kita akan bertemu lagi di puncak kesuksesan masing-masing.",
];

// ─── Closing Quote Section ────────────────────────────────────────────────────
function ClosingSection() {
  return (
    <section className="relative bg-black overflow-hidden py-36 px-6">
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Amber glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(161,123,35,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-sm mx-auto text-center"
      >
        {/* Decorative open quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-[7rem] leading-none text-yellow-500/15 select-none mb-[-1.5rem]"
        >
          "
        </motion.div>

        <p className="font-serif italic text-[clamp(1.25rem,6vw,2rem)] text-zinc-200 leading-[1.5] mb-4">
          Bukan tentang seberapa sering kita bertemu, tapi tentang seberapa dalam kita{" "}
          <span className="text-yellow-400">saling mengenang.</span>
        </p>

        {/* Attribution line */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="h-px w-8 bg-yellow-500/30" />
          <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-600 font-black">
            XII TKJ 2 · 2026
          </span>
          <div className="h-px w-8 bg-yellow-500/30" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <footer
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6"
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Big ghost background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className="font-serif italic text-white/[0.03] leading-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(5rem, 45vw, 22rem)" }}
        >
          2026
        </span>
      </div>

      {/* Horizontal scan line decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow pulse */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 55%, rgba(161,123,35,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Main text block */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-500/40" />
          <span className="text-[8px] tracking-[0.5em] uppercase font-black text-yellow-500/60">
            Until We Meet Again
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-500/40" />
        </motion.div>

        {/* Hero headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif italic leading-[0.88] text-white tracking-tight"
          style={{ fontSize: "clamp(4.5rem, 24vw, 12rem)" }}
        >
          See You
          <br />
          <span className="text-yellow-400">On Top!</span>
        </motion.h2>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent my-10 origin-center"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-zinc-400 text-[12px] font-light italic leading-relaxed max-w-[240px] mb-12"
        >
          Terima kasih sudah menjadi bagian dari cerita yang paling indah.
        </motion.p>

        {/* Class badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.34, 1.4, 0.64, 1] }}
          className="flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Dot pulse */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
          </span>
          <span className="text-[8px] tracking-[0.45em] uppercase font-black text-zinc-400">
            XII TKJ 2 · Class of 2026
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom corner watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 bg-gradient-to-b from-yellow-500/30 to-transparent" />
        <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 font-black">
          Made with 🤍 · 2026
        </p>
      </motion.div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % graduationQuotes.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      setIsPlaying(true);
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="bg-black text-white scroll-smooth">
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      <AnimatePresence mode="wait">
        {!hasStarted && <LandingGate onEnter={startExperience} />}
      </AnimatePresence>

      {hasStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />

          <HeroSection index={index} quote={graduationQuotes[index]} />

          <SquadSection students={students} />

          <ClosingSection />

          <Footer />
        </motion.div>
      )}
    </main>
  );
}