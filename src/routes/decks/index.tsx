import { Link, createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";

import { listDecks } from "@/lib/server/decks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const Route = createFileRoute("/decks/")({
	loader: () => listDecks(),
	component: DecksPage,
});

function DecksPage() {
	const decks = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-semibold">Decks</h1>
				<p className="text-sm text-muted-foreground">
					{decks.length} {decks.length === 1 ? "deck" : "decks"}
				</p>
			</div>

			{decks.length === 0 ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum deck ainda.
				</div>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
					{decks.map((deck) => (
						<Link
							key={deck.id}
							to="/decks/$deckSlug"
							params={{ deckSlug: deck.slug }}
						>
							<Card className="h-full transition-colors hover:border-primary">
								<CardHeader>
									<div className="flex items-center gap-2 font-medium">
										<Layers className="size-4 text-[var(--lagoon-deep)]" />
										{deck.name}
									</div>
								</CardHeader>
								<CardContent className="text-sm text-muted-foreground">
									{deck.description || "Sem descrição."}
									<p className="mt-2 text-xs">
										{deck._count.deckChords}{" "}
										{deck._count.deckChords === 1 ? "acorde" : "acordes"}
									</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
