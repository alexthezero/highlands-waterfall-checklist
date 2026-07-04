(() => {
  const stops = [
    ["sliding-rock-cashiers", "Sliding", 34, 36],
    ["bust-your-butt-falls", "Quarry", 78, 58],
    ["silver-run-falls", "Silver", 125, 42],
    ["bridal-veil-falls", "Bridal", 172, 64],
    ["dry-falls", "Dry", 220, 48],
    ["picklesimer-rockhouse-falls", "Pick.", 272, 72],
    ["lake-sequoyah-kalakaleskies", "Seq.", 315, 104],
    ["cullasaja-falls", "Cull.", 260, 128],
    ["secret-falls", "Secret", 206, 112],
    ["hidden-falls-upper-middle-creek", "Hidden", 150, 136],
    ["glen-falls", "Glen", 91, 118],
    ["whitewater-falls", "Whitewater", 46, 152]
  ];

  function savedChecks() {
    try { return JSON.parse(localStorage.getItem("highlandsWaterfallChecklist_v1")) || {}; }
    catch { return {}; }
  }

  function routeMode() {
    try { return localStorage.getItem("highlandsWaterfallTravelSort_v1") || "north-south"; }
    catch { return "north-south"; }
  }

  function routeStops() {
    return routeMode() === "south-north" ? [...stops].reverse() : [...stops];
  }

  function pointString(route) {
    return route.map(stop => `${stop[2]},${stop[3]}`).join(" ");
  }

  function lengthTo(route, end) {
    if (end <= 0) return 0;
    let total = 0;
    for (let i = 1; i <= end; i++) {
      total += Math.hypot(route[i][2] - route[i - 1][2], route[i][3] - route[i - 1][3]);
    }
    return total;
  }

  function addStyles() {
    if (document.getElementById("routeCompactStyles")) return;
    const style = document.createElement("style");
    style.id = "routeCompactStyles";
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
      .route-map { border-radius:18px; overflow:hidden; border:1px solid rgba(73,107,74,.16); background:linear-gradient(135deg,#edf4e8,#fbf8ec); }
      .route-map svg { display:block; width:100%; height:auto; max-height:245px; }
      .route-base { fill:none; stroke:rgba(73,107,74,.18); stroke-width:14; stroke-linecap:round; stroke-linejoin:round; }
      .route-lit { fill:none; stroke:#48724d; stroke-width:14; stroke-linecap:round; stroke-linejoin:round; filter:drop-shadow(0 0 5px rgba(72,114,77,.45)); transition:stroke-dashoffset .35s ease; }
      .route-ring { fill:#fff; stroke:rgba(73,107,74,.4); stroke-width:3; }
      .route-dot { fill:#b8c9b3; }
      .done .route-ring { stroke:#48724d; }
      .done .route-dot { fill:#48724d; }
      .route-label { fill:#213028; font-family:Arial,sans-serif; font-size:8.5px; font-weight:900; paint-order:stroke; stroke:rgba(255,255,255,.88); stroke-width:2.3px; stroke-linejoin:round; }
      .route-bar { height:10px; border-radius:999px; background:#e7eee3; overflow:hidden; }
      .route-fill { height:100%; width:0%; border-radius:inherit; background:linear-gradient(90deg,#48724d,#6f9868); }
      .route-note { font-size:12px; color:var(--muted); line-height:1.35; }
    `;
    document.head.appendChild(style);
  }

  function ensureCard() {
    addStyles();
    const card = document.getElementById("routeProgressCard");
    if (!card) return null;
    card.innerHTML = `<div class="route-head"><div><h2>Route Progress Map</h2><p>Check off waterfalls and watch the route light up.</p></div><div class="route-pill" id="routePill">0 / 12</div></div><div class="route-map"><svg viewBox="0 0 350 185" role="img" aria-label="Waterfall route progress map"><polyline class="route-base" id="routeBase"></polyline><polyline class="route-lit" id="routeLit"></polyline><g id="routeDots"></g></svg></div><div class="route-bar"><div class="route-fill" id="routeFill"></div></div><div class="route-note" id="routeNote">Choose a direction, then check off stops as you go.</div>`;
    return card;
  }

  function renderCompactRoute() {
    if (!ensureCard()) return;
    const route = routeStops();
    const data = savedChecks();
    const visited = route.filter(stop => data[stop[0]]).length;
    const farthest = route.reduce((max, stop, index) => data[stop[0]] ? Math.max(max, index) : max, -1);
    const total = lengthTo(route, route.length - 1);
    const litLength = lengthTo(route, farthest);
    const base = document.getElementById("routeBase");
    const lit = document.getElementById("routeLit");
    const dots = document.getElementById("routeDots");
    base.setAttribute("points", pointString(route));
    lit.setAttribute("points", pointString(route));
    lit.style.strokeDasharray = total;
    lit.style.strokeDashoffset = Math.max(0, total - litLength);
    dots.innerHTML = route.map((stop, index) => {
      const above = index % 2 === 0;
      const y = above ? stop[3] - 13 : stop[3] + 18;
      return `<g class="${data[stop[0]] ? "done" : ""}"><circle class="route-ring" cx="${stop[2]}" cy="${stop[3]}" r="7"/><circle class="route-dot" cx="${stop[2]}" cy="${stop[3]}" r="3.8"/><text class="route-label" x="${stop[2]}" y="${y}" text-anchor="middle">${index + 1}. ${stop[1]}</text></g>`;
    }).join("");
    document.getElementById("routePill").textContent = `${visited} / ${route.length}`;
    document.getElementById("routeFill").style.width = `${Math.round(visited / route.length * 100)}%`;
    document.getElementById("routeNote").textContent = `${routeMode() === "south-north" ? "South to North" : "North to South"}: ${visited} of ${route.length} checked.`;
  }

  function update() { requestAnimationFrame(renderCompactRoute); setTimeout(renderCompactRoute, 200); }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", update) : update();
  document.addEventListener("change", update);
  document.addEventListener("click", () => setTimeout(update, 200));
  setTimeout(update, 800);
})();
