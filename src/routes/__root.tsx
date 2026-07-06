import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";

import TanStackQueryDevtools from "../lib/tanstack-query/devtools";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface MyRouterContext {
	queryClient: QueryClient;
}

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
				title: "ChordDeck",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
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
