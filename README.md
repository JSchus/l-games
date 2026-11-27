# L Games

A small arcade of kids' games at https://schuster.me/l-games (this Vercel project; schuster.me forwards `/l-games/*` here).

- `app/`: the arcade page, the store terms page, the "Create a new game" page (`app/create/`) and the APIs (Monster Packs store, `api/ideas`).
- `public/<slug>/`: each game (static files).
- `lib/`: the games list, store deals and prices, Stripe, database, and for "Create a new game": the lessons (`lessons.ts`), questions (`ideas.ts`), form check (`idea-schema.ts`) and review email (`idea-email.ts`, `mailer.ts`).
- `tests/`: Vitest (game rules, store, ideas, site checks). `TEST_DATABASE_URL=postgres://… pnpm test tests/*.int.test.ts` for the database tests.

## Create a new game

`/l-games/create` teaches game design and collects ideas:

- Each visit on a device unlocks the next of 18 lessons (basics first, then core loops, difficulty curves, balancing, playtesting…). It's counted in that device's browser, once per tab, so a refresh doesn't skip one. After the last lesson they come round again as review.
- 4 tap-to-answer questions (kind of game, how you win, what makes it hard, what you earn), each with a design tip, then a name and a short description (20–1000 letters). No names or contact details are asked for.
- Sending logs the idea in the `game_ideas` table (when `DATABASE_URL` is set) and emails it to `IDEAS_EMAIL_TO` through Resend (when `RESEND_API_KEY` is set). With neither, the page says "the idea box opens soon".
- Flood limits: 3 ideas per device and 30 in total per hour; a hidden trap field drops robots.

## Environment variables

All optional; set them in Vercel. Without them the games work, and the store and idea box say "opening soon".

| Variable | What it's for |
| --- | --- |
| `DATABASE_URL` | Neon Postgres: store purchases and the game-idea log. Migrations run on production builds. |
| `STRIPE_SECRET_KEY` | Monster Packs real-money deals. Selling needs Vercel Pro. |
| `SITE_URL` | Where Stripe sends players back (default https://schuster.me). |
| `RESEND_API_KEY` | Emails new game ideas (sending access, domain `mail.schuster.me`). |
| `IDEAS_EMAIL_FROM` | Sender of idea emails (default `L Games <ideas@mail.schuster.me>`). |
| `IDEAS_EMAIL_TO` | Who reviews ideas, comma-separated (default: info@companychicago.com, jeff@jeffschuster.com and jeffsgotmilk@gmail.com, in `lib/env.ts`). |
