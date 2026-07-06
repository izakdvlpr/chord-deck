import {
	STRING_LABELS,
	type BarrePos,
	type StringPos,
} from "@/lib/chord-notation";
import { cn } from "@/lib/utils";

interface ChordDiagramProps {
	name: string;
	notes?: string | null;
	baseFret: number;
	strings: StringPos[];
	barres?: BarrePos[];
	size?: number;
	className?: string;
}

const STRING_GAP = 18;
const FRET_GAP = 22;
const BOARD_WIDTH = STRING_GAP * 5; // 6 strings, 5 gaps
const MARGIN_LEFT = 20;
const MARGIN_RIGHT = 14;
const MARGIN_TOP = 32; // name + open/muted markers
const MARGIN_BOTTOM = 22; // string labels
const DOT_R = 7;
const MIN_FRETS = 4;

export function ChordDiagram({
	name,
	notes,
	baseFret,
	strings,
	barres = [],
	size = 168,
	className,
}: ChordDiagramProps) {
	const byNum = new Map(strings.map((s) => [s.stringNum, s]));

	const fretsUsed = [
		...strings
			.filter((s) => !s.muted && s.fret != null)
			.map((s) => s.fret as number),
		...barres.map((b) => b.fret),
	];
	const maxRel = fretsUsed.length
		? Math.max(...fretsUsed.map((f) => f - baseFret + 1))
		: 0;
	const fretCount = Math.max(MIN_FRETS, maxRel);

	const boardTop = MARGIN_TOP;
	const boardLeft = MARGIN_LEFT;
	const boardHeight = FRET_GAP * fretCount;
	const W = MARGIN_LEFT + BOARD_WIDTH + MARGIN_RIGHT;
	const H = MARGIN_TOP + boardHeight + MARGIN_BOTTOM;
	const height = (size * H) / W;

	const colX = (stringNum: number) => boardLeft + (stringNum - 1) * STRING_GAP;
	const fretCenterY = (fret: number) =>
		boardTop + (fret - baseFret + 0.5) * FRET_GAP;

	const line = "var(--foreground)";
	const accent = "var(--primary)";
	const accentFg = "var(--primary-foreground)";

	const coveredByBarre = (s: StringPos) =>
		s.fret != null &&
		barres.some(
			(b) =>
				b.fret === s.fret &&
				s.stringNum >= Math.min(b.fromString, b.toString) &&
				s.stringNum <= Math.max(b.fromString, b.toString),
		);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-xl font-medium leading-none">{name}</h1>
			{notes && (
				<p className="mt-4 text-xs text-center text-muted-foreground">
					{notes.split(" ").join(" · ")}
				</p>
			)}
			<svg
				viewBox={`0 0 ${W} ${H}`}
				width={size}
				height={height}
				className={cn("select-none", className)}
				role="img"
				aria-label={`Diagrama do acorde ${name}`}
			>
				{/* open (○) / muted (×) markers above the nut */}
				{Array.from({ length: 6 }, (_, i) => i + 1).map((num) => {
					const s = byNum.get(num);
					const x = colX(num);
					const y = boardTop - 9;
					if (s?.muted) {
						return (
							<g
								key={`m${num}`}
								stroke={line}
								strokeWidth={1.2}
								strokeLinecap="round"
							>
								<line x1={x - 3.2} y1={y - 3.2} x2={x + 3.2} y2={y + 3.2} />
								<line x1={x - 3.2} y1={y + 3.2} x2={x + 3.2} y2={y - 3.2} />
							</g>
						);
					}
					if (!s || s.fret == null) {
						return (
							<circle
								key={`m${num}`}
								cx={x}
								cy={y}
								r={3.5}
								fill="none"
								stroke={line}
								strokeWidth={1.2}
							/>
						);
					}
					return null; // fretted → no marker
				})}

				{/* starting-fret label when the chart doesn't begin at the nut */}
				{baseFret > 1 && (
					<text
						x={boardLeft - 10}
						y={fretCenterY(baseFret) + 3}
						textAnchor="end"
						fontSize={9}
						fill={line}
					>
						{baseFret}
					</text>
				)}

				{/* fret lines (horizontal); row 0 is the nut when baseFret === 1 */}
				{Array.from({ length: fretCount + 1 }, (_, r) => {
					const y = boardTop + r * FRET_GAP;
					const isNut = r === 0 && baseFret === 1;
					return (
						<line
							key={`f${r}`}
							x1={boardLeft}
							y1={y}
							x2={boardLeft + BOARD_WIDTH}
							y2={y}
							stroke={line}
							strokeWidth={isNut ? 3.5 : 1}
							strokeOpacity={isNut ? 1 : 0.4}
						/>
					);
				})}

				{/* strings (vertical) */}
				{Array.from({ length: 6 }, (_, c) => {
					const x = boardLeft + c * STRING_GAP;
					return (
						<line
							key={`s${c}`}
							x1={x}
							y1={boardTop}
							x2={x}
							y2={boardTop + boardHeight}
							stroke={line}
							strokeWidth={1}
							strokeOpacity={0.55}
						/>
					);
				})}

				{/* barres */}
				{barres.map((b, i) => {
					const from = Math.min(b.fromString, b.toString);
					const to = Math.max(b.fromString, b.toString);
					const x1 = colX(from);
					const x2 = colX(to);
					const yc = fretCenterY(b.fret);
					return (
						<g key={`b${i}`}>
							<rect
								x={x1 - DOT_R}
								y={yc - DOT_R}
								width={x2 - x1 + DOT_R * 2}
								height={DOT_R * 2}
								rx={DOT_R}
								fill={accent}
							/>
							{b.finger ? (
								<text
									x={(x1 + x2) / 2}
									y={yc}
									textAnchor="middle"
									dominantBaseline="central"
									fontSize={9}
									fontWeight={600}
									fill={accentFg}
								>
									{b.finger}
								</text>
							) : null}
						</g>
					);
				})}

				{/* finger dots */}
				{strings.map((s) => {
					if (s.muted || s.fret == null || coveredByBarre(s)) return null;
					const x = colX(s.stringNum);
					const y = fretCenterY(s.fret);
					return (
						<g key={`d${s.stringNum}`}>
							<circle cx={x} cy={y} r={DOT_R} fill={accent} />
							{s.finger ? (
								<text
									x={x}
									y={y}
									textAnchor="middle"
									dominantBaseline="central"
									fontSize={9}
									fontWeight={600}
									fill={accentFg}
								>
									{s.finger}
								</text>
							) : null}
						</g>
					);
				})}

				{/* string labels: Mi Lá Ré Sol Si Mi (low E → high E) */}
				{STRING_LABELS.map((label, c) => {
					const x = boardLeft + c * STRING_GAP;
					return (
						<text
							key={`l${c}`}
							x={x}
							y={boardTop + boardHeight + 14}
							textAnchor="middle"
							fontSize={8.5}
							fill={line}
							fillOpacity={0.7}
						>
							{label}
						</text>
					);
				})}
			</svg>
		</div>
	);
}
