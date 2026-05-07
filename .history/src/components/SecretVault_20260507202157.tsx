"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Lock,
  X,
  AlertCircle,
  Ghost,
  Zap,
  Heart,
  Star,
  Smile,
  Skull,
  Flame,
  ShieldAlert,
  Laugh,
} from "lucide-react";

const SECRET_PASSWORD = "tkj2kita";
const TOTAL_AIB_PHOTOS = 20;

const ERROR_MESSAGES = [
  "Kode salah. Lu penyusup Kelas sebelahya?",
  "Salah cuy. Anak TKJ mah hafal beginian.",
  "Akses ditolak. Aura non-TKJ terdeteksi.",
  "Kata sandi ngawur. Fokus woi.",
  "Masih salah juga. Sistem mulai muak.",
];

const PHOTO_VARIANTS = [
  {
    title: "CPU Overheat",
    desc: "Muka panik pas disuruh maju presentasi.",
    rotate: "-rotate-3",
    tape: "rotate-2",
    icon: <Flame className='text-orange-400' size={18} />,
  },
  {
    title: "Mental Error",
    desc: "Pas ketahuan belum ngerjain tugas.",
    rotate: "rotate-2",
    tape: "-rotate-3",
    icon: <ShieldAlert className='text-red-400' size={18} />,
  },
  {
    title: "NPC Moment",
    desc: "Tatapan kosong habis remed lagi.",
    rotate: "-rotate-2",
    tape: "rotate-1",
    icon: <Ghost className='text-yellow-400' size={18} />,
  },
  {
    title: "Download Otak",
    desc: "Loading jawab pertanyaan guru.",
    rotate: "rotate-3",
    tape: "-rotate-2",
    icon: <Zap className='text-blue-400' size={18} />,
  },
  {
    title: "Senyum Palsu",
    desc: "Padahal nilai udah ancur.",
    rotate: "-rotate-1",
    tape: "rotate-3",
    icon: <Laugh className='text-pink-400' size={18} />,
  },
  {
    title: "Aib Nasional",
    desc: "Foto ini dilarang masuk rapat alumni.",
    rotate: "rotate-1",
    tape: "-rotate-1",
    icon: <Skull className='text-zinc-300' size={18} />,
  },
];

export default function SecretVault({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const savedStatus = sessionStorage.getItem("vault_unlocked");

    if (savedStatus === "true") {
      setIsUnlocked(true);
    }
  }, []);

  // cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();

    if (cooldown > 0) return;

    if (password.toLowerCase() === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
      sessionStorage.setItem("vault_unlocked", "true");
    } else {
      const nextError = errorCount + 1;

      setError(true);
      setErrorCount(nextError);

      setTimeout(() => setError(false), 2000);

      // cooldown setelah 5x gagal
      if (nextError >= 5) {
        setCooldown(20);
        setErrorCount(0);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex flex-col p-6 overflow-y-auto"
        >
          {/* bg glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full" />
          </div>

          {/* Header */}
          <div className="relative z-10 flex justify-between items-center mb-10">
            <div>
              <h2 className="font-serif italic text-3xl text-yellow-500">
                Gudang Rahasia
              </h2>

              <p className="text-[8px] tracking-[0.3em] text-zinc-500 uppercase font-black">
                Koleksi Dosa Digital XII TKJ 2
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {!isUnlocked ? (
            // ─── LOCK SCREEN ─────────────────────────────
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full"
            >
              {/* animated lock */}
              <motion.div
                animate={{
                  rotate: [0, -8, 8, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                }}
                className="relative mb-8"
              >
                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full scale-150" />

                <div className="relative w-24 h-24 rounded-[2rem] bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center backdrop-blur-xl">
                  <Lock className="text-yellow-500" size={34} />
                </div>
              </motion.div>

              <p className="text-zinc-400 text-[10px] tracking-[0.35em] uppercase font-black mb-8 text-center leading-relaxed">
                AREA TERLARANG
                <br />
                KHUSUS ANAK TKJ 2
              </p>

              <form
                onSubmit={handleUnlock}
                className="w-full space-y-4"
              >
                <input
                  type="password"
                  value={password}
                  disabled={cooldown > 0}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-center focus:border-yellow-500/50 outline-none transition-all placeholder:text-zinc-700"
                  placeholder={
                    cooldown > 0
                      ? `Tunggu ${cooldown} detik`
                      : "Masukkan kode rahasia..."
                  }
                />

                <button
                  disabled={cooldown > 0}
                  type="submit"
                  className="w-full bg-yellow-500 text-black font-black text-[10px] tracking-[0.3em] uppercase py-5 rounded-3xl active:scale-95 transition-all disabled:opacity-40"
                >
                  {cooldown > 0
                    ? "Sistem Mengunci..."
                    : "Buka Gudang Aib"}
                </button>
              </form>

              {/* error */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key={errorCount}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 flex items-center gap-2 text-red-500 text-center"
                  >
                    <AlertCircle size={15} />

                    <span className="text-[10px] font-black uppercase tracking-wider">
                      {
                        ERROR_MESSAGES[
                          Math.min(
                            errorCount - 1,
                            ERROR_MESSAGES.length - 1
                          )
                        ]
                      }
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* warning */}
              {cooldown > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 text-center"
                >
                  <p className="text-[9px] uppercase tracking-[0.3em] text-yellow-500 font-black">
                    terlalu banyak gagal.
                  </p>

                  <p className="text-zinc-600 text-[9px] mt-2 italic">
                    Sistem mulai curiga lu anak kelas sebelah.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            // ─── GALLERY ─────────────────────────────
            <div className="relative z-10">
              {/* top warning */}
              <div className="mb-10">
                <div className="p-5 rounded-3xl bg-yellow-500/5 border border-yellow-500/10 backdrop-blur-xl">
                  <p className="text-center text-yellow-500 text-[9px] uppercase tracking-[0.3em] font-black leading-relaxed">
                    ⚠ konten mengandung cringe, mental breakdown,
                    <br />
                    dan bukti nyata kurang tidur
                  </p>
                </div>
              </div>

              {/* gallery */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 pb-10">
                {Array.from({
                  length: TOTAL_AIB_PHOTOS,
                }).map((_, i) => {
                  const variant =
                    PHOTO_VARIANTS[i % PHOTO_VARIANTS.length];

                  return (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 40,
                        rotate: 0,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.05,
                        rotate: 0,
                        zIndex: 20,
                      }}
                      className={`relative group ${variant.rotate}`}
                    >
                      {/* tape */}
                      <div
                        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-yellow-500/20 border border-yellow-500/10 backdrop-blur-md z-20 rounded-sm ${variant.tape}`}
                      />

                      {/* glow */}
                      <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/10 blur-2xl transition-all duration-500 rounded-[2rem]" />

                      {/* card */}
                      <div className="relative bg-zinc-900/90 border border-white/10 rounded-[2rem] p-3 pb-12 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 group-hover:border-yellow-500/40">
                        {/* top deco */}
                        <div className="absolute top-3 right-3 z-20">
                          <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                            {variant.icon}
                          </div>
                        </div>

                        {/* image */}
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-800">
                          <Image
                            src={`/images/aib/foto${i + 1}.jpg`}
                            alt="Momen Aib"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </div>

                        {/* text */}
                        <div className="mt-5 text-center">
                          <h3 className="text-[13px] text-yellow-500 font-serif italic">
                            {variant.title}
                          </h3>

                          <p className="mt-2 text-[9px] text-zinc-500 leading-relaxed">
                            {variant.desc}
                          </p>
                        </div>

                        {/* bottom label */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                          <span className="text-[7px] uppercase tracking-[0.3em] text-zinc-700 font-black">
                            FILE #{String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}