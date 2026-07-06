import { Link } from "@tanstack/react-router";
import { Music4 } from "lucide-react";

const NAV_LINKS = [
	{ to: "/chords", label: "Acordes", ready: true },
	{ to: "/decks", label: "Decks", ready: true },
] as const;

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
			<div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4">
				<Link to="/" className="flex items-center gap-2 font-semibold">
					<Music4 className="size-5 text-[var(--lagoon-deep)]" />
					<span>ChordDeck</span>
				</Link>

				<nav className="flex items-center gap-1 text-sm">
					{NAV_LINKS.map((link) =>
						link.ready ? (
							<Link
								key={link.to}
								to={link.to}
								className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
								activeProps={{ className: "bg-accent text-foreground" }}
							>
								{link.label}
							</Link>
						) : (
							<span
								key={link.to}
								title="Em breve"
								className="cursor-not-allowed rounded-md px-3 py-1.5 text-muted-foreground/50"
							>
								{link.label}
							</span>
						),
					)}
				</nav>
			</div>
		</header>
	);
}
