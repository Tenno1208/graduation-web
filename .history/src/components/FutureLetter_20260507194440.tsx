"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Timer, MailOpen } from "lucide-react";

export default function FutureLetter() {
  const [isLocked, setIsLocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  // Tentukan tanggal buka surat (Contoh: 7 Mei 2031)
  const UNLOCK_DATE = new Date("2031-05-07T00:00:00");

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
                  "Simpan link ini. Mari kita buka bersama saat kita sudah <br/> meraih mimpi masing-masing di tahun 2031."
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
                  <p>Jika kamu membaca ini, artinya 5 tahun telah berlalu sejak hari kelulusan kita di XII TKJ 2.</p>
                  <p>Bagaimana kabarmu hari ini? Apakah kamu sudah menjadi Engineer hebat seperti yang kita rencanakan di Lab dulu? Atau mungkin kamu sedang menempuh jalan baru yang lebih indah?</p>
                  <p>Apapun itu, ingatlah bahwa kita pernah berjuang bersama, tertawa bersama, dan tumbuh bersama. Jangan pernah lupakan akar tempatmu belajar.</p>
                  <p className="pt-6 font-serif italic text-yellow-500 text-lg">- Tertanda, Dirimu di Masa Lalu (2026)</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Hiasan Cahaya di Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}