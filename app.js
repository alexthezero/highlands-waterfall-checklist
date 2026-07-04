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

function wrapText(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(String(text), maxWidth);
  lines.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

function drawStamp(doc, x, y, label, visited) {
  if (visited) {
    doc.setDrawColor(35, 96, 61);
    doc.setTextColor(35, 96, 61);
  } else {
    doc.setDrawColor(140, 140, 140);
    doc.setTextColor(120, 120, 120);
  }

  doc.setLineWidth(1);
  doc.circle(x, y, 13);
  doc.circle(x, y, 10.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text(label, x, y + 1.5, { align: "center" });
}

function drawPassportCard(doc, waterfall, visited, note, x, y, w, h) {
  doc.setDrawColor(210, 220, 210);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x, y, w, h, 5, 5, "FD");

  doc.setFillColor(233, 241, 229);
  doc.roundedRect(x + 4, y + 4, w - 8, 11, 3, 3, "F");

  doc.setTextColor(38, 61, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  const titleLines = doc.splitTextToSize(waterfall.name, w - 42);
  doc.text(titleLines.slice(0, 2), x + 8, y + 10);

  drawStamp(doc, x + w - 19, y + 18, visited ? "VISITED" : "TO GO", visited);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.7);
  doc.setTextColor(70, 80, 72);
  doc.text(`Area: ${waterfall.area}`, x + 8, y + 24);
  doc.text(`Difficulty: ${waterfall.difficulty}`, x + 8, y + 30);
  doc.text(`Time: ${waterfall.time}`, x + 8, y + 36);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(38, 61, 42);
  doc.text("Tags:", x + 8, y + 44);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 80, 72);
  const tagsText = waterfall.tags.join(", ");
  let currentY = wrapText(doc, tagsText, x + 18, y + 44, w - 26, 4.2);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(38, 61, 42);
  currentY += 3;
  doc.text("Notes:", x + 8, currentY);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 80, 72);
  const noteText = note || "No notes added yet.";
  const noteLines = doc.splitTextToSize(noteText, w - 16).slice(0, 4);
  doc.text(noteLines, x + 8, currentY + 5);
}

function addPageBackground(doc, title) {
  doc.setFillColor(250, 251, 248);
  doc.rect(0, 0, 216, 279, "F");
  doc.setDrawColor(210, 220, 210);
  doc.roundedRect(12, 12, 192, 255, 6, 6, "S");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(38, 61, 42);
  doc.setFontSize(18);
  doc.text(title, 18, 26);
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

  doc.setFillColor(38, 61, 42);
  doc.rect(0, 0, 216, 279, "F");

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1.2);
  doc.roundedRect(18, 18, 180, 240, 8, 8, "S");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text("STATE OF NORTH CAROLINA", 108, 42, { align: "center" });

  doc.setFontSize(24);
  doc.text("WATERFALL PASSPORT", 108, 58, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Highlands, NC Explorer Edition", 108, 69, { align: "center" });

  doc.setDrawColor(255, 255, 255);
  doc.circle(108, 108, 28);
  doc.circle(108, 108, 22);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("HIGHLANDS", 108, 103, { align: "center" });
  doc.text("FALLS", 108, 111, { align: "center" });
  doc.text("PASS", 108, 119, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Waterfalls Visited: ${visited} / ${total}`, 108, 162, { align: "center" });
  doc.text(`Progress: ${percent}%`, 108, 171, { align: "center" });

  doc.setFontSize(10);
  doc.text("Issued to: ________________________________", 108, 198, { align: "center" });
  doc.text(`Generated: ${generatedDate}`, 108, 210, { align: "center" });

  doc.setFontSize(9);
  doc.text("Use this passport to track your waterfall adventures.", 108, 236, { align: "center" });

  doc.addPage();
  doc.setFillColor(233, 241, 229);
  doc.rect(0, 0, 216, 279, "F");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(38, 61, 42);
  doc.setFontSize(20);
  doc.text("Passport Summary", 18, 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(70, 80, 72);
  doc.text(`Total Waterfalls: ${total}`, 18, 36);
  doc.text(`Visited: ${visited}`, 18, 43);
  doc.text(`Remaining: ${total - visited}`, 18, 50);
  doc.text(`Completion: ${percent}%`, 18, 57);

  doc.setDrawColor(73, 107, 74);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(18, 66, 180, 16, 4, 4, "FD");

  if (percent > 0) {
    doc.setFillColor(73, 107, 74);
    doc.roundedRect(18, 66, 180 * (percent / 100), 16, 4, 4, "F");
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(38, 61, 42);
  doc.text("Waterfall Entries", 18, 98);

  let x = 18;
  let y = 106;
  const cardW = 84;
  const cardH = 66;
  const gapX = 12;
  const gapY = 10;

  waterfalls.forEach((w, index) => {
    const visitedStatus = !!checked[w.id];
    const note = notes[w.id] || "";

    drawPassportCard(doc, w, visitedStatus, note, x, y, cardW, cardH);

    if (x === 18) {
      x = 18 + cardW + gapX;
    } else {
      x = 18;
      y += cardH + gapY;
    }

    if (y + cardH > 260 && index < waterfalls.length - 1) {
      doc.addPage();
      addPageBackground(doc, "Waterfall Entries");
      x = 18;
      y = 36;
    }
  });

  doc.save("highlands-waterfall-passport.pdf");
}

exportBtn.addEventListener("click", exportPassportPDF);

render();
