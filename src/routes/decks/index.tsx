import { useQueryClient } from "@tanstack/react-query";
import {
	createFileRoute,
	Link,
	useNavigate,
	useRouterState,
} from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getDeck, listDecks } from "@/lib/server/decks";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/decks/")({
	head: () => {
		const title = "Decks de acordes — ChordDeck";
		const description =
			"Explore decks temáticos de acordes — maiores, menores e mais — pra estudar e memorizar acordes de violão e guitarra por grupo.";
		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: absoluteUrl("/decks") },
			],
			links: [{ rel: "canonical", href: absoluteUrl("/decks") }],
		};
	},
	validateSearch: z.object({ q: z.string().optional() }),
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps }) => listDecks({ data: { query: deps.q } }),
	component: DecksPage,
});

function DecksPage() {
	const decks = Route.useLoaderData();
	const { q } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const isLoading = useRouterState({ select: (state) => state.isLoading });
	const hasSearch = Boolean(q?.trim());
	const search = q ?? "";
	const queryClient = useQueryClient();
	
	useEffect(() => {
		const qStr = q?.trim();
		
		const t = setTimeout(() => {
			void queryClient.prefetchQuery({
				queryKey: ["decks", qStr ?? ""],
				queryFn: () => listDecks({ data: { query: qStr } }),
			});
		}, 250);
		
		return () => clearTimeout(t);
	}, [q, queryClient]);

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h1 className="text-2xl font-semibold">Decks</h1>
				<p className="text-sm text-muted-foreground">
					{decks.length} {decks.length === 1 ? "deck" : "decks"}
				</p>
			</div>

			<Input
				value={search}
				onChange={(event) => {
					void navigate({
						search: (prev) => ({
							...prev,
							q: event?.target?.value ?? undefined,
						}),
						replace: true,
					});
				}}
				placeholder="Buscar deck por nome..."
				aria-label="Buscar deck por nome"
			/>

			{decks.length === 0 && !hasSearch ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum deck ainda.
				</div>
			) : isLoading ? (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
					{Array.from({ length: 6 }).map((_, index) => (
						<Card key={index}>
							<CardHeader>
								<div className="flex items-center gap-2">
									<Skeleton className="size-4 rounded-full" />
									<Skeleton className="h-5 w-32" />
								</div>
							</CardHeader>
							<CardContent className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-2/3" />
								<Skeleton className="h-3 w-16" />
							</CardContent>
						</Card>
					))}
				</div>
			) : decks.length === 0 ? (
				<div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
					Nenhum deck encontrado para "{search}".
				</div>
			) : (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
					{decks.map((deck) => (
						<Link
							key={deck.id}
							to="/decks/$deckSlug"
							params={{ deckSlug: deck.slug }}
							onMouseEnter={() =>
								void queryClient.prefetchQuery({
									queryKey: ["deck", deck.slug],
									queryFn: () => getDeck({ data: { slug: deck.slug } }),
								})
							}
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
