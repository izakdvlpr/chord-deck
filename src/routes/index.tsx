import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ChordDiagram } from "@/components/chord-diagram";
import { Button } from "@/components/ui/button";
import { parseNotation } from "@/lib/chord-notation";

export const Route = createFileRoute("/")({
	component: Landing,
});

const DEMO_CHORDS = [
	{ name: "C", notation: "x32010" },
	{ name: "G", notation: "320003" },
	{ name: "D", notation: "xx0232" },
];

const FEATURES = [
	{
		title: "Diagramas SVG fiéis",
		body: "Braço, pestana, cordas soltas (○) e abafadas (×), dedos numerados — desenhados em SVG puro.",
	},
	{
		title: "Notação padrão",
		body: "Cada acorde guarda a notação de casas (ex: xx0202) e vira um diagrama nítido na hora.",
	},
	{
		title: "Decks pra organizar",
		body: "Acordes agrupados por tema — iniciante, com pestana, uma música — pra revisar em grid.",
	},
	{
		title: "Repetição espaçada",
		body: "Fixe cada digitação com um fluxo estilo Anki (algoritmo SM-2). Em breve.",
	},
];

function Landing() {
	return (
		<div className="flex flex-col">
			<section className="page-wrap flex flex-col items-center gap-10 py-16 text-center md:py-24">
				<div className="rise-in flex max-w-2xl flex-col items-center gap-5">
					<span className="island-kicker">Memorize acordes</span>
					<h1 className="display-title text-4xl font-bold leading-tight md:text-6xl">
						Seu baralho de acordes, na ponta dos dedos.
					</h1>
					<p className="text-lg text-muted-foreground">
						Navegue por acordes de violão e guitarra, veja diagramas nítidos e
						explore decks temáticos.
					</p>
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button asChild size="lg">
							<Link to="/chords">
								Ver acordes
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>

				<div className="island-shell rise-in flex flex-wrap items-center justify-center gap-6 rounded-2xl p-8">
					{DEMO_CHORDS.map((c) => (
						<ChordDiagram
							key={c.name}
							name={c.name}
							baseFret={1}
							strings={parseNotation(c.notation)}
							size={150}
						/>
					))}
				</div>
			</section>

			<section id="recursos" className="page-wrap py-16">
				<h2 className="display-title mb-8 text-center text-3xl font-bold">
					Tudo pra decorar acordes
				</h2>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{FEATURES.map((f) => (
						<div
							key={f.title}
							className="feature-card rounded-2xl border p-6 text-left transition"
						>
							<h3 className="font-semibold">{f.title}</h3>
							<p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
