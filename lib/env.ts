import "server-only";
import { z } from "zod";

/**
 * Server settings, checked the first time they're used (so `next build`
 * works without secrets). Without STRIPE_SECRET_KEY and DATABASE_URL the
 * store simply shows "opening soon"; the games work either way.
 */
const schema = z.object({
  /** Postgres for store purchases (Neon). Only needed once the store opens. */
  DATABASE_URL: z.string().url().optional(),
  /** Stripe secret key (sk_test_… or sk_live_…). Unset = store closed. Never print it. */
  STRIPE_SECRET_KEY: z.string().optional(),
  /** The public address players use; Stripe sends them back here after paying. */
  SITE_URL: z.string().url().default("https://schuster.me"),
});

export type Env = z.infer<typeof schema>;
let cached: Env | undefined;

export function env(): Env {
  if (!cached) {
    const parsed = schema.safeParse(process.env);
    if (!parsed.success) throw new Error(`Invalid environment:\n${z.prettifyError(parsed.error)}`);
    cached = parsed.data;
  }
  return cached;
}
