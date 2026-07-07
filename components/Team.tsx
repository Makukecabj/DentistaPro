"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";

const TEAM = [
  { name: "Dra. Valentina Aguirre", role: "Odontóloga general · Directora", imgSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&q=80" },
  { name: "Dr. Martín Ferreyra", role: "Ortodoncista", imgSrc: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&q=80" },
  { name: "Dra. Camila Sosa", role: "Especialista en implantes", imgSrc: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=300&fit=crop&q=80" },
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

function TeamCard({ name, role, imgSrc }: { name: string; role: string; imgSrc: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={item}
      className="group glass rounded-2xl shadow-premium p-8 text-center transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1.5"
    >
      <div className="relative w-20 h-20 mx-auto mb-5">
        {imgError ? (
          <div className="w-20 h-20 rounded-full bg-sage flex items-center justify-center">
            <span className="font-mono text-sm text-teal-dark font-medium">
              {getInitials(name)}
            </span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-gold/30 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
            <Image
              src={imgSrc}
              alt={`Foto de ${name}`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          </>
        )}
      </div>
      <h3 className="font-display text-lg font-medium mb-1">{name}</h3>
      <p className="font-mono text-[11px] tracking-[0.15em] text-ink/45 uppercase">{role}</p>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section id="equipo" className="py-28">
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
      </div>
    </section>
  );
}
