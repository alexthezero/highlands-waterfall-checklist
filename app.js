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

const PDF = {
  width: 216,
  height: 279,
  green: [22, 48, 33],
  green2: [38, 75, 49],
  sage: [108, 135, 101],
  cream: [248, 242, 222],
  paper: [248, 245, 234],
  pale: [235, 241, 228],
  gold: [212, 184, 118],
  ink: [37, 61, 42],
  muted: [91, 104, 88],
  line: [202, 211, 195]
};

function setColor(doc, type, color) {
  if (type === "fill") doc.setFillColor(color[0], color[1], color[2]);
  if (type === "draw") doc.setDrawColor(color[0], color[1], color[2]);
  if (type === "text") doc.setTextColor(color[0], color[1], color[2]);
}

function addText(doc, text, x, y, options = {}) {
  doc.setFont(options.font || "times", options.style || "normal");
  doc.setFontSize(options.size || 10);
  if (options.color) setColor(doc, "text", options.color);
  doc.text(String(text), x, y, {
    align: options.align || "left",
    maxWidth: options.maxWidth
  });
}

function drawPaperTexture(doc, dark = false) {
  const color = dark ? [29, 61, 41] : [231, 226, 211];
  setColor(doc, "draw", color);
  doc.setLineWidth(0.12);

  for (let i = 0; i < 58; i++) {
    const y = 12 + i * 4.6;
    const x1 = (i * 17) % 216;
    doc.line(x1, y, Math.min(216, x1 + 23), y + ((i % 3) - 1) * 0.5);
  }
}

function drawTopoLines(doc, x, y, w, h) {
  setColor(doc, "draw", [229, 224, 208]);
  doc.setLineWidth(0.18);

  for (let i = 0; i < 9; i++) {
    const baseY = y + 8 + i * 9;
    let prevX = x;
    let prevY = baseY;

    for (let step = 1; step <= 26; step++) {
      const nx = x + (w / 26) * step;
      const ny = baseY + Math.sin((step + i) * 0.8) * 2.1;
      doc.line(prevX, prevY, nx, ny);
      prevX = nx;
      prevY = ny;
    }
  }

  setColor(doc, "draw", [237, 232, 217]);
  doc.setLineWidth(0.15);
  for (let i = 0; i < 7; i++) {
    doc.circle(x + 28 + i * 22, y + 24 + (i % 2) * 16, 7 + (i % 3) * 3);
  }
}

function drawCornerOrnaments(doc, x, y, w, h, color = PDF.gold) {
  setColor(doc, "draw", color);
  doc.setLineWidth(0.65);

  const s = 16;
  doc.line(x + s, y, x + w - s, y);
  doc.line(x, y + s, x, y + h - s);
  doc.line(x + s, y + h, x + w - s, y + h);
  doc.line(x + w, y + s, x + w, y + h - s);

  doc.line(x, y + s, x + s, y);
  doc.line(x + w - s, y, x + w, y + s);
  doc.line(x, y + h - s, x + s, y + h);
  doc.line(x + w - s, y + h, x + w, y + h - s);

  doc.setLineWidth(0.25);
  doc.roundedRect(x + 3.5, y + 3.5, w - 7, h - 7, 3.5, 3.5, "S");
}

function drawPine(doc, x, y, scale = 1, color = PDF.gold) {
  setColor(doc, "fill", color);
  doc.triangle(x, y, x - 3 * scale, y + 6 * scale, x + 3 * scale, y + 6 * scale, "F");
  doc.triangle(x, y + 4 * scale, x - 4 * scale, y + 11 * scale, x + 4 * scale, y + 11 * scale, "F");
  doc.triangle(x, y + 9 * scale, x - 5 * scale, y + 17 * scale, x + 5 * scale, y + 17 * scale, "F");
  doc.rect(x - 0.7 * scale, y + 16 * scale, 1.4 * scale, 4 * scale, "F");
}

function drawWaterDrop(doc, x, y, color = PDF.gold) {
  setColor(doc, "draw", color);
  doc.setLineWidth(0.75);
  doc.ellipse(x, y + 2.5, 3.4, 4.5, "S");
  doc.line(x, y - 6, x - 3.4, y + 1);
  doc.line(x, y - 6, x + 3.4, y + 1);
}

function drawCompass(doc, x, y, color = PDF.gold) {
  setColor(doc, "draw", color);
  doc.setLineWidth(0.7);
  doc.circle(x, y, 4.6);
  doc.line(x, y, x + 2.8, y - 2.8);
  doc.line(x, y, x - 2.8, y + 2.8);
  doc.circle(x, y, 0.7, "S");
}

function drawMountainIcon(doc, x, y, color = PDF.ink) {
  setColor(doc, "draw", color);
  doc.setLineWidth(0.75);
  doc.line(x, y + 8, x + 8, y - 4);
  doc.line(x + 8, y - 4, x + 14, y + 8);
  doc.line(x + 7, y + 8, x + 16, y - 2);
  doc.line(x + 16, y - 2, x + 26, y + 8);
  doc.line(x + 6, y + 1, x + 9, y + 3);
  doc.line(x + 9, y + 3, x + 12, y);
}

function drawWaterfallIcon(doc, x, y, color = PDF.ink) {
  setColor(doc, "draw", color);
  doc.setLineWidth(0.8);
  doc.roundedRect(x, y, 13, 16, 2, 2, "S");
  doc.line(x + 4, y + 2, x + 3, y + 12);
  doc.line(x + 7, y + 2, x + 7, y + 13);
  doc.line(x + 10, y + 2, x + 11, y + 12);
  doc.line(x + 2, y + 14, x + 11, y + 14);
}

function drawCheckIcon(doc, x, y, color = PDF.ink) {
  setColor(doc, "draw", color);
  doc.setLineWidth(1.2);
  doc.line(x, y, x + 3, y + 3);
  doc.line(x + 3, y + 3, x + 9, y - 5);
}

function drawPieIcon(doc, x, y, color = PDF.ink) {
  setColor(doc, "draw", color);
  doc.setLineWidth(0.8);
  doc.circle(x, y, 7, "S");
  setColor(doc, "fill", color);
  doc.triangle(x, y, x, y - 7, x + 7, y, "F");
}

function drawEmblem(doc, cx, cy) {
  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.8);
  doc.circle(cx, cy, 27);
  doc.circle(cx, cy, 22.5);

  setColor(doc, "fill", [238, 226, 190]);
  doc.circle(cx, cy, 18.5, "F");

  setColor(doc, "draw", PDF.green);
  doc.setLineWidth(0.55);
  doc.line(cx - 14, cy + 5, cx - 4, cy - 5);
  doc.line(cx - 4, cy - 5, cx + 2, cy + 3);
  doc.line(cx + 1, cy + 3, cx + 10, cy - 7);
  doc.line(cx + 10, cy - 7, cx + 17, cy + 5);

  drawPine(doc, cx - 14, cy - 2, 0.65, PDF.green2);
  drawPine(doc, cx + 14, cy - 3, 0.65, PDF.green2);

  setColor(doc, "fill", [251, 248, 232]);
  doc.roundedRect(cx - 5, cy - 6, 10, 20, 4, 4, "F");
  setColor(doc, "draw", [87, 112, 83]);
  doc.setLineWidth(0.45);
  doc.line(cx - 2.5, cy - 4, cx - 3.6, cy + 12);
  doc.line(cx, cy - 5, cx, cy + 12);
  doc.line(cx + 2.5, cy - 4, cx + 3.6, cy + 12);
  doc.line(cx - 10, cy + 14, cx + 10, cy + 14);
  doc.line(cx - 8, cy + 16, cx + 8, cy + 16);

  addText(doc, "HIGHLANDS", cx, cy - 29.5, {
    font: "times",
    style: "bold",
    size: 9,
    color: PDF.gold,
    align: "center"
  });
  addText(doc, "FALLS PASS", cx, cy + 32.5, {
    font: "times",
    style: "bold",
    size: 9,
    color: PDF.gold,
    align: "center"
  });
}

function drawPostmark(doc, x, y) {
  setColor(doc, "draw", [139, 153, 134]);
  doc.setLineWidth(0.45);
  doc.circle(x, y, 17);
  doc.circle(x, y, 13.2);
  drawWaterfallIcon(doc, x - 5.8, y - 7.5, [139, 153, 134]);
  addText(doc, "HIGHLANDS", x, y - 19.5, {
    size: 6.5,
    style: "bold",
    color: [139, 153, 134],
    align: "center"
  });
  addText(doc, "NORTH CAROLINA", x, y + 22, {
    size: 6.2,
    style: "bold",
    color: [139, 153, 134],
    align: "center"
  });
  for (let i = 0; i < 4; i++) {
    doc.line(x + 20, y - 10 + i * 4, x + 46, y - 8 + i * 4);
  }
}

function drawCoverPage(doc, visited, total, percent, generatedDate) {
  setColor(doc, "fill", PDF.green);
  doc.rect(0, 0, PDF.width, PDF.height, "F");
  drawPaperTexture(doc, true);

  setColor(doc, "draw", [14, 35, 23]);
  doc.setLineWidth(4);
  doc.line(21, 0, 21, PDF.height);

  drawCornerOrnaments(doc, 18, 17, 180, 244, PDF.gold);

  addText(doc, "STATE OF NORTH CAROLINA", 108, 42, {
    size: 12,
    style: "bold",
    color: PDF.cream,
    align: "center"
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.35);
  doc.line(78, 50, 97, 50);
  doc.line(119, 50, 138, 50);
  drawPine(doc, 101, 44.5, 0.45, PDF.gold);
  drawPine(doc, 108, 43.5, 0.52, PDF.gold);
  drawPine(doc, 115, 44.5, 0.45, PDF.gold);

  addText(doc, "WATERFALL", 108, 75, {
    size: 28,
    style: "bold",
    color: PDF.cream,
    align: "center"
  });
  addText(doc, "PASSPORT", 108, 96, {
    size: 28,
    style: "bold",
    color: PDF.cream,
    align: "center"
  });
  setColor(doc, "draw", PDF.gold);
  doc.line(69, 108, 86, 108);
  doc.line(130, 108, 147, 108);
  addText(doc, "Highlands, NC Explorer Edition", 108, 109, {
    size: 14,
    style: "italic",
    color: PDF.cream,
    align: "center"
  });

  drawEmblem(doc, 108, 148);

  drawWaterDrop(doc, 86, 190, PDF.gold);
  addText(doc, `Waterfalls Visited: ${visited} / ${total}`, 96, 193, {
    size: 12,
    color: PDF.cream
  });
  drawCompass(doc, 86, 204, PDF.gold);
  addText(doc, `Progress: ${percent}%`, 96, 207, {
    size: 12,
    color: PDF.cream
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.45);
  doc.line(78, 218, 104, 218);
  doc.line(112, 218, 138, 218);
  setColor(doc, "fill", PDF.gold);
  doc.triangle(108, 215.8, 110.2, 218, 108, 220.2, "F");
  doc.triangle(108, 215.8, 105.8, 218, 108, 220.2, "F");

  addText(doc, "Issued to:", 63, 233, {
    size: 14,
    style: "italic",
    color: PDF.gold
  });
  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.25);
  doc.line(91, 233, 155, 233);

  drawMountainIcon(doc, 95, 242, PDF.gold);

  addText(doc, `Generated: ${generatedDate}`, 108, 260, {
    size: 11,
    color: PDF.cream,
    align: "center"
  });
}

function drawStatCard(doc, x, y, w, h, number, label1, label2, icon) {
  setColor(doc, "draw", [215, 209, 193]);
  setColor(doc, "fill", [252, 248, 235]);
  doc.setLineWidth(0.35);
  doc.roundedRect(x, y, w, h, 3.5, 3.5, "FD");

  setColor(doc, "fill", [222, 232, 212]);
  doc.circle(x + w / 2, y + 14, 8.5, "F");

  if (icon === "waterfall") drawWaterfallIcon(doc, x + w / 2 - 6.5, y + 6.2, PDF.ink);
  if (icon === "check") drawCheckIcon(doc, x + w / 2 - 4.5, y + 14, PDF.ink);
  if (icon === "mountain") drawMountainIcon(doc, x + w / 2 - 12, y + 10, PDF.ink);
  if (icon === "pie") drawPieIcon(doc, x + w / 2, y + 14, PDF.ink);

  addText(doc, number, x + w / 2, y + 34, {
    size: 23,
    style: "bold",
    color: PDF.ink,
    align: "center"
  });
  addText(doc, label1, x + w / 2, y + 44, {
    size: 7.2,
    style: "bold",
    color: PDF.ink,
    align: "center"
  });
  if (label2) {
    addText(doc, label2, x + w / 2, y + 49, {
      size: 7.2,
      style: "bold",
      color: PDF.ink,
      align: "center"
    });
  }
}

function drawSummaryPage(doc, visited, total, percent, generatedDate) {
  setColor(doc, "fill", PDF.paper);
  doc.rect(0, 0, PDF.width, PDF.height, "F");
  drawTopoLines(doc, 10, 8, 196, 255);

  drawPine(doc, 22, 24, 0.55, PDF.ink);
  addText(doc, "PASSPORT SUMMARY", 35, 35, {
    size: 20,
    style: "bold",
    color: PDF.ink
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.35);
  doc.line(35, 41, 72, 41);
  doc.line(90, 41, 126, 41);
  setColor(doc, "fill", PDF.gold);
  doc.triangle(81, 38.8, 83.2, 41, 81, 43.2, "F");
  doc.triangle(81, 38.8, 78.8, 41, 81, 43.2, "F");

  addText(doc, "Your adventure, by the numbers.", 35, 52, {
    size: 11,
    style: "italic",
    color: PDF.muted
  });

  drawPostmark(doc, 167, 38);

  const cardY = 72;
  drawStatCard(doc, 20, cardY, 39, 52, total, "TOTAL", "WATERFALLS", "waterfall");
  drawStatCard(doc, 66, cardY, 39, 52, visited, "VISITED", "", "check");
  drawStatCard(doc, 112, cardY, 39, 52, total - visited, "REMAINING", "", "mountain");
  drawStatCard(doc, 158, cardY, 39, 52, `${percent}%`, "COMPLETION", "", "pie");

  setColor(doc, "draw", [213, 219, 203]);
  setColor(doc, "fill", [238, 241, 226]);
  doc.roundedRect(20, 136, 176, 30, 4, 4, "FD");

  addText(doc, "OVERALL PROGRESS", 27, 147, {
    size: 9,
    style: "bold",
    color: PDF.ink
  });
  addText(doc, `${percent}%`, 185, 147, {
    size: 9,
    style: "bold",
    color: PDF.ink,
    align: "right"
  });

  setColor(doc, "draw", [218, 216, 202]);
  setColor(doc, "fill", [252, 249, 238]);
  doc.roundedRect(27, 153, 162, 8, 4, 4, "FD");
  if (percent > 0) {
    setColor(doc, "fill", PDF.green2);
    doc.roundedRect(27, 153, Math.max(7, 162 * percent / 100), 8, 4, 4, "F");
  }

  setColor(doc, "draw", [205, 202, 187]);
  doc.setLineWidth(0.25);
  doc.setLineDashPattern([1.2, 1.6], 0);
  doc.line(20, 178, 196, 178);
  doc.line(118, 178, 118, 205);
  doc.setLineDashPattern([], 0);

  setColor(doc, "fill", PDF.green2);
  doc.circle(28, 192, 3.8, "F");
  setColor(doc, "fill", PDF.paper);
  doc.circle(28, 192, 1.4, "F");
  addText(doc, "Issued to:", 39, 193, {
    size: 12,
    style: "italic",
    color: PDF.muted
  });
  setColor(doc, "draw", PDF.line);
  doc.line(62, 194, 110, 194);

  setColor(doc, "draw", PDF.green2);
  doc.setLineWidth(0.8);
  doc.roundedRect(132, 184, 9, 10, 1.5, 1.5, "S");
  doc.line(132, 187, 141, 187);
  doc.line(134, 182, 134, 186);
  doc.line(139, 182, 139, 186);
  addText(doc, "Generated:", 147, 190, {
    size: 10,
    style: "italic",
    color: PDF.muted
  });
  addText(doc, generatedDate, 147, 198, {
    size: 10,
    style: "bold",
    color: PDF.ink
  });

  drawWaterfallIcon(doc, 21, 220, PDF.ink);
  addText(doc, "WATERFALL ENTRIES", 40, 231, {
    size: 18,
    style: "bold",
    color: PDF.ink
  });
  setColor(doc, "draw", PDF.gold);
  doc.line(40, 237, 126, 237);
  addText(doc, "Track each waterfall you discover along the way.", 40, 247, {
    size: 10,
    style: "italic",
    color: PDF.muted
  });

  drawPine(doc, 169, 232, 0.75, [176, 189, 169]);
  drawPine(doc, 182, 226, 0.95, [176, 189, 169]);
  drawPine(doc, 193, 236, 0.6, [176, 189, 169]);
}

function drawEntryStamp(doc, x, y, label, visited) {
  const color = visited ? PDF.green2 : [141, 141, 132];
  setColor(doc, "draw", color);
  doc.setLineWidth(0.65);
  doc.circle(x, y, 13);
  doc.circle(x, y, 10);
  addText(doc, label, x, y + 2, {
    size: 7.1,
    style: "bold",
    color,
    align: "center"
  });
}

function drawEntryCard(doc, waterfall, visited, note, x, y, w, h, index) {
  setColor(doc, "draw", [214, 210, 194]);
  setColor(doc, "fill", [252, 249, 238]);
  doc.setLineWidth(0.35);
  doc.roundedRect(x, y, w, h, 4, 4, "FD");

  setColor(doc, "fill", visited ? [227, 237, 222] : [239, 238, 229]);
  doc.roundedRect(x + 4, y + 4, w - 8, 14, 3, 3, "F");

  addText(doc, String(index).padStart(2, "0"), x + 8, y + 13, {
    size: 8,
    style: "bold",
    color: PDF.muted
  });

  const titleLines = doc.splitTextToSize(waterfall.name, w - 48).slice(0, 2);
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  setColor(doc, "text", PDF.ink);
  doc.text(titleLines, x + 19, y + 11);

  drawEntryStamp(doc, x + w - 18, y + 24, visited ? "VISITED" : "TO GO", visited);

  addText(doc, waterfall.area, x + 8, y + 28, {
    size: 8.2,
    style: "italic",
    color: PDF.muted,
    maxWidth: w - 42
  });

  setColor(doc, "draw", [222, 219, 205]);
  doc.line(x + 8, y + 35, x + w - 8, y + 35);

  addText(doc, "Difficulty", x + 8, y + 43, {
    size: 7,
    style: "bold",
    color: PDF.muted
  });
  addText(doc, waterfall.difficulty, x + 8, y + 49, {
    size: 9,
    style: "bold",
    color: PDF.ink
  });

  addText(doc, "Time", x + 40, y + 43, {
    size: 7,
    style: "bold",
    color: PDF.muted
  });
  addText(doc, waterfall.time, x + 40, y + 49, {
    size: 9,
    style: "bold",
    color: PDF.ink
  });

  addText(doc, "Notes", x + 8, y + 60, {
    size: 7,
    style: "bold",
    color: PDF.muted
  });
  doc.setFont("times", "normal");
  doc.setFontSize(8);
  setColor(doc, "text", PDF.muted);
  const noteText = note || "No notes added yet.";
  const noteLines = doc.splitTextToSize(noteText, w - 16).slice(0, 3);
  doc.text(noteLines, x + 8, y + 66);
}

function startEntriesPage(doc, pageNo) {
  setColor(doc, "fill", PDF.paper);
  doc.rect(0, 0, PDF.width, PDF.height, "F");
  drawTopoLines(doc, 10, 8, 196, 255);

  addText(doc, "WATERFALL ENTRIES", 20, 27, {
    size: 18,
    style: "bold",
    color: PDF.ink
  });
  addText(doc, `Passport page ${pageNo}`, 196, 27, {
    size: 9,
    style: "italic",
    color: PDF.muted,
    align: "right"
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.35);
  doc.line(20, 34, 196, 34);
}

function exportPassportPDF() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF library did not load yet. Refresh the page and try again.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });

  const checked = getChecked();
  const notes = getNotes();
  const waterfalls = getAllWaterfalls();
  const visited = waterfalls.filter(w => checked[w.id]).length;
  const total = waterfalls.length;
  const percent = total ? Math.round((visited / total) * 100) : 0;
  const generatedDate = new Date().toLocaleDateString();

  drawCoverPage(doc, visited, total, percent, generatedDate);

  doc.addPage();
  drawSummaryPage(doc, visited, total, percent, generatedDate);

  let entryPage = 1;
  doc.addPage();
  startEntriesPage(doc, entryPage);

  let x = 18;
  let y = 45;
  const cardW = 84;
  const cardH = 72;
  const gapX = 12;
  const gapY = 10;

  waterfalls.forEach((w, index) => {
    const visitedStatus = !!checked[w.id];
    const note = notes[w.id] || "";

    drawEntryCard(doc, w, visitedStatus, note, x, y, cardW, cardH, index + 1);

    if (x === 18) {
      x = 18 + cardW + gapX;
    } else {
      x = 18;
      y += cardH + gapY;
    }

    if (y + cardH > 262 && index < waterfalls.length - 1) {
      entryPage += 1;
      doc.addPage();
      startEntriesPage(doc, entryPage);
      x = 18;
      y = 45;
    }
  });

  doc.save("highlands-waterfall-passport.pdf");
}

exportBtn.addEventListener("click", exportPassportPDF);

render();
