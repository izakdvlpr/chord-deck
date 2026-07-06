import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { prisma } from "@/lib/db";

export const listDecks = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().optional() }))
	.handler(async ({ data }) => {
		const query = data.query?.trim();
    
		return prisma.deck.findMany({
			where: query
				? {
						name: { contains: query, mode: "insensitive" },
					}
				: undefined,
			include: { _count: { select: { deckChords: true } } },
			orderBy: { name: "asc" },
		});
	});

export const getDeck = createServerFn({ method: "GET" })
	.validator(z.object({ slug: z.string(), query: z.string().optional() }))
	.handler(async ({ data }) => {
		const query = data.query?.trim();
    
		const deck = await prisma.deck.findUnique({
			where: { slug: data.slug },
			include: {
				deckChords: {
					where: query
						? {
								chord: {
									name: { contains: query, mode: "insensitive" },
								},
							}
						: undefined,
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
