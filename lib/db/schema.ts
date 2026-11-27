import { index, integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/** Real-money Monster Packs deals: one row per Stripe Checkout session. */
export const gamePurchases = pgTable(
  "game_purchases",
  {
    /** Stripe Checkout session id (cs_…). */
    id: text("id").primaryKey(),
    offer: text("offer").notNull(),
    cents: integer("cents").notNull(),
    /** What it gives, fixed when the checkout started. */
    grant: jsonb("grant").$type<{ packs: Record<string, number>; coins: number }>().notNull(),
    /** Random id the game keeps on the device; packs only go to that device. */
    deviceId: text("device_id").notNull(),
    /** Set once the payment is confirmed and the packs were handed out. */
    grantedAt: timestamp("granted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("game_purchases_device_idx").on(t.deviceId, t.offer)],
);
export type GamePurchase = typeof gamePurchases.$inferSelect;
