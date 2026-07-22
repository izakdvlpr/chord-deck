import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import TanStackQueryDevtools from "../lib/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const SITE_NAME = "ChordDeck";
const SITE_TITLE = "ChordDeck — Acordes de violão e guitarra com diagramas";
const SITE_DESCRIPTION = "Navegue por acordes de violão e guitarra com diagramas nítidos, veja a digitação de cada acorde e explore decks temáticos pra memorizar mais rápido.";

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: SITE_TITLE,
			},
			{
				name: "description",
				content: SITE_DESCRIPTION,
			},
			{
				name: "keywords",
				content:
					"acordes, violão, guitarra, cifras, diagramas de acordes, decks, pestana, acordes maiores, acordes menores",
			},
			{
				name: "theme-color",
				content: "#328f97",
			},
			{ name: "apple-mobile-web-app-capable", content: "yes" },
			{ name: "apple-mobile-web-app-title", content: "ChordDeck" },
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:locale", content: "pt_BR" },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:title", content: SITE_TITLE },
			{ property: "og:description", content: SITE_DESCRIPTION },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:alt", content: SITE_TITLE },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE_TITLE },
			{ name: "twitter:description", content: SITE_DESCRIPTION },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg",
			},
			{ rel: "manifest", href: "/manifest.webmanifest" },
			{ rel: "apple-touch-icon", href: "/icons/icon-192.png" },
		],
		scripts: [
			{
				children:
					"if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}",
			},
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: SITE_NAME,
					url: SITE_URL,
					description: SITE_DESCRIPTION,
					inLanguage: "pt-BR",
				}),
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
				
				<script
					defer
					src="https://dataxamas.izakdvlpr.com/dataxamas.js"
					data-website-id="337290be-d39e-4796-819a-b31f3e32f64d"
					data-allow-localhost="true"
				/>
			</head>

			<body>
				<div className="flex min-h-screen flex-col bg-background">
					<SiteHeader />

					<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
						{children}
					</main>

					<SiteFooter />
				</div>

				<Toaster richColors position="top-center" />

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
