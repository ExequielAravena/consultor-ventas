const CACHE_NAME = "ventas-cache-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  // No cache complejo aún (simple y estable)
});
