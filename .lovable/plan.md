## Why every page shows "This page didn't load"

The Worker SSR logs (previously hidden by h3) say:

> `Error: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY`

`src/lib/supabase/client.ts` reads `import.meta.env.VITE_SUPABASE_ANON_KEY` and throws if it's missing. That throw happens at module import, before any route renders, so SSR returns 500 for every URL.

The local `.env` does define `VITE_SUPABASE_ANON_KEY`, which is why dev sort-of works. But the deployed/preview build environment doesn't — Lovable Cloud injects the key under the name **`VITE_SUPABASE_PUBLISHABLE_KEY`** (with server-only `SUPABASE_PUBLISHABLE_KEY` for server code). `import.meta.env.VITE_SUPABASE_ANON_KEY` is inlined as `undefined` at build time → the throw fires on every SSR render.

## Plan

1. **Update `src/lib/supabase/client.ts`** to use the canonical Lovable Cloud names, with fallbacks for back-compat:
   - URL: `import.meta.env.VITE_SUPABASE_URL` → fallback `process.env.SUPABASE_URL`
   - Key: `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY` → `import.meta.env.VITE_SUPABASE_ANON_KEY` → `process.env.SUPABASE_PUBLISHABLE_KEY` → `process.env.SUPABASE_ANON_KEY`
   - Update the error message to reference the new names.
   - Keep the SSR-safety branch (use plain `createClient` with no storage when `window` is undefined) so `@supabase/ssr`'s browser client doesn't touch `localStorage` during SSR.

2. **Update `.env.example`** to document `VITE_SUPABASE_PUBLISHABLE_KEY` (keep a note that `VITE_SUPABASE_ANON_KEY` is still accepted for compatibility).

3. **No other files change.** Auth, routing, and the staff profile you just fixed are untouched. After deploy, the preview should render again.

## Verification

- After the edit, refresh the preview at `/` — it should render the homepage.
- Re-check worker logs: the `Missing VITE_SUPABASE_...` error should be gone.
- Sign in on the Admin tab — should succeed with the staff profile already linked.

If the preview still 500s after this, the next step is to also `console.log` which env source resolved (URL/key) inside `client.ts` so we can see exactly which name the deploy environment is using.
