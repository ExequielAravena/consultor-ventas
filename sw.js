const CACHE_NAME = "ventas-cache-v3";

const URLS_TO_CACHE = [
  "/consultor-ventas/",
  "/consultor-ventas/index.html",
  "/consultor-ventas/manifest.json",
  "/consultor-ventas/icon-192.png",
  "/consultor-ventas/icon-512.png"
];

// Instalación
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activación y limpieza de versiones anteriores
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia fetch:
// Navegación = intenta online primero
// Recursos estáticos = cache primero
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => response)
        .catch(() => caches.match("/consultor-ventas/index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
