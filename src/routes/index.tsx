import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Eye,
	Hash,
	Layers,
	PencilRuler,
	Repeat,
	Search,
} from "lucide-react";

import { ChordDiagram } from "@/components/chord-diagram";
import { Button } from "@/components/ui/button";
import { parseNotation } from "@/lib/chord-notation";
import { getLandingData } from "@/lib/server/stats";
import { absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "ChordDeck — Acordes de violão e guitarra com diagramas" },
			{
				property: "og:title",
				content: "ChordDeck — Acordes de violão e guitarra com diagramas",
			},
			{ property: "og:url", content: absoluteUrl("/") },
		],
		links: [{ rel: "canonical", href: absoluteUrl("/") }],
	}),
	loader: () => getLandingData(),
	component: Landing,
});

const DEMO_CHORDS = [
	{ name: "C", notation: "x32010" },
	{ name: "G", notation: "320003" },
	{ name: "D", notation: "xx0232" },
];

const FEATURES = [
	{
		icon: PencilRuler,
		title: "Diagramas fiéis",
		body: "Braço, pestana, cordas soltas (○) e abafadas (×), dedos numerados — desenhados com nitidez.",
	},
	{
		icon: Hash,
		title: "Notação padrão",
		body: "Cada acorde guarda a notação de casas (ex: xx0202) e vira um diagrama nítido na hora.",
	},
	{
		icon: Layers,
		title: "Decks pra organizar",
		body: "Acordes agrupados por tema — iniciante, com pestana, uma música — pra revisar em grid.",
	},
	{
		icon: Search,
		title: "Busca instantânea",
		body: "Encontre qualquer acorde ou deck pelo nome na hora, sem sair da tela.",
	},
];

const STEPS = [
	{
		icon: Search,
		title: "Escolha um deck",
		body: "Comece por acordes maiores, menores ou monte o seu conjunto por tema ou música.",
	},
	{
		icon: Eye,
		title: "Estude o diagrama",
		body: "Veja onde cada dedo vai, a pestana e as cordas soltas em um desenho limpo e legível.",
	},
	{
		icon: Repeat,
		title: "Revise com repetição",
		body: "Volte nos acordes no ritmo certo até a digitação virar memória muscular. Em breve.",
	},
];

const LEGEND = [
	{
		marker: "○",
		label: "Corda solta",
		body: "Toca sem pressionar nenhuma casa.",
	},
	{
		marker: "×",
		label: "Corda abafada",
		body: "Não deve soar — abafe ou não toque.",
	},
	{
		marker: "1",
		label: "Dedo",
		body: "Número do dedo (1 a 4) que pressiona a casa.",
	},
	{
		marker: "▬",
		label: "Pestana",
		body: "Um dedo cobrindo várias cordas na mesma casa.",
	},
];

function Landing() {
	const { decks } = Route.useLoaderData();

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
						<Button asChild size="lg" variant="outline">
							<Link to="/decks">Explorar decks</Link>
						</Button>
					</div>
					<div className="mt-1 flex flex-wrap items-center justify-center gap-2">
						<span className="stat-chip">Maiores &amp; menores</span>
						<span className="stat-chip">Diagramas nítidos</span>
						<span className="stat-chip">Violão &amp; guitarra</span>
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
							className="feature-card flex flex-col gap-3 rounded-2xl border p-6 text-left transition"
						>
							<span className="feature-icon">
								<f.icon className="size-5" />
							</span>
							<h3 className="font-semibold">{f.title}</h3>
							<p className="text-sm text-muted-foreground">{f.body}</p>
						</div>
					))}
				</div>
			</section>

			<section className="page-wrap py-16">
				<h2 className="display-title mb-8 text-center text-3xl font-bold">
					Como funciona
				</h2>
				<div className="grid gap-5 md:grid-cols-3">
					{STEPS.map((s, i) => (
						<div
							key={s.title}
							className="feature-card flex flex-col gap-3 rounded-2xl border p-6 text-left transition"
						>
							<div className="flex items-center gap-3">
								<span className="step-number">{i + 1}</span>
								<s.icon className="size-5 text-[var(--lagoon-deep)]" />
							</div>
							<h3 className="font-semibold">{s.title}</h3>
							<p className="text-sm text-muted-foreground">{s.body}</p>
						</div>
					))}
				</div>
			</section>

			<section className="page-wrap py-16">
				<div className="grid items-center gap-10 lg:grid-cols-2">
					<div className="flex flex-col gap-4">
						<span className="island-kicker">Aprenda a ler</span>
						<h2 className="display-title text-3xl font-bold">
							Como ler o diagrama
						</h2>
						<p className="text-muted-foreground">
							Cada diagrama mostra o braço do violão de cima pra baixo. As seis
							cordas vão de <strong>Mi grave</strong> (esquerda) a{" "}
							<strong>Mi agudo</strong> (direita), e as casas descem a partir da
							pestana.
						</p>
						<ul className="flex flex-col gap-3">
							{LEGEND.map((l) => (
								<li key={l.label} className="flex items-start gap-3">
									<span className="legend-marker">{l.marker}</span>
									<div className="text-left">
										<p className="font-medium">{l.label}</p>
										<p className="text-sm text-muted-foreground">{l.body}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
					<div className="island-shell flex items-center justify-center rounded-2xl p-8">
						<ChordDiagram
							name="C"
							notes="Dó · Mi · Sol"
							baseFret={1}
							strings={parseNotation("x32010")}
							size={200}
						/>
					</div>
				</div>
			</section>

			{decks.length > 0 && (
				<section className="page-wrap py-16">
					<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
						<h2 className="display-title text-3xl font-bold">
							Decks temáticos
						</h2>
						<Link
							to="/decks"
							className="inline-flex items-center gap-1 text-sm font-medium text-[var(--lagoon-deep)]"
						>
							Ver todos
							<ArrowRight className="size-4" />
						</Link>
					</div>
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{decks.map((deck) => (
							<Link
								key={deck.id}
								to="/decks/$deckSlug"
								params={{ deckSlug: deck.slug }}
								className="feature-card flex flex-col gap-2 rounded-2xl border p-6 text-left no-underline transition"
							>
								<div className="flex items-center gap-2 font-semibold text-foreground">
									<Layers className="size-4 text-[var(--lagoon-deep)]" />
									{deck.name}
								</div>
								<p className="text-sm text-muted-foreground">
									{deck.description || "Sem descrição."}
								</p>
								<p className="mt-1 text-xs text-muted-foreground">
									{deck._count.deckChords}{" "}
									{deck._count.deckChords === 1 ? "acorde" : "acordes"}
								</p>
							</Link>
						))}
					</div>
				</section>
			)}

			<section className="page-wrap py-16">
				<div className="cta-band flex flex-col items-center gap-5 px-6 py-14 text-center">
					<h2 className="display-title max-w-xl text-3xl font-bold md:text-4xl">
						Pronto pra fixar seus acordes?
					</h2>
					<p className="max-w-md text-muted-foreground">
						Navegue pela biblioteca completa e comece a decorar hoje. Sem
						cadastro, sem custo.
					</p>
					<Button asChild size="lg">
						<Link to="/chords">
							Ver acordes
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</section>
		</div>
	);
}
