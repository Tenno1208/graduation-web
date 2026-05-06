"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, X, AlertCircle } from "lucide-react";

const SECRET_PASSWORD = "tkj2kita"; // Ganti sandi di sini
const TOTAL_AIB_PHOTOS = 5; // Sesuaikan jumlah foto aib kamu

export default function SecretVault({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-serif italic text-2xl text-yellow-500">Secret Vault</h2>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
          </div>

          {!isUnlocked ? (
            /* --- Screen: Lock --- */
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto w-full">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-6 border border-yellow-500/20">
                <Lock className="text-yellow-500" />
              </div>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-black mb-8">Masukkan Kode Akses</p>
              
              <form onSubmit={handleUnlock} className="w-full space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center focus:border-yellow-500/50 outline-none transition-all"
                  placeholder="••••••••"
                />
                <button type="submit" className="w-full bg-yellow-500 text-black font-black text-[10px] tracking-widest uppercase py-4 rounded-2xl active:scale-95 transition-transform">
                  Buka Kenangan
                </button>
              </form>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex items-center gap-2 text-red-500">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Sandi Salah, Kawan!</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* --- Screen: Gallery --- */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-6">
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-black italic">
                  "Hanya untuk konsumsi internal XII TKJ 2"
                </p>
              </div>
              {Array.from({ length: TOTAL_AIB_PHOTOS }).map((_, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl">
                  <Image
                    src={`/images/aib/foto${i + 1}.jpg`} 
                    alt="Secret Memory"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}