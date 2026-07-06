import {
	Link,
	createFileRoute,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import { z } from "zod";

import { ChordDiagram } from "@/components/chord-diagram";
import { getDeck } from "@/lib/server/decks";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/decks/$deckSlug")({
	validateSearch: z.object({ q: z.string().optional() }),
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ params, deps }) =>
		getDeck({ data: { slug: params.deckSlug, query: deps.q } }),
	component: DeckPage,
});

function DeckPage() {
	const deck = Route.useLoaderData();
	const { q } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const isLoading = useRouterState({ select: (state) => state.isLoading });
	const hasSearch = Boolean(q?.trim());
	const search = q ?? "";

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

			<Input
				value={search}
				onChange={(event) => {
					void navigate({
						search: (prev) => ({ ...prev, q: event?.target?.value ?? undefined }),
						replace: true,
					});
				}}
				placeholder="Buscar acorde do deck por nome..."
				aria-label="Buscar acorde do deck por nome"
			/>

			{deck.deckChords.length === 0 && !hasSearch ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Deck vazio.
				</div>
			) : isLoading ? (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
					{Array.from({ length: 8 }).map((_, index) => (
						<Card key={index}>
							<CardContent className="flex flex-col gap-4">
								<Skeleton className="h-5 w-16 self-center" />
								<Skeleton className="h-32 w-full" />
							</CardContent>
						</Card>
					))}
				</div>
			) : deck.deckChords.length === 0 ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum acorde encontrado para "{search}".
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
