"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import SectionReveal from "./ui/SectionReveal";
import { TeamMember } from "@/lib/clinicService";

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

// Fallback si Supabase no está configurado (dentista particular)
const FALLBACK_TEAM: TeamMember[] = [
  { id: "1", clinic_id: "", name: "Dr. Martín Aguirre", specialty: "Odontólogo", photo_url: null, bio: "Especialista con 15 años de experiencia", order: 1 },
];

function TeamCard({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = member.photo_url || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&q=80`;

  return (
    <motion.div
      variants={item}
      className="group glass rounded-2xl shadow-premium p-8 text-center transition-all duration-500 hover:shadow-premium-hover hover:-translate-y-1.5"
    >
      <div className="relative w-28 h-28 mx-auto mb-6">
        {imgError ? (
          <div className="w-28 h-28 rounded-full bg-sage flex items-center justify-center">
            <span className="font-mono text-lg text-teal-dark font-medium">
              {getInitials(member.name)}
            </span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-gold/0 scale-110 group-hover:border-gold/40 group-hover:scale-100 transition-all duration-500" />
            <Image
              src={imgSrc}
              alt={`Foto de ${member.name}`}
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          </>
        )}
      </div>
      <h3 className="font-display text-lg font-medium mb-1">{member.name}</h3>
      <p className="font-mono text-[11px] tracking-[0.15em] text-ink/45 uppercase mb-3">{member.specialty || "Odontólogo"}</p>
      {member.bio && (
        <p className="text-[13px] text-ink/50 leading-relaxed">{member.bio}</p>
      )}
    </motion.div>
  );
}

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/services");
        if (response.ok) {
          const data = await response.json();
          if (data.team?.length > 0) {
            setTeam(data.team);
          }
        }
      } catch {
        // Usar fallback por defecto
      }
    }
    fetchData();
  }, []);

  // Solo mostrar sección si hay datos desde Supabase (que el dentista cargue su info)
  // Si no hay Supabase, no mostramos la sección "sobre mí"
  if (team.length === 0) return null;

  const displayTeam = team;

  return (
    <section id="equipo" className="py-20 md:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <SectionReveal>
          <SectionHeading
            eyebrow="Sobre mí"
            title="Dr. Martín Aguirre"
            subtitle="Odontólogo especializado en atención personalizada y tratamientos de alta calidad."
          />
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex justify-center"
        >
          <div className="max-w-sm">
            {displayTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}