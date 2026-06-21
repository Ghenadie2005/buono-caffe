## Goal

Connect the app to your existing Supabase project at `https://kbzolbcfhgxgabdubzvy.supabase.co` without scaffolding a new client or touching schema. The `supabase` browser client, `AuthProvider`, and sign-in flow are already in place — they just need env vars.

## Steps

1. **Create `.env`** at the project root with:
   - `VITE_SUPABASE_URL=https://kbzolbcfhgxgabdubzvy.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=sb_publishable_9FJrJXlpn4r68VGCLs14jA_FYQyqZKz`

2. **Create `.env.example`** with the same keys but empty values, so future contributors know what's required.

3. **Ensure `.env` is gitignored** (check `.gitignore`, add if missing) so the key isn't committed when you push to GitHub.

4. **Restart the dev server** so Vite picks up the new env vars, then verify in the browser console that `supabase.auth.getSession()` works and the Sign In modal can authenticate against your existing `profiles` table.

## What I will NOT touch

- `src/lib/supabase/client.ts` — already correct
- `src/lib/auth-context.tsx` — already matches your `profiles` schema
- No new migrations, no Lovable Cloud, no new Supabase clients

## Note on the key format

`sb_publishable_...` is the new-format publishable key. It works fine with the browser client (`@supabase/ssr`'s `createBrowserClient`) for auth and RLS-protected Data API reads. If any server-side code later needs PostgREST with strict JWT parsing, we'd revisit — but nothing in the current frontend-only codebase needs that.
