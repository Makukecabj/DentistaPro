import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #17302B 0%, #1F3A35 50%, #2F6B5E 100%)",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: "rgba(255,255,255,0.1)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 60, lineHeight: 1 }}>🦷</span>
        </div>
        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 64,
            fontWeight: 600,
            color: "#F6F4EF",
            textAlign: "center",
            margin: 0,
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          Estudio Dental Aguirre
        </h1>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 28,
            color: "#C9974A",
            textAlign: "center",
            margin: 0,
          }}
        >
          Odontología premium en Belgrano, CABA
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [],
    },
  );
}
