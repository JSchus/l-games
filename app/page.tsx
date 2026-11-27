import type { Metadata } from "next";
import { GAMES } from "@/lib/games";

export const metadata: Metadata = { title: "L Games", description: "Games made by L." };

/** Public arcade (no sign-in): every game, newest first. */
export default function GamesPage() {
  const games = [...GAMES].sort((a, b) => b.added.localeCompare(a.added));
  return (
    <main className="arcade">
      <header>
        <div className="logo" aria-hidden>
          🕹️
        </div>
        <h1>L Games</h1>
        <p className="dim">Made by L. Tap a game to play: no sign-in needed.</p>
      </header>
      <ul className="games">
        {games.map((g) => (
          <li key={g.slug}>
            {/* A plain link: games are their own pages, not part of this app. */}
            <a href={`/l-games/${g.slug}`}>
              <span className="emoji" aria-hidden>
                {g.emoji}
              </span>
              <span className="title">{g.title}</span>
              <span className="dim">{g.blurb}</span>
              <span className="play">▶ Play</span>
            </a>
          </li>
        ))}
      </ul>
      <footer>
        <span>More games coming soon!</span>
        <a href="/l-games/create" className="create-link">
          🎨 Create a new game
        </a>
      </footer>
    </main>
  );
}
