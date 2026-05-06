// src/data/students.ts

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

export const waliKelas: Teacher = {
  name: "Ibu Siti Rohmah, S.Kom", 
  photo: "/images/walikelas.jpg",
  subject: "Guru Produktif TKJ",
  message:
    "Kalian adalah murid-murid terbaik yang pernah saya ajar. Teruslah berjuang, jangan berhenti bermimpi. Saya bangga menjadi bagian dari perjalanan kalian.",
};

export const students: Student[] = [
  {
    id: 1,
    name: "M.Tenno Haika Avvatar",
    photo: "/images/students/tenno.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 2,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 3,
    name: "Dimas Saputra",
    photo: "/images/students/farid.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 4,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 5,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 6,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 7,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 8,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 9,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
  {
    id: 10,
    name: "Dimas Saputra",
    photo: "/images/students/dmas.jpg",
    message: "Jangan pernah lupakan kenangan kita di lab TKJ, kawan!",
  },
];