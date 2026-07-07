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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentista-pro-bice.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Estudio Dental Aguirre — Odontólogo en Belgrano, CABA",
    template: "%s | Estudio Dental Aguirre",
  },
  description:
    "Consultorio odontológico premium en Belgrano, CABA. Limpieza, blanqueamiento, ortodoncia e implantes. Especialistas certificados con tecnología de última generación. Turnos online 24hs.",
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
    "odontologo belgrano caba",
    "clínica dental belgrano",
  ],
  authors: [{ name: "Estudio Dental Aguirre" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Estudio Dental Aguirre",
    title: "Estudio Dental Aguirre — Odontólogo en Belgrano, CABA",
    description:
      "Consultorio odontológico premium en Belgrano, CABA. Especialistas certificados con tecnología de última generación. Turnos online 24hs.",
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
    title: "Estudio Dental Aguirre — Odontólogo en Belgrano, CABA",
    description:
      "Consultorio odontológico premium en Belgrano, CABA. Especialistas certificados. Turnos online 24hs.",
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
    email: "hola@estudiodentalaguirre.com",
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
      bestRating: "5",
    },
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tratamientos Odontológicos",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Limpieza Dental",
            description: "Limpieza dental profesional con ultrasonido y pulido.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Blanqueamiento Dental",
            description: "Blanqueamiento dental profesional hasta 8 tonos.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Ortodoncia",
            description: "Ortodoncia con alineadores transparentes y brackets estéticos.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Implantes Dentales",
            description: "Implantes dentales con materiales de primera calidad.",
          },
        },
      ],
    },
  };

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-sans antialiased bg-paper text-ink overflow-x-hidden`}
      >
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
