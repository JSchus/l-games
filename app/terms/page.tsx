import type { Metadata } from "next";
import { OFFER_IDS, offer, price } from "@/lib/store";

export const metadata: Metadata = {
  title: "Store terms · L Games",
  robots: { index: false, follow: false },
};

/** Plain-language terms for Monster Packs deals (public, for parents). */
export default function StoreTermsPage() {
  const deals = OFFER_IDS.map((id) => offer(id)!);
  return (
    <main>
      <article className="terms">
        <a href="/l-games/monster-packs" className="dim">
          ← Back to Monster Packs
        </a>
        <h1>Store terms</h1>
        <p>
          Monster Packs is a game made by a kid, with help from family. It&apos;s free to play. Some optional deals cost real money. These
          terms explain them in plain words. <strong>Grown-ups: please read this before buying.</strong>
        </p>
        <h2>What you can buy</h2>
        <ul>
          {deals.map((d) => (
            <li key={d.id}>
              <strong>
                {d.name}, {price(d.cents)}
              </strong>
              : {d.id === "daily" ? "3 packs of a different tier each day" : d.blurb}
              {d.weekendOnly ? " Only on Saturdays and Sundays." : ""}
            </li>
          ))}
        </ul>
        <p>Prices are in US dollars. What you get is shown before you pay and can&apos;t change after you pay.</p>
        <h2>How paying works</h2>
        <ul>
          <li>
            Every purchase starts with a grown-up question in the game, then goes to <strong>Stripe</strong>&apos;s secure checkout page. Card details
            are only ever entered on Stripe; this site never sees them.
          </li>
          <li>Stripe emails a receipt for every purchase.</li>
          <li>Packs and coins are added in the game as soon as the payment goes through.</li>
        </ul>
        <h2>Important: purchases live on one device</h2>
        <p>
          The game has no accounts. Bought packs and coins are saved in the browser on the device that bought them. They{" "}
          <strong>can&apos;t be moved to another device</strong>, and they&apos;re <strong>lost</strong> if you use &ldquo;Reset game&rdquo;, clear
          the browser&apos;s data, or use a private window. Opened packs and the cards in them are game items with no cash value.
        </p>
        <h2>Refunds</h2>
        <p>
          Bought something by mistake, or a kid bought it without asking? <strong>Reply to the Stripe receipt email within 30 days</strong> and we&apos;ll
          refund it. If packs didn&apos;t show up after paying, reload the game on the same device; if they still don&apos;t appear, reply to the
          receipt and we&apos;ll refund you.
        </p>
        <h2>Privacy</h2>
        <p>
          The game doesn&apos;t ask for names or emails. To give packs to the right device, it keeps a random code on the device and stores it with the
          purchase. Stripe handles the payment and your email for the receipt under its own privacy policy.
        </p>
      </article>
    </main>
  );
}
