import { createFileRoute } from "@tanstack/react-router";

import { ChordDiagram } from "@/components/chord-diagram";
import { listChords } from "@/lib/server/chords";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/chords/")({
	loader: () => listChords(),
	component: ChordsPage,
});

function ChordsPage() {
	const chords = Route.useLoaderData();

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-semibold">Acordes</h1>
				<p className="text-sm text-muted-foreground">
					{chords.length} {chords.length === 1 ? "acorde" : "acordes"}
				</p>
			</div>

			{chords.length === 0 ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum acorde ainda. Popule via seed.
				</div>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
					{chords.map((chord) => (
						<Card key={chord.id}>
							<CardContent className="flex justify-center">
								<ChordDiagram
									name={chord.name}
									notes={chord.notes}
									baseFret={chord.baseFret}
									strings={chord.strings}
									barres={chord.barres}
								/>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
