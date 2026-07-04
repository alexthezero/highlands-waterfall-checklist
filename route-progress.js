const ROUTE_PROGRESS_FALLS = [
  { id: "sliding-rock-cashiers", name: "Sliding Rock", short: "Sliding", x: 75, y: 34 },
  { id: "bust-your-butt-falls", name: "Bust Your Butt Falls / Quarry Falls", short: "Quarry", x: 58, y: 66 },
  { id: "silver-run-falls", name: "Silver Run Falls", short: "Silver", x: 83, y: 92 },
  { id: "bridal-veil-falls", name: "Bridal Veil Falls", short: "Bridal", x: 48, y: 120 },
  { id: "dry-falls", name: "Dry Falls", short: "Dry", x: 34, y: 148 },
  { id: "picklesimer-rockhouse-falls", name: "Picklesimer Rockhouse Falls", short: "Picklesimer", x: 45, y: 178 },
  { id: "lake-sequoyah-kalakaleskies", name: "Lake Sequoyah / Kalakaleskies Falls", short: "Sequoyah", x: 60, y: 205 },
  { id: "cullasaja-falls", name: "Cullasaja Falls", short: "Cullasaja", x: 28, y: 234 },
  { id: "secret-falls", name: "Secret Falls / Big Shoals Falls", short: "Secret", x: 51, y: 262 },
  { id: "hidden-falls-upper-middle-creek", name: "Hidden Falls Trail to Upper Middle Creek Falls", short: "Hidden", x: 70, y: 292 },
  { id: "glen-falls", name: "Glen Falls", short: "Glen", x: 38, y: 322 },
  { id: "whitewater-falls", name: "Whitewater Falls", short: "Whitewater", x: 84, y: 352 }
];

function routeSortMode() {
  try {
    return localStorage.getItem("highlandsWaterfallTravelSort_v1") || "default";
  } catch (_) {
    return "default";
  }
}

function routeCheckedData() {
  try {
    return JSON.parse(localStorage.getItem("highlandsWaterfallChecklist_v1")) || {};
  } catch (_) {
    return {};
  }
}

function orderedRouteFalls() {
  const base = [...ROUTE_PROGRESS_FALLS];
  const mode = routeSortMode();
  if (mode === "south-north") return base.reverse();
  return base;
}

function routePointString(falls) {
  return falls.map(stop => `${stop.x},${stop.y}`).join(" ");
}

function routeProgressIndex(falls, checked) {
  let highest = -1;
  falls.forEach((fall, index) => {
    if (checked[fall.id]) highest = Math.max(highest, index);
  });
  return highest;
}

function routePathLength(falls, lastIndex) {
  if (lastIndex <= 0) return 0;

  let total = 0;
  for (let i = 1; i <= lastIndex; i++) {
    const a = falls[i - 1];
    const b = falls[i];
    total += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return total;
}

function totalRoutePathLength(falls) {
  return routePathLength(falls, falls.length - 1);
}

function installRouteProgressStyles() {
  if (document.getElementById("routeProgressStyles")) return;

  const style = document.createElement("style");
  style.id = "routeProgressStyles";
  style.textContent = `
    .route-progress-card {
      background: linear-gradient(135deg, #ffffff, #f7faf5);
      border: 1px solid rgba(73, 107, 74, 0.2);
      border-radius: 24px;
      padding: 16px;
      box-shadow: 0 10px 26px rgba(20, 40, 25, 0.07);
      display: grid;
      gap: 12px;
    }

    .route-progress-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .route-progress-title {
      margin: 0;
      color: var(--text);
      font-size: 18px;
      line-height: 1.1;
    }

    .route-progress-subtitle {
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.35;
    }

    .route-progress-badge {
      flex: 0 0 auto;
      border-radius: 999px;
      background: #e8f0e3;
      color: #345b39;
      padding: 9px 11px;
      font-size: 13px;
      font-weight: 900;
      white-space: nowrap;
    }

    .route-progress-map-wrap {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      background:
        radial-gradient(circle at 72% 20%, rgba(101, 142, 101, 0.2), transparent 30%),
        linear-gradient(135deg, #edf4e8, #fbf8ec);
      border: 1px solid rgba(73, 107, 74, 0.16);
      min-height: 280px;
    }

    .route-progress-map {
      width: 100%;
      height: auto;
      display: block;
    }

    .route-progress-bg-line {
      fill: none;
      stroke: rgba(73, 107, 74, 0.22);
      stroke-width: 11;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .route-progress-lit-line {
      fill: none;
      stroke: #48724d;
      stroke-width: 11;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 7px rgba(72, 114, 77, 0.55));
      transition: stroke-dashoffset 0.45s ease;
    }

    .route-progress-stop-ring {
      fill: #ffffff;
      stroke: rgba(73, 107, 74, 0.35);
      stroke-width: 4;
    }

    .route-progress-stop-dot {
      fill: #b8c9b3;
      transition: fill 0.2s ease, transform 0.2s ease;
      transform-origin: center;
    }

    .route-progress-stop.visited .route-progress-stop-ring {
      stroke: #48724d;
      filter: drop-shadow(0 0 5px rgba(72, 114, 77, 0.55));
    }

    .route-progress-stop.visited .route-progress-stop-dot {
      fill: #48724d;
      r: 5.2;
    }

    .route-progress-label {
      fill: #213028;
      font-size: 10px;
      font-weight: 900;
      font-family: Arial, Helvetica, sans-serif;
      paint-order: stroke;
      stroke: rgba(255, 255, 255, 0.85);
      stroke-width: 3px;
      stroke-linejoin: round;
    }

    .route-progress-footer {
      display: grid;
      gap: 8px;
    }

    .route-progress-bar {
      width: 100%;
      height: 10px;
      border-radius: 999px;
      background: #e7eee3;
      overflow: hidden;
    }

    .route-progress-fill {
      height: 100%;
      width: 0%;
      border-radius: inherit;
      background: linear-gradient(90deg, #48724d, #6c9365);
      transition: width 0.35s ease;
    }

    .route-progress-text {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.35;
    }
  `;
  document.head.appendChild(style);
}

function routeDirectionLabel() {
  const mode = routeSortMode();
  if (mode === "south-north") return "South to North";
  if (mode === "north-south") return "North to South";
  return "North to South";
}

function routeProgressCardHTML() {
  return `
    <div class="route-progress-header">
      <div>
        <h2 class="route-progress-title">Route Progress Map</h2>
        <p class="route-progress-subtitle">As you check off waterfalls, the route lights up like a completed drive.</p>
      </div>
      <div class="route-progress-badge" id="routeProgressBadge">0 / 12</div>
    </div>
    <div class="route-progress-map-wrap">
      <svg class="route-progress-map" id="routeProgressMap" viewBox="0 0 110 382" aria-label="Route progress map" role="img">
        <defs>
          <pattern id="routeTopo" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M-5 16 C12 6 27 27 47 14" fill="none" stroke="rgba(73,107,74,0.12)" stroke-width="1" />
            <path d="M-6 34 C14 24 30 45 50 32" fill="none" stroke="rgba(73,107,74,0.09)" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="110" height="382" fill="url(#routeTopo)"></rect>
        <polyline id="routeProgressBase" class="route-progress-bg-line" points=""></polyline>
        <polyline id="routeProgressLit" class="route-progress-lit-line" points=""></polyline>
        <g id="routeProgressStops"></g>
      </svg>
    </div>
    <div class="route-progress-footer">
      <div class="route-progress-bar"><div class="route-progress-fill" id="routeProgressFill"></div></div>
      <div class="route-progress-text" id="routeProgressText">Choose a direction, then check off stops as you go.</div>
    </div>
  `;
}

function installRouteProgressCard() {
  installRouteProgressStyles();
  if (document.getElementById("routeProgressCard")) return;

  const toolbar = document.querySelector(".toolbar");
  if (!toolbar) return;

  const card = document.createElement("section");
  card.className = "route-progress-card";
  card.id = "routeProgressCard";
  card.setAttribute("aria-label", "Route progress map");
  card.innerHTML = routeProgressCardHTML();
  toolbar.insertAdjacentElement("afterend", card);
}

function drawRouteProgress() {
  installRouteProgressCard();

  const card = document.getElementById("routeProgressCard");
  if (!card) return;

  const falls = orderedRouteFalls();
  const checked = routeCheckedData();
  const visitedCount = falls.filter(fall => checked[fall.id]).length;
  const percent = Math.round((visitedCount / falls.length) * 100);
  const highestIndex = routeProgressIndex(falls, checked);
  const totalLength = totalRoutePathLength(falls);
  const litLength = routePathLength(falls, highestIndex);
  const dashOffset = Math.max(0, totalLength - litLength);

  const points = routePointString(falls);
  const base = document.getElementById("routeProgressBase");
  const lit = document.getElementById("routeProgressLit");
  const stops = document.getElementById("routeProgressStops");
  const badge = document.getElementById("routeProgressBadge");
  const fill = document.getElementById("routeProgressFill");
  const text = document.getElementById("routeProgressText");

  if (!base || !lit || !stops) return;

  base.setAttribute("points", points);
  lit.setAttribute("points", points);
  lit.style.strokeDasharray = `${totalLength}`;
  lit.style.strokeDashoffset = `${dashOffset}`;

  stops.innerHTML = falls.map((fall, index) => {
    const labelX = fall.x < 55 ? fall.x + 11 : fall.x - 11;
    const anchor = fall.x < 55 ? "start" : "end";
    const visitedClass = checked[fall.id] ? "visited" : "";
    return `
      <g class="route-progress-stop ${visitedClass}" data-stop-id="${fall.id}">
        <circle class="route-progress-stop-ring" cx="${fall.x}" cy="${fall.y}" r="7"></circle>
        <circle class="route-progress-stop-dot" cx="${fall.x}" cy="${fall.y}" r="4"></circle>
        <text class="route-progress-label" x="${labelX}" y="${fall.y + 3}" text-anchor="${anchor}">${index + 1}. ${fall.short}</text>
      </g>
    `;
  }).join("");

  if (badge) badge.textContent = `${visitedCount} / ${falls.length}`;
  if (fill) fill.style.width = `${percent}%`;
  if (text) {
    text.textContent = `${routeDirectionLabel()} route: ${visitedCount} of ${falls.length} stops checked. The route line lights up through your farthest checked stop.`;
  }
}

if (typeof render === "function" && !window.__routeProgressRenderWrapped) {
  window.__routeProgressRenderWrapped = true;
  const originalRenderForRouteProgress = render;

  render = function renderWithRouteProgress() {
    originalRenderForRouteProgress();
    requestAnimationFrame(drawRouteProgress);
  };
}

function bootRouteProgress() {
  drawRouteProgress();

  document.addEventListener("change", event => {
    if (event.target && (event.target.classList.contains("check") || event.target.id === "travelSortSelect")) {
      setTimeout(drawRouteProgress, 50);
    }
  });

  window.addEventListener("storage", drawRouteProgress);

  const list = document.getElementById("waterfallList");
  if (list && !window.__routeProgressMutationWatcher) {
    window.__routeProgressMutationWatcher = true;
    const observer = new MutationObserver(() => requestAnimationFrame(drawRouteProgress));
    observer.observe(list, { childList: true, subtree: true });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootRouteProgress);
} else {
  bootRouteProgress();
}
