// Contoh cuplikan kode sederhana untuk bayangan awal
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      {/* Judul Elegan */}
      <h1 className="text-6xl font-serif text-yellow-500 mb-4 animate-fade-in">
        Happy Graduation
      </h1>
      <p className="text-xl text-slate-400 italic">"Akhir dari sebuah bab, awal dari sebuah cerita."</p>

      {/* Tempat Foto Ganti-ganti nanti di sini */}
      <div className="mt-12 w-full max-w-4xl h-[500px] border border-slate-800 rounded-2xl overflow-hidden relative">
         {/* Animasi foto akan kita pasang di sini pakai Framer Motion */}
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
         <p className="absolute bottom-8 left-8 z-20 text-2xl font-bold">Kenangan Kelas XII-A</p>
      </div>
    </main>
  );
}