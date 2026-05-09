"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Timer, MailOpen } from "lucide-react";

export default function FutureLetter() {
  const [isLocked, setIsLocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  // Tentukan tanggal buka surat (Contoh: 7 Mei 2024)
  const UNLOCK_DATE = new Date("2030-05-07T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = UNLOCK_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        setIsLocked(false);
        clearInterval(timer);
      } else {
        // Hitung mundur sederhana (Hari)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setTimeLeft(`${days} Hari Lagi`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 bg-black relative overflow-hidden">
      <div className="max-w-2xl mx-auto border border-white/5 bg-zinc-900/20 rounded-3xl p-8 backdrop-blur-sm relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <AnimatePresence mode="wait">
            {isLocked ? (
              /* --- Tampilan Terkunci --- */
              <motion.div 
                key="locked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                  <Lock className="text-yellow-500 animate-pulse" size={24} />
                </div>
                <h3 className="font-serif italic text-2xl text-white mb-2">Surat Untuk Masa Depan</h3>
                <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-black mb-6">Pesan ini masih disegel</p>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <Timer size={14} className="text-zinc-400" />
                  <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">{timeLeft}</span>
                </div>
                
                <p className="mt-8 text-zinc-600 text-[10px] italic leading-relaxed italic">
                  "Simpan link ini. Mari kita buka bersama saat kita sudah <br/> meraih mimpi masing-masing di tahun 2030."
                </p>
              </motion.div>
            ) : (
              /* --- Tampilan Terbuka (Isi Surat) --- */
              <motion.div 
                key="unlocked"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-left"
              >
                <div className="flex items-center gap-3 mb-8 text-yellow-500">
                  <MailOpen size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Terbuka Otomatis</span>
                </div>
                <h3 className="font-serif italic text-3xl text-white mb-6">Halo, Rekan Seperjuangan.</h3>
                <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-light">
                  <p>Jika kamu membaca ini, artinya 4 tahun telah berlalu sejak hari kelulusan kita di XII TKJ 2.</p>
                  <p>Bagaimana kabarmu hari ini? Apakah kamu sudah menjadi Engineer hebat seperti yang kita rencanakan di Lab dulu? Atau mungkin kamu sedang menempuh jalan baru yang lebih indah?</p>
                  <p>Apapun itu, ingatlah bahwa kita pernah berjuang bersama, tertawa bersama, dan tumbuh bersama. Jangan pernah lupakan akar tempatmu belajar.</p>
                  <p className="pt-6 font-serif italic text-yellow-500 text-lg">- Tertanda, Dirimu di Masa Lalu (2026)</p>
                </div>
              </motion.div>
            )}"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, MailOpen, Sparkles, Clock } from "lucide-react";

export default function FutureLetter() {
  const [isLocked, setIsLocked] = useState(true);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const UNLOCK_DATE = new Date("2030-05-07T00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = UNLOCK_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setIsLocked(false);
        clearInterval(timer);
      } else {
        setCountdown({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Efek Partikel Melayang */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: i * 2,
            }}
            className="absolute w-1 h-1 bg-yellow-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {isLocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              className="relative group"
            >
              {/* Outer Glow Card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/0 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              
              <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    boxShadow: ["0 0 0px rgba(234,179,8,0)", "0 0 20px rgba(234,179,8,0.2)", "0 0 0px rgba(234,179,8,0)"]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-10 border border-yellow-500/20 shadow-2xl"
                >
                  <Lock className="text-yellow-500" size={32} />
                </motion.div>

                <h3 className="font-serif italic text-3xl md:text-4xl text-white mb-4 tracking-tight">
                  Surat Untuk <span className="text-yellow-500">Masa Depan</span>
                </h3>
                
                <p className="text-zinc-500 text-xs tracking-[0.4em] uppercase font-black mb-12 flex items-center gap-3">
                  <span className="w-8 h-px bg-zinc-800" />
                  Pesan Tersegel
                  <span className="w-8 h-px bg-zinc-800" />
                </p>

                {/* Countdown Grid */}
                <div className="grid grid-cols-4 gap-4 mb-12 w-full max-w-sm">
                  {[
                    { label: "Hari", val: countdown.d },
                    { label: "Jam", val: countdown.h },
                    { label: "Men", val: countdown.m },
                    { label: "Det", val: countdown.s },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-xl md:text-2xl font-mono font-bold text-white mb-1">
                        {String(item.val).padStart(2, '0')}
                      </div>
                      <div className="text-[8px] uppercase tracking-widest text-zinc-600 font-black">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="h-px w-12 bg-yellow-500/30" />
                  <p className="text-zinc-400 text-[11px] leading-relaxed italic max-w-xs">
                    "Simpan link ini dalam kenanganmu. Mari kita baca bersama saat impian telah di genggaman."
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              className="relative bg-zinc-900/30 backdrop-blur-3xl border border-yellow-500/10 rounded-[2.5rem] p-10 md:p-20 overflow-hidden"
            >
              {/* Efek Surat Terbuka */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={120} className="text-yellow-500" />
              </div>

              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                  <MailOpen className="text-black" size={24} />
                </div>
                <div>
                  <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-1">Pesan Terbuka</span>
                  <span className="text-zinc-500 text-[10px] font-mono italic">Dipulihkan pada: {new Date().toLocaleDateString('id-ID')}</span>
                </div>
              </div>

              <h3 className="font-serif italic text-4xl md:text-5xl text-white mb-10 leading-tight">
                Halo, Rekan <br/> <span className="text-yellow-500">Seperjuangan.</span>
              </h3>

              <div className="space-y-6 text-zinc-300 text-base md:text-lg leading-relaxed font-light font-serif italic">
                <p>Jika kamu membaca ini, artinya ribuan hari telah berlalu sejak tawa kita menggema di koridor sekolah dan deru PC di Lab TKJ.</p>
                <p>Bagaimana kabarmu di masa depan? Apakah beban pekerjaan terasa lebih ringan dari tugas produktif kita dulu? Ataukah kamu sudah menjadi sosok hebat yang dulu sering kita diskusikan saat istirahat?</p>
                <p>Ingatlah, apapun jalan yang kamu ambil, kamu adalah bagian dari XII TKJ 2. Tempat di mana kita pernah bermimpi tanpa takut jatuh.</p>
                
                <div className="pt-12 flex flex-col items-start gap-2 border-t border-white/5">
                  <p className="text-yellow-500 text-xl font-serif">- Tertanda, Dirimu di 2026</p>
                  <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-black">Fly High, Class of 2026</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Glows */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full" />
    </section>
  );
}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Hiasan Cahaya di Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}