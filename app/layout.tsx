import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://dentista-pro-bice.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Estudio Dental Aguirre — Turnos online en Belgrano",
    template: "%s | Estudio Dental Aguirre",
  },
  description:
    "Consultorio odontológico en Belgrano, CABA. Reservá tu turno online. Limpieza, blanqueamiento, ortodoncia e implantes. Especialistas certificados con tecnología de última generación.",
  keywords: [
    "dentista belgrano",
    "odontologo belgrano",
    "turnos dentista",
    "limpieza dental",
    "blanqueamiento dental",
    "ortodoncia",
    "implantes dentales",
    "consultorio odontologico",
    "dentista caba",
    "dentista particular",
    "obra social dentista",
    "emergencia dental",
  ],
  authors: [{ name: "Estudio Dental Aguirre" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Estudio Dental Aguirre",
    title: "Estudio Dental Aguirre — Turnos online en Belgrano",
    description:
      "Consultorio odontológico en Belgrano, CABA. Reservá tu turno online. Especialistas certificados con tecnología de última generación.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Estudio Dental Aguirre — Consultorio odontológico en Belgrano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Dental Aguirre — Turnos online en Belgrano",
    description:
      "Consultorio odontológico en Belgrano, CABA. Reservá tu turno online. Especialistas certificados.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Estudio Dental Aguirre",
    image: `${siteUrl}/og-image.png`,
    url: siteUrl,
    telephone: "+541147802233",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Cabildo 2450",
      addressLocality: "Belgrano",
      addressRegion: "CABA",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.5625,
      longitude: -58.4531,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
    hasFAQPage: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Duele un implante dental?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El procedimiento se realiza con anestesia local, por lo que no se siente dolor durante la colocación. Después, el malestar es leve y se controla con medicación habitual.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto dura un blanqueamiento?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los resultados del blanqueamiento pueden durar entre 1 y 2 años, dependiendo de tus hábitos. Te damos indicaciones personalizadas para mantener los resultados.",
          },
        },
        {
          "@type": "Question",
          name: "¿Aceptan obras sociales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, trabajamos con las principales obras sociales y prepagas. Consultanos por tu cobertura específica.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo saco turno?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Podés reservar tu turno por chat, WhatsApp al +54 11 4780-2233, o llamándonos directamente. Elegí el día y horario que mejor te quede.",
          },
        },
      ],
    },
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-sans antialiased bg-paper text-ink`}
      >
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
