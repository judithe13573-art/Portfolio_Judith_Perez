/* ═══════════════════════════════════════════
   A ras de mar: mapa real del recorrido por el Port Vell
   ═══════════════════════════════════════════ */

(function initMapa() {
  const el = document.getElementById('aq-mapa');
  if (!el || typeof L === 'undefined') return;

  const paradas = [
    { n: 1, nombre: 'Te detienes', lugar: 'Moll de la Fusta', pos: [41.37765, 2.18010] },
    { n: 2, nombre: 'Te comparas', lugar: 'Portal de la Pau', pos: [41.37598, 2.17948] },
    { n: 3, nombre: 'Miras al agua', lugar: 'Rambla de Mar', pos: [41.37535, 2.18040] },
  ];
  const aquarium = [41.37685, 2.18441];

  // Camino a pie: Moll de la Fusta → Portal de la Pau → pasarela de la Rambla de Mar → Moll d'Espanya
  const camino = [
    [41.37830, 2.18090], [41.37765, 2.18010], [41.37690, 2.17960], [41.37625, 2.17935],
    [41.37598, 2.17948], [41.37575, 2.17975], [41.37535, 2.18040], [41.37506, 2.18110],
    [41.37465, 2.18190], [41.37447, 2.18257], [41.37530, 2.18360], [41.37685, 2.18441],
  ];

  const map = L.map(el, {
    scrollWheelZoom: false,
    zoomControl: false,
    attributionControl: false,
    dragging: !L.Browser.mobile,
    tap: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  L.control.attribution({ prefix: false, position: 'bottomleft' }).addAttribution('').addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.polyline(camino, { color: '#FFFFFF', weight: 9, opacity: .9, lineCap: 'round', lineJoin: 'round' }).addTo(map);
  L.polyline(camino, { color: '#0E5AA7', weight: 4, opacity: 1, dashArray: '8 8', lineCap: 'round', lineJoin: 'round' }).addTo(map);

  paradas.forEach((p) => {
    L.marker(p.pos, {
      icon: L.divIcon({ className: 'aq-pin', html: `<span>${p.n}</span>`, iconSize: [34, 34], iconAnchor: [17, 17] }),
      keyboard: false,
      title: `${p.n} · ${p.nombre} · ${p.lugar}`,
    }).addTo(map);
  });

  L.marker(aquarium, {
    icon: L.divIcon({ className: 'aq-pin aq-pin--end', html: '<span>L’Aquàrium</span>', iconSize: [96, 34], iconAnchor: [48, 17] }),
    keyboard: false,
    title: "L'Aquàrium · Moll d'Espanya",
  }).addTo(map);

  map.fitBounds(L.latLngBounds(camino), { paddingTopLeft: [36, 36], paddingBottomRight: [70, 36] });
})();
