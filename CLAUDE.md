# L Games: notes for Claude

A small public arcade of kids' games, served at **https://schuster.me/l-games**. This is its own repo and Vercel project; schuster.me forwards `/l-games/*` here, so players see schuster.me/l-games and their saves (browser localStorage, per site) are kept. The GitHub owner is `JSchus`.

## Privacy
- **Never put the kid's first name in anything public:** pages, game files, comments in `public/`, titles or texts. Use "L" / "L Games". `tests/site.test.ts` checks this.
- Keep the localStorage keys as they are (`logans-games:…`): changing them would wipe players' saves.

## Stack
- Next.js 15 with `basePath: "/l-games"`. Arcade page `app/page.tsx`; terms `app/terms/page.tsx`.
- Each game is static files in `public/<slug>/` (`index.html`, `style.css`, `logic.js` pure rules, `game.js` screens). `next.config.ts` rewrites `/l-games/<slug>` to its `index.html`, so asset paths in `index.html` must be absolute (`/l-games/<slug>/…`). The list is `lib/games.ts`.
- Games: Monster Packs, Race & Stream (`#autopilot` for tests), Space Lane Shooter (`#autopilot`), THE GAME (`#debug`).
- "Create a new game" (`app/create/`, `app/api/ideas`): a lesson per visit (`lib/lessons.ts`), 4 questions (`lib/ideas.ts`), then the idea is logged in `game_ideas` and emailed for review via Resend (`RESEND_API_KEY`). Never ask kids for names or contact details there.
- Monster Packs real-money store: `lib/store.ts` (prices server-side), `lib/stripe.ts`, `app/api/{offers,checkout,claim}`, table `game_purchases` (Drizzle, `drizzle/`). Closed ("opening soon") until `STRIPE_SECRET_KEY` and `DATABASE_URL` are set in Vercel. `SITE_URL` (default https://schuster.me) is where Stripe sends players back. Selling needs Vercel Pro.

## Hard rules
- Never ask for, print or commit secrets (`STRIPE_SECRET_KEY`, `DATABASE_URL`, `RESEND_API_KEY`). John sets them in Vercel.
- No AI model names in commits, PR text or code.
- Games must be original: their own names, art and creatures, no copies of existing games.
- Schema changes go in a new additive Drizzle migration (`pnpm db:generate`); `scripts/migrate.mjs` runs on production builds only, and only when `DATABASE_URL` is set.

## How John likes to work
- Plain language, one step at a time, for anything he has to do (he uses a Mac and an iPhone, no local terminal).
- Every change on a branch with a pull request he merges himself; afterwards, tell him what to check on the live site.
- Times in Chicago time.

## Before opening a PR
`pnpm typecheck && pnpm lint && pnpm test && pnpm build`, and play the changed game in a browser (headless Chromium + Playwright), including a phone-size check.
