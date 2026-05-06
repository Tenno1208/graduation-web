"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, MapPin, Quote } from "lucide-react";

interface SquadProps {
  students: any[];
}

export default function SquadSection({ students }: SquadProps) {
  return (
    <section className="py-24 px-4 md:px-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-yellow-500 mb-4 px-3 py-1 bg-yellow-500/5 border border-yellow-500/10 rounded-full">
              <Heart size={12} fill="currentColor" />
              <span className="text-[9px] tracking-[0.3em] uppercase font-black">Unforgettable Souls</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-none">The Squad</h2>
          </div>
          <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-zinc-400 text-[10px] md:text-xs tracking-widest uppercase font-bold">
            {students.length} Members
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {students.map((student, i) => (
            <motion.div 
              key={student.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col bg-white/[0.02] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 hover:border-yellow-500/40 transition-all duration-500 shadow-2xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <Image src={student.photo} alt={student.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              </div>
              <div className="p-4 md:p-8 flex flex-col flex-grow bg-zinc-900/40">
                <h3 className="text-[12px] md:text-xl font-serif italic text-white mb-2 md:mb-4 uppercase md:normal-case tracking-wider">
                  {student.name}
                </h3>
                <div className="relative min-h-[40px] md:min-h-[60px]">
                  <Quote className="absolute -top-1 -left-2 text-yellow-500/20" size={16} />
                  <p className="text-zinc-400 text-[10px] md:text-sm leading-relaxed pl-3 italic break-words">
                    {student.message || "Tiga tahun yang tak terlupakan. Sampai jumpa di masa depan!"}
                  </p>
                </div>
                <div className="mt-4 md:mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-zinc-600">
                  <MapPin size={8} className="text-yellow-500" />
                  <span className="text-[7px] md:text-[9px] tracking-[0.2em] uppercase font-black">Alumni • 2026</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}