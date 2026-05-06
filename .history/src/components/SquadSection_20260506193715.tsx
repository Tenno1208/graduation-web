"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Heart, Crown, GraduationCap, Quote, User } from "lucide-react";

// --- Types ---

interface Student {
  id: number | string;
  name: string;
  photo: string;
  message: string;
}

interface Teacher extends Student {
  role: "walikelas";
  nip?: string;
}

interface SquadProps {
  students: Student[];
  teacher?: Teacher; // Data Walikelas Opsional
}

// --- Components ---

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y