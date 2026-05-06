"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, X, AlertCircle, Ghost, Zap, Heart, Star } from "lucide-react";

const SECRET_PASSWORD = "tkj2kita";
const TOTAL_AIB_PHOTOS = 5;

// Variasi dekorasi lucu
const DECORATIONS = [
  { icon: <Ghost className="text-yellow-400" size={20} />, label: "Aib detected!" },
  { icon: <Zap className="text-blue-400" size={20} />, label: "Kena mental" },
  { icon: <Heart className="text-red-400" size={20} />, label: "Hahaha!" },
  { icon: <Star className="text-purple-400" size={20} />, label: "Legendary" },
];

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
            <div>
              <h2 className="font-serif italic text-2xl text-yellow-500">Secret Vault</h2>
              <p className="text-[8px] tracking-widest text-zinc-500 uppercase font-black">Private Gallery XII TKJ 2</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          {!isUnlocked ? (
            /* --- Screen: Lock --- */
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto w-full">
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 bg-yellow-500/10 rounded-3xl flex items-center justify-center mb-6 border border-yellow-500/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              >
                <Lock className="text-yellow-500" />
              </motion.div>
              <p className="text-zinc-400 text-xs tracking-widest uppercase font-black mb-8">Dilarang Masuk Kecuali Warga TKJ 2</p>
              
              <form onSubmit={handleUnlock} className="w-full space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center focus:border-yellow-500/50 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="Kode Rahasia..."
                />
                <button type="submit" className="w-full bg-yellow-500 text-black font-black text-[10px] tracking-widest uppercase py-4 rounded-2xl active:scale-95 transition-transform hover:bg-yellow-400">
                  Buka Aib Sekarang
                </button>
              </form>

              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center gap-2 text-red-500">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Hayo... bukan anak TKJ ya?</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* --- Screen: Gallery Bervariasi --- */
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 pb-10">
              <div className="col-span-2 mb-4">
                <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                   <p className="text-yellow-500 text-[10px] uppercase tracking-[0.2em] font-black leading-relaxed">
                     ⚠️ PERINGATAN: Konten mengandung kadar lucu yang sangat tinggi. Harap tidak baper.
                   </p>
                </div>
              </div>

              {Array.from({ length: TOTAL_AIB_PHOTOS }).map((_, i) => {
                // Buat variasi acak berdasarkan index
                const randomRot = (i % 2 === 0 ? 3 : -3);
                const deco = DECORATIONS[i % DECORATIONS.length];

                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30, rotate: randomRot }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                    className="relative group"
                  >
                    {/* Frame Foto ala Polaroid Modern */}
                    <div className="bg-zinc-900 p-2 pb-8 rounded-xl border border-white/10 shadow-2xl transition-colors group-hover:border-yellow-500/30">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={`/images/aib/foto${i + 1}.jpg`}
                          alt="Secret Memory"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Sticker Lucu di Pojok Foto */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-1.5 rounded-lg">
                          {deco.icon}
                        </div>
                      </div>
                      
                      {/* Caption Kecil di bawah foto */}
                      <div className="mt-3 px-1">
                        <p className="text-[9px] font-serif italic text-zinc-500 group-hover:text-yellow-500 transition-colors">
                          # {deco.label}
                        </p>
                      </div>
                    </div>

                    {/* Hiasan "Selotip" di bagian atas foto */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/5 backdrop-blur-md border border-white/10 rotate-3 z-20 pointer-events-none opacity-40" />
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