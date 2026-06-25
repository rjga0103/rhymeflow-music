import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const serviceClient = createClient(
  "https://ycogsyftyfwcqkycbpak.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljb2dzeWZ0eWZ3Y3FreWNicGFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQxOTQ3MSwiZXhwIjoyMDk3OTk1NDcxfQ.DYCdvvaf4QvadB3CjH2TK4b06HCj9h0pLAzVIIaEjrY"
);
const ADMIN_PASSWORD = "rhymeflow2026";
function unauthorized() {
  return new Response(JSON.stringify({ error: "No autorizado" }), {
    status: 401,
    headers: { "Content-Type": "application/json" }
  });
}
function validateAuth(request) {
  const auth = request.headers.get("Authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}
const GET = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    const { data: data2, error: error2 } = await serviceClient.from("artists").select("*").eq("id", id).single();
    if (error2) return new Response(JSON.stringify({ error: error2.message }), { status: 400 });
    return new Response(JSON.stringify(data2));
  }
  const { data, error } = await serviceClient.from("artists").select("*").order("sort_order");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data));
};
const POST = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();
  const body = await request.json();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const { data, error } = await serviceClient.from("artists").insert({ ...body, slug }).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 201 });
};
const PUT = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();
  const body = await request.json();
  const { id, ...updates } = body;
  if (updates.name) {
    updates.slug = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  const { data, error } = await serviceClient.from("artists").update(updates).eq("id", id).select().single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data));
};
const DELETE = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });
  const { error } = await serviceClient.from("artists").delete().eq("id", id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ success: true }));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
