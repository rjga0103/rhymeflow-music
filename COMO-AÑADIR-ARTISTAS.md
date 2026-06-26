# Como gestionar artistas en Rhyme Flow Music

Este sitio carga los artistas desde **Supabase** en cada build. Para añadir, editar o eliminar artistas, sigue estos pasos.

---

## Anadir un artista nuevo

1. Entra en **[supabase.com/dashboard](https://supabase.com/dashboard)** e inicia sesion.
2. Selecciona el proyecto **Rhyme Flow Music**.
3. En el menu izquierdo, ve a **Table Editor**.
4. Haz clic en la tabla **artists**.
5. Haz clic en **Insert** (boton verde) y selecciona **Insert row**.
6. Rellena los campos:

| Campo | Descripcion | Ejemplo |
|-------|-------------|---------|
| `name` | Nombre del artista | `MC Flow` |
| `slug` | Identificador unico para la URL (sin espacios ni caracteres especiales) | `mc-flow` |
| `bio` | Biografia del artista | `Artista urbano emergente...` |
| `photo_url` | URL de la foto (puedes usar Unsplash, Imgur o tu propio CDN) | `https://images.unsplash.com/photo-...` |
| `genre` | Genero musical | `Trap / Reggaeton` |
| `dsp_links` | Enlaces a plataformas en formato JSON | Ver abajo |
| `active` | `true` = visible en la web, `false` = oculto | `true` |
| `sort_order` | Orden de aparicion (1 primero, 2 segundo, etc.) | `1` |

### Formato de `dsp_links` (JSON)

```json
{
  "spotify": "https://open.spotify.com/artist/...",
  "apple": "https://music.apple.com/artist/...",
  "youtube": "https://youtube.com/@...",
  "amazon": "https://music.amazon.com/...",
  "deezer": "https://deezer.com/artist/...",
  "tidal": "https://tidal.com/..."
}
```

Solo pon las plataformas que tengas. Las que dejes vacias (o no incluyas) no apareceran en la web.

7. Haz clic en **Save**.

---

## Editar un artista

1. En **Table Editor** > tabla `artists`, encuentra al artista.
2. Haz clic en el lapiz (Edit) a la izquierda de la fila.
3. Modifica los campos que necesites.
4. Haz clic en **Save**.

---

## Eliminar un artista

1. En **Table Editor** > tabla `artists`, encuentra al artista.
2. Haz clic en los tres puntos `...` a la derecha.
3. Selecciona **Delete row**.
4. Confirma.

---

## Ocultar un artista sin borrarlo

Cambia el campo `active` a `false`. El artista se oculta de la web pero se conserva en la base de datos. Puedes reactivarlo cambiandolo de nuevo a `true`.

---

## Publicar los cambios

Los cambios en Supabase **NO se reflejan automaticamente** en la web. Despues de cualquier cambio, haz:

1. Ve a **[vercel.com/dashboard](https://vercel.com/dashboard)**.
2. Entra al proyecto **Rhyme Flow Music**.
3. Haz clic en **Redeploy** (boton azul en la esquina superior derecha).
4. En ~30 segundos los cambios estaran visibles en `rhymeflowmusic.net`.

---

## Resumen rapido

```
Supabase Table Editor → Crear/Editar/Borrar artista → Vercel Redeploy → Web actualizada
```
