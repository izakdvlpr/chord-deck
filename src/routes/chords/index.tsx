import {
	createFileRoute,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import { ChordDiagram } from "@/components/chord-diagram";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { listChords } from "@/lib/server/chords";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/chords/")({
	head: () => {
		const title = "Acordes de violão e guitarra — ChordDeck";
		const description =
			"Biblioteca de acordes de violão e guitarra com diagramas nítidos e digitação de cada acorde. Busque pelo nome e aprenda a posição na hora.";
		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: absoluteUrl("/chords") },
			],
			links: [{ rel: "canonical", href: absoluteUrl("/chords") }],
		};
	},
	validateSearch: z.object({ q: z.string().optional() }),
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps }) => listChords({ data: { query: deps.q } }),
	component: ChordsPage,
});

function ChordsPage() {
	const chords = Route.useLoaderData();
	const { q } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const isLoading = useRouterState({ select: (state) => state.isLoading });
	const hasSearch = Boolean(q?.trim());
	const [input, setInput] = useState(q ?? "");
	const debounced = useDebouncedValue(input, 300);

	useEffect(() => {
		const next = debounced.trim() ? debounced : undefined;
		if ((q ?? "") === (next ?? "")) return;

		void navigate({
			search: (prev) => ({ ...prev, q: next }),
			replace: true,
		});
	}, [debounced]);

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-semibold">Acordes</h1>
				<p className="text-sm text-muted-foreground">
					{chords.length} {chords.length === 1 ? "acorde" : "acordes"}
				</p>
			</div>

			<Input
				value={input}
				onChange={(event) => setInput(event.target.value)}
				placeholder="Buscar acorde por nome..."
				aria-label="Buscar acorde por nome"
			/>

			{chords.length === 0 && !hasSearch ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum acorde ainda. Popule via seed.
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
			) : chords.length === 0 ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum acorde encontrado para "{q ?? input}".
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
