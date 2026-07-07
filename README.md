# Estudio Dental Aguirre — Web Pro

Proyecto Next.js 14 (App Router) + TypeScript + Tailwind, pensado como **template base** para clonar por cada cliente. La landing y el chatbot están preparados para leer datos dinámicos desde Supabase.

## Cómo correrlo en local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Estructura del proyecto

```
app/
  layout.tsx        fuentes y metadata global
  page.tsx           arma la página con todas las secciones
  api/chat/route.ts  endpoint del chatbot con contexto dinámico
  api/services/route.ts endpoint público para datos de la clínica

components/          cada sección de la web, un componente por archivo
  Services.tsx       ahora lee servicios desde Supabase
  FAQ.tsx            ahora lee FAQs desde Supabase
  Team.tsx           ahora lee equipo desde Supabase
  BeforeAfterSlider.tsx lee casos desde Supabase

lib/
  supabaseClient.ts  cliente de Supabase (anon + service)
  clinicService.ts   helpers para fetch de datos clínicos

supabase/
  seed.sql           script de inicialización de tablas
```

## Arquitectura: Template por cliente

Este proyecto es un **template que se clona** para cada nueva clínica:

1. `git clone` del repo
2. Crear nuevo proyecto en Supabase
3. Ejecutar `supabase/seed.sql` 
4. Configurar `.env.local` con las credenciales
5. Deploy en Vercel

Cada clínica tiene su propia instalación independiente (no multi-tenant).

## Tablas de Supabase

### Tabla `clinic` (única fila)
- `name`, `phone`, `whatsapp`, `address`
- `map_lat`, `map_lng`, `logo_url`, `primary_color`
- `cancellation_policy`
- `business_hours` (JSONB): `{"1": [9,19], "2": [9,18]}` (1=Lun...7=Dom)

### Tablas relacionadas
- `clinic_services`: servicios con precios y duración
- `clinic_insurance`: obras sociales y coberturas
- `clinic_team`: dentistas y especialidades
- `clinic_faqs`: preguntas frecuentes
- `clinic_before_after`: casos antes/después
- `turnos`: turnos reservados (ya existente)

## Variables de entorno (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# IA (Groq o OpenAI)
GROQ_API_KEY=
# o
OPENAI_API_KEY=

# Twilio (para recordatorios - opcional)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=

# Google Calendar (opcional)
GOOGLE_CALENDAR_CLIENT_ID=
GOOGLE_CALENDAR_CLIENT_SECRET=
```

## Setup para nueva clínica

1. **Clonar el repo**
   ```bash
   git clone <repo-url> nuevo-cliente
   cd nuevo-cliente
   ```

2. **Crear proyecto en Supabase** y ejecutar `supabase/seed.sql`

3. **Editar los datos de ejemplo** en Supabase:
   - `clinic` → actualizar nombre, horarios, contacto
   - `clinic_services` → servicios reales con precios
   - `clinic_team` → fotos y biografías
   - `clinic_faqs` → preguntas reales del consultorio

4. **Editar todo el contenido hardcodeado** que quede en componentes:
   - Hero.tsx → texto principal
   - BeforeAfterSlider.tsx → imágenes
   - SocialProof.tsx → reseñas

5. **Deploy en Vercel** con las variables de entorno

## Flujo del Chatbot

El chatbot (`/api/chat/route.ts`) ahora:

1. **Lee el perfil de la clínica** desde Supabase al inicio
2. **Genera horarios dinámicamente** según `business_hours`
3. **Construye system prompt** con nombre, horarios, políticas
4. **Guarda turnos** en la tabla `turnos`

## Roadmap de features

### Fase 1 - Agenda
- [ ] Recordatorio automático 24hs antes (WhatsApp)
- [ ] Reprogramar/cancelar turno desde el chat
- [ ] Lista de espera automática

### Fase 2 - Pre-consulta
- [ ] Formulario de anamnesis antes del turno
- [ ] Calculadora de cobertura dinámica

### Fase 3 - Fidelización
- [ ] Pedido de reseña post-turno
- [ ] Recordatorio de control semestral

## Paleta y tipografía

- Colores: `ink` #17302B (verde pino), `paper` #F6F4EF, `sage` #E4ECE6, `gold` #C9974A, `teal` #2F6B5E
- Tipografías: Fraunces (títulos), Inter (texto), IBM Plex Mono (etiquetas)

La personalización de marca se hace desde Supabase (`primary_color`, `logo_url`).