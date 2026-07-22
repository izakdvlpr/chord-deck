// ChordDeck service worker — network-only, intentionally NO offline support.
// No "fetch" handler => nothing is cached => the app requires a network connection.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
