import { Link, createFileRoute } from "@tanstack/react-router";

import { ChordDiagram } from "@/components/chord-diagram";
import { getDeck } from "@/lib/server/decks";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/decks/$deckSlug")({
	loader: ({ params }) => getDeck({ data: { slug: params.deckSlug } }),
	component: DeckPage,
});

function DeckPage() {
	const deck = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-6">
			<div>
				<Link
					to="/decks"
					className="text-sm text-muted-foreground hover:underline"
				>
					← Decks
				</Link>
				<h1 className="mt-1 text-2xl font-semibold">{deck.name}</h1>
				{deck.description && (
					<p className="mt-1 text-sm text-muted-foreground">
						{deck.description}
					</p>
				)}
				<p className="mt-1 text-xs text-muted-foreground">
					{deck.deckChords.length}{" "}
					{deck.deckChords.length === 1 ? "acorde" : "acordes"}
				</p>
			</div>

			{deck.deckChords.length === 0 ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Deck vazio.
				</div>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
					{deck.deckChords.map((dc) => (
						<Card key={dc.chordId}>
							<CardContent className="flex justify-center">
								<ChordDiagram
									name={dc.chord.name}
									notes={dc.chord.notes}
									baseFret={dc.chord.baseFret}
									strings={dc.chord.strings}
									barres={dc.chord.barres}
								/>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
