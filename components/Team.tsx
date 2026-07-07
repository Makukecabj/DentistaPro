"use client";

import { useState } from "react";
import Image from "next/image";

const TEAM = [
  { name: "Dra. Valentina Aguirre", role: "Odontóloga general · Directora", imgSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&q=80" },
  { name: "Dr. Martín Ferreyra", role: "Ortodoncista", imgSrc: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&q=80" },
  { name: "Dra. Camila Sosa", role: "Especialista en implantes", imgSrc: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=200&h=200&fit=crop&q=80" },
];

function getInitials(name: string) {
  return name
    .replace(/^(Dra\.|Dr\.)/, "")
    .trim()
    .split(" ")
    .map((w) => w[0])
    .join("");
}

function TeamCard({ name, role, imgSrc }: { name: string; role: string; imgSrc: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-xl2 border border-ink/10 bg-white p-6 text-center">
      {imgError ? (
        <div className="w-16 h-16 mx-auto rounded-full bg-sage flex items-center justify-center mb-4">
          <span className="font-mono text-sm text-teal-dark font-medium">
            {getInitials(name)}
          </span>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={`Foto de ${name}`}
          width={64}
          height={64}
          className="w-16 h-16 mx-auto rounded-full object-cover mb-4"
          onError={() => setImgError(true)}
        />
      )}
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm text-ink/60">{role}</p>
    </div>
  );
}

export default function Team() {
  return (
    <section id="equipo" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="font-display text-3xl font-medium mb-10">
        Nuestro equipo
      </h2>
      <div className="grid sm:grid-cols-3 gap-6">
        {TEAM.map((person) => (
          <TeamCard key={person.name} {...person} />
        ))}
      </div>
    </section>
  );
}
