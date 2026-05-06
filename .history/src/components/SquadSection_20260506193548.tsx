<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Squad - XII TKJ 2</title>
    
    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Babel untuk JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Framer Motion -->
    <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">

    <style>
        /* Custom Font Setup */
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-sans-ui { font-family: 'Inter', sans-serif; }
        .font-accent { font-family: 'Cinzel', serif; }

        /* Hide scrollbar for clean look */
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        
        /* Masonry Breakpoint Fixes */
        .break-inside-avoid { break-inside: avoid; }
    </style>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        gold: {
                            400: '#FACC15',
                            500: '#EAB308',
                            600: '#CA8A04',
                        },
                        dark: {
                            900: '#09090b',
                            800: '#18181b',
                        }
                    },
                    backgroundImage: {
                        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E')",
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-black text-white antialiased selection:bg-gold-500 selection:text-black">
    <div id="root"></div>

    <script type="text/babel">
        const { motion, useScroll, useTransform, AnimatePresence } = Motion;
        const { useState, useRef, useEffect } = React;
        
        // Mock Data: Wali Kelas & Siswa
        const squadData = [
            {
                id: 0,
                role: 'walikelas',
                name: "Bpk. Hendra Gunawan, S.Kom",
                photo: "https://picsum.photos/seed/teacher1/400/500",
                message: "Menjadi guru bukan sekadar mengajar, tapi mempersiapkan masa depan. Kalian adalah aset terbaik bangsa ini. Teruslah berkarya dan jangan pernah berhenti belajar.",
                nip: "19850101 201001 1 001"
            },
            {
                id: 1,
                role: 'siswa',
                name: "Rizky Pratama",
                photo: "https://picsum.photos/seed/rizky/300/400",
                message: "Bangku sekolah ini saksi bisu kita bercanda, berjuang, dan bermimpi. Sampai jumpa di puncak kesuksesan teman-teman!"
            },
            {
                id: 2,
                role: 'siswa',
                name: "Alya Putri",
                photo: "https://picsum.photos/seed/alya/300/500",
                message: "Tiga tahun terasa sangat singkat. Terima kasih sudah menjadi keluarga kedua yang selalu mendukung. Jangan lupa saya ya!"
            },
            {
                id: 3,
                role: 'siswa',
                name: "Budi Santoso",
                photo: "https://picsum.photos/seed/budi/300/350",
                message: "TKJ 2 is the best!"
            },
            {
                id: 4,
                role: 'siswa',
                name: "Citra Lestari",
                photo: "https://picsum.photos/seed/citra/300/450",
                message: "Semoga ilmu yang kita dapatkan bermanfaat untuk dunia kerja nanti. Good luck for us!"
            },
            {
                id: 5,
                role: 'siswa',
                name: "Dimas Anggara",
                photo: "https://picsum.photos/seed/dimas/300/380",
                message: "Kita berpisah bukan untuk berakhir, tapi untuk bertemu kembali dalam versi yang lebih baik."
            },
            {
                id: 6,
                role: 'siswa',
                name: "Eka Saputra",
                photo: "https://picsum.photos/seed/eka/300/420",
                message: "Masa SMA adalah masa paling indah. Nikmati setiap detiknya karena kita tidak akan bisa mengulanginya."
            },
            {
                id: 7,
                role: 'siswa',
                name: "Fani Ramadhani",
                photo: "https://picsum.photos/seed/fani/300/400",
                message: "Untuk kelas tersabar, tersabar, dan tersabar. Semoga kita semua sukses!"
            }
        ];

        // --- Components ---

        const Badge = ({ children, className = "" }) => (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] tracking-widest uppercase font-bold ${className}`}>
                {children}
            </span>
        );

        // Walikelas Card Component (Distinct Design)
        const WalikelasCard = ({ data, index }) => {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="break-inside-avoid mb-6 relative group"
                >
                    <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border-2 border-gold-500/30 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] hover:border-gold-500/60 transition-colors duration-500">
                        
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <img 
                                src={data.photo} 
                                alt={data.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out transform group-hover:scale-105"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <Badge className="bg-gold-500 text-black border-gold-500 w-fit mb-4 group-hover:bg-gold-400 transition-colors">
                                    <i data-lucide="crown" className="w-3 h-3"></i> Wali Kelas
                                </Badge>
                                
                                <h2 className="font-serif-display text-3xl text-white font-bold mb-2 leading-tight group-hover:text-gold-100 transition-colors">
                                    {data.name}
                                </h2>
                                
                                <div className="h-px w-12 bg-gold-500 mb-4 group-hover:w-full transition-all duration-700 ease-out"></div>
                                
                                <p className="text-zinc-300 text-sm leading-relaxed font-sans-ui border-l-2 border-gold-500/30 pl-4 py-1 bg-black/30 backdrop-blur-sm">
                                    "{data.message}"
                                </p>

                                <p className="mt-4 text-zinc-500 text-[10px] font-mono tracking-wider">
                                    NIP. {data.nip}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
        };

        // Student Card Component
        const StudentCard = ({ student, i }) => {
            // State to toggle expanded view on mobile or interaction preference
            const [isHovered, setIsHovered] = useState(false);

            return (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                    className="break-inside-avoid mb-4 relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsHovered(!isHovered)} // Toggle for mobile
                >
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/50">
                        
                        {/* Photo Section */}
                        <div className="relative w-full overflow-hidden bg-zinc-800">
                            {/* Aspect ratio is handled by the image height, but we set a minimum */}
                            <div className="relative min-h-[300px]">
                                <img
                                    src={student.photo}
                                    alt={student.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                                />
                            </div>

                            {/* Dark Overlay for readability */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent transition-all duration-500 ${isHovered ? 'via-zinc-950/80' : 'via-zinc-950/40'}`} />

                            {/* Number Badge */}
                            <div className="absolute top-3 left-3 z-20">
                                <span className="font-mono text-[9px] text-zinc-500 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Text Content */}
                            <div className="absolute inset-x-0 bottom-0 z-20 p-5 transition-all duration-500">
                                <h3 className="font-serif-display italic text-white text-xl leading-tight mb-2">
                                    {student.name}
                                </h3>
                                
                                {/* Message Area - Expands to fit content */}
                                <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                                    isHovered ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-zinc-300 text-xs leading-relaxed font-sans-ui whitespace-pre-wrap">
                                            "{student.message}"
                                        </p>
                                    </div>
                                </div>
                                
                                {!isHovered && (
                                    <div className="mt-2 text-[10px] text-gold-500/70 flex items-center gap-1 animate-pulse">
                                        <span>Tap/Hover for message</span>
                                        <i data-lucide="arrow-down-right" className="w-3 h-3"></i>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Strip */}
                        <div className="px-4 py-2 flex items-center justify-between bg-zinc-900 border-t border-white/5">
                            <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-600 font-bold">
                                Alumni 2026
                            </span>
                            <i data-lucide="heart" className="w-3 h-3 text-zinc-700 group-hover:text-red-500/80 transition-colors"></i>
                        </div>
                    </div>
                </motion.div>
            );
        };

        // Main Section Component
        const SquadSection = () => {
            const walikelas = squadData.find(s => s.role === 'walikelas');
            const students = squadData.filter(s => s.role === 'siswa');

            return (
                <section className="relative bg-black min-h-screen pt-24 pb-32 overflow-hidden selection:bg-gold-500 selection:text-black">
                    
                    {/* Noise Texture Overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-noise fixed z-0 mix-blend-overlay" />
                    
                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] z-0" />

                    <div className="relative z-10 px-4 max-w-6xl mx-auto">
                        
                        {/* Header Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-20 text-center"
                        >
                            <div className="inline-flex items-center gap-3 text-gold-500 mb-6 px-4 py-2 bg-gold-500/5 border border-gold-500/20 rounded-full backdrop-blur-sm">
                                <i data-lucide="users" className="w-4 h-4"></i>
                                <span className="text-[10px] tracking-[0.4em] uppercase font-black font-sans-ui">
                                    Angkatan 2026
                                </span>
                            </div>

                            <h1 className="font-serif-display text-white font-semibold leading-none text-[clamp(3.5rem,10vw,6rem)] tracking-tight mb-4">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 to-gold-600 italic">Squad</span>
                            </h1>

                            <p className="mt-6 text-zinc-500 text-xs md:text-sm tracking-[0.2em] uppercase font-bold font-sans-ui max-w-lg mx-auto leading-relaxed">
                                "Jejak langkah kecil yang menjadi kisah besar untuk masa depan."
                            </p>
                            
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-10 opacity-50" />
                        </motion.div>

                        {/* Content Layout */}
                        <div className="flex flex-col xl:flex-row gap-12">
                            
                            {/* Left Column: Wali Kelas (Sticky on Desktop) */}
                            <div className="w-full xl:w-1/3 xl:sticky xl:top-32 h-fit">
                                <div className="flex items-center gap-2 mb-6 px-2">
                                    <div className="h-px bg-gold-500/30 flex-1"></div>
                                    <span className="text-gold-500/60 text-[10px] tracking-widest uppercase font-bold">Mentor</span>
                                    <div className="h-px bg-gold-500/30 flex-1"></div>
                                </div>
                                {walikelas && <WalikelasCard data={walikelas} index={0} />}
                            </div>

                            {/* Right Column: Students (Masonry Grid) */}
                            <div className="w-full xl:w-2/3">
                                <div className="flex items-center gap-2 mb-6 px-2">
                                    <div className="h-px bg-zinc-800 flex-1"></div>
                                    <span className="text-zinc-500 text-[10px] tracking-widest uppercase font-bold">Students ({students.length})</span>
                                    <div className="h-px bg-zinc-800 flex-1"></div>
                                </div>
                                
                                {/* Masonry Layout using CSS Columns */}
                                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                                    {students.map((student, i) => (
                                        <StudentCard 
                                            key={student.id} 
                                            student={student} 
                                            i={i} 
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer Caption */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mt-32 text-center"
                        >
                            <div className="inline-block relative">
                                <i data-lucide="graduation-cap" className="w-6 h-6 text-zinc-700 mx-auto mb-4"></i>
                                <div className="absolute inset-0 blur-xl bg-gold-500/10 rounded-full"></div>
                            </div>
                            <p className="text-zinc-600 text-[10px] tracking-[0.4em] uppercase font-bold font-sans-ui">
                                SMK Negeri 1 Jakarta · XII TKJ 2 · 2023–2026
                            </p>
                            <p className="mt-2 text-zinc-800 text-[9px] font-mono">
                                Designed with precision.
                            </p>
                        </motion.div>

                    </div>
                </section>
            );
        };

        const App = () => {
            useEffect(() => {
                // Initialize Lucide icons
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            });

            return <SquadSection />;
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>