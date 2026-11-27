# L Games

A small arcade of kids' games at https://schuster.me/l-games (this Vercel project; schuster.me forwards `/l-games/*` here).

- `app/`: the arcade page, store terms page and the Monster Packs store API.
- `public/<slug>/`: each game (static files).
- `lib/`: the games list, store deals and prices, Stripe, database.
- `tests/`: Vitest (game rules, store, site checks). `TEST_DATABASE_URL=postgres://… pnpm test tests/game-store.int.test.ts` for the database test.

Environment variables (all optional; set in Vercel): `DATABASE_URL`, `STRIPE_SECRET_KEY`, `SITE_URL` (default https://schuster.me). Without them the games work and the store says "opening soon".
