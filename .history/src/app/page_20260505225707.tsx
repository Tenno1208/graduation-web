"use client";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import LandingGate from "@/components/LandingGate"; // Import komponen tadi
// Import komponen lain (Hero, Squad, dll) jika sudah dipisah juga

export default function GraduationPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();
      
      // Fade-in audio logic
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.02;
          if (audioRef.current) audioRef.current.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  return (
    <main className="bg-black text-white">
      <audio ref={audioRef} src="/audio/memories.mp3" loop />

      {/* TAMPILKAN GATEWAY */}
      <AnimatePresence>
        {!hasStarted && <LandingGate onEnter={startExperience} />}
      </AnimatePresence>

      {/* TAMPILKAN KONTEN UTAMA SETELAH START */}
      {hasStarted && (
        <div className="animate-in fade-in duration-1000">
           {/* Masukkan semua section Hero, Squad, Quote di sini */}
           {/* Atau panggil komponen-komponennya */}
           <section className="h-screen flex items-center justify-center">
             <h1 className="text-4xl">Konten Utama Website Kamu</h1>
           </section>
        </div>
      )}
    </main>
  );
}