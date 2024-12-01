# @hono/supabash-auth example

- app
  - supabash-auth @hono/supabash-auth
  - supabase Next.js example

## 1: Add Environment Variables in Next.js

## path:apps/supabase/.env.local

add to .env.local

NEXT_PUBLIC_URL=<next run url>

NEXT_PUBLIC_SUPABASE_URL=<supabase url>
NEXT_PUBLIC_SUPABASE_KEY=<supabase key>

# This is the secret key for the JWT token in the supabase setting of API

NEXT_PUBLIC_SUPABASE_JWT_SECRET=<supabase jwt secret>

## 2: in root path install dependencies and Run

```cmd
pnpm i
pnpm run dev
```
