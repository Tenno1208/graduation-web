"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/images/foto1.jpg", title: "Solidaritas Tanpa Batas" },
  { src: "/images/foto2.jpg", title: "Pejuang Tugas Akhir" },
  { src: "/images/foto3.jpg", title: "Masa Depan Menanti" },
];

export default function GraduationPage() {
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-black text-white selection:bg-yellow-500 selection:text-black">
      
      {/* SECTION 1: HERO (CINEMATIC SLIDESHOW) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.3 }}
              transition={{ duration: 2.5, ease: "circOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={photos[index].src}
                alt="Memory"
                fill
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 text-center uppercase tracking-[0.2em]">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-yellow-500 text-sm md:text-base mb-4"
          >
            Memories of Class 2026
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif italic"
          >
            Graduation
          </motion.h1>
        </div>
      </section>

      {/* SECTION 2: THE QUOTE (PARALLAX EFFECT) */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-24 bg-zinc-950">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-5xl text-yellow-500 font-serif leading-none">“</span>
            <p className="text-2xl md:text-4xl font-light leading-relaxed italic text-zinc-300">
              Kita tidak benar-benar berpisah, kita hanya sedang menempuh jalan yang berbeda untuk saling membanggakan di masa depan.
            </p>
            <span className="text-5xl text-yellow-500 font-serif leading-none block mt-4">”</span>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE GRID GALLERY */}
      <section className="py-24 px-6 md:px-20 bg-black">
        <h3 className="text-3xl font-serif mb-12 border-b border-zinc-800 pb-4 inline-block">
          The Squad
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800"
            >
              {/* Foto Teman */}
              <Image
                src={`/images/foto${(item % 3) + 1}.jpg`} // Sesuaikan loop foto yang ada
                alt="Student"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6">
                <p className="text-yellow-500 text-xs tracking-widest uppercase mb-1">Student No. 0{item}</p>
                <p className="text-xl font-medium">Nama Teman Kamu</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FOOTER (THE END) */}
      <footer className="py-20 text-center bg-zinc-950 border-t border-zinc-900">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase">See you on top</p>
        <h4 className="mt-4 text-2xl font-serif italic text-yellow-600">Terima Kasih Atas Kenangannya</h4>
      </footer>

    </main>
  );
}