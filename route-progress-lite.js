(() => {
  const stops = [
    ["sliding-rock-cashiers", "Sliding", 75, 28],
    ["bust-your-butt-falls", "Quarry", 57, 58],
    ["silver-run-falls", "Silver", 84, 86],
    ["bridal-veil-falls", "Bridal", 49, 112],
    ["dry-falls", "Dry", 34, 140],
    ["picklesimer-rockhouse-falls", "Picklesimer", 46, 170],
    ["lake-sequoyah-kalakaleskies", "Sequoyah", 61, 198],
    ["cullasaja-falls", "Cullasaja", 28, 226],
    ["secret-falls", "Secret", 52, 254],
    ["hidden-falls-upper-middle-creek", "Hidden", 72, 282],
    ["glen-falls", "Glen", 39, 312],
    ["whitewater-falls", "Whitewater", 84, 344]
  ];

  function checked() {
    try { return JSON.parse(localStorage.getItem("highlandsWaterfallChecklist_v1")) || {}; }
    catch { return {}; }
  }

  function mode() {
    try { return localStorage.getItem("highlandsWaterfallTravelSort_v1") || "north-south"; }
    catch { return "north-south"; }
  }

  function ordered() {
    return mode() === "south-north" ? [...stops].reverse() : [...stops];
  }

  function dist(route, end) {
    if (end <= 0) return 0;
    let total = 0;
    for (let i = 1; i <= end; i++) {
      total += Math.hypot(route[i][2] - route[i - 1][2], route[i][3] - route[i - 1][3]);
    }
    return total;
  }

  function css() {
    if (document.getElementById("routeProgressLiteCSS")) return;
    const s = document.createElement("style");
    s.id = "routeProgressLiteCSS";
    s.textContent = `
      #routeProgressCard{display:grid;gap:12px;background:linear-gradient(135deg,#fff,#f7faf5);border:1px solid rgba(73,107,74,.22);border-radius:22px;padding:14px;box-shadow:0 8px 22px rgba(20,40,25,.07)}
      .route-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.route-head h2{margin:0;font-size:18px;color:var(--text);line-height:1.1}.route-head p{margin:5px 0 0;font-size:13px;color:var(--muted);line-height:1.35}.route-pill{background:#e7f0e4;color:#345b39;border-radius:999px;padding:8px 10px;font-size:13px;font-weight:900;white-space:nowrap}
      .route-map{border-radius:18px;overflow:hidden;border:1px solid rgba(73,107,74,.16);background:linear-gradient(135deg,#edf4e8,#fbf8ec)}.route-map svg{display:block;width:100%;height:auto}.route-base{fill:none;stroke:rgba(73,107,74,.22);stroke-width:10;stroke-linecap:round;stroke-linejoin:round}.route-lit{fill:none;stroke:#48724d;stroke-width:10;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 6px rgba(72,114,77,.55));transition:stroke-dashoffset .35s ease}.route-ring{fill:#fff;stroke:rgba(73,107,74,.38);stroke-width:3.5}.route-dot{fill:#b8c9b3}.done .route-ring{stroke:#48724d}.done .route-dot{fill:#48724d}.route-label{fill:#213028;font-family:Arial,sans-serif;font-size:9.5px;font-weight:900;paint-order:stroke;stroke:rgba(255,255,255,.88);stroke-width:3px;stroke-linejoin:round}.route-bar{height:10px;border-radius:999px;background:#e7eee3;overflow:hidden}.route-fill{height:100%;width:0%;border-radius:inherit;background:linear-gradient(90deg,#48724d,#6f9868)}.route-note{font-size:12px;color:var(--muted);line-height:1.35}
    `;
    document.head.appendChild(s);
  }

  function card() {
    css();
    let c = document.getElementById("routeProgressCard");
    if (c) return c;
    const mount = document.getElementById("travelSortSelect")?.closest(".travel-sort-card") || document.getElementById("filters") || document.querySelector(".toolbar");
    if (!mount) return null;
    c = document.createElement("section");
    c.id = "routeProgressCard";
    c.innerHTML = `<div class="route-head"><div><h2>Route Progress Map</h2><p>Check off waterfalls and watch the route light up.</p></div><div class="route-pill" id="routePill">0 / 12</div></div><div class="route-map"><svg viewBox="0 0 110 372"><polyline class="route-base" id="routeBase"></polyline><polyline class="route-lit" id="routeLit"></polyline><g id="routeDots"></g></svg></div><div class="route-bar"><div class="route-fill" id="routeFill"></div></div><div class="route-note" id="routeNote">Choose a direction, then check off stops as you go.</div>`;
    mount.insertAdjacentElement("afterend", c);
    return c;
  }

  function draw() {
    if (!card()) return;
    const route = ordered();
    const data = checked();
    const p = route.map(x => `${x[2]},${x[3]}`).join(" ");
    const visited = route.filter(x => data[x[0]]).length;
    const far = route.reduce((m, x, i) => data[x[0]] ? Math.max(m, i) : m, -1);
    const total = dist(route, route.length - 1);
    const lit = dist(route, far);
    document.getElementById("routeBase").setAttribute("points", p);
    const line = document.getElementById("routeLit");
    line.setAttribute("points", p);
    line.style.strokeDasharray = total;
    line.style.strokeDashoffset = Math.max(0, total - lit);
    document.getElementById("routeDots").innerHTML = route.map((x, i) => `<g class="${data[x[0]] ? "done" : ""}"><circle class="route-ring" cx="${x[2]}" cy="${x[3]}" r="6.8"/><circle class="route-dot" cx="${x[2]}" cy="${x[3]}" r="3.8"/><text class="route-label" x="${x[2] < 55 ? x[2] + 10 : x[2] - 10}" y="${x[3] + 3}" text-anchor="${x[2] < 55 ? "start" : "end"}">${i + 1}. ${x[1]}</text></g>`).join("");
    document.getElementById("routePill").textContent = `${visited} / ${route.length}`;
    document.getElementById("routeFill").style.width = `${Math.round(visited / route.length * 100)}%`;
    document.getElementById("routeNote").textContent = `${mode() === "south-north" ? "South to North" : "North to South"}: ${visited} of ${route.length} checked.`;
  }

  function refresh() { requestAnimationFrame(draw); setTimeout(draw, 150); }
  function boot() { refresh(); setTimeout(refresh, 700); setTimeout(refresh, 1600); document.addEventListener("change", refresh); document.addEventListener("click", () => setTimeout(refresh, 150)); }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", boot) : boot();
})();
