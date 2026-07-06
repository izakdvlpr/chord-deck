import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { prisma } from "@/lib/db";

// Public, read-only. Decks are populated via prisma/seed.ts.
export const listDecks = createServerFn({ method: "GET" }).handler(async () => {
	return prisma.deck.findMany({
		include: { _count: { select: { deckChords: true } } },
		orderBy: { name: "asc" },
	});
});

export const getDeck = createServerFn({ method: "GET" })
	.validator(z.object({ slug: z.string() }))
	.handler(async ({ data }) => {
		const deck = await prisma.deck.findUnique({
			where: { slug: data.slug },
			include: {
				deckChords: {
					include: {
						chord: {
							include: {
								strings: { orderBy: { stringNum: "asc" } },
								barres: true,
							},
						},
					},
					orderBy: { chord: { sortOrder: "asc" } },
				},
			},
		});
		if (!deck) throw notFound();
		return deck;
	});
