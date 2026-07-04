// Cleaner visual overrides for the Waterfall Passport PDF.
// This file loads AFTER app.js and overrides selected drawing functions.

function drawEmblem(doc, cx, cy) {
  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.8);
  doc.circle(cx, cy, 24);
  doc.circle(cx, cy, 19);

  setColor(doc, "fill", [246, 239, 214]);
  doc.circle(cx, cy, 15.5, "F");

  // Mountains
  setColor(doc, "draw", PDF.ink);
  doc.setLineWidth(0.55);
  doc.line(cx - 10, cy + 2, cx - 2, cy - 6);
  doc.line(cx - 2, cy - 6, cx + 2, cy - 1);
  doc.line(cx + 1, cy - 1, cx + 9, cy - 8);
  doc.line(cx + 9, cy - 8, cx + 14, cy + 2);

  // Trees
  drawPine(doc, cx - 11.5, cy - 1.5, 0.55, PDF.green2);
  drawPine(doc, cx + 11.5, cy - 1.5, 0.55, PDF.green2);

  // Waterfall
  setColor(doc, "fill", [251, 248, 232]);
  doc.roundedRect(cx - 4.2, cy - 4.5, 8.4, 14.5, 2, 2, "F");
  setColor(doc, "draw", [108, 135, 101]);
  doc.setLineWidth(0.45);
  doc.line(cx - 1.8, cy - 3.5, cx - 2.7, cy + 8);
  doc.line(cx, cy - 4, cx, cy + 8);
  doc.line(cx + 1.8, cy - 3.5, cx + 2.7, cy + 8);
  doc.line(cx - 7, cy + 10.5, cx + 7, cy + 10.5);

  addText(doc, "HIGHLANDS", cx, cy - 26.5, {
    font: "times",
    style: "bold",
    size: 7.5,
    color: PDF.gold,
    align: "center"
  });

  addText(doc, "FALLS PASS", cx, cy + 28.5, {
    font: "times",
    style: "bold",
    size: 7.5,
    color: PDF.gold,
    align: "center"
  });
}

function drawPostmark(doc, x, y) {
  const stamp = [122, 138, 116];
  const faded = [171, 180, 165];

  doc.setDrawColor(stamp[0], stamp[1], stamp[2]);
  doc.setTextColor(stamp[0], stamp[1], stamp[2]);
  doc.setLineWidth(0.5);

  doc.circle(x, y, 13.5);
  doc.circle(x, y, 10.2);

  doc.setFont("times", "bold");
  doc.setFontSize(6);
  doc.text("HIGHLANDS", x, y - 14.5, { align: "center" });
  doc.text("NC", x, y + 15.5, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(6.5);
  doc.text("FALLS", x, y - 1.2, { align: "center" });
  doc.text("PASS", x, y + 5.2, { align: "center" });

  // Tiny mountain mark
  doc.setLineWidth(0.4);
  doc.line(x - 6, y + 7, x - 1.8, y + 2);
  doc.line(x - 1.8, y + 2, x + 1.6, y + 5.6);
  doc.line(x + 1.2, y + 5.6, x + 5.8, y + 1.4);
  doc.line(x + 5.8, y + 1.4, x + 9, y + 7);

  // Postal lines
  doc.setDrawColor(faded[0], faded[1], faded[2]);
  doc.setLineWidth(0.45);
  for (let i = 0; i < 4; i++) {
    doc.line(x + 17, y - 7 + i * 3.6, x + 38, y - 6 + i * 3.6);
  }
}

function drawCoverPage(doc, visited, total, percent, generatedDate) {
  setColor(doc, "fill", PDF.green);
  doc.rect(0, 0, PDF.width, PDF.height, "F");
  drawPaperTexture(doc, true);

  // Left spine
  setColor(doc, "draw", [16, 39, 27]);
  doc.setLineWidth(4);
  doc.line(21, 0, 21, PDF.height);

  drawCornerOrnaments(doc, 18, 17, 180, 244, PDF.gold);

  addText(doc, "STATE OF NORTH CAROLINA", 108, 43, {
    size: 11,
    style: "bold",
    color: PDF.cream,
    align: "center"
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.35);
  doc.line(79, 51, 97, 51);
  doc.line(119, 51, 137, 51);
  drawPine(doc, 101, 45.8, 0.42, PDF.gold);
  drawPine(doc, 108, 44.8, 0.5, PDF.gold);
  drawPine(doc, 115, 45.8, 0.42, PDF.gold);

  addText(doc, "WATERFALL", 108, 82, {
    size: 23,
    style: "bold",
    color: PDF.cream,
    align: "center"
  });

  addText(doc, "PASSPORT", 108, 100, {
    size: 23,
    style: "bold",
    color: PDF.cream,
    align: "center"
  });

  setColor(doc, "draw", PDF.gold);
  doc.line(71, 110, 88, 110);
  doc.line(128, 110, 145, 110);

  addText(doc, "Highlands, NC Explorer Edition", 108, 111.5, {
    size: 12,
    style: "italic",
    color: PDF.cream,
    align: "center"
  });

  drawEmblem(doc, 108, 145);

  drawWaterDrop(doc, 87, 183, PDF.gold);
  addText(doc, `Waterfalls Visited: ${visited} / ${total}`, 97, 186, {
    size: 11,
    color: PDF.cream
  });

  drawCompass(doc, 87, 196, PDF.gold);
  addText(doc, `Progress: ${percent}%`, 97, 199, {
    size: 11,
    color: PDF.cream
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.4);
  doc.line(78, 209, 102, 209);
  doc.line(114, 209, 138, 209);
  setColor(doc, "fill", PDF.gold);
  doc.triangle(108, 206.8, 110, 209, 108, 211.2, "F");
  doc.triangle(108, 206.8, 106, 209, 108, 211.2, "F");

  addText(doc, "Issued to:", 66, 224, {
    size: 13,
    style: "italic",
    color: PDF.gold
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.25);
  doc.line(94, 224, 151, 224);

  drawMountainIcon(doc, 101, 230, PDF.gold);

  addText(doc, `Generated: ${generatedDate}`, 108, 245, {
    size: 10,
    color: PDF.cream,
    align: "center"
  });
}

function drawSummaryPage(doc, visited, total, percent, generatedDate) {
  setColor(doc, "fill", PDF.paper);
  doc.rect(0, 0, PDF.width, PDF.height, "F");
  drawTopoLines(doc, 10, 10, 196, 250);

  drawPine(doc, 22, 23, 0.52, PDF.ink);

  addText(doc, "PASSPORT SUMMARY", 35, 34, {
    size: 18,
    style: "bold",
    color: PDF.ink
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.3);
  doc.line(35, 40, 72, 40);
  doc.line(90, 40, 126, 40);
  setColor(doc, "fill", PDF.gold);
  doc.triangle(81, 38.2, 83, 40, 81, 41.8, "F");
  doc.triangle(81, 38.2, 79, 40, 81, 41.8, "F");

  addText(doc, "Your adventure, by the numbers.", 35, 52, {
    size: 10,
    style: "italic",
    color: PDF.muted
  });

  drawPostmark(doc, 170, 34);

  const cardY = 72;
  drawStatCard(doc, 20, cardY, 36, 50, total, "TOTAL", "WATERFALLS", "waterfall");
  drawStatCard(doc, 62, cardY, 36, 50, visited, "VISITED", "", "check");
  drawStatCard(doc, 104, cardY, 36, 50, total - visited, "REMAINING", "", "mountain");
  drawStatCard(doc, 146, cardY, 36, 50, `${percent}%`, "COMPLETION", "", "pie");

  setColor(doc, "draw", [213, 219, 203]);
  setColor(doc, "fill", [238, 241, 226]);
  doc.roundedRect(20, 133, 162, 26, 4, 4, "FD");

  addText(doc, "OVERALL PROGRESS", 27, 143, {
    size: 8.5,
    style: "bold",
    color: PDF.ink
  });

  addText(doc, `${percent}%`, 175, 143, {
    size: 8.5,
    style: "bold",
    color: PDF.ink,
    align: "right"
  });

  setColor(doc, "draw", [218, 216, 202]);
  setColor(doc, "fill", [252, 249, 238]);
  doc.roundedRect(27, 148, 148, 7, 3.5, 3.5, "FD");

  if (percent > 0) {
    setColor(doc, "fill", PDF.green2);
    doc.roundedRect(27, 148, Math.max(7, 148 * percent / 100), 7, 3.5, 3.5, "F");
  }

  setColor(doc, "draw", [205, 202, 187]);
  doc.setLineWidth(0.25);
  doc.setLineDashPattern([1.2, 1.6], 0);
  doc.line(20, 170, 182, 170);
  doc.line(115, 170, 115, 195);
  doc.setLineDashPattern([], 0);

  // Left side
  setColor(doc, "fill", PDF.green2);
  doc.circle(28, 183, 3.8, "F");
  setColor(doc, "fill", PDF.paper);
  doc.circle(28, 183, 1.4, "F");

  addText(doc, "Issued to:", 39, 184, {
    size: 11,
    style: "italic",
    color: PDF.muted
  });

  setColor(doc, "draw", PDF.line);
  doc.line(62, 185, 107, 185);

  // Right side
  setColor(doc, "draw", PDF.green2);
  doc.setLineWidth(0.75);
  doc.roundedRect(126, 176, 8, 9, 1.3, 1.3, "S");
  doc.line(126, 179, 134, 179);
  doc.line(128, 174.5, 128, 178.2);
  doc.line(132, 174.5, 132, 178.2);

  addText(doc, "Generated:", 139, 181, {
    size: 9.5,
    style: "italic",
    color: PDF.muted
  });

  addText(doc, generatedDate, 139, 188, {
    size: 9.5,
    style: "bold",
    color: PDF.ink
  });

  drawWaterfallIcon(doc, 21, 207, PDF.ink);

  addText(doc, "WATERFALL ENTRIES", 40, 218, {
    size: 16,
    style: "bold",
    color: PDF.ink
  });

  setColor(doc, "draw", PDF.gold);
  doc.line(40, 224, 120, 224);

  addText(doc, "Track each waterfall you discover along the way.", 40, 233, {
    size: 9.5,
    style: "italic",
    color: PDF.muted
  });
}

function drawEntryCard(doc, waterfall, visited, note, x, y, w, h, index) {
  setColor(doc, "draw", [214, 210, 194]);
  setColor(doc, "fill", [252, 249, 238]);
  doc.setLineWidth(0.35);
  doc.roundedRect(x, y, w, h, 4, 4, "FD");

  setColor(doc, "fill", visited ? [227, 237, 222] : [239, 238, 229]);
  doc.roundedRect(x + 4, y + 4, w - 8, 13, 3, 3, "F");

  addText(doc, String(index).padStart(2, "0"), x + 8, y + 12.5, {
    size: 7,
    style: "bold",
    color: PDF.muted
  });

  const titleLines = doc.splitTextToSize(waterfall.name, w - 44).slice(0, 2);
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  setColor(doc, "text", PDF.ink);
  doc.text(titleLines, x + 17, y + 10.5);

  drawEntryStamp(doc, x + w - 17, y + 22, visited ? "VISITED" : "TO GO", visited);

  addText(doc, waterfall.area, x + 8, y + 27, {
    size: 8,
    style: "italic",
    color: PDF.muted,
    maxWidth: w - 20
  });

  setColor(doc, "draw", [222, 219, 205]);
  doc.line(x + 8, y + 34, x + w - 8, y + 34);

  addText(doc, "Difficulty", x + 8, y + 41, {
    size: 6.7,
    style: "bold",
    color: PDF.muted
  });

  addText(doc, waterfall.difficulty, x + 8, y + 47, {
    size: 8.7,
    style: "bold",
    color: PDF.ink
  });

  addText(doc, "Time", x + 40, y + 41, {
    size: 6.7,
    style: "bold",
    color: PDF.muted
  });

  addText(doc, waterfall.time, x + 40, y + 47, {
    size: 8.7,
    style: "bold",
    color: PDF.ink
  });

  addText(doc, "Notes", x + 8, y + 57, {
    size: 6.7,
    style: "bold",
    color: PDF.muted
  });

  doc.setFont("times", "normal");
  doc.setFontSize(7.8);
  setColor(doc, "text", PDF.muted);
  const noteText = note || "No notes added yet.";
  const noteLines = doc.splitTextToSize(noteText, w - 16).slice(0, 3);
  doc.text(noteLines, x + 8, y + 63);
}

function startEntriesPage(doc, pageNo) {
  setColor(doc, "fill", PDF.paper);
  doc.rect(0, 0, PDF.width, PDF.height, "F");
  drawTopoLines(doc, 10, 10, 196, 250);

  addText(doc, "WATERFALL ENTRIES", 20, 27, {
    size: 16,
    style: "bold",
    color: PDF.ink
  });

  addText(doc, `Passport page ${pageNo}`, 196, 27, {
    size: 8.5,
    style: "italic",
    color: PDF.muted,
    align: "right"
  });

  setColor(doc, "draw", PDF.gold);
  doc.setLineWidth(0.3);
  doc.line(20, 34, 196, 34);
}
