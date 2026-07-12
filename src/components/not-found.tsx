import { Link } from "@tanstack/react-router";
import { ArrowRight, Home, Search } from "lucide-react";

import { ChordDiagram } from "@/components/chord-diagram";
import { Button } from "@/components/ui/button";
import { parseNotation } from "@/lib/chord-notation";

export function NotFound() {
	return (
		<section className="page-wrap flex flex-col items-center gap-10 py-16 text-center md:py-24">
			<div className="rise-in flex max-w-2xl flex-col items-center gap-5">
				<span className="island-kicker">Erro 404</span>
				<h1 className="display-title text-5xl font-bold leading-tight md:text-7xl">
					Esse acorde não existe.
				</h1>
				<p className="text-lg text-muted-foreground">
					A página que você procurou saiu de tom. Talvez o link esteja errado ou
					o conteúdo tenha mudado de casa.
				</p>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button asChild size="lg">
						<Link to="/">
							<Home className="size-4" />
							Voltar ao início
						</Link>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link to="/chords">
							<Search className="size-4" />
							Ver acordes
						</Link>
					</Button>
				</div>
			</div>

			<div className="island-shell rise-in flex flex-wrap items-center justify-center gap-6 rounded-2xl p-8">
				<ChordDiagram
					name="?"
					notes="Acorde perdido"
					baseFret={1}
					strings={parseNotation("xxxxxx")}
					size={180}
				/>
			</div>

			<Link
				to="/decks"
				className="inline-flex items-center gap-1 text-sm font-medium text-[var(--lagoon-deep)]"
			>
				Explorar decks temáticos
				<ArrowRight className="size-4" />
			</Link>
		</section>
	);
}
