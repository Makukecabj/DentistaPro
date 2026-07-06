# Sonríe Dental — esqueleto web pro

Proyecto Next.js 14 (App Router) + TypeScript + Tailwind, pensado como base
para el paquete "pro" (web + chatbot de turnos). El diseño y la estructura
ya están armados; lo que falta es contenido real y conectar los servicios.

## Cómo correrlo en local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Estructura

```
app/
  layout.tsx        fuentes y metadata global
  page.tsx           arma la página con todas las secciones
  api/chat/route.ts  endpoint del chatbot (hoy es un mock guionado)
components/          cada sección de la web, un componente por archivo
lib/supabaseClient.ts cliente de Supabase listo para usar
```

## Qué es real y qué es mock

- El **diseño, la estructura y el slider de antes/después** son funcionales.
- El **chatbot de turnos** (`ChatWidget.tsx` + `app/api/chat/route.ts`) hoy
  sigue un guion fijo de 4 pasos para que puedas mostrar el flujo completo
  a un cliente. No llama a ninguna IA real ni guarda nada todavía.

## TODOs antes de vender esto como versión final

1. **Contenido real**: buscá `TODO` en el código (Header, Hero, Services,
   Team, Reviews, Contact, Footer) y reemplazá los textos de ejemplo por
   los datos reales del consultorio (nombre, dirección, WhatsApp, servicios,
   profesionales, reseñas).
2. **Fotos de antes/después**: en `BeforeAfterSlider.tsx` reemplazá los dos
   bloques de color por las imágenes reales, manteniendo la misma estructura
   de capas (una encima de la otra, recortada por el ancho del slider).
3. **Chatbot real**: en `app/api/chat/route.ts`, cambiar el mock por:
   - una llamada a la API de un modelo de IA (OpenAI, Anthropic, etc.) para
     que la conversación sea libre y no un guion fijo
   - la escritura del turno confirmado en una tabla de Supabase
   - la creación del evento en Google Calendar del profesional
   - una validación de que el horario elegido sigue libre antes de confirmar
4. **Supabase**: crear el proyecto, definir las tablas (por ejemplo
   `turnos`, `pacientes`), activar Row Level Security (RLS) y completar las
   variables de entorno.
5. **Variables de entorno**: copiar `.env.example` a `.env.local` y
   completar los valores. Nunca subir `.env.local` a GitHub (ya está en
   `.gitignore`).

## Deploy en Vercel

1. Subí este proyecto a un repo de GitHub.
2. En [vercel.com](https://vercel.com), Add New → Project → importá el repo.
3. Vercel detecta Next.js automáticamente, no hace falta configurar nada más.
4. En Settings → Environment Variables, cargá las mismas variables de
   `.env.example` con sus valores reales.
5. Deploy. Cada push a la rama principal actualiza el sitio en producción.

## Paleta y tipografía usadas

- Colores: `ink` #17302B (verde pino), `paper` #F6F4EF (fondo cálido),
  `sage` #E4ECE6, `gold` #C9974A (acento), `teal` #2F6B5E.
- Tipografías: Fraunces (títulos), Inter (texto), IBM Plex Mono (etiquetas
  y detalles tipo "en línea", números, eyebrows).

Todo esto está centralizado en `tailwind.config.ts`, así que cambiar la
paleta o las fuentes para otro cliente es editar un solo archivo.
