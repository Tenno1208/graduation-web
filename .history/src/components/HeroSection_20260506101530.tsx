"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ChevronDown } from "lucide-react";

interface HeroProps {
  index: number;
  quote: string;
}

export default function HeroSection({ index, quote }: HeroProps) {
  return (
    <section className="relative h-[100svh] w-full flex flex-col bg-black overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-end pb-8 z-10 px-4">
        <div className="text-center">
          <Sparkles className="mx-auto text-yellow-500 mb-4" size={24} />
          <h1 className="text-6xl md:text-[10rem] font-serif italic leading-none text-white mb-6">Memories</h1>
          <div className="h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p 
                key={quote}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-[10px] md:text-sm text-zinc-400 italic font-light max-w-xs md:max-w-2xl mx-auto leading-relaxed"
              >
                "{quote}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[40vh] md:h-[55vh] z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full flex items-center justify-center p-6 group"
          >
            <div className="relative w-full h-full filter grayscale hover:grayscale-0 transition-all duration-1000">
              <Image src={`/images/foto${index + 1}.jpg`} alt="Moment" fill className="object-contain" priority />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-8 z-10 px-4">
        <div className="text-center">
          <p className="tracking-[0.8em] text-yellow-500 uppercase text-[9px] md:text-sm font-black opacity-80 mb-2">XII TKJ 2</p>
          <ChevronDown size={20} className="mt-10 opacity-20 animate-bounce mx-auto" />
        </div>
      </div>
    </section>
  );
}