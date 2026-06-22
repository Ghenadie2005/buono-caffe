import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  (typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined);
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  (typeof process !== "undefined"
    ? process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY
    : undefined);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — set them in .env (see .env.example).",
  );
}

// On the server (SSR / Worker), `createBrowserClient` would touch localStorage
// at module load and crash the whole page. Use a plain non-persistent client
// there, and the real browser client only in the browser.
function makeClient(): SupabaseClient {
  if (typeof window === "undefined") {
    return createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });
  }
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

export const supabase: SupabaseClient = makeClient();
