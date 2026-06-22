import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function readEnv(name: string): string | undefined {
  return import.meta.env[name] ?? (typeof process !== "undefined" ? process.env?.[name] : undefined);
}

function readSupabaseConfig() {
  const url = readEnv("VITE_SUPABASE_URL") ?? readEnv("SUPABASE_URL");
  const publishableKey =
    readEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ??
    readEnv("VITE_SUPABASE_ANON_KEY") ??
    readEnv("SUPABASE_PUBLISHABLE_KEY") ??
    readEnv("SUPABASE_ANON_KEY");

  return url && publishableKey ? { url, publishableKey } : null;
}

export function isSupabaseConfigured() {
  return readSupabaseConfig() !== null;
}

function getSupabaseConfig() {
  const config = readSupabaseConfig();

  if (!config) {
    throw new Error(
      "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — set them in .env (see .env.example).",
    );
  }

  return config;
}

let cachedClient: SupabaseClient | undefined;

// Create the client lazily so importing this file during SSR can never crash
// the whole app if Cloud/browser env injection is unavailable at module load.
export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const { url, publishableKey } = getSupabaseConfig();

  if (typeof window === "undefined") {
    cachedClient = createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });
    return cachedClient;
  }

  cachedClient = createBrowserClient(url, publishableKey);
  return cachedClient;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
