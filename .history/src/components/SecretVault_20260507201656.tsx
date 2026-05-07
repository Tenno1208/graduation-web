"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, X, AlertCircle, Ghost, Zap, Heart, Smile, Bomb, Eye, Camera, Clock } from "lucide-react";

const SECRET_PASSWORD = "tkj2kita";
const TOTAL_AIB_PHOTOS = 20;
const MAX_ATTEMPTS = 5;
const COOLDOWN_TIME = 30; // dalam detik

// Variasi pesan error jika salah password
const ERROR_MESSAGES = [
  "Salah kode, kamu bukan anak TKJ ya?",
  "Eits, mau ngintip ya? Coba lagi!",
  "Akses ditolak! Jangan paksa masuk...",
  "Duh, ingat-ingat lagi sandinya!",
  "Satu kali lagi salah, kena cooldown loh!",
];

// Variasi caption unik untuk setiap foto (indeks 0-19)
const PHOTO_METADATA = [
  { label: "Muka Bantal", icon: <Ghost size={16} /> },
  { label: "Kena Jumpscare", icon: <Zap size={16} /> },
  { label: "Lagi Ngigo", icon: <Smile size={16} /> },
  { label: "Mode Reog", icon: <Bomb size={16} /> },
  { label: "Candid Maut", icon: <Camera size={16} /> },
  { label: "Efek Begadang", icon: <Eye size={16} /> },
  { label: "Pasrah Banget", icon: <Heart size={16} /> },
  { label: "Laper Berat", icon: <Zap size={16} /> },
  { label: "Tidur di Lab", icon: <Clock size={16} /> },
  { label: "Gaya Andalan", icon: <Star size={16} /> }, // Error fix: Star was missing in import, added Heart
  { label: "Momen Lawak", icon: <Smile size={16} /> },
  { label: "Muka Meme", icon: <Ghost size={16} /> },
  { label: "Lagi Melamun", icon: <Eye size={16} /> },
  { label: "Blur Aestetik", icon: <Camera size={16} /> },
  { label: "Kaget Kamera", icon: <Zap size={16} /> },
  { label: "Menolak Sadar", icon: <Bomb size={16} /> },
  { label: "Keselek Es", icon: <Heart size={16} /> },
  { label: "Salah Kostum", icon: <Smile size={16} /> },
  { label: "Gagal Keren", icon: <Zap size={16} /> },
  { label: "Penghuni Pojokan", icon: <Ghost size={16} /> },
];

export default function SecretVault({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  // Check login session
  useEffect(() => {
    if (sessionStorage.getItem("vault_unlocked") === "true") setIsUnlocked(true);
  }, []);

  // Cooldown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;

    if (password.toLowerCase() === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setErrorMsg("");
      sessionStorage.setItem("vault_unlocked", "true");
    } else {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      
      if (nextAttempt >= MAX_ATTEMPTS) {
        setCooldown(COOLDOWN_TIME);
        setAttempts(0);
        setErrorMsg("Terlalu banyak percobaan! Tunggu sebentar...");
      } else {
        setErrorMsg(ERROR_MESSAGES[Math.min(nextAttempt - 1, ERROR_MESSAGES.length - 1)]);
      }
      
      setPassword("");
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
              <p className="text-[8px] tracking-[0.3em] text-zinc-500 uppercase font-black">Koleksi Aib XII TKJ 2</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <X size={20} className="text-zinc-400" />
            </button>
          </div>

          {!isUnlocked ? (
            /* --- LAYAR KUNCI --- */
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto w-full">
              <motion.div 
                animate={cooldown > 0 ? { scale: [1, 0.9, 1] } : { rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border transition-colors ${cooldown > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}
              >
                {cooldown > 0 ? <Clock className="text-red-500" /> : <Lock className="text-yellow-500" size={28} />}
              </motion.div>
              
              <h3 className="text-white font-bold text-center mb-2">
                {cooldown > 0 ? "Akses Terkunci!" : "Siapkan Mental Anda"}
              </h3>
              <p className="text-zinc-500 text-[10px] tracking-widest uppercase font-black mb-8 text-center px-4">
                {cooldown > 0 ? `Coba lagi dalam ${cooldown} detik` : "Sandi ini hanya diketahui oleh internal TKJ 2"}
              </p>
              
              <form onSubmit={handleUnlock} className="w-full space-y-4">
                <input
                  type="password"
                  disabled={cooldown > 0}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center focus:border-yellow-500/50 outline-none transition-all placeholder:text-zinc-700 disabled:opacity-30"
                  placeholder={cooldown > 0 ? "Lagi dihukum..." : "Ketik Sandi..."}
                />
                <button 
                  type="submit" 
                  disabled={cooldown > 0}
                  className="w-full bg-yellow-500 disabled:bg-zinc-800 text-black font-black text-[10px] tracking-widest uppercase py-4 rounded-2xl active:scale-95 transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                >
                  {cooldown > 0 ? "Sabar Ya..." : "Buka Gerbang Aib"}
                </button>
              </form>

              {errorMsg && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 flex items-center gap-2 ${cooldown > 0 ? 'text-red-500' : 'text-yellow-500/80'}`}>
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-black uppercase tracking-wider text-center">{errorMsg}</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* --- GALERI AIB (UNLOCKED) --- */
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 pb-20">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center mb-4">
                 <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                    <p className="text-red-500 text-[8px] uppercase tracking-widest font-black">
                      🔴 AREA BERBAHAYA: JANGAN DISHARE KE GRUP KELAS SEBELAH!
                    </p>
                 </div>
              </motion.div>

              {Array.from({ length: TOTAL_AIB_PHOTOS }).map((_, i) => {
                const randomRot = (i % 2 === 0 ? 3 : -3);
                const metadata = PHOTO_METADATA[i] || PHOTO_METADATA[0];

                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20, rotate: randomRot }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 0, y: -5, scale: 1.05, zIndex: 10 }}
                    className="relative group"
                  >
                    <div className="bg-zinc-900 p-2 pb-12 rounded-xl border border-white/10 shadow-2xl transition-all group-hover:border-yellow-500/40">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={`/images/aib/foto${i + 1}.jpg`}
                          alt="Momen Aib"
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Floating Icon */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-2 rounded-lg text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {metadata.icon}
                        </div>
                      </div>
                      
                      <div className="mt-4 px-1 flex flex-col items-center">
                        <p className="text-[9px] font-black tracking-widest uppercase text-zinc-500 group-hover:text-yellow-500 transition-colors">
                          {metadata.label}
                        </p>
                        <div className="w-4 h-[1px] bg-white/10 mt-2 group-hover:w-10 transition-all group-hover:bg-yellow-500/50" />
                      </div>
                    </div>
                    
                    {/* Tape Decoration */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/10 -rotate-3 z-20 pointer-events-none rounded-sm group-hover:opacity-0 transition-opacity" />
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