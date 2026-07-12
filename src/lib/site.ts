export const SITE_URL = "https://chord-deck.vercel.app";

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function absoluteUrl(path = "/"): string {
	return new URL(path, SITE_URL).toString();
}
