import { createClient } from "@supabase/supabase-js";

export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photo_url: string;
  genre: string;
  dsp_links: {
    spotify?: string;
    apple?: string;
    youtube?: string;
    amazon?: string;
    deezer?: string;
    tidal?: string;
  };
  active: boolean;
  sort_order: number;
  created_at: string;
}

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getArtists(): Promise<Artist[]> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching artists:", error);
    return [];
  }

  return data || [];
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error) {
    console.error("Error fetching artist:", error);
    return null;
  }

  return data;
}
