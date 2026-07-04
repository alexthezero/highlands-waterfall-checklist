// Small visual overrides for the Waterfall Passport PDF.
// Loaded after app.js so these functions replace the original decorative stamp.

function drawPostmark(doc, x, y) {
  // Cleaner, smaller passport-style stamp.
  // This intentionally removes the oversized abstract waterfall mark from the summary page.
  const stamp = [116, 135, 112];
  const faded = [165, 176, 160];

  doc.setDrawColor(stamp[0], stamp[1], stamp[2]);
  doc.setTextColor(stamp[0], stamp[1], stamp[2]);
  doc.setLineWidth(0.55);

  doc.circle(x, y, 15);
  doc.circle(x, y, 11.5);

  doc.setFont("times", "bold");
  doc.setFontSize(6.5);
  doc.text("HIGHLANDS", x, y - 16.5, { align: "center" });
  doc.text("NC", x, y + 18.2, { align: "center" });

  doc.setFont("times", "bold");
  doc.setFontSize(7.5);
  doc.text("FALLS", x, y - 2, { align: "center" });
  doc.text("PASS", x, y + 5.5, { align: "center" });

  // Tiny mountain/water line instead of a large confusing logo.
  doc.setLineWidth(0.45);
  doc.line(x - 7, y + 9, x - 2, y + 3);
  doc.line(x - 2, y + 3, x + 2, y + 8);
  doc.line(x + 1, y + 8, x + 6, y + 2);
  doc.line(x + 6, y + 2, x + 10, y + 9);
  doc.line(x - 8, y + 11.5, x + 8, y + 11.5);

  // Subtle postmark lines to the right.
  doc.setDrawColor(faded[0], faded[1], faded[2]);
  doc.setLineWidth(0.5);
  for (let i = 0; i < 4; i++) {
    doc.line(x + 20, y - 8 + i * 4, x + 48, y - 7 + i * 4);
  }
}
