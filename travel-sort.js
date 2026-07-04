const TRAVEL_SORT_KEY = "highlandsWaterfallTravelSort_v1";

const WATERFALL_LATITUDE = {
  "sliding-rock-cashiers": 35.112,
  "bust-your-butt-falls": 35.084,
  "silver-run-falls": 35.074,
  "bridal-veil-falls": 35.071,
  "dry-falls": 35.068,
  "picklesimer-rockhouse-falls": 35.066,
  "lake-sequoyah-kalakaleskies": 35.064,
  "cullasaja-falls": 35.061,
  "secret-falls": 35.048,
  "hidden-falls-upper-middle-creek": 35.045,
  "glen-falls": 35.039,
  "whitewater-falls": 35.035
};

const originalGetAllWaterfallsForTravelSort = getAllWaterfalls;

function getTravelSortMode() {
  return localStorage.getItem(TRAVEL_SORT_KEY) || "default";
}

function setTravelSortMode(mode) {
  localStorage.setItem(TRAVEL_SORT_KEY, mode);
}

function sortWaterfallsByDirection(waterfalls) {
  const mode = getTravelSortMode();
  if (mode === "default") return waterfalls;

  const direction = mode === "north-south" ? -1 : 1;

  return [...waterfalls].sort((a, b) => {
    const latA = WATERFALL_LATITUDE[a.id];
    const latB = WATERFALL_LATITUDE[b.id];
    const aHasLat = typeof latA === "number";
    const bHasLat = typeof latB === "number";

    if (!aHasLat && !bHasLat) return 0;
    if (!aHasLat) return 1;
    if (!bHasLat) return -1;

    return (latA - latB) * direction;
  });
}

getAllWaterfalls = function getAllWaterfallsWithTravelSort() {
  return sortWaterfallsByDirection(originalGetAllWaterfallsForTravelSort());
};

function installTravelSortControl() {
  if (document.getElementById("travelSortSelect")) return;

  const filters = document.getElementById("filters");
  if (!filters) return;

  const style = document.createElement("style");
  style.textContent = `
    .travel-sort-card {
      display: grid;
      gap: 7px;
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 12px 13px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
    }

    .travel-sort-label {
      color: var(--muted);
      font-size: 12px;
      font-weight: 900;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }

    .travel-sort-select {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #fbfcfa;
      color: var(--text);
      padding: 11px 12px;
      font-weight: 800;
      outline: none;
    }
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement("div");
  wrapper.className = "travel-sort-card";
  wrapper.innerHTML = `
    <label class="travel-sort-label" for="travelSortSelect">Sort by travel direction</label>
    <select class="travel-sort-select" id="travelSortSelect">
      <option value="default">Default order</option>
      <option value="north-south">North to South</option>
      <option value="south-north">South to North</option>
    </select>
  `;

  filters.insertAdjacentElement("afterend", wrapper);

  const select = document.getElementById("travelSortSelect");
  select.value = getTravelSortMode();
  select.addEventListener("change", () => {
    setTravelSortMode(select.value);
    render();
    if (typeof updateAppleMapButtons === "function") updateAppleMapButtons();
  });
}

installTravelSortControl();
render();
if (typeof updateAppleMapButtons === "function") updateAppleMapButtons();
