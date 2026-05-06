// ─── Tipe Data ────────────────────────────────────────────────────────────────

export interface Student {
  id: number;
  name: string;
  photo: string;
  message?: string;
}

export interface Teacher {
  name: string;
  photo: string;
  subject?: string;
  message?: string;
}

// ─── Wali Kelas ───────────────────────────────────────────────────────────────
// Ganti data di bawah ini sesuai wali kelas XII TKJ 2

export const waliKelas: Teacher = {
  name: "Nama Wali Kela", 
  photo: "/images/walikelas.jpg",
  subject: "Guru Produktif TKJ",
  message:
    "Kalian adalah murid-murid terbaik yang pernah saya ajar. Teruslah berjuang, jangan berhenti bermimpi. Saya bangga menjadi bagian dari perjalanan kalian.",
};

// ─── Data Siswa ───────────────────────────────────────────────────────────────

export const students: Student[] = [
  {
    id: 1,
    name: "M.Tenno Haika Avvatar",
    photo: "/images/students/tenno.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 2,
    name: "Siti Aminah",
    photo: "/images/students/siti.jpg",
    message: "Tiga tahun yang berat tapi menyenangkan. Sampai jumpa di puncak!",
  },
  // tambahkan siswa lainnya di sini...
];