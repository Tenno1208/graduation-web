"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/images/foto1.jpg", title: "Kebersamaan Kita" },
  { src: "/images/foto2.jpg", title: "Momen Tak Terlupakan" },
  { src: "/images/foto3.jpg", title: "Lulus Bersama!" },
];

export default function GraduationPage() {
  const [index, setIndex] = useState(0);

  // Logika ganti foto otomatis setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={photos[index].src}
              alt="Graduation Memory"
              fill
              className="object-cover opacity-60"
              priority
            />
            {/* Overlay Gradient agar teks terbaca */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Konten Teks (UI Elegan) */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="text-yellow-500 tracking-[0.5em] uppercase text-sm mb-4">Class of 2026</h2>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-6">
            Happy Graduation
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto italic font-light">
            "Bukan perpisahan yang kita tangisi, tapi kenangan yang akan selalu abadi."
          </p>
        </motion.div>

        {/* Caption Foto yang sedang tampil */}
        <motion.div 
          key={`title-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-white/50 text-sm tracking-widest uppercase"
        >
          — {photos[index].title} —
        </motion.div>
      </div>

      {/* Ornamen Garis Elegan */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-20 bg-gradient-to-t from-yellow-500 to-transparent" />
        <span className="text-[10px] text-yellow-500 rotate-90 mb-4">SCROLL</span>
      </div>
    </main>
  );
}