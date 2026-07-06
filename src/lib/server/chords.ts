import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { prisma } from "@/lib/db";

export const listChords = createServerFn({ method: "GET" })
	.validator(z.object({ query: z.string().optional() }))
	.handler(async ({ data }) => {
		const query = data.query?.trim();
    
		return prisma.chord.findMany({
			where: query
				? {
						name: { contains: query, mode: "insensitive" },
					}
				: undefined,
			include: { strings: { orderBy: { stringNum: "asc" } }, barres: true },
			orderBy: { sortOrder: "asc" },
		});
	});
