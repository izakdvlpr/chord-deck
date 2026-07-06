import { createServerFn } from "@tanstack/react-start";

import { prisma } from "@/lib/db";

// Public, read-only. Chords are populated via prisma/seed.ts.
export const listChords = createServerFn({ method: "GET" }).handler(
	async () => {
		return prisma.chord.findMany({
			include: { strings: { orderBy: { stringNum: "asc" } }, barres: true },
			orderBy: { sortOrder: "asc" },
		});
	},
);
