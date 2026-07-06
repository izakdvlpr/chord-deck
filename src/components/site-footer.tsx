import { Link } from "@tanstack/react-router";
import { Music4 } from "lucide-react";

export function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer mt-auto">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
				<Link
					to="/"
					className="flex items-center gap-2 font-semibold text-foreground"
				>
					<Music4 className="size-4 text-[var(--lagoon-deep)]" />
					ChordDeck
				</Link>
				<p>Memorize acordes com repetição espaçada.</p>
				<p>© {year} ChordDeck</p>
			</div>
		</footer>
	);
}
