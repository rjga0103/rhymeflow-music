-- =============================================
-- Rhyme Flow Music — Schema de Supabase
-- Ejecuta esto en: Supabase Dashboard > SQL Editor > New Query
-- =============================================

-- Tabla de artistas
CREATE TABLE artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT NOT NULL DEFAULT '',
  photo_url TEXT NOT NULL DEFAULT '',
  genre TEXT NOT NULL DEFAULT 'Urbano',
  dsp_links JSONB DEFAULT '{}'::jsonb,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indices
CREATE INDEX idx_artists_active ON artists (active);
CREATE INDEX idx_artists_sort ON artists (sort_order);
CREATE INDEX idx_artists_slug ON artists (slug);

-- RLS: lectura publica, escritura solo autenticado
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON artists FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated can manage"
  ON artists FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Datos de ejemplo (borralos cuando tengas los reales)
INSERT INTO artists (name, slug, bio, photo_url, genre, dsp_links, sort_order) VALUES
(
  'MC Ejemplo',
  'mc-ejemplo',
  'Artista urbano emergente con un flow unico que mezcla trap, reggaeton y ritmos latinos. Con mas de 5 anos en la escena, ha colaborado con productores de primer nivel y lleva su musica a escenarios de toda Espana.',
  'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?w=800&q=80',
  'Trap / Reggaeton',
  '{"spotify": "https://open.spotify.com", "apple": "https://music.apple.com", "youtube": "https://youtube.com"}',
  1
),
(
  'DJ Vibes',
  'dj-vibes',
  'Productor y DJ que fusiona ritmos urbanos con electronica. Su sonido caracteristico mezcla beats contundentes con melodias latinas, creando un estilo fresco y bailable que conecta con audiencias globales.',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  'Urban / Electronica',
  '{"spotify": "https://open.spotify.com", "youtube": "https://youtube.com", "deezer": "https://deezer.com"}',
  2
);
