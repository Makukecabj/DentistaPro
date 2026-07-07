"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const TEAM = [
  {
    name: "Dra. Valentina Aguirre",
    role: "Odontóloga general · Directora",
    specialty: "Estética dental y rehabilitación oral",
    university: "Universidad de Buenos Aires",
    imgSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Dr. Martín Ferreyra",
    role: "Ortodoncista",
    specialty: "Ortodoncia invisible y brackets estéticos",
    university: "Universidad de Buenos Aires",
    imgSrc: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&q=80",
  },
  {
    name: "Dra. Camila Sosa",
    role: "Especialista en implantes",
    specialty: "Implantología y cirugía oral",
    university: "Universidad de Buenos Aires",
    imgSrc: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=300&fit=crop&q=80",
  },
];

function getInitials(name: string) {
  return name
    .replace(/^(Dra\.|Dr\.)/, "")
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("");
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function TeamCard({ name, role, specialty, university, imgSrc }: { name: string; role: string; specialty: string; university: string; imgSrc: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={item}
      className="group glass rounded-2xl shadow-premium p-8 text-center transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5"
    >
      <div className="relative w-28 h-28 mx-auto mb-6">
        {imgError ? (
          <div className="w-28 h-28 rounded-full bg-sage flex items-center justify-center">
            <span className="font-mono text-lg text-teal-dark font-medium">
              {getInitials(name)}
            </span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-gold/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
            <Image
              src={imgSrc}
              alt={`Foto de ${name}`}
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          </>
        )}
      </div>
      <h3 className="font-display text-lg font-medium mb-1">{name}</h3>
      <p className="font-mono text-[11px] tracking-[0.15em] text-ink/45 uppercase mb-3">{role}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-[13px] text-ink/50">
          <svg className="w-3.5 h-3.5 text-gold shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
          {specialty}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[12px] text-ink/35">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6l6-4 6 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" />
            <path d="M6 14V9h4v5" />
          </svg>
          {university}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="equipo" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Equipo"
            title="Nuestro equipo"
            subtitle="Profesionales con experiencia que se dedican a que sonrías con confianza."
          />
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {TEAM.map((person) => (
            <TeamCard key={person.name} {...person} />
          ))}
        </motion.div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="https://wa.me/5491145678900"
              className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold transition-colors"
            >
              Conocé a nuestro equipo — Agendá tu consulta
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 5l5 5-5 5" />
              </svg>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
