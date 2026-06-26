export const prerender = false;

import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

const serviceClient = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
);

const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || "admin123";

function unauthorized() {
  return new Response(JSON.stringify({ error: "No autorizado" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

function validateAuth(request: Request): boolean {
  const auth = request.headers.get("Authorization");
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

export const GET: APIRoute = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    const { data, error } = await serviceClient.from("artists").select("*").eq("id", id).single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify(data));
  }

  const { data, error } = await serviceClient.from("artists").select("*").order("sort_order");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify(data));
};

const DEPLOY_HOOK = import.meta.env.DEPLOY_HOOK_URL || "";

async function triggerDeploy() {
  if (!DEPLOY_HOOK) return;
  try {
    await fetch(DEPLOY_HOOK, { method: "POST" });
  } catch {
    // silent fail - deploy hook is best-effort
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();

  const body = await request.json();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const { data, error } = await serviceClient
    .from("artists")
    .insert({ ...body, slug })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  triggerDeploy();
  return new Response(JSON.stringify(data), { status: 201 });
};

export const PUT: APIRoute = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();

  const body = await request.json();
  const { id, ...updates } = body;

  if (updates.name) {
    updates.slug = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  const { data, error } = await serviceClient
    .from("artists")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  triggerDeploy();
  return new Response(JSON.stringify(data));
};

export const DELETE: APIRoute = async ({ request }) => {
  if (!validateAuth(request)) return unauthorized();

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response(JSON.stringify({ error: "ID requerido" }), { status: 400 });

  const { error } = await serviceClient.from("artists").delete().eq("id", id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  triggerDeploy();
  return new Response(JSON.stringify({ success: true }));
};
