import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { GAMES } from "@/lib/games";

const root = fileURLToPath(new URL("../", import.meta.url));

describe("the arcade", () => {
  it("has a folder with an index.html for every listed game, using /l-games paths", () => {
    expect(GAMES.length).toBe(4);
    for (const g of GAMES) {
      expect(g.slug).toMatch(/^[a-z0-9-]+$/);
      const file = `${root}public/${g.slug}/index.html`;
      expect(existsSync(file)).toBe(true);
      const html = readFileSync(file, "utf8");
      // Games are served at /l-games/<slug> (no trailing slash), so asset links must be absolute.
      for (const src of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) expect(src[1]).toMatch(new RegExp(`^/l-games/${g.slug}/`));
    }
  });

  it("never shows a first name in anything the public can load", () => {
    const files = GAMES.flatMap((g) => ["index.html", "game.js", "logic.js", "style.css"].map((f) => `${root}public/${g.slug}/${f}`));
    files.push(`${root}app/page.tsx`, `${root}app/terms/page.tsx`, `${root}app/layout.tsx`, `${root}app/create/page.tsx`, `${root}app/create/create-game.tsx`, `${root}lib/lessons.ts`, `${root}lib/ideas.ts`);
    for (const f of files) expect(readFileSync(f, "utf8"), f).not.toMatch(/Logan/);
  });
});
