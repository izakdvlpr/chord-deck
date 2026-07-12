import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/db";

export const getLandingData = createServerFn({ method: "GET" }).handler(
	async () => {
		const decks = await prisma.deck.findMany({
			include: { _count: { select: { deckChords: true } } },
			orderBy: { name: "asc" },
		});

		return { decks };
	},
);
