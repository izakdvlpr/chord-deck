import { z } from "zod";

export const NUM_STRINGS = 6;
export const STRING_LABELS = ["Mi", "Lá", "Ré", "Sol", "Si", "Mi"] as const;
export const MAX_FRET = 24;

export type StringPos = {
	stringNum: number;
	fret: number | null;
	finger: number | null;
	muted: boolean;
};

export type BarrePos = {
	fret: number;
	finger: number;
	fromString: number;
	toString: number;
};

export const stringPosSchema = z.object({
	stringNum: z.number().int().min(1).max(NUM_STRINGS),
	fret: z.number().int().min(0).max(MAX_FRET).nullable(),
	finger: z.number().int().min(1).max(4).nullable(),
	muted: z.boolean(),
});

export const barrePosSchema = z.object({
	fret: z.number().int().min(1).max(MAX_FRET),
	finger: z.number().int().min(1).max(4),
	fromString: z.number().int().min(1).max(NUM_STRINGS),
	toString: z.number().int().min(1).max(NUM_STRINGS),
});

export const chordInputSchema = z.object({
	name: z.string().trim().min(1).max(30),
	baseFret: z.number().int().min(1).max(MAX_FRET),
	difficulty: z.number().int().min(1).max(5).nullable().optional(),
	notes: z.string().trim().max(500).nullable().optional(),
	strings: z.array(stringPosSchema).max(NUM_STRINGS),
	barres: z.array(barrePosSchema).max(NUM_STRINGS),
});

export type ChordInput = z.infer<typeof chordInputSchema>;

export function defaultStrings(): StringPos[] {
	return Array.from({ length: NUM_STRINGS }, (_, i) => ({
		stringNum: i + 1,
		fret: null,
		finger: null,
		muted: false,
	}));
}

export function parseNotation(input: string): StringPos[] {
	const raw = input.trim();
	if (!raw) throw new Error("Notação vazia.");

	const tokens = /[\s,-]/.test(raw)
		? raw.split(/[\s,-]+/).filter(Boolean)
		: raw.split("");

	if (tokens.length !== NUM_STRINGS) {
		throw new Error(
			`Notação inválida: esperado ${NUM_STRINGS} cordas, recebi ${tokens.length}.`,
		);
	}

	return tokens.map((tok, i) => {
		const stringNum = i + 1;
		if (tok === "x" || tok === "X") {
			return { stringNum, fret: null, finger: null, muted: true };
		}
		const n = Number(tok);
		if (!Number.isInteger(n) || n < 0 || n > MAX_FRET) {
			throw new Error(`Casa inválida na corda ${stringNum}: "${tok}".`);
		}
		return { stringNum, fret: n === 0 ? null : n, finger: null, muted: false };
	});
}

export function formatNotation(strings: StringPos[]): string {
	const byNum = [...strings].sort((a, b) => a.stringNum - b.stringNum);
	const tokens = byNum.map((s) => {
		if (s.muted) return "x";
		if (s.fret == null || s.fret === 0) return "0";
		return String(s.fret);
	});
	const needsDelim = byNum.some((s) => !s.muted && (s.fret ?? 0) >= 10);
	return needsDelim ? tokens.join("-") : tokens.join("");
}
