const defaultWaterfalls = [
  {
    id: "dry-falls",
    name: "Dry Falls",
    area: "Cullasaja Gorge / US 64 West",
    difficulty: "Easy",
    tags: ["Easy", "Walk Behind", "Popular"],
    time: "Quick stop",
    details: "One of the must-see Highlands waterfalls. Short paved/stair access with a viewing platform and a walkway behind the falls.",
    map: "https://www.google.com/maps/search/?api=1&query=Dry+Falls+Highlands+NC"
  },
  {
    id: "bridal-veil-falls",
    name: "Bridal Veil Falls",
    area: "US 64 West",
    difficulty: "Roadside",
    tags: ["Roadside", "Walk Behind", "Quick Stop"],
    time: "5–15 min",
    details: "A classic roadside waterfall close to Highlands. Great quick photo stop, especially if you are already driving the scenic byway.",
    map: "https://www.google.com/maps/search/?api=1&query=Bridal+Veil+Falls+Highlands+NC"
  },
  {
    id: "cullasaja-falls",
    name: "Cullasaja Falls",
    area: "Cullasaja Gorge / US 64",
    difficulty: "Roadside",
    tags: ["Roadside", "Scenic Drive"],
    time: "10–20 min",
    details: "A dramatic gorge waterfall viewed from roadside pull-offs. The road is narrow and winding, so use caution.",
    map: "https://www.google.com/maps/search/?api=1&query=Cullasaja+Falls+Highlands+NC"
  },
  {
    id: "glen-falls",
    name: "Glen Falls",
    area: "NC 106 near Highlands",
    difficulty: "Moderate",
    tags: ["Moderate", "Hike", "Multiple Falls"],
    time: "1.5–2.5 hrs",
    details: "A beautiful triple-waterfall hike. The trail is mostly downhill going out, which means uphill on the way back.",
    map: "https://www.google.com/maps/search/?api=1&query=Glen+Falls+Trail+Highlands+NC"
  },
  {
    id: "secret-falls",
    name: "Secret Falls / Big Shoals Falls",
    area: "Near Highlands",
    difficulty: "Easy",
    tags: ["Easy", "Hike", "Swimming"],
    time: "45–90 min",
    details: "A quieter waterfall reached by a short forest hike. Expect unpaved-road access and limited parking.",
    map: "https://www.google.com/maps/search/?api=1&query=Secret+Falls+Big+Shoals+Falls+Highlands+NC"
  },
  {
    id: "bust-your-butt-falls",
    name: "Bust Your Butt Falls / Quarry Falls",
    area: "US 64 / Cullasaja River",
    difficulty: "Roadside",
    tags: ["Roadside", "Swimming", "Natural Slide"],
    time: "15–45 min",
    details: "Popular swimming hole and natural slide area. Only use it when conditions are safe, and be extra careful around slick rock.",
    map: "https://www.google.com/maps/search/?api=1&query=Bust+Your+Butt+Falls+Quarry+Falls+Highlands+NC"
  },
  {
    id: "lake-sequoyah-kalakaleskies",
    name: "Lake Sequoyah / Kalakaleskies Falls",
    area: "US 64 West",
    difficulty: "Roadside",
    tags: ["Roadside", "Quick Stop"],
    time: "5–15 min",
    details: "A man-made waterfall/dam spillover near the Highlands sign. Easy to pair with other US 64 waterfall stops.",
    map: "https://www.google.com/maps/search/?api=1&query=Lake+Sequoyah+Kalakaleskies+Falls+Highlands+NC"
  },
  {
    id: "hidden-falls-upper-middle-creek",
    name: "Hidden Falls Trail to Upper Middle Creek Falls",
    area: "Highlands area",
    difficulty: "Moderate",
    tags: ["Moderate", "Hike"],
    time: "45–90 min",
    details: "A short but moderately challenging trail option in the Highlands area. Check access details before going.",
    map: "https://www.google.com/maps/search/?api=1&query=Hidden+Falls+Trail+Upper+Middle+Creek+Falls+Highlands+NC"
  },
  {
    id: "picklesimer-rockhouse-falls",
    name: "Picklesimer Rockhouse Falls",
    area: "Highlands area",
    difficulty: "Easy",
    tags: ["Easy", "Hike", "Quiet Stop"],
    time: "30–75 min",
    details: "A quieter waterfall stop with a short scenic hike. Good option when you want something less crowded.",
    map: "https://www.google.com/maps/search/?api=1&query=Picklesimer+Rockhouse+Falls+Highlands+NC"
  },
  {
    id: "silver-run-falls",
    name: "Silver Run Falls",
    area: "Cashiers area",
    difficulty: "Easy",
    tags: ["Easy", "Swimming", "Family Friendly"],
    time: "30–60 min",
    details: "Easy short hike near Cashiers with a pretty waterfall and pool. Great add-on when driving east from Highlands.",
    map: "https://www.google.com/maps/search/?api=1&query=Silver+Run+Falls+Cashiers+NC"
  },
  {
    id: "sliding-rock-cashiers",
    name: "Sliding Rock",
    area: "Cashiers area",
    difficulty: "Easy",
    tags: ["Easy", "Swimming", "Natural Slide"],
    time: "30–60 min",
    details: "A natural rock-slide style stop near Cashiers. Best treated as a warm-weather swimming stop, not just a photo stop.",
    map: "https://www.google.com/maps/search/?api=1&query=Sliding+Rock+Cashiers+NC"
  },
  {
    id: "whitewater-falls",
    name: "Whitewater Falls",
    area: "Cashiers / Sapphire area",
    difficulty: "Easy",
    tags: ["Easy", "Overlook", "Big View"],
    time: "45–90 min",
    details: "One of the biggest waterfall views in the region. Paved path to overlook, with stairs for lower viewpoints.",
    map: "https://www.google.com/maps/search/?api=1&query=Whitewater+Falls+NC"
  }
];

const STORAGE_KEY = "highlandsWaterfallChecklist_v1";
const CUSTOM_KEY = "highlandsWaterfallCustom_v1";
const NOTES_KEY = "highlandsWaterfallNotes_v1";

let activeFilter = "all";
let searchTerm = "";

const listEl = document.getElementById("waterfallList");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");
const filters = document.getElementById("filters");
const addForm = document.getElementById("addForm");
const exportBtn = document.getElementById("exportBtn");
const clearCustomBtn = document.getElementById("clearCustomBtn");

function getChecked() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function setChecked(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getNotes() {
  return JSON.parse(localStorage.getItem(NOTES_KEY)) || {};
}

function setNotes(data) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(data));
}

function getCustom() {
  return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || [];
}

function setCustom(data) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(data));
}

function getAllWaterfalls() {
  return [...defaultWaterfalls, ...getCustom()];
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateProgress() {
  const waterfalls = getAllWaterfalls();
  const checked = getChecked();
  const total = waterfalls.length;
  const visited = waterfalls.filter(w => checked[w.id]).length;
  const percent = total ? Math.round((visited / total) * 100) : 0;

  progressText.textContent = `${visited} of ${total} visited`;
  progressPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;
}

function difficultyClass(difficulty) {
  return difficulty.toLowerCase().replace(/\s+/g, "-");
}

function matchesFilter(waterfall) {
  if (activeFilter === "all") return true;
  return waterfall.tags.includes(activeFilter) || waterfall.difficulty === activeFilter;
}

function matchesSearch(waterfall) {
  const haystack = `${waterfall.name} ${waterfall.area} ${waterfall.details} ${waterfall.tags.join(" ")}`.toLowerCase();
  return haystack.includes(searchTerm.toLowerCase());
}

function render() {
  const checked = getChecked();
  const notes = getNotes();

  const waterfalls = getAllWaterfalls()
    .filter(matchesFilter)
    .filter(matchesSearch);

  listEl.innerHTML = "";

  if (!waterfalls.length) {
    listEl.innerHTML = `<div class="empty">No waterfalls match your search or filter.</div>`;
    updateProgress();
    return;
  }

  waterfalls.forEach(w => {
    const card = document.createElement("article");
    card.className = `waterfall-card ${checked[w.id] ? "checked" : ""}`;

    card.innerHTML = `
      <div class="card-top">
        <input class="check" type="checkbox" ${checked[w.id] ? "checked" : ""} aria-label="Mark ${escapeHTML(w.name)} visited" />
        <div>
          <div class="name-line">
            <h2>${escapeHTML(w.name)}</h2>
            <span class="visited-label">Visited</span>
          </div>

          <div class="meta">
            <span class="pill ${difficultyClass(w.difficulty)}">${escapeHTML(w.difficulty)}</span>
            <span class="pill">${escapeHTML(w.area)}</span>
            <span class="pill">${escapeHTML(w.time)}</span>
            ${w.tags.map(tag => `<span class="pill">${escapeHTML(tag)}</span>`).join("")}
          </div>
        </div>
      </div>

      <p class="details">${escapeHTML(w.details)}</p>

      <div class="card-actions">
        <a class="action-link" href="${w.map}" target="_blank" rel="noopener">Open Map</a>
        <button class="note-toggle" type="button">Notes</button>
      </div>

      <textarea class="notes-area" placeholder="Add notes, parking tips, date visited, who went with you, etc.">${escapeHTML(notes[w.id] || "")}</textarea>
    `;

    const checkbox = card.querySelector(".check");
    checkbox.addEventListener("change", () => {
      const data = getChecked();
      data[w.id] = checkbox.checked;
      setChecked(data);
      render();
    });

    const noteBtn = card.querySelector(".note-toggle");
    const noteArea = card.querySelector(".notes-area");

    noteBtn.addEventListener("click", () => {
      noteArea.classList.toggle("show");
      noteArea.focus();
    });

    noteArea.addEventListener("input", () => {
      const data = getNotes();
      data[w.id] = noteArea.value;
      setNotes(data);
    });

    listEl.appendChild(card);
  });

  updateProgress();
}

filters.addEventListener("click", e => {
  if (!e.target.classList.contains("filter-btn")) return;

  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  activeFilter = e.target.dataset.filter;
  render();
});

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value;
  render();
});

resetBtn.addEventListener("click", () => {
  const confirmed = confirm("Reset all checked waterfalls?");
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  render();
});

addForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("newName").value.trim();
  const area = document.getElementById("newArea").value.trim() || "Custom stop";
  const difficulty = document.getElementById("newDifficulty").value;

  if (!name) return;

  const custom = getCustom();
  const id = `custom-${Date.now()}`;

  custom.push({
    id,
    name,
    area,
    difficulty,
    tags: [difficulty, "Custom"],
    time: "Custom",
    details: "Custom waterfall stop added by you.",
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + area)}`
  });

  setCustom(custom);
  addForm.reset();
  render();
});

clearCustomBtn.addEventListener("click", () => {
  const confirmed = confirm("Clear only your custom-added waterfall stops?");
  if (!confirmed) return;

  localStorage.removeItem(CUSTOM_KEY);
  render();
});

exportBtn.addEventListener("click", () => {
  const checked = getChecked();
  const notes = getNotes();
  const waterfalls = getAllWaterfalls();

  const lines = waterfalls.map(w => {
    const status = checked[w.id] ? "Visited" : "Not visited";
    const note = notes[w.id] ? ` | Notes: ${notes[w.id].replace(/\n/g, " ")}` : "";
    return `${status} - ${w.name} - ${w.area}${note}`;
  });

  const text = `Highlands NC Waterfall Checklist\n\n${lines.join("\n")}`;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "highlands-nc-waterfall-checklist.txt";
  a.click();

  URL.revokeObjectURL(url);
});

render();
