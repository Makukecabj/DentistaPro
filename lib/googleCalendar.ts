import { google } from 'googleapis';

let cachedClient: ReturnType<typeof google.calendar> | null = null;

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) return null;
  return new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
}

export function isCalendarConfigured(): boolean {
  return !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_PRIVATE_KEY &&
    process.env.GOOGLE_CALENDAR_ID
  );
}

async function getClient() {
  if (cachedClient) return cachedClient;
  const auth = getAuth();
  if (!auth) return null;
  await auth.authorize();
  cachedClient = google.calendar({ version: 'v3', auth });
  return cachedClient;
}

export async function getOccupiedSlots(fecha: string): Promise<string[]> {
  const client = await getClient();
  if (!client) return [];

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return [];

  const timeMin = new Date(`${fecha}T00:00:00-03:00`);
  const timeMax = new Date(`${fecha}T23:59:59-03:00`);

  try {
    const response = await client.events.list({
      calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const occupied = new Set<string>();

    for (const event of (response.data.items || [])) {
      const startStr = event.start?.dateTime || event.start?.date;
      const endStr = event.end?.dateTime || event.end?.date;
      if (!startStr || !endStr) continue;
      if (startStr.length === 10) continue;

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      for (let h = 9; h < 19; h++) {
        for (let m = 0; m < 60; m += 30) {
          const slotH = h.toString().padStart(2, '0');
          const slotM = m.toString().padStart(2, '0');
          const slotStart = new Date(`${fecha}T${slotH}:${slotM}:00-03:00`);
          const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

          if (slotStart < endDate && slotEnd > startDate) {
            occupied.add(`${slotH}:${slotM}`);
          }
        }
      }
    }

    return Array.from(occupied);
  } catch (err) {
    console.error('Error fetching Google Calendar events:', err);
    return [];
  }
}

export async function createCalendarEvent(params: {
  nombre: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio?: string;
}): Promise<boolean> {
  const client = await getClient();
  if (!client) return false;

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) return false;

  const startTime = new Date(`${params.fecha}T${params.hora}:00-03:00`);
  const endTime = new Date(startTime.getTime() + 30 * 60000);

  try {
    await client.events.insert({
      calendarId,
      requestBody: {
        summary: `Turno: ${params.nombre}`,
        description: `Teléfono: ${params.telefono}${params.servicio ? `\nServicio: ${params.servicio}` : ''}\nReservado vía web`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires',
        },
      },
    });
    return true;
  } catch (err) {
    console.error('Error creating Google Calendar event:', err);
    return false;
  }
}
