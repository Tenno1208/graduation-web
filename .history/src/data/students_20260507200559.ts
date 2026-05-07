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
    name: "MuhamadFarid Setiawan",
    photo: "/images/students/farid.jpg",
    message: "-",
  },
  {
    id: 4,
    name: "Ilham Fahturohman",
    photo: "/images/students/ilham.jpg",
    message: "-",
  },
  {
    id: 5,
    name: "",
    photo: "/images/students/sindy.jpg",
    message: "-",
  },
  {
    id: 6,
    name: "Much Rizki Aditia",
    photo: "/images/students/adit.jpg",
    message: "-",
  },
  {
    id: 7,
    name: "Reva Aditya ",
    photo: "/images/students/reva.jpg",
    message: "-",
  },
  {
    id: 8,
    name: "-",
    photo: "/images/students/dmass.jpg",
    message: "-",
  },
  {
    id: 9,
    name: "-",
    photo: "/images/students/dmass.jpg",
    message: "-",
  },
  {
    id: 10,
    name: "-",
    photo: "/images/students/dmass.jpg",
    message: "-",
  },
];