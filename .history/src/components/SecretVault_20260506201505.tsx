"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, X, AlertCircle, Ghost, Zap, Heart, Star, Smile } from "lucide-react";

const SECRET_PASSWORD = "tkj2kita"; 
const TOTAL_AIB_PHOTOS = 20; // Sesuaikan dengan jumlah foto kamu

const DECORATIONS = [
  { icon: <Ghost className="text-yellow-400" size={20} />, label: "Aib Terdeteksi!" },
  { icon: <Zap className="text-blue-400" size={20} />, label: "Kena Mental" },
  { icon: <Heart className="text-red-400" size={20} />, label: "Wkwkwk!" },
  { icon: <Smile className="text-green-400" size={20} />, label: "Momen Epik" },
];

export default function SecretVault({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  // Efek untuk cek apakah sudah pernah login sebelumnya
  useEffect(() => {
    const savedStatus = sessionStorage.getItem("vault_unlocked");
    if (savedStatus === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
      sessionStorage.setItem("vault_unlocked", "true"); // Simpan status agar tidak perlu login lagi
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
          className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-2xl flex flex-col p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="font-serif italic text-2xl text-yellow-500">Gudang Rahasia</h2>
              <p className="text-[8px] tracking-widest text-zinc-500 uppercase font-black">Koleksi Aib XII TKJ 2</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          {!isUnlocked ? (
            /* --- Layar Kunci --- */
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto w-full">
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-6 border border-yellow-500/20"
              >
                <Lock className="text-yellow-500" />
              </motion.div>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-black mb-8 text-center">Hanya Untuk Warga TKJ 2!</p>
              
              <form onSubmit={handleUnlock} className="w-full space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center focus:border-yellow-500/50 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="Sandi Rahasia..."
                />
                <button type="submit" className="w-full bg-yellow-500 text-black font-black text-[10px] tracking-widest uppercase py-4 rounded-2xl active:scale-95 transition-transform">
                  Buka Gerbang Aib
                </button>
              </form>

              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center gap-2 text-red-500">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center">Salah kode, kamu bukan anak TKJ ya?</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* --- Galeri Aib Lucu --- */
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 pb-10">
              <div className="col-span-2 mb-4">
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                   <p className="text-yellow-500 text-[9px] uppercase tracking-[0.2em] font-black leading-relaxed text-center">
                     ⚠️ AWAS: Konten ini mengandung aib tingkat tinggi. Jangan baper!
                   </p>
                </div>
              </div>

              {Array.from({ length: TOTAL_AIB_PHOTOS }).map((_, i) => {
                const randomRot = (i % 2 === 0 ? 4 : -4);
                const deco = DECORATIONS[i % DECORATIONS.length];

                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, rotate: randomRot }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 0, scale: 1.1, zIndex: 10 }}
                    className="relative group"
                  >
                    {/* Polaroid Style */}
                    <div className="bg-zinc-900 p-2 pb-10 rounded-xl border border-white/10 shadow-2xl transition-all group-hover:border-yellow-500/50">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={`/images/aib/foto${i + 1}.jpg`}
                          alt="Momen Aib"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg">
                          {deco.icon}
                        </div>
                      </div>
                      <div className="mt-4 px-1 text-center">
                        <p className="text-[10px] font-serif italic text-zinc-500 group-hover:text-yellow-500 transition-colors">
                          # {deco.label}
                        </p>
                      </div>
                    </div>
                    {/* Efek Selotip Lucu */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/10 -rotate-3 z-20 pointer-events-none rounded-sm" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}