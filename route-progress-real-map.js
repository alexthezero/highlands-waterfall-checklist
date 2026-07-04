(() => {
  const STOPS = [
    { id: "cullasaja-falls", name: "Cullasaja Falls", short: "Cullasaja", lat: 35.1182, lng: -83.2429 },
    { id: "bust-your-butt-falls", name: "Bust Your Butt Falls / Quarry Falls", short: "Quarry", lat: 35.0844, lng: -83.2362 },
    { id: "bridal-veil-falls", name: "Bridal Veil Falls", short: "Bridal", lat: 35.0732, lng: -83.2298 },
    { id: "dry-falls", name: "Dry Falls", short: "Dry", lat: 35.0689, lng: -83.2389 },
    { id: "lake-sequoyah-kalakaleskies", name: "Lake Sequoyah / Kalakaleskies Falls", short: "Sequoyah", lat: 35.0609, lng: -83.2145 },
    { id: "picklesimer-rockhouse-falls", name: "Picklesimer Rockhouse Falls", short: "Picklesimer", lat: 35.0567, lng: -83.1969 },
    { id: "secret-falls", name: "Secret Falls / Big Shoals Falls", short: "Secret", lat: 35.0546, lng: -83.1696 },
    { id: "hidden-falls-upper-middle-creek", name: "Hidden Falls Trail to Upper Middle Creek Falls", short: "Hidden", lat: 35.0463, lng: -83.1579 },
    { id: "glen-falls", name: "Glen Falls", short: "Glen", lat: 35.0379, lng: -83.1938 },
    { id: "silver-run-falls", name: "Silver Run Falls", short: "Silver Run", lat: 35.0651, lng: -83.0636 },
    { id: "sliding-rock-cashiers", name: "Sliding Rock", short: "Sliding", lat: 35.1123, lng: -83.0968 },
    { id: "whitewater-falls", name: "Whitewater Falls", short: "Whitewater", lat: 35.0347, lng: -83.0177 }
  ];

  let map;
  let baseLine;
  let litLine;
  let markers = [];

  function getChecks() {
    try { return JSON.parse(localStorage.getItem("highlandsWaterfallChecklist_v1")) || {}; }
    catch { return {}; }
  }

  function getMode() {
    try { return localStorage.getItem("highlandsWaterfallTravelSort_v1") || "north-south"; }
    catch { return "north-south"; }
  }

  function orderedStops() {
    const northToSouth = [...STOPS].sort((a, b) => b.lat - a.lat);
    return getMode() === "south-north" ? northToSouth.reverse() : northToSouth;
  }

  function addStyles() {
    if (document.getElementById("realMapStyles")) return;

    const style = document.createElement("style");
    style.id = "realMapStyles";
    style.textContent = `
      #routeProgressCard {
        display: grid !important;
        gap: 12px !important;
        background: linear-gradient(135deg,#fff,#f7faf5) !important;
        border: 1px solid rgba(73,107,74,.22) !important;
        border-radius: 22px !important;
        padding: 14px !important;
        box-shadow: 0 8px 22px rgba(20,40,25,.07) !important;
        overflow: hidden !important;
      }

      .route-head { display:flex; justify-content:space-between; gap:10px; align-items:flex-start; }
      .route-head h2 { margin:0; font-size:18px; line-height:1.1; color:var(--text); }
      .route-head p { margin:5px 0 0; font-size:13px; line-height:1.35; color:var(--muted); }
      .route-pill { background:#e7f0e4; color:#345b39; border-radius:999px; padding:8px 10px; font-size:13px; font-weight:900; white-space:nowrap; }

      #actualRouteMap {
        height: 330px;
        width: 100%;
        border-radius: 18px;
        overflow: hidden;
        border: 1px solid rgba(73,107,74,.18);
        background: #e8efe4;
      }

      .leaflet-control-attribution { font-size: 9px; }
      .leaflet-popup-content { margin: 10px 12px; font-weight: 800; color: #213028; }

      .waterfall-map-pin {
        width: 30px;
        height: 30px;
        border-radius: 999px 999px 999px 4px;
        transform: rotate(-45deg);
        background: #ffffff;
        border: 3px solid rgba(72,114,77,.45);
        display: grid;
        place-items: center;
        box-shadow: 0 4px 12px rgba(20,40,25,.18);
      }

      .waterfall-map-pin span {
        transform: rotate(45deg);
        color: #345b39;
        font-size: 12px;
        font-weight: 1000;
        line-height: 1;
      }

      .waterfall-map-pin.visited {
        background: #48724d;
        border-color: #203b28;
      }

      .waterfall-map-pin.visited span { color: #ffffff; }

      .route-bar { height:10px; border-radius:999px; background:#e7eee3; overflow:hidden; }
      .route-fill { height:100%; width:0%; border-radius:inherit; background:linear-gradient(90deg,#48724d,#6f9868); }
      .route-note { font-size:12px; color:var(--muted); line-height:1.35; }
      .map-small-note { font-size: 11px; color: var(--muted); line-height: 1.3; }
    `;
    document.head.appendChild(style);
  }

  function prepareCard() {
    addStyles();

    const card = document.getElementById("routeProgressCard");
    if (!card) return null;

    card.innerHTML = `
      <div class="route-head">
        <div>
          <h2>Route Progress Map</h2>
          <p>Actual map view of the Highlands/Cashiers waterfall stops.</p>
        </div>
        <div class="route-pill" id="routePill">0 / 12</div>
      </div>
      <div id="actualRouteMap" aria-label="Waterfall locations map"></div>
      <div class="route-bar"><div class="route-fill" id="routeFill"></div></div>
      <div class="route-note" id="routeNote">Choose a direction, then check off stops as you go.</div>
      <div class="map-small-note">Locations are approximate. Tap a pin to see the waterfall name.</div>
    `;

    return card;
  }

  function buildIcon(number, visited) {
    return L.divIcon({
      className: "",
      html: `<div class="waterfall-map-pin ${visited ? "visited" : ""}"><span>${number}</span></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -27]
    });
  }

  function drawMap() {
    const card = document.getElementById("routeProgressCard");
    if (!card) return;

    if (typeof L === "undefined") {
      card.innerHTML = `<div class="route-head"><div><h2>Route Progress Map</h2><p>The map library did not load yet. Refresh the page and try again.</p></div></div>`;
      return;
    }

    const route = orderedStops();
    const checks = getChecks();
    const visitedCount = route.filter(stop => checks[stop.id]).length;
    const farthestIndex = route.reduce((max, stop, index) => checks[stop.id] ? Math.max(max, index) : max, -1);
    const allLatLng = route.map(stop => [stop.lat, stop.lng]);
    const litLatLng = farthestIndex >= 0 ? route.slice(0, farthestIndex + 1).map(stop => [stop.lat, stop.lng]) : [];

    const pill = document.getElementById("routePill");
    const fill = document.getElementById("routeFill");
    const note = document.getElementById("routeNote");

    if (pill) pill.textContent = `${visitedCount} / ${route.length}`;
    if (fill) fill.style.width = `${Math.round((visitedCount / route.length) * 100)}%`;
    if (note) note.textContent = `${getMode() === "south-north" ? "South to North" : "North to South"}: ${visitedCount} of ${route.length} checked. Green pins are visited.`;

    if (!map) {
      map = L.map("actualRouteMap", {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap"
      }).addTo(map);

      map.fitBounds(L.latLngBounds(allLatLng), { padding: [26, 26] });
    }

    markers.forEach(marker => marker.remove());
    markers = [];

    if (baseLine) baseLine.remove();
    if (litLine) litLine.remove();

    baseLine = L.polyline(allLatLng, {
      color: "#9daf96",
      weight: 5,
      opacity: 0.65,
      lineCap: "round"
    }).addTo(map);

    if (litLatLng.length > 1) {
      litLine = L.polyline(litLatLng, {
        color: "#48724d",
        weight: 6,
        opacity: 0.95,
        lineCap: "round"
      }).addTo(map);
    }

    route.forEach((stop, index) => {
      const visited = !!checks[stop.id];
      const marker = L.marker([stop.lat, stop.lng], {
        icon: buildIcon(index + 1, visited)
      }).addTo(map);

      marker.bindPopup(`${index + 1}. ${stop.name}${visited ? "<br>Visited" : "<br>Not checked yet"}`);
      markers.push(marker);
    });

    setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(L.latLngBounds(allLatLng), { padding: [26, 26] });
    }, 80);
  }

  function bootRealMap() {
    if (!prepareCard()) return;
    drawMap();
    setTimeout(drawMap, 500);
    setTimeout(drawMap, 1300);

    document.addEventListener("change", event => {
      if (event.target?.classList?.contains("check") || event.target?.id === "travelSortSelect") {
        setTimeout(drawMap, 80);
      }
    });

    document.addEventListener("click", event => {
      if (event.target?.id === "resetBtn") setTimeout(drawMap, 150);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootRealMap);
  } else {
    bootRealMap();
  }
})();
