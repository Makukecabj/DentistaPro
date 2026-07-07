-- SQL Seed para Dentista Pro - Template base
-- Ejecutar este SQL en Supabase para crear la estructura inicial

-- Tabla principal de la clínica (única fila por instalación)
CREATE TABLE IF NOT EXISTS clinic (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    address TEXT,
    map_lat NUMERIC,
    map_lng NUMERIC,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#D4AF37',
    cancellation_policy TEXT,
    business_hours JSONB, -- Formato: {"1": [9,19], "2": [9,18]} (1=Lun, 7=Dom)
    created_at TIMESTAMP DEFAULT NOW()
);

-- Servicios ofrecidos
CREATE TABLE IF NOT EXISTS clinic_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC,
    duration_minutes INTEGER,
    description TEXT,
    "order" INTEGER DEFAULT 0
);

-- Obras sociales y prepagas
CREATE TABLE IF NOT EXISTS clinic_insurance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    coverage_notes TEXT
);

-- Equipo de dentistas
CREATE TABLE IF NOT EXISTS clinic_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    specialty TEXT,
    photo_url TEXT,
    bio TEXT,
    "order" INTEGER DEFAULT 0
);

-- Preguntas frecuentes
CREATE TABLE IF NOT EXISTS clinic_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    "order" INTEGER DEFAULT 0
);

-- Casos antes/después
CREATE TABLE IF NOT EXISTS clinic_before_after (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_id UUID REFERENCES clinic(id) ON DELETE CASCADE,
    before_url TEXT NOT NULL,
    after_url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    "order" INTEGER DEFAULT 0
);

-- Tabla de turnos (ya existente, se mantiene)
CREATE TABLE IF NOT EXISTS turnos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    servicio TEXT,
    estado TEXT DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT NOW()
);

-- INSERT de datos de ejemplo (para testing)
-- NOTA: Modificar estos datos al crear un nuevo cliente

-- Clínica de ejemplo (dentista particular)
INSERT INTO clinic (id, name, phone, whatsapp, address, logo_url, primary_color, cancellation_policy, business_hours)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Dr. Martín Aguirre - Odontología',
    '+54 11 4780-2233',
    '5491147802233',
    'Av. Corrientes 1234, CABA',
    'https://example.com/logo.png',
    '#D4AF37',
    'Cancelación con 24hs de anticipación',
    '{"1": [9,19], "2": [9,18], "3": [9,19], "4": [9,19], "5": [8,17]}'::JSONB
) ON CONFLICT (id) DO NOTHING;

-- Servicios de ejemplo
INSERT INTO clinic_services (id, clinic_id, name, price, duration_minutes, description, "order") VALUES
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Limpieza dental', 15000, 30, 'Profilaxis completa', 1),
    ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Blanqueamiento', 45000, 60, 'Tratamiento estético', 2),
    ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'Ortodoncia', NULL, NULL, 'Por consulta', 3),
    ('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111111', 'Implantes', NULL, NULL, 'Por consulta', 4)
ON CONFLICT (id) DO NOTHING;

-- Obras sociales de ejemplo
INSERT INTO clinic_insurance (id, clinic_id, name, coverage_notes) VALUES
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'OSDE', 'Cobertura total en limpiezas, 50% en ortodoncia'),
    ('33333333-3333-3333-3333-333333333334', '11111111-1111-1111-1111-111111111111', 'Galeno', 'Cobertura total en tratamientos menores'),
    ('33333333-3333-3333-3333-333333333335', '11111111-1111-1111-1111-111111111111', 'Swiss Medical', '30% de cobertura en implantes')
ON CONFLICT (id) DO NOTHING;

-- Equipo de ejemplo (consultorio privado - un solo doctor)
INSERT INTO clinic_team (id, clinic_id, name, specialty, bio, "order") VALUES
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Dra. Valentina Aguirre', 'Odontóloga general', 'Directora del centro', 1)
ON CONFLICT (id) DO NOTHING;

-- FAQs de ejemplo
INSERT INTO clinic_faqs (id, clinic_id, question, answer, "order") VALUES
    ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', '¿Duele un implante dental?', 'El procedimiento se realiza con anestesia local, por lo que no siente dolor durante la colocación.', 1),
    ('55555555-5555-5555-5555-555555555556', '11111111-1111-1111-1111-111111111111', '¿Cuánto dura un blanqueamiento?', 'Los resultados pueden durar entre 1 y 2 años, dependiendo de sus hábitos.', 2),
    ('55555555-5555-5555-5555-555555555557', '11111111-1111-1111-1111-111111111111', '¿Aceptan obras sociales?', 'Sí, trabajamos con las principales obras sociales. Consultanos por tu cobertura.', 3)
ON CONFLICT (id) DO NOTHING;

-- Casos antes/después de ejemplo (imágenes de dental real, claramente distintas)
INSERT INTO clinic_before_after (id, clinic_id, before_url, after_url, title, description, "order") VALUES
    ('66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 
     'https://images.unsplash.com/photo-1494790108377-be9c397d946e?w=600&h=400&fit=crop&q=80', 
     'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop&q=80',
     'Caso 1: Blanqueamiento dental', 'Sonrisa más blanca y brillante en 1 sesión'),
    ('66666666-6666-6666-6666-666666666667', '11111111-1111-1111-1111-111111111111', 
     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&q=80', 
     'https://images.unsplash.com/photo-1582750673913-50979bc0925c?w=600&h=400&fit=crop&q=80',
     'Caso 2: Ortodoncia invisible', 'Alineadores transforman la sonrisa sin metal visible'),
    ('66666666-6666-6666-6666-666666666668', '11111111-1111-1111-1111-111111111111', 
     'https://images.unsplash.com/photo-1599566150125-1b7e7a0b5e2c?w=600&h=400&fit=crop&q=80', 
     'https://images.unsplash.com/photo-1576091158677-7b8dfe9d6c1a?w=600&h=400&fit=crop&q=80',
     'Caso 3: Implantes', 'Rehabilitación funcional y estética')
ON CONFLICT (id) DO NOTHING;


